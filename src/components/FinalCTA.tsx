import Image from "next/image";
import { Container, PillLink, SplitHeading } from "@/components/shared";

export default function FinalCTA() {
  return (
    <section
      id="contact"
      aria-labelledby="cta-heading"
      className="relative scroll-mt-24 overflow-hidden bg-[linear-gradient(180deg,#e4e6ef_0%,#eedbe0_48%,#f8cdb2_100%)]"
    >
      <div className="absolute inset-0 lg:left-auto lg:w-[56%]">
        <Image
          src="/images/cta.webp"
          alt="Singapore skyline with Marina Bay Sands at sunset"
          fill
          sizes="(min-width: 1024px) 56vw, 100vw"
          className="object-cover object-right opacity-30 lg:opacity-100 lg:[mask-image:linear-gradient(to_right,transparent_0%,black_26%)]"
        />
      </div>

      <Container className="relative z-10">
        <div className="py-12 sm:py-10 lg:min-h-[196px] lg:py-6">
          <SplitHeading id="cta-heading" lead="Let’s Create" accent="What’s Next" />
          <p className="mt-1.5 text-lg font-bold text-navy-dark sm:text-xl lg:text-[1.55rem]">
            Business growth. More opportunities. A wider impact.
          </p>
          <PillLink href="#contact" size="sm" className="mt-4 min-w-[160px]">
            Get in Touch
          </PillLink>
        </div>
      </Container>
    </section>
  );
}
