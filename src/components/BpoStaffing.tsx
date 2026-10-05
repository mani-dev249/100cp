import { Container, SectionTitle } from "@/components/shared";
import BpoCard from "@/components/BpoCard";
import StaffingCard from "@/components/StaffingCard";
import TrainingCard from "@/components/TrainingCard";

export default function BpoStaffing() {
  return (
    <section id="bpo-staffing" aria-labelledby="bpo-heading" className="scroll-mt-24 pt-12 pb-6 lg:pt-6 lg:pb-4">
      <Container>
        <SectionTitle
          id="bpo-heading"
          eyebrow="BPO & Staffing"
          title="People and processes to keep you moving."
        />

        <div className="mt-7 grid items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          <BpoCard />
          <StaffingCard />
          <TrainingCard />
        </div>
      </Container>
    </section>
  );
}
