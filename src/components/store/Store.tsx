"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SearchX } from "lucide-react";
import { SectionHeading } from "@/components/shared";
import ProductCard from "@/components/store/ProductCard";
import { categories, products, type CategorySlug } from "@/lib/products";
import { FILTER_EVENT } from "@/components/Categories";

type Filter = "all" | CategorySlug;

type Pill = { slug: Filter; name: string; count?: number };

export default function Store() {
  const [filter, setFilter] = useState<Filter>("all");

  // collection cards above set the store's filter
  useEffect(() => {
    const onFilter = (e: Event) => setFilter((e as CustomEvent<Filter>).detail ?? "all");
    window.addEventListener(FILTER_EVENT, onFilter);
    return () => window.removeEventListener(FILTER_EVENT, onFilter);
  }, []);

  const visible = useMemo(
    () => (filter === "all" ? products : products.filter((p) => p.category === filter)),
    [filter]
  );

  const pills: Pill[] = [
    { slug: "all", name: "All pieces" },
    ...categories.map((c) => ({ slug: c.slug as Filter, name: c.short, count: c.count })),
  ];

  return (
    <section id="store" className="relative scroll-mt-24 overflow-hidden bg-jaz-cream py-16 sm:py-24">
      {/* a drift of red dots behind the pieces */}
      <div aria-hidden="true" className="jaz-dotgrid-cream absolute inset-0 z-0" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="The store"
          title="Shop the collection"
          description="Every piece is built to order, quality-checked and delivered islandwide. Add pieces to the cart — then order by phone or WhatsApp."
        />

        {/* filter pills — the active pill slides to the clicked chip */}
        <div
          className="mt-10 flex flex-wrap items-center justify-center gap-2"
          role="tablist"
          aria-label="Product category filter"
        >
          {pills.map((c) => {
            const active = filter === c.slug;
            return (
              <button
                key={c.slug}
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(c.slug)}
                className={`relative rounded-full px-4 py-2 text-xs font-semibold transition-colors duration-300 sm:px-5 sm:text-sm ${
                  active ? "text-primary-foreground" : "bg-white text-foreground/70 hover:text-primary"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="store-filter-pill"
                    className="absolute inset-0 rounded-full bg-primary shadow-md shadow-primary/25"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">
                  {c.name}
                  {typeof c.count === "number" && (
                    <sup className={`ml-1.5 text-[10px] font-normal ${active ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                      {c.count}
                    </sup>
                  )}
                </span>
              </button>
            );
          })}
        </div>

        {/* grid — cards swap with the filter click, never with the scroll */}
        <div className="mt-10 min-h-[300px]">
          <AnimatePresence mode="popLayout">
            {visible.length > 0 ? (
              <motion.div layout className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
                {visible.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid place-items-center gap-3 py-20 text-muted-foreground"
              >
                <SearchX className="h-10 w-10" aria-hidden="true" />
                <p className="text-sm">No pieces in this collection yet.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="mx-auto mt-8 max-w-xl text-center text-xs leading-relaxed text-muted-foreground">
          Prices in Sri Lankan Rupees, including VAT. Islandwide delivery is arranged at
          checkout — free within Matale district on orders above Rs 100,000.
        </p>
      </div>
    </section>
  );
}
