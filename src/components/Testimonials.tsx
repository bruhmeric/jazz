"use client";

import { Star, Quote, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/shared";

const testimonials = [
  {
    name: "Dilini & Kasun",
    place: "Kandy",
    text: "The Velvet Cloud sectional transformed our living room. Delivery to Kandy was seamless and the fabric quality is beyond what we expected at this price.",
    piece: "Velvet Cloud Sectional",
  },
  {
    name: "Roshan Perera",
    place: "Colombo",
    text: "Ordered the Solid Teak King Bed — the grain is stunning and it feels like it will outlive us. JAZZEL's team kept us updated at every step.",
    piece: "Solid Teak King Bed",
  },
  {
    name: "Fathima Rizwan",
    place: "Matale",
    text: "Bought the full kids' bedroom set for my daughter. Rounded corners, safe finishes, and she absolutely loves the play nook. Highly recommended!",
    piece: "Rainbow Kids Bedroom Set",
  },
  {
    name: "The Fernandos",
    place: "Negombo",
    text: "Custom wardrobe made to our awkward attic measurements — fitted like a glove. The sliding doors glide like silk even after a year.",
    piece: "Space-Saver Sliding Wardrobe",
  },
  {
    name: "Saman Rajapaksa",
    place: "Kurunegala",
    text: "My home office went from cluttered to calm with the Studio Workstation. Assembly team was polite, fast and left everything spotless.",
    piece: "Studio Workstation Set",
  },
  {
    name: "Amara Silva",
    place: "Galle",
    text: "The Harvest dining set hosted 12 relatives on New Year's Day without a squeak. The breadboard ends are real craftsmanship.",
    piece: "Harvest 6-Seater Dining",
  },
];

export default function Testimonials() {
  const row = [...testimonials, ...testimonials];

  return (
    <section id="reviews" className="relative overflow-hidden py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Loved Islandwide"
          title="Homes that speak for us"
          description="Real reviews from real living rooms across Sri Lanka."
        />
      </div>

      <div className="marquee-paused relative mt-12">
        <div className="marquee-track-reverse flex w-max gap-5 pb-2 pr-5">
          {row.map((t, i) => (
            <figure
              key={i}
              className="w-[300px] shrink-0 rounded-2xl border border-border/50 bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg hover:shadow-primary/10 sm:w-[340px]"
            >
              <Quote className="h-5 w-5 text-clay" aria-hidden="true" />
              <blockquote className="mt-3 text-sm leading-relaxed text-foreground/85">
                {t.text}
              </blockquote>
              <figcaption className="mt-4 flex items-center justify-between border-t border-border/50 pt-4">
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" aria-hidden="true" />
                    {t.place}
                  </p>
                </div>
                <span className="flex items-center gap-0.5" aria-label="5 star review">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-3.5 w-3.5 fill-amber-500 text-amber-500" aria-hidden="true" />
                  ))}
                </span>
              </figcaption>
              <p className="mt-2 text-[11px] font-medium uppercase tracking-wider text-primary/80">
                {t.piece}
              </p>
            </figure>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" aria-hidden="true" />
      </div>
    </section>
  );
}
