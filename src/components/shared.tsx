import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NavItem {
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#solutions" },
  { label: "Products", href: "#merchandise" },
  { label: "Clients", href: "#clients" },
  { label: "Contact", href: "#contact" },
];

export function Container({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8", className)}
      {...props}
    />
  );
}

/** Two-tone heading: first part navy, second part red. */
export function SplitHeading({
  lead,
  accent,
  as: Tag = "h2",
  id,
  className,
  leadClassName = "text-navy",
}: {
  id?: string;
  lead: string;
  accent?: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  leadClassName?: string;
}) {
  return (
    <Tag
      id={id}
      className={cn(
        "font-heading text-[2.25rem] leading-[1.08] font-extrabold tracking-[-0.025em] sm:text-[2.75rem] lg:text-[3.5rem]",
        className
      )}
    >
      <span className={leadClassName}>{lead}</span>
      {accent && <> <span className="text-brand-red">{accent}</span></>}
    </Tag>
  );
}

export function SectionSubtitle({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "mt-1.5 text-lg font-bold tracking-[-0.02em] text-navy-dark sm:text-xl lg:text-[1.55rem]",
        className
      )}
      {...props}
    />
  );
}

/** Red pill call-to-action with trailing arrow. */
export function PillLink({
  href,
  children,
  className,
  size = "md",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md";
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-full bg-brand-red font-semibold text-white shadow-[0_6px_16px_-6px_rgb(229_35_47/0.6)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-red-bright hover:shadow-[0_10px_22px_-8px_rgb(229_35_47/0.7)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red",
        size === "md" ? "h-[54px] px-9 text-base" : "h-12 px-8 text-[15px] lg:h-[54px] lg:min-w-[214px] lg:text-base",
        className
      )}
    >
      {children}
      <ArrowRight
        aria-hidden
        className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
      />
    </Link>
  );
}

/** Inline red "Learn More →" text link used inside cards. */
export function LearnMoreLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      aria-label={`Learn more about ${label}`}
      className="group inline-flex items-center gap-1.5 text-base font-bold text-brand-red transition-colors hover:text-brand-red-bright"
    >
      Learn More
      <ArrowRight
        aria-hidden
        className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
      />
    </Link>
  );
}

export function IconCircle({
  icon: Icon,
  tone = "navy",
  className,
  iconClassName,
}: {
  icon: LucideIcon;
  tone?: "navy" | "red" | "white";
  className?: string;
  iconClassName?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full",
        tone === "navy" && "bg-navy text-white",
        tone === "red" && "bg-brand-red text-white",
        tone === "white" && "bg-white text-navy",
        className
      )}
    >
      <Icon className={cn("size-1/2", iconClassName)} strokeWidth={2.2} />
    </span>
  );
}
