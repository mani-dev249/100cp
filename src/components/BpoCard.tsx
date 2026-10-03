import { ClipboardList, Cog, FileText, Headset, Mail, UserPlus } from "lucide-react";
import ServicePanel from "@/components/ServicePanel";

export default function BpoCard() {
  return (
    <ServicePanel
      tone="navy"
      icon={Headset}
      title="BPO"
      tagline="Business Process Outsourcing"
      image="/images/bpo.webp"
      imageAlt="Smiling customer support agents wearing headsets"
      items={[
        { icon: Mail, title: "Customer Support", detail: "(Phone, Email, Chat)" },
        { icon: FileText, title: "Back Office Processing", detail: "& Data Management" },
        { icon: UserPlus, title: "Inside Sales & Lead Generation" },
        { icon: Cog, title: "CRM & Account Management" },
        { icon: ClipboardList, title: "Virtual Assistance &", detail: "Administrative Support" },
      ]}
    />
  );
}
