import Image from "next/image";
import { Gift, Shirt, ShoppingBag, type LucideIcon } from "lucide-react";
import { Container, IconCircle, PillLink, SectionSubtitle, SplitHeading } from "@/components/shared";

interface Category {
  title: string;
  description: string;
  icon: LucideIcon;
  tone: "navy" | "red";
}

const CATEGORIES: Category[] = [
  { title: "T-Shirts", description: "Custom designs for teams, events and ministries.", icon: Shirt, tone: "red" },
  { title: "Accessories", description: "Caps, bags, bottles, lanyards and more.", icon: ShoppingBag, tone: "navy" },
  { title: "Souvenirs", description: "Meaningful gifts for conferences, events and special occasions.", icon: Gift, tone: "red" },
];

export default function Merchandise() {
  return (
    <section id="merchandise" aria-labelledby="merch-heading" className="scroll-mt-24 overflow-hidden pt-8 pb-2 lg:pt-2 lg:pb-0">
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,480px)_minmax(0,1fr)_minmax(0,300px)] lg:gap-0">
          <div className="relative z-10 max-w-[480px] lg:self-start lg:pt-5">
            <SplitHeading id="merch-heading" lead="Merchandise" />
            <SectionSubtitle>Branded products that make an impact.</SectionSubtitle>
            <p className="mt-4 text-[17px] leading-[1.5] text-ink/90 lg:max-w-[440px] lg:text-[19px]">
              High-quality, customized merchandise for organizations, events,
              churches, conferences and corporate needs.
            </p>
            <PillLink href="#contact" size="sm" className="mt-6 min-w-[176px]">
              Learn More
            </PillLink>
          </div>

          <div className="relative aspect-[272/148] w-full lg:-ml-[120px] lg:w-[calc(100%+120px)]">
            <Image
              src="/images/merch.webp"
              alt="100 CP branded t-shirt, hoodie, caps, mugs, bottle, tote bag and notebooks"
              fill
              sizes="(min-width: 1024px) 680px, 100vw"
              className="object-cover [mask-image:linear-gradient(to_right,transparent_0%,black_22%,black_96%,transparent_100%)]"
            />
          </div>

          <ul className="space-y-6 lg:pl-6">
            {CATEGORIES.map(({ title, description, icon, tone }) => (
              <li key={title} className="flex items-start gap-4">
                <IconCircle icon={icon} tone={tone} className="size-12" />
                <div>
                  <h3 className="text-[17px] font-bold text-navy-dark">{title}</h3>
                  <p className="mt-0.5 text-[15px] leading-[1.45] text-ink/85">{description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
