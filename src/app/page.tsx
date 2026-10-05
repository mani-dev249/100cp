import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeatureHighlights from "@/components/FeatureHighlights";
import Solutions from "@/components/Solutions";
import DigitalGrowth from "@/components/DigitalGrowth";
import BpoStaffing from "@/components/BpoStaffing";
import SoftwareSolutions from "@/components/SoftwareSolutions";
import Merchandise from "@/components/Merchandise";
import Clients from "@/components/Clients";
import Why100CP from "@/components/Why100CP";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import ContactPopup from "@/components/ContactPopup";

export default function Home() {
  return (
    <ContactPopup>
      <Header />
      <main className="flex-1">
        <Hero />
        <FeatureHighlights />
        <Solutions />
        <DigitalGrowth />
        <BpoStaffing />
        <SoftwareSolutions />
        <Merchandise />
        <Clients />
        <Why100CP />
        <FinalCTA />
      </main>
      <Footer />
      <BackToTop />
    </ContactPopup>
  );
}
