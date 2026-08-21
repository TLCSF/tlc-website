import { existsSync, readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

loadLocalEnv();

const args = process.argv.slice(2);
const inputPath = args.find((argument) => !argument.startsWith("--"));
const commit = args.includes("--commit");
const limitArgument = args.find((argument) => argument.startsWith("--limit="));
const onlyEmailArgument = args.find((argument) => argument.startsWith("--email="));
const limit = limitArgument ? Number(limitArgument.split("=")[1]) : null;
const onlyEmail = onlyEmailArgument
  ? normalizeEmail(onlyEmailArgument.slice("--email=".length))
  : null;

if (!inputPath || !existsSync(inputPath)) {
  throw new Error(
    "Usage: pnpm import:legacy-members /absolute/path/members.csv [--email=member@example.com] [--limit=1] [--commit]"
  );
}

if (limit !== null && (!Number.isInteger(limit) || limit < 1)) {
  throw new Error("--limit must be a positive integer.");
}

const parsedRows = parseCsv(readFileSync(inputPath, "utf8"));
const members = prepareMembers(parsedRows);
const selectedMembers = members.records
  .filter((member) => !onlyEmail || member.email === onlyEmail)
  .slice(0, limit || undefined);

printSummary({
  sourceRows: parsedRows.length,
  uniqueMembers: members.records.length,
  duplicateRowsRemoved: members.duplicateRowsRemoved,
  missingStructuredNames: members.records.filter(
    (member) => !member.firstName && !member.lastName
  ).length,
  selected: selectedMembers.length,
  mode: commit ? "COMMIT" : "DRY RUN"
});

if (onlyEmail && selectedMembers.length !== 1) {
  throw new Error("The requested --email address was not found exactly once in the export.");
}

if (!commit) {
  console.log("No Supabase records were changed. Add --commit only after reviewing this summary.");
  process.exit(0);
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local."
  );
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

const existingUsers = await listAllUsers(supabase);
const usersByEmail = new Map(
  existingUsers
    .filter((user) => user.email)
    .map((user) => [normalizeEmail(user.email), user])
);

let created = 0;
let updated = 0;
let skippedPrivileged = 0;
let failed = 0;

for (const [index, member] of selectedMembers.entries()) {
  try {
    let user = usersByEmail.get(member.email);
    let wasCreated = false;

    if (!user) {
      const { data, error } = await supabase.auth.admin.createUser({
        email: member.email,
        email_confirm: true,
        user_metadata: {
          first_name: member.firstName || null,
          last_name: member.lastName || null,
          legacy_wordpress_member: true
        }
      });
      if (error) throw error;
      user = data.user;
      usersByEmail.set(member.email, user);
      wasCreated = true;
    }

    const { data: currentProfile, error: profileReadError } = await supabase
      .from("profiles")
      .select("role, approval, waiver")
      .eq("id", user.id)
      .maybeSingle();
    if (profileReadError) throw profileReadError;

    if (["staff", "admin"].includes(currentProfile?.role || "")) {
      skippedPrivileged += 1;
      continue;
    }

    const { error: profileError } = await supabase.from("profiles").upsert(
      {
        id: user.id,
        email: member.email,
        first_name: member.firstName || null,
        last_name: member.lastName || null,
        role: "member_active",
        approval: "approved",
        waiver:
          currentProfile?.waiver === "completed"
            ? "completed"
            : "legacy_verified",
        updated_at: new Date().toISOString()
      },
      { onConflict: "id" }
    );
    if (profileError) throw profileError;

    const { data: priorEvent, error: eventReadError } = await supabase
      .from("member_events")
      .select("id")
      .eq("profile_id", user.id)
      .eq("event_type", "legacy_member_imported")
      .limit(1)
      .maybeSingle();
    if (eventReadError) throw eventReadError;

    if (!priorEvent) {
      const { error: eventError } = await supabase.from("member_events").insert({
        profile_id: user.id,
        event_type: "legacy_member_imported",
        metadata: {
          source: "wordpress_subscriber_export",
          existing_waiver_recognized: true
        }
      });
      if (eventError) throw eventError;
    }

    if (wasCreated) created += 1;
    else updated += 1;
  } catch (error) {
    failed += 1;
    console.error(
      `Failed record ${index + 1}/${selectedMembers.length}:`,
      error instanceof Error ? error.message : error
    );
  }

  if ((index + 1) % 100 === 0 || index + 1 === selectedMembers.length) {
    console.log(`Processed ${index + 1}/${selectedMembers.length}`);
  }
}

console.log(
  JSON.stringify(
    { created, updated, skippedPrivileged, failed, emailsSent: 0 },
    null,
    2
  )
);

if (failed > 0) process.exitCode = 1;

function loadLocalEnv() {
  for (const fileName of [".env.local", ".env"]) {
    if (!existsSync(fileName)) continue;
    const contents = readFileSync(fileName, "utf8");
    for (const line of contents.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
      const [key, ...valueParts] = trimmed.split("=");
      if (!process.env[key]) {
        process.env[key] = valueParts.join("=").replace(/^['"]|['"]$/g, "");
      }
    }
  }
}

function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase();
}

function cleanName(value, email) {
  const name = String(value || "").trim();
  if (!name || normalizeEmail(name) === email) return "";
  return name;
}

function prepareMembers(rows) {
  const byEmail = new Map();
  let duplicateRowsRemoved = 0;

  for (const row of rows) {
    const email = normalizeEmail(row.user_email);
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      throw new Error("The export contains a blank or malformed email address.");
    }

    let firstName = cleanName(row.first_name, email);
    const lastName = cleanName(row.last_name, email);
    const displayName = cleanName(row.display_name, email);
    if (!firstName && !lastName && displayName) firstName = displayName;

    const candidate = { email, firstName, lastName };
    const existing = byEmail.get(email);
    if (!existing) {
      byEmail.set(email, candidate);
      continue;
    }

    duplicateRowsRemoved += 1;
    const existingScore = Number(Boolean(existing.firstName)) + Number(Boolean(existing.lastName));
    const candidateScore = Number(Boolean(firstName)) + Number(Boolean(lastName));
    if (candidateScore > existingScore) byEmail.set(email, candidate);
  }

  return {
    records: [...byEmail.values()].sort((a, b) => a.email.localeCompare(b.email)),
    duplicateRowsRemoved
  };
}

function parseCsv(contents) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;

  for (let index = 0; index < contents.length; index += 1) {
    const character = contents[index];
    if (quoted) {
      if (character === '"' && contents[index + 1] === '"') {
        field += '"';
        index += 1;
      } else if (character === '"') {
        quoted = false;
      } else {
        field += character;
      }
    } else if (character === '"') {
      quoted = true;
    } else if (character === ",") {
      row.push(field);
      field = "";
    } else if (character === "\n") {
      row.push(field.replace(/\r$/, ""));
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += character;
    }
  }

  if (field || row.length) {
    row.push(field.replace(/\r$/, ""));
    rows.push(row);
  }

  const [rawHeaders, ...dataRows] = rows.filter(
    (values) => values.some((value) => value.trim())
  );
  const headers = rawHeaders?.map((header, index) =>
    index === 0 ? header.replace(/^\uFEFF/, "") : header
  );
  const requiredHeaders = ["user_email", "first_name", "last_name", "display_name"];
  for (const header of requiredHeaders) {
    if (!headers?.includes(header)) throw new Error(`Missing required CSV column: ${header}`);
  }

  return dataRows.map((values) =>
    Object.fromEntries(headers.map((header, index) => [header, values[index] || ""]))
  );
}

async function listAllUsers(client) {
  const users = [];
  for (let page = 1; ; page += 1) {
    const { data, error } = await client.auth.admin.listUsers({ page, perPage: 1000 });
    if (error) throw error;
    users.push(...data.users);
    if (data.users.length < 1000) return users;
  }
}

function printSummary(summary) {
  console.log(JSON.stringify(summary, null, 2));
}
