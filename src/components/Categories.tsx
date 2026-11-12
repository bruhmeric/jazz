"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { categories, type CategorySlug } from "@/lib/products";
import { SectionHeading } from "@/components/shared";

export const FILTER_EVENT = "jaz:filter";

export function gotoCategory(slug: CategorySlug) {
  window.dispatchEvent(new CustomEvent<CategorySlug | "all">(FILTER_EVENT, { detail: slug }));
}

export default function Categories() {
  return (
    <section id="collections" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-16 sm:px-6 sm:py-24">
      <SectionHeading
        eyebrow="The collections"
        title="One workshop, every room in the house"
        description="Sofas, beds, wardrobes, kids' rooms and office pieces — every collection is sized to order and finished by hand in Matale."
      />

      <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-4">
        {categories.map((cat, i) => (
          <motion.a
            key={cat.slug}
            href="#store"
            aria-label={`Shop ${cat.name} — ${cat.count} pieces`}
            onClick={() => gotoCategory(cat.slug)}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-48px" }}
            transition={{ duration: 0.6, delay: (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="group relative block aspect-[3/4.2] overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/15"
          >
            {/* image */}
            <div className="absolute inset-0">
              <Image
                src={cat.image}
                alt={`${cat.name} collection`}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="img-zoom object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-jaz-ink/85 via-jaz-ink/25 to-transparent transition-opacity duration-500 group-hover:from-jaz-red-deep/90"
                aria-hidden="true"
              />
            </div>

            {/* content */}
            <div className="relative flex h-full flex-col justify-end p-4 sm:p-5">
              <span className="mb-2 inline-flex w-fit items-center rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-semibold tracking-wide text-primary-foreground">
                {cat.count} pieces
              </span>
              <h3 className="font-display text-lg font-semibold leading-snug text-white sm:text-xl">
                {cat.name}
              </h3>
              <p className="mt-1 hidden text-xs text-white/75 sm:block">{cat.tagline}</p>

              <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold tracking-wide text-white/90 transition-colors group-hover:text-white">
                Shop {cat.name.split(" ")[0].replace("&", "").trim().toLowerCase()}
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
