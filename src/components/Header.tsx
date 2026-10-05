"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container, NAV_ITEMS } from "@/components/shared";
import { ContactTrigger } from "@/components/ContactPopup";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="#home" aria-label="100 CP — home" className={cn("inline-block", className)}>
      <Image
        src="/brand/logo.svg"
        alt="100 CP — 100% Acceleration"
        width={235}
        height={110}
        className="h-full w-auto"
        preload
      />
    </Link>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 bg-white transition-shadow duration-300",
        scrolled && "shadow-[0_4px_20px_-8px_rgb(7_59_120/0.18)]"
      )}
    >
      <Container className="flex h-[72px] items-center justify-between gap-6 lg:h-[104px]">
        <Logo className="h-[54px] lg:h-[84px]" />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-12">
            {NAV_ITEMS.map((item, i) => (
              <li key={item.label}>
                {item.href === "#contact" ? (
                  <ContactTrigger
                    className="relative py-2 text-[17px] font-medium text-ink transition-colors hover:text-navy after:absolute after:inset-x-0 after:-bottom-1.5 after:mx-auto after:h-[3px] after:w-0 after:rounded-full after:bg-brand-red after:transition-all after:duration-200 hover:after:w-full"
                  >
                    {item.label}
                  </ContactTrigger>
                ) : (
                  <Link
                    href={item.href}
                    aria-current={i === 0 ? "page" : undefined}
                    className={cn(
                      "relative py-2 text-[17px] font-medium text-ink transition-colors hover:text-navy",
                      "after:absolute after:inset-x-0 after:-bottom-1.5 after:mx-auto after:h-[3px] after:rounded-full after:bg-brand-red after:transition-all after:duration-200",
                      i === 0 ? "text-navy after:w-full" : "after:w-0 hover:after:w-full"
                    )}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <ContactTrigger
          className="group hidden h-12 items-center gap-2 rounded-full bg-brand-red px-8 text-[15px] font-semibold text-white shadow-[0_6px_16px_-6px_rgb(229_35_47/0.6)] transition-all hover:-translate-y-0.5 hover:bg-brand-red-bright lg:inline-flex"
          showArrow
        >
          Let&apos;s Connect
        </ContactTrigger>

        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger
            className="inline-flex size-11 items-center justify-center rounded-full text-navy transition-colors hover:bg-sky lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="size-6" />
          </SheetTrigger>
          <SheetContent side="right" className="w-[82%] gap-0 bg-white p-0 sm:max-w-xs">
            <div className="flex h-[72px] items-center border-b border-slate-100 px-5">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <Logo className="h-[48px]" />
            </div>
            <nav aria-label="Mobile" className="flex flex-col p-3">
              {NAV_ITEMS.map((item, i) => (
                item.href === "#contact" ? (
                  <ContactTrigger
                    key={item.label}
                    onClick={() => setMenuOpen(false)}
                    outsideDialog
                    className="rounded-lg border-l-[3px] border-transparent px-4 py-3 text-left text-base font-semibold text-ink transition-colors hover:bg-sky"
                  >
                    {item.label}
                  </ContactTrigger>
                ) : (
                  <SheetClose
                    key={item.label}
                    nativeButton={false}
                    render={
                      <Link
                        href={item.href}
                        aria-current={i === 0 ? "page" : undefined}
                        className={cn(
                          "rounded-lg border-l-[3px] px-4 py-3 text-base font-semibold transition-colors hover:bg-sky",
                          i === 0
                            ? "border-brand-red bg-sky text-navy"
                            : "border-transparent text-ink"
                        )}
                      />
                    }
                  >
                    {item.label}
                  </SheetClose>
                )
              ))}
            </nav>
            <div className="mt-auto p-5">
              <ContactTrigger
                onClick={() => setMenuOpen(false)}
                outsideDialog
                className="group flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-red text-sm font-semibold text-white"
                showArrow
              >
                Let&apos;s Connect
              </ContactTrigger>
            </div>
          </SheetContent>
        </Sheet>
      </Container>
    </header>
  );
}
