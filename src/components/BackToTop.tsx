"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

// Distance scrolled (px) before the button appears.
const SHOW_AFTER = 400;

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={cn(
        "fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 inline-flex size-12 items-center justify-center rounded-full bg-brand-red text-white shadow-[0_6px_16px_-6px_rgb(229_35_47/0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-red-bright hover:shadow-[0_10px_22px_-8px_rgb(229_35_47/0.7)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red sm:right-6 sm:bottom-6 lg:size-14",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      )}
    >
      <ArrowUp aria-hidden className="size-5 lg:size-6" strokeWidth={2.5} />
    </button>
  );
}
