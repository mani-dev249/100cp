import Image from "next/image";
import { GraduationCap, Settings, Users, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container, PillLink, SectionTitle } from "@/components/shared";

interface Product {
  name: string;
  description: string;
  icon: LucideIcon;
  tone: "navy" | "red";
  image: string;
  imageAlt: string;
}

const PRODUCTS: Product[] = [
  {
    name: "ERP",
    description: "Manage operations, resources and finance efficiently.",
    icon: Settings,
    tone: "navy",
    image: "/images/erp.webp",
    imageAlt: "Laptop showing an ERP dashboard",
  },
  {
    name: "CRM",
    description: "Build stronger relationships and drive revenue.",
    icon: Users,
    tone: "red",
    image: "/images/crm.webp",
    imageAlt: "Laptop showing a CRM pipeline dashboard",
  },
  {
    name: "LMS",
    description: "Deliver, manage and track learning effortlessly.",
    icon: GraduationCap,
    tone: "navy",
    image: "/images/lms.webp",
    imageAlt: "Laptop showing an online learning course with an instructor",
  },
];

export default function SoftwareSolutions() {
  return (
    <section id="software" aria-labelledby="software-heading" className="scroll-mt-24 py-8 lg:py-4">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,710px)] lg:items-center lg:gap-6">
          <div className="max-w-[600px]">
            <SectionTitle
              id="software-heading"
              eyebrow="Software Solutions"
              title="Technology that simplifies, connects and scales."
            />
            <p className="mt-4 text-[17px] leading-[1.5] text-ink/90 lg:text-[19px]">
              We develop and implement practical software solutions to help
              organizations manage operations, people and growth efficiently.
            </p>
            <PillLink href="#contact" size="sm" className="mt-6 min-w-[176px]">
              Learn More
            </PillLink>
          </div>

          <ul className="grid gap-4 sm:grid-cols-3 lg:gap-[18px]">
            {PRODUCTS.map(({ name, description, icon: Icon, tone, image, imageAlt }) => (
              <li
                key={name}
                className="group flex flex-col rounded-xl border border-slate-200/80 bg-[linear-gradient(180deg,#f8fbfe_0%,#f1f5f9_100%)] px-5 pt-5 pb-3 shadow-[0_6px_18px_-12px_rgb(7_59_120/0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_30px_-14px_rgb(7_59_120/0.35)]"
              >
                <h3 className="flex items-center gap-3 text-[26px] font-bold text-navy-dark lg:text-[30px]">
                  <Icon
                    aria-hidden
                    className={cn("size-8", tone === "red" ? "text-brand-red" : "text-navy")}
                    strokeWidth={2.4}
                  />
                  {name}
                </h3>
                <p className="mt-2 pl-11 text-[14px] leading-[1.45] text-ink/80 lg:text-[15px]">{description}</p>
                <div className="mt-auto pt-4">
                  <div className="relative mx-auto aspect-[76/47] w-full max-w-[280px] sm:max-w-none">
                    <Image
                      src={image}
                      alt={imageAlt}
                      fill
                      sizes="(min-width: 1024px) 230px, (min-width: 640px) 30vw, 90vw"
                      className="object-contain object-bottom transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
