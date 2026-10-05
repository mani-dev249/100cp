import { Container } from "@/components/shared";

const ADDRESS =
  "100CP PTE. LTD., 60 Paya Lebar Road, #06-28, Paya Lebar Square, Singapore 409051";
const MAP_QUERY = encodeURIComponent(ADDRESS);

export default function LocationMap() {
  return (
    <section
      aria-label="Map to 100CP PTE. LTD."
      className="border-y border-slate-100 bg-surface py-10 sm:py-14"
    >
      <Container>
        <div className="min-h-[280px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_8px_24px_-14px_rgb(7_59_120/0.3)] sm:min-h-[360px]">
          <iframe
            title="Map showing 100CP PTE. LTD. at Paya Lebar Square, Singapore"
            src={`https://maps.google.com/maps?q=${MAP_QUERY}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="h-full min-h-[280px] w-full border-0 sm:min-h-[360px]"
          />
        </div>
      </Container>
    </section>
  );
}
