import Image from "next/image";
import { CirclePlay } from "lucide-react";
import { Container, PillLink } from "@/components/shared";

function HandwrittenNote({ className }: { className?: string }) {
  return (
    <div className={className}>
      <p className="-rotate-[9deg] font-script text-[19px] leading-[1.45] whitespace-nowrap text-navy-dark sm:text-[26px] xl:text-[33px]">
        <span className="block">Businesses Grow.</span>
        <span className="block pl-[0.3em]">People Get Opportunities.</span>
        <span className="block pl-[0.5em]">Missions Get Support.</span>
      </p>
      <svg
        aria-hidden
        viewBox="0 0 240 40"
        className="-mt-1 ml-[0.4em] w-[62%] -rotate-[9deg] text-brand-red"
        fill="none"
      >
        <path
          d="M4 34 C 60 22, 140 10, 236 4"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#f5f9fc_0%,#ffffff_100%)]"
    >
      {/* Desktop: image bleeds to the right edge and fades into the white left side */}
      <div className="absolute inset-y-0 right-0 hidden w-[64%] lg:block">
        <Image
          src="/images/hero.webp"
          alt="Backpacker on a mountain ridge overlooking a city at sunrise"
          fill
          preload
          sizes="64vw"
          className="object-cover object-[center_40%] [mask-image:linear-gradient(to_right,transparent_0%,black_20%)]"
        />
        <HandwrittenNote className="absolute top-[12%] left-[13%] w-[46%]" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-[600px] pt-8 pb-10 sm:pt-12 lg:min-h-[524px] lg:pt-8 lg:pb-20 xl:pl-5">
          <h1
            id="hero-heading"
            className="font-heading text-[2.75rem] leading-[1.03] font-extrabold tracking-[-0.025em] sm:text-[3.75rem] xl:text-[4.5rem]"
          >
            <span className="block text-navy">Accelerate</span>{" "}
            <span className="block text-navy">Growth.</span>{" "}
            <span className="block text-brand-red">Extend Impact.</span>
          </h1>
          <p className="mt-4 text-lg font-bold tracking-[-0.015em] text-navy-dark sm:text-[1.375rem] xl:text-[1.65rem]">
            Technology. People. Creativity. Purpose.
          </p>
          <p className="mt-3 max-w-[520px] text-base leading-[1.5] text-ink/90 sm:text-lg xl:text-[1.25rem]">
            We help organizations grow, operate efficiently and create lasting
            impact — globally.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <PillLink href="#solutions" className="sm:min-w-[298px]">
              Explore Our Solutions
            </PillLink>
            {/* No video source provided yet — wire this button to the video player/modal. */}
            <button
              type="button"
              className="inline-flex h-[54px] cursor-pointer items-center gap-2.5 rounded-full border-2 border-navy/60 bg-white/70 px-9 text-base font-semibold text-navy transition-all duration-200 hover:-translate-y-0.5 hover:border-navy hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy sm:min-w-[214px]"
            >
              <CirclePlay aria-hidden className="size-5" strokeWidth={2.2} />
              Watch Video
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile / tablet: image sits below the copy */}
      <div className="relative aspect-[16/11] w-full sm:aspect-[16/9] lg:hidden">
        <Image
          src="/images/hero.webp"
          alt="Backpacker on a mountain ridge overlooking a city at sunrise"
          fill
          sizes="100vw"
          className="object-cover object-[center_40%]"
        />
        <HandwrittenNote className="absolute top-[12%] left-[5%] w-[56%] sm:w-[48%]" />
      </div>
    </section>
  );
}
