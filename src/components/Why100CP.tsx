import Image from "next/image";
import {
  BadgeDollarSign,
  Handshake,
  Network,
  Star,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { Container, IconCircle, SectionTitle } from "@/components/shared";

interface Reason {
  title: string;
  description: string;
  icon: LucideIcon;
  tone: "red" | "white";
}

const COLUMNS: Reason[][] = [
  [
    { title: "Cost Effective", description: "High quality at competitive pricing.", icon: BadgeDollarSign, tone: "red" },
    { title: "Quality Focus", description: "Proven processes and consistent delivery.", icon: Star, tone: "white" },
    { title: "Faster Turnaround", description: "Agile teams and streamlined workflows.", icon: UsersRound, tone: "white" },
  ],
  [
    {
      title: "Global Delivery Model",
      description: "Headquartered in Singapore with delivery teams in India, serving clients across the world.",
      icon: Network,
      tone: "white",
    },
    {
      title: "Flexible Engagement",
      description: "Project-based, dedicated teams or end-to-end delivery.",
      icon: Handshake,
      tone: "red",
    },
  ],
];

const GLOBE_ALT =
  "Glowing globe with delivery routes connecting Singapore to North America, South America, Europe, the Middle East, Africa and Australia";

export default function Why100CP() {
  return (
    <section
      id="why"
      aria-labelledby="why-heading"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#062f63_0%,#04295a_100%)] text-white"
    >
      <div className="absolute inset-y-0 right-0 hidden w-[49%] lg:block">
        <Image
          src="/images/globe.webp"
          alt={GLOBE_ALT}
          fill
          sizes="49vw"
          className="object-cover object-center [mask-image:linear-gradient(to_right,transparent_0%,black_14%)]"
        />
      </div>

      <Container className="relative z-10">
        <div className="py-14 lg:min-h-[296px] lg:max-w-[760px] lg:py-16">
          <SectionTitle
            id="why-heading"
            eyebrow="Why 100 CP?"
            title="Global capability. Real value."
            tone="light"
          />

          <div className="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-[minmax(0,0.92fr)_minmax(0,1fr)]">
            {COLUMNS.map((column, i) => (
              <ul key={i} className="space-y-3.5">
                {column.map(({ title, description, icon, tone }) => (
                  <li key={title} className="flex items-start gap-3.5">
                    <IconCircle icon={icon} tone={tone} className="size-12" />
                    <div>
                      <h3 className="text-[17px] leading-tight font-bold">{title}</h3>
                      <p className="mt-0.5 text-[14px] leading-[1.45] text-white/75">{description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </Container>

      <div className="relative aspect-[255/116] w-full lg:hidden">
        <Image src="/images/globe.webp" alt={GLOBE_ALT} fill sizes="100vw" className="object-cover" />
      </div>
    </section>
  );
}
