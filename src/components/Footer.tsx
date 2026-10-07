import Link from "next/link";
import { Mail } from "lucide-react";
import { Container, NAV_ITEMS } from "@/components/shared";
import { Logo } from "@/components/Header";
import { ContactTrigger } from "@/components/ContactPopup";

interface Social {
  label: string;
  href: string;
  path: string;
}

// Brand glyphs (lucide-react no longer ships brand icons).
const SOCIALS: Social[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    path: "M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3A1.97 1.97 0 1 0 5.25 7a1.97 1.97 0 0 0 0-3.94ZM20.44 13.4c0-3.1-1.65-4.55-3.86-4.55-1.78 0-2.58.98-3.02 1.67V8.5h-3.38c.04.95 0 11.5 0 11.5h3.38v-6.42c0-.34.02-.69.13-.93.27-.69.9-1.4 1.95-1.4 1.38 0 1.93 1.05 1.93 2.6V20h3.37v-6.6Z",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/",
    path: "M21.58 7.19a2.5 2.5 0 0 0-1.76-1.77C18.26 5 12 5 12 5s-6.26 0-7.82.42A2.5 2.5 0 0 0 2.42 7.2 26.3 26.3 0 0 0 2 12a26.3 26.3 0 0 0 .42 4.81 2.5 2.5 0 0 0 1.76 1.77C5.74 19 12 19 12 19s6.26 0 7.82-.42a2.5 2.5 0 0 0 1.76-1.77A26.3 26.3 0 0 0 22 12a26.3 26.3 0 0 0-.42-4.81ZM10 15V9l5.2 3L10 15Z",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    path: "M12 7.38A4.62 4.62 0 1 0 12 16.62 4.62 4.62 0 0 0 12 7.38Zm0 7.62a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm4.8-8.88a1.08 1.08 0 1 0 0 2.16 1.08 1.08 0 0 0 0-2.16ZM20.95 8.1a5.33 5.33 0 0 0-1.46-3.6A5.36 5.36 0 0 0 15.9 3.05C14.48 2.97 9.52 2.97 8.1 3.05a5.35 5.35 0 0 0-3.6 1.45A5.34 5.34 0 0 0 3.05 8.1c-.08 1.42-.08 6.38 0 7.8a5.33 5.33 0 0 0 1.45 3.6 5.37 5.37 0 0 0 3.6 1.45c1.42.08 6.38.08 7.8 0a5.33 5.33 0 0 0 3.6-1.45 5.36 5.36 0 0 0 1.45-3.6c.08-1.42.08-6.37 0-7.8Zm-1.86 9.33a3.03 3.03 0 0 1-1.7 1.7c-1.18.47-3.98.36-5.29.36s-4.11.1-5.28-.36a3.03 3.03 0 0 1-1.71-1.7c-.47-1.18-.36-3.98-.36-5.29s-.1-4.11.36-5.28a3.03 3.03 0 0 1 1.7-1.71c1.18-.47 3.98-.36 5.29-.36s4.11-.1 5.28.36a3.03 3.03 0 0 1 1.71 1.7c.47 1.18.36 3.98.36 5.29s.11 4.11-.36 5.28Z",
  },
];

export default function Footer() {
  return (
    <footer className="bg-white">
      <Container>
        <div className="flex flex-col items-center gap-6 pt-7 pb-4 md:flex-row md:justify-between md:gap-8">
          <div className="flex flex-col items-center gap-3 md:shrink-0 md:items-start">
            <Logo className="h-[60px] lg:h-[72px]" />
            <address className="text-center text-[14px] leading-relaxed whitespace-nowrap text-ink/75 not-italic md:text-left">
              <span className="block font-semibold text-navy-dark">100CP PTE. LTD.</span>
              60 Paya Lebar Road, #06-28
              <br />
              Paya Lebar Square, Singapore 409051
              <br />
              <a
                href="mailto:info@100cp.org"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-brand-red"
              >
                <Mail className="size-4 shrink-0" aria-hidden="true" />
                info@100cp.org
              </a>
            </address>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2 lg:gap-x-11">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  {item.href === "#contact" ? (
                    <ContactTrigger className="text-base font-medium text-ink transition-colors hover:text-brand-red">
                      {item.label}
                    </ContactTrigger>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-base font-medium text-ink transition-colors hover:text-brand-red"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <ul className="flex gap-3.5">
            {SOCIALS.map(({ label, href, path }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`100 CP on ${label}`}
                  className="inline-flex size-[42px] items-center justify-center rounded-full bg-navy text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-red"
                >
                  <svg aria-hidden viewBox="0 0 24 24" className="size-[19px]" fill="currentColor">
                    <path d={path} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-center gap-1 border-t border-slate-100 py-4 text-[13px] text-ink/55 sm:flex-row sm:justify-between">
          <p>© 2026 Hundred CP. All rights reserved.</p>
          <p>Singapore | India | Worldwide</p>
        </div>
      </Container>
    </footer>
  );
}
