"use client";

import { Layers, Ruler, Armchair, Maximize, Wrench, Leaf } from "lucide-react";
import { SectionHeading } from "@/components/shared";

const features = [
  {
    icon: Layers,
    title: "Premium materials",
    text: "Kiln-dried teak, melamine and MDF boards, steel frames and upholstery chosen to last in island weather.",
  },
  {
    icon: Ruler,
    title: "Customizable designs",
    text: "Any piece is sized to your room — change the width, finish, fabric or configuration before it is built.",
  },
  {
    icon: Armchair,
    title: "Ergonomic comfort",
    text: "Seat heights, depths and back angles chosen for long evenings, not just for the photograph.",
  },
  {
    icon: Maximize,
    title: "Space-saving designs",
    text: "Sliding wardrobes, wall-hung units and beds with storage for Colombo apartments and village homes alike.",
  },
  {
    icon: Wrench,
    title: "Easy assembly",
    text: "Flat-packed with clear instructions and the tools included — or our islandwide team assembles it for you.",
  },
  {
    icon: Leaf,
    title: "Sustainable practices",
    text: "Plantation-grown timber and board offcuts recycled through the workshop, nothing wasted to landfill.",
  },
];

export default function Features() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
      <SectionHeading
        eyebrow="Why JAZZEL"
        title="Built to your sizes, not to a catalogue"
        description="Every piece from the Matale workshop is made to order — the material, the finish and the fit are yours to choose."
      />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
        {features.map((f) => (
          <article
            key={f.title}
            className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/10 sm:p-7"
          >
            <span className="grid h-11 w-11 place-items-center rounded-full bg-accent text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
              <f.icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <h3 className="mt-5 font-display text-lg font-semibold leading-snug">{f.title}</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
