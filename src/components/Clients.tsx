"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Container, SectionTitle } from "@/components/shared";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ClientCategory {
  label: string;
  image: string;
  imageAlt: string;
}

const CLIENTS: ClientCategory[] = [
  { label: "Ministries", image: "/images/client-churches.webp", imageAlt: "Cross silhouetted against a sunset" },
  { label: "Education", image: "/images/client-education.webp", imageAlt: "Students learning together in a classroom" },
  { label: "Healthcare", image: "/images/client-healthcare.webp", imageAlt: "Doctor in a white coat with a stethoscope" },
  { label: "Businesses & Corporates", image: "/images/client-business.webp", imageAlt: "Business team meeting around a table" },
  { label: "Non-Profits", image: "/images/client-nonprofit.webp", imageAlt: "Hands joined together in unity" },
  { label: "Global Clients", image: "/images/client-global.webp", imageAlt: "City skyline reflected on water" },
];

const arrowClass =
  "static inset-auto my-0 size-12 translate-none lg:size-[54px] rounded-full border-2 border-navy/80 bg-white text-navy shadow-none transition-all hover:bg-navy hover:text-white disabled:border-slate-100 disabled:bg-slate-100 disabled:text-navy/70 disabled:opacity-100 [&_svg:not([class*='size-'])]:size-6";

const AUTOPLAY_INTERVAL = 5000;

export default function Clients() {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [isInteracting, setIsInteracting] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);

  const handleSetApi = useCallback((api: CarouselApi) => {
    setCarouselApi(api);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReducedMotion(mediaQuery.matches);
    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);
    return () => mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    if (!carouselApi || reducedMotion || isInteracting) return;

    const interval = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        carouselApi.scrollNext();
      }
    }, AUTOPLAY_INTERVAL);

    return () => window.clearInterval(interval);
  }, [carouselApi, isInteracting, reducedMotion]);

  return (
    <section id="clients" aria-labelledby="clients-heading" className="scroll-mt-24 pt-6 pb-10 lg:pt-1 lg:pb-6">
      <Container>
        <Carousel
          setApi={handleSetApi}
          opts={{ align: "start", loop: true }}
          aria-label="Client industries"
          onMouseEnter={() => setIsInteracting(true)}
          onMouseLeave={() => setIsInteracting(false)}
          onFocusCapture={() => setIsInteracting(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
              setIsInteracting(false);
            }
          }}
        >
          <div className="flex flex-wrap items-end justify-between gap-4 sm:gap-6">
            <SectionTitle
              id="clients-heading"
              eyebrow="Our Clients"
              title="Trusted by organizations across industries."
            />
            <div className="flex shrink-0 gap-3 pb-1">
              <CarouselPrevious className={arrowClass} />
              <CarouselNext className={arrowClass} />
            </div>
          </div>

          <CarouselContent className="mt-5 -ml-3">
            {CLIENTS.map(({ label, image, imageAlt }) => (
              <CarouselItem key={label} className="basis-[82%] pl-3 sm:basis-1/2 lg:basis-1/5">
                <figure className="group relative aspect-[41/30] overflow-hidden rounded-lg bg-navy-dark shadow-[0_8px_20px_-12px_rgb(7_59_120/0.5)]">
                  <div className="absolute inset-x-0 top-0 h-[80%]">
                    <Image
                      src={image}
                      alt={imageAlt}
                      fill
                      sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 82vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,transparent_42%,rgb(6_47_99/0.92)_76%,#062f63_100%)]" />
                  <figcaption className="absolute inset-x-0 bottom-0 px-3 pb-2.5 text-[13px] font-semibold text-white sm:text-[15px]">
                    {label}
                  </figcaption>
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </Container>
    </section>
  );
}
