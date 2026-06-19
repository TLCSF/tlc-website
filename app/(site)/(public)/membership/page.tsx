import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { ImageFeature } from "@/components/image-feature";
import { Section } from "@/components/section";
import { seo } from "@/lib/content";

export const metadata: Metadata = {
  title: { absolute: seo.membership.title },
  description: seo.membership.description
};

export default function MembershipPage() {
  const membershipSteps = [
    {
      step: "Step 1",
      title: "Create an account",
      body:
        "Start by creating a secure member account with your email and password. This gives you a private place to continue registration and return later to check your status."
    },
    {
      step: "Step 2",
      title: "Complete membership registration",
      body:
        "Add your basic profile details so TLC can identify you, communicate clearly, and connect your account to the waiver process."
    },
    {
      step: "Step 3",
      title: "Sign the digital waiver",
      body:
        "TLC uses Smartwaiver for required digital documents. Complete the waiver using the same email address as your TLC account so your membership can be connected automatically."
    },
    {
      step: "Step 4",
      title: "Become an active member",
      body:
        "Once your completed waiver is matched to your TLC account, your profile is marked active and member-only areas can be accessed."
    },
    {
      step: "Step 5",
      title: "Access member resources and the sacrament menu",
      body:
        "Active members can log in to view member resources, community areas, account status, and the sacrament menu. The menu remains private and member-gated."
    }
  ];

  const membershipFaqs = [
    {
      question: "How do I become a member?",
      answer:
        "Create an account, complete the membership registration form, and sign the required digital waiver. Once the completed waiver is matched to your account, member-only resources unlock."
    },
    {
      question: "When do I sign the waiver?",
      answer:
        "The waiver is part of the membership process after account creation. Use the same email address you used for your TLC account so your waiver can be matched correctly."
    },
    {
      question: "How long does activation take?",
      answer:
        "Membership usually updates after your account and completed waiver are matched. If your account does not update, contact TLC so staff can help confirm your information."
    },
    {
      question: "How do I access the sacrament menu?",
      answer:
        "Log in with an active member account. If your account is not active yet, the menu remains locked and you will be directed back to the membership pathway."
    },
    {
      question: "How do store staff verify my membership?",
      answer:
        "Your membership status helps staff confirm access to member resources and the sacrament menu."
    },
    {
      question: "What if I already completed the waiver?",
      answer:
        "If you already completed a waiver, make sure your TLC account uses the same email address. Log in to check your status or contact TLC if the waiver does not appear connected."
    }
  ];

  return (
    <main>
      <Hero
        eyebrow="Membership"
        title="Membership starts with a clear path."
        body="Joining The Living Church is designed to be straightforward: create an account, complete registration, and sign the required waiver to activate member-only access."
        primaryHref="/register"
        primaryLabel="Create Account"
        secondaryHref="/login"
        secondaryLabel="Member Login"
        imageSrc="/images/tlc/front-desk.jpg"
        imageAlt="The Living Church front desk and welcome area"
        imageMode="cover"
      />
      <Section eyebrow="Why membership?" title="Why join?">
        <p className="max-w-3xl text-lg leading-8 text-ink/75">
          Membership gives TLC a responsible way to know who is participating,
          confirm required documents, and provide access to private resources
          after the right steps are complete. It also gives members a
          simple account-based path for checking status and returning to the
          community over time.
        </p>
      </Section>
      <Section tone="linen">
        <ImageFeature
          src="/images/tlc/chapel-pew.jpg"
          alt="The Living Church chapel seating and framed wall art"
          eyebrow="A clear pathway"
          title="Membership connects the public site to a private member experience."
          body="The public site helps you understand TLC first. Your member account then carries the practical details: registration, waiver status, resources, and menu access."
          reverse
        />
      </Section>
      <Section eyebrow="How membership works" title="A transparent five-step process">
        <div className="grid gap-4 lg:grid-cols-5">
          {membershipSteps.map((item) => (
            <article
              key={item.step}
              className="rounded-lg border border-ink/10 bg-paper p-6"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">
                {item.step}
              </p>
              <h2 className="font-ui mt-3 text-xl font-semibold leading-tight">
                {item.title}
              </h2>
              <p className="mt-3 leading-7 text-ink/70">{item.body}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section eyebrow="Membership FAQ" title="Common membership questions" tone="linen">
        <div className="grid gap-4 md:grid-cols-2">
          {membershipFaqs.map((faq) => (
            <details
              key={faq.question}
              className="rounded-lg border border-ink/10 bg-paper p-6"
            >
              <summary className="cursor-pointer font-ui text-xl font-semibold">
                {faq.question}
              </summary>
              <p className="mt-4 leading-7 text-ink/70">{faq.answer}</p>
            </details>
          ))}
        </div>
      </Section>
    </main>
  );
}
