import Image from "next/image";
import {
  ChartPie,
  Megaphone,
  MessagesSquare,
  Monitor,
  Search,
  Target,
  type LucideIcon,
} from "lucide-react";
import { Container, PillLink, SectionSubtitle, SplitHeading } from "@/components/shared";

interface Service {
  icon: LucideIcon;
  label: string;
}

const SERVICES: Service[] = [
  { icon: Target, label: "Digital Strategy & Consulting" },
  { icon: MessagesSquare, label: "Social Media Marketing & Content Creation" },
  { icon: Search, label: "SEO & Search Marketing" },
  { icon: Megaphone, label: "Paid Campaigns (Google, Meta, YouTube etc.)" },
  { icon: Monitor, label: "Website Design & Development" },
  { icon: ChartPie, label: "Analytics & Performance Tracking" },
];

const PILLARS = ["Strategy", "Creativity", "Execution", "Real Results"];

function GrowthVisual({ sizes, className }: { sizes: string; className?: string }) {
  return (
    <div className={className}>
      <Image
        src="/images/digital-growth.webp"
        alt="Hand pointing at a glowing rising bar chart"
        fill
        sizes={sizes}
        className="object-cover object-left lg:[mask-image:linear-gradient(to_right,transparent_0%,black_16%)]"
      />
      <ul
        aria-label="Our approach"
        className="absolute top-[16.5%] left-[19.5%] w-[27.5%] min-w-[150px] rounded-md border border-white/45 bg-navy-dark/35 px-[4%] py-[3.5%] text-[13px] leading-[2.1] font-semibold tracking-[0.06em] text-white uppercase shadow-[0_0_30px_rgb(4_25_60/0.25)] sm:text-base lg:text-[21px]"
      >
        {PILLARS.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
    </div>
  );
}

export default function DigitalGrowth() {
  return (
    <section
      id="digital-growth"
      aria-labelledby="digital-growth-heading"
      className="relative scroll-mt-24 overflow-hidden bg-[linear-gradient(90deg,#f7fafd_0%,#eef4fa_40%,#dbe8f4_60%)]"
    >
      <GrowthVisual
        sizes="60vw"
        className="absolute inset-y-0 right-0 hidden w-[60%] lg:block"
      />

      <Container className="relative z-10">
        <div className="max-w-[620px] py-12 lg:min-h-[556px] lg:py-[22px]">
          <SplitHeading id="digital-growth-heading" lead="Digital" accent="Growth" />
          <SectionSubtitle>From visibility to real results.</SectionSubtitle>
          <p className="mt-4 text-[17px] leading-[1.5] text-ink/90 lg:text-[19px]">
            We create data-driven digital strategies that help organizations
            build their brand, reach the right audience and achieve measurable
            growth.
          </p>
          <ul className="mt-5 space-y-[7px]">
            {SERVICES.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-4 text-[16px] text-ink lg:text-[19px]">
                <Icon aria-hidden className="size-[22px] shrink-0 text-navy lg:size-6" strokeWidth={2.4} />
                {label}
              </li>
            ))}
          </ul>
          <PillLink href="#contact" size="sm" className="mt-6 min-w-[176px]">
            Learn More
          </PillLink>
        </div>
      </Container>

      <GrowthVisual
        sizes="100vw"
        className="relative aspect-[330/219] w-full lg:hidden"
      />
    </section>
  );
}
