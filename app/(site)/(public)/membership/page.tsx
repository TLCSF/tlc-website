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
      title: "Create your free account",
      body: "Start with your name, email and secure password."
    },
    {
      step: "Step 2",
      title: "Complete registration",
      body:
        "Share the basic information TLC needs to identify you and connect your account to the waiver process."
    },
    {
      step: "Step 3",
      title: "Sign the digital waiver",
      body:
        "Complete the required Smartwaiver using the same email address as your TLC account."
    },
    {
      step: "Step 4",
      title: "Activate your membership",
      body:
        "Once your waiver is matched to your account, your member status becomes active."
    },
    {
      step: "Step 5",
      title: "Access member resources",
      body:
        "Active members can log in to view educational resources, account status and the member-only sacrament menu."
    }
  ];

  const membershipFaqs = [
    {
      question: "Is membership free?",
      answer:
        "Yes. Membership in The Living Church is free for adults 21+. Becoming a member gives you access to educational resources, community gatherings, guidance and member-only offerings available through the church."
    },
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
      question: "How does TLC confirm my membership?",
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
        title="Membership opens the door."
        body="Membership is free and gives adults 21+ access to educational resources, community gatherings, guidance and member-only sacramental offerings within The Living Church. Create an account, complete registration and sign the digital waiver to begin."
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
          Membership helps TLC create a responsible, supportive path for people
          engaging with sacred mushroom traditions. It allows us to confirm
          required steps, provide guidance and make member-only resources
          available in a clear and secure way.
        </p>
      </Section>
      <Section tone="linen">
        <ImageFeature
          src="/images/tlc/membership-mushroom-hand.jpg"
          alt="A hand holding a small mushroom in a natural setting"
          eyebrow="A clear pathway"
          title="From curiosity to participation."
          body="The public site is here to help you learn first. Once you become a member, your account gives you access to the practical next steps: waiver status, educational resources and the member-only sacrament menu."
          imagePosition="bottom"
          reverse
        />
      </Section>
      <Section eyebrow="How membership works" title="A simple path to membership.">
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
