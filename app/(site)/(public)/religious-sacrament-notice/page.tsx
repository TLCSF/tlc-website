import type { Metadata } from "next";
import { Section } from "@/components/section";

export const metadata: Metadata = {
  title: "Religious Sacrament Notice",
  description:
    "Religious sacrament notice for The Living Church members participating in religious activities."
};

export default function ReligiousSacramentNoticePage() {
  return (
    <main>
      <Section
        eyebrow="Member notice"
        title="Religious Sacrament Notice"
        tone="linen"
      >
        <div className="max-w-3xl space-y-5 text-base leading-8 text-ink/75">
          <p>
            Psilocybin provided solely as a religious sacrament to church
            members participating in religious activities. Not for recreational
            use.
          </p>
          <p>For adults 21+ only. Keep out of reach of children and pets.</p>
          <p>
            Psilocybin is a potent psychoactive substance that may cause altered
            perception, anxiety, nausea, and other psychological or physical
            effects. Effects may be delayed and unpredictable. Do not drive,
            operate machinery, or engage in activities requiring full attention
            while under its influence.
          </p>
          <p>
            Do not participate if pregnant, nursing, taking medications, or if
            you have a history of psychosis, schizophrenia, bipolar disorder, or
            other serious mental health conditions.
          </p>
          <p>
            Sacraments have not been evaluated by the U.S. Food and Drug
            Administration and are produced without governmental regulatory
            oversight for safety or efficacy. Recipients assume all risks
            associated with participation and use of sacraments. Seek medical
            assistance if severe reactions occur.
          </p>
        </div>
      </Section>
    </main>
  );
}
