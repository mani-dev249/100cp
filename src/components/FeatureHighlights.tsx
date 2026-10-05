import {
  ChartNoAxesColumnIncreasing,
  Earth,
  Heart,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/shared";

interface Highlight {
  icon: LucideIcon;
  title: string;
  lines: string[];
  filled?: boolean;
}

const HIGHLIGHTS: Highlight[] = [
  { icon: Earth, title: "Global Delivery", lines: ["Singapore | India | Worldwide"] },
  {
    icon: ChartNoAxesColumnIncreasing,
    title: "Diverse Industries",
    lines: ["Education | Healthcare", "Businesses | Non-Profits & More"],
  },
  { icon: UsersRound, title: "People First", lines: ["Creating Opportunities"] },
  { icon: Heart, title: "Larger Purpose", lines: ["Supporting Missions"], filled: true },
];

export default function FeatureHighlights() {
  return (
    <section aria-label="Highlights" className="relative z-20 -mt-6 lg:-mt-14">
      <Container className="lg:max-w-[1440px] lg:px-4">
        <ul className="grid grid-cols-1 gap-x-6 gap-y-5 rounded-2xl border border-slate-200/70 bg-white/95 px-6 py-6 shadow-[0_14px_40px_-18px_rgb(7_59_120/0.35)] sm:grid-cols-2 lg:grid-cols-4 lg:px-14 lg:py-7">
          {HIGHLIGHTS.map(({ icon: Icon, title, lines, filled }) => (
            <li key={title} className="flex items-center gap-4 lg:justify-center">
              <Icon
                aria-hidden
                className="size-12 shrink-0 text-navy"
                strokeWidth={filled ? 1.5 : 2.4}
                fill={filled ? "currentColor" : "none"}
              />
              <div>
                <h3 className="text-[17px] font-bold text-navy-dark">{title}</h3>
                {lines.map((line) => (
                  <p key={line} className="text-[14.5px] leading-snug text-ink/70">
                    {line}
                  </p>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
