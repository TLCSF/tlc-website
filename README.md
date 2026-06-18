# The Living Church Website

Modern Next.js website for The Living Church, replacing WordPress with a Vercel-hosted frontend, Sanity Studio for staff-editable content, Supabase for auth/member data, and Smartwaiver as the external waiver layer.

## Stack

- Next.js App Router, TypeScript, Tailwind CSS
- Sanity Studio at `/studio`
- Supabase Auth and member profile data
- Smartwaiver link/webhook placeholder
- Vercel hosting

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env.local
```

3. Fill in Sanity, Supabase, and Smartwaiver values in `.env.local`.

4. Run the site:

```bash
npm run dev
```

## Sanity Setup

1. Create a Sanity project and production dataset.
2. Add `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET`.
3. Visit `/studio`.
4. Staff can manage:
   - Website pages
   - Education articles
   - Dosage guide entries
   - FAQs
   - Events
   - Announcements
   - Menu products and availability
   - Site settings

## Supabase Setup

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the SQL editor.
3. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4. Configure auth redirects for local and Vercel URLs.
5. Staff/admin roles are stored on `profiles.role`.

Gated pages require:

- Authenticated user
- `role` of `member_active`, `staff`, or `admin`
- `approval` of `approved`
- `waiver` of `completed`

## Smartwaiver

Launch approach:

1. Set `NEXT_PUBLIC_SMARTWAIVER_URL` to the live waiver URL.
2. Staff manually verifies completion and updates Supabase.

Automated approach:

1. Add Smartwaiver webhook credentials.
2. Connect `/api/smartwaiver/webhook` to service-role Supabase updates.
3. Match waiver email to `profiles.email`.

## Vercel Deployment

1. Push the repository to GitHub.
2. Import it into Vercel.
3. Add all environment variables.
4. Deploy a preview.
5. QA content, auth, gated pages, `/studio`, sitemap, robots, and mobile layouts.
6. Add `thelivingchurchsf.com` and `www.thelivingchurchsf.com`.
7. Update DNS to Vercel and verify HTTPS.

## Phase Status

- Phase 1 complete: scaffold, design system, layout, navigation, footer, age gate.
- Phase 2 complete: public pages, education pages, Sanity schemas, CMS fetch helpers.
- Phase 3 complete: Supabase auth forms, account status, protected member routes.
- Phase 4 complete: events, announcements/menu schemas, member menu, staff member search, Smartwaiver webhook placeholder.
- Phase 5 complete: metadata, sitemap, robots, schema markup, accessibility-minded components, setup docs.

## Notes

Fallback content is sourced from the project package and should be replaced or expanded in Sanity. Staff-editable content should live in Sanity whenever possible.
