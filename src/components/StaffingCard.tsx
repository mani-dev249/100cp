import { Users, UsersRound } from "lucide-react";
import ServicePanel from "@/components/ServicePanel";

export default function StaffingCard() {
  return (
    <ServicePanel
      tone="red"
      icon={Users}
      title="Staffing"
      tagline="The right talent for your business"
      image="/images/staffing.webp"
      imageAlt="Two smiling professionals working together at a desk"
      items={[
        { icon: UsersRound, title: "Staff Augmentation", detail: "(Short & Long Term)" },
        { icon: Users, title: "Recruitment &", detail: "Talent Sourcing" },
        { icon: Users, title: "Dedicated Teams", detail: "(Onsite / Offshore / Hybrid)" },
      ]}
    />
  );
}
