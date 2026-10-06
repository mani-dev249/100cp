import { ChartNoAxesColumnIncreasing, Gift, Settings, Users } from "lucide-react";
import { Container, SectionTitle } from "@/components/shared";
import SolutionCard, { type Solution } from "@/components/SolutionCard";

const SOLUTIONS: Solution[] = [
  {
    title: "Digital Growth",
    description: "Build your brand, reach the right audience and drive measurable results.",
    image: "/images/solution-digital.webp",
    imageAlt: "Hand on a laptop with a glowing upward growth chart",
    icon: ChartNoAxesColumnIncreasing,
    tone: "navy",
    href: "#digital-growth",
  },
  {
    title: "BPO, Staffing and Training",
    description: "Reliable support and the right talent to keep you moving.",
    image: "/images/solution-bpo.webp",
    imageAlt: "Customer support agent with a headset in a busy office",
    icon: Users,
    tone: "red",
    href: "#bpo-staffing",
  },
  {
    title: "Software Solutions",
    description: "ERP, CRM, LMS and custom solutions to simplify and scale.",
    image: "/images/solution-software.webp",
    imageAlt: "Laptop displaying a software dashboard",
    icon: Settings,
    tone: "navy",
    href: "#software",
  },
  {
    title: "Merchandise",
    description: "Branded products that make an impact.",
    image: "/images/solution-merch.webp",
    imageAlt: "100 CP branded t-shirt, caps, mug and tote bag",
    icon: Gift,
    tone: "navy",
    href: "#merchandise",
  },
];

export default function Solutions() {
  return (
    <section id="solutions" aria-labelledby="solutions-heading" className="scroll-mt-24 pt-14 pb-12 lg:pt-10 lg:pb-9">
      <Container>
        <div id="about" className="grid scroll-mt-28 gap-5 lg:grid-cols-[1fr_minmax(0,640px)] lg:items-start lg:gap-12">
          <SectionTitle
            id="solutions-heading"
            eyebrow="Our Solutions"
            title="One Partner. Multiple Ways to Grow."
          />
          <p className="text-[17px] leading-[1.55] text-ink/90 lg:pt-1 lg:text-[19px]">
            From digital growth to people solutions, from software to branded
            merchandise — we bring the right mix of technology, talent and
            creativity to help you move forward.
          </p>
        </div>

        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SOLUTIONS.map((s) => (
            <li key={s.title}>
              <SolutionCard solution={s} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
