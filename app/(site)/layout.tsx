import { AgeGate } from "@/components/age-gate";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AgeGate />
      <Header />
      {children}
      <Footer />
    </>
  );
}
