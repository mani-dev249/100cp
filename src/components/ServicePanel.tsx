import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ServiceItem {
  icon: LucideIcon;
  title: string;
  detail?: string;
}

export interface ServicePanelProps {
  tone: "navy" | "red";
  icon: LucideIcon;
  title: string;
  tagline: string;
  image: string;
  imageAlt: string;
  items: ServiceItem[];
}

/** Coloured header bar, image, and service list shared by the service cards. */
export default function ServicePanel({
  tone,
  icon: HeaderIcon,
  title,
  tagline,
  image,
  imageAlt,
  items,
}: ServicePanelProps) {
  const headingId = `panel-${title.toLowerCase().replace(/\W+/g, "-")}`;
  return (
    <article
      aria-labelledby={headingId}
      className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_8px_24px_-14px_rgb(7_59_120/0.3)] transition-shadow duration-300 hover:shadow-[0_18px_36px_-16px_rgb(7_59_120/0.35)]"
    >
      <header
        className={cn(
          "flex min-h-[124px] items-center gap-4 px-5 py-3.5 text-white",
          tone === "navy"
            ? "bg-[linear-gradient(90deg,#062f63,#0a4a91)]"
            : "bg-[linear-gradient(90deg,#d81f2b,#ef2939)]"
        )}
      >
        <HeaderIcon aria-hidden className="size-10 shrink-0 lg:size-11" strokeWidth={2} />
        <div>
          <h3 id={headingId} className="text-[28px] leading-tight font-bold lg:text-[32px]">
            {title}
          </h3>
          <p className="text-base text-white/90 lg:text-lg">{tagline}</p>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-3">
        <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <ul
          className={cn(
            "space-y-3 px-2 pb-2"
          )}
        >
          {items.map(({ icon: Icon, title: itemTitle, detail }) => (
            <li key={itemTitle} className="flex items-start gap-3">
              <Icon
                aria-hidden
                className={cn(
                  "mt-0.5 size-5 shrink-0",
                  tone === "navy" ? "text-brand-red" : "text-navy"
                )}
                strokeWidth={2.2}
              />
              <p className="text-[14px] leading-[1.35] text-navy-dark">
                <span className="font-semibold">{itemTitle}</span>
                {detail && <span className="block text-ink/85">{detail}</span>}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
