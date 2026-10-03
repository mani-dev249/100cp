import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { IconCircle, LearnMoreLink } from "@/components/shared";

export interface Solution {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  icon: LucideIcon;
  tone: "navy" | "red";
  href: string;
}

export default function SolutionCard({ solution }: { solution: Solution }) {
  const { title, description, image, imageAlt, icon, tone, href } = solution;
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_6px_20px_-12px_rgb(7_59_120/0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_-16px_rgb(7_59_120/0.35)]">
      <div className="relative aspect-[129/88] overflow-hidden">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 gap-4 px-5 pt-5 pb-6 lg:gap-3 lg:px-4">
        <IconCircle icon={icon} tone={tone} className="size-14 lg:size-[60px]" />
        <div className="flex flex-1 flex-col">
          <h3 className="pt-3.5 text-xl leading-tight lg:pt-4 lg:text-[21px] lg:tracking-[-0.02em] font-bold tracking-[-0.01em] text-navy-dark">{title}</h3>
          <p className="mt-2 text-[15px] leading-[1.45] text-ink/85 lg:text-base">{description}</p>
          <div className="mt-auto pt-5">
            <LearnMoreLink href={href} label={title} />
          </div>
        </div>
      </div>
    </article>
  );
}
