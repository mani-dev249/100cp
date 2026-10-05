import { Cog, GraduationCap, UsersRound } from "lucide-react";
import ServicePanel from "@/components/ServicePanel";

export default function TrainingCard() {
  return (
    <ServicePanel
      tone="navy"
      icon={GraduationCap}
      title="Training"
      tagline="Developing people and organizations for a stronger tomorrow."
      image="/images/training-presenter.webp"
      imageAlt="Presenter leading a training session for business professionals"
      items={[
        {
          icon: UsersRound,
          title: "Soft Skills Training & Development",
          detail: "for SMEs, FMCG and Educational institutions",
        },
        {
          icon: UsersRound,
          title: "Management Training & Development",
          detail: "(Leadership Development)",
        },
        {
          icon: Cog,
          title: "CSR Project Planning and Implementation",
          detail: "for Industries and Corporations",
        },
      ]}
    />
  );
}
