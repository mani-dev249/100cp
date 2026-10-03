import Image from "next/image";
import { Container, PillLink, SectionTitle } from "@/components/shared";

export default function FinalCTA() {
  return (
    <section
      id="contact"
      aria-labelledby="cta-heading"
      className="relative scroll-mt-24 overflow-hidden bg-[linear-gradient(180deg,#e4e6ef_0%,#eedbe0_48%,#f8cdb2_100%)]"
    >
      <div className="absolute inset-0 lg:left-auto lg:w-[56%]">
        <Image
          src="/images/cta-singapore.webp"
          alt="Singapore skyline across Marina Bay at sunset, with Marina Bay Sands and the ArtScience Museum"
          fill
          sizes="(min-width: 1024px) 56vw, 100vw"
          className="object-cover object-right opacity-30 lg:object-left lg:opacity-100 xl:object-right lg:[mask-image:linear-gradient(to_right,transparent_0%,black_26%)]"
        />
      </div>

      <Container className="relative z-10">
        <div className="py-14 lg:min-h-[196px] lg:py-16">
          <SectionTitle
            id="cta-heading"
            eyebrow="Let’s Create What’s Next"
            title={
              <>
                Business growth. More opportunities.
                <br className="max-sm:hidden" /> A wider impact.
              </>
            }
          />
          <PillLink href="#contact" size="sm" className="mt-4 min-w-[160px]">
            Get in Touch
          </PillLink>
        </div>
      </Container>
    </section>
  );
}
