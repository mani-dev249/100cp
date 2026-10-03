import { Container, SectionSubtitle, SplitHeading } from "@/components/shared";
import BpoCard from "@/components/BpoCard";
import StaffingCard from "@/components/StaffingCard";

export default function BpoStaffing() {
  return (
    <section id="bpo-staffing" aria-labelledby="bpo-heading" className="scroll-mt-24 pt-12 pb-6 lg:pt-6 lg:pb-4">
      <Container>
        <SplitHeading id="bpo-heading" lead="BPO &" accent="Staffing" />
        <SectionSubtitle>People and processes to keep you moving.</SectionSubtitle>

        <div className="mt-7 grid gap-5 lg:grid-cols-[minmax(0,1.14fr)_minmax(0,1fr)] lg:gap-6">
          <BpoCard />
          <StaffingCard />
        </div>
      </Container>
    </section>
  );
}
