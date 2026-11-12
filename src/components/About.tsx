"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { HeartHandshake, MapPin, Truck } from "lucide-react";
import { Reveal } from "@/components/shared";

export default function About() {
  const reduced = useReducedMotion();
  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ["start end", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["-8%", "8%"]);

  return (
    <section id="about" className="relative overflow-hidden bg-secondary/40 py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        {/* image collage with parallax */}
        <div ref={imgRef} className="relative order-2 lg:order-1">
          <div className="relative aspect-[4/4.6] overflow-hidden rounded-3xl shadow-2xl shadow-primary/15">
            <motion.div style={{ y: parallaxY }} className="absolute -inset-y-10 inset-x-0">
              <Image
                src="/assets/sofa-3.jpg"
                alt="JAZZEL premium living room furniture setting"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>
          </div>

          {/* floating mini card */}
          <Reveal delay={0.2}>
            <div className="absolute -bottom-6 -right-3 flex items-center gap-3.5 rounded-2xl border border-border/50 bg-card/95 px-5 py-4 shadow-xl backdrop-blur-md sm:-right-6">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-clay/15 text-clay">
                <HeartHandshake className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-display text-lg font-bold leading-none text-foreground">10+</p>
                <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  Years of craft
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* copy */}
        <div className="order-1 lg:order-2">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
              <span className="h-px w-8 bg-primary/60" aria-hidden="true" />
              Our Story
              <span className="h-px w-8 bg-primary/60" aria-hidden="true" />
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-balance sm:text-4xl">
              From a Matale workshop into homes across the island
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              JAZZEL Furnitures began with a simple belief — your home should be a reflection of
              your unique style and personality. What started as a small workshop on Samandawa
              Road, Aluviharaya, has grown into a curated destination for high-quality furniture
              and home decor, trusted by families and offices islandwide.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              We blend premium materials, ergonomic design and sustainable practice — then back
              it all with honest service: custom sizing, fabric personalization, and delivery to
              every corner of Sri Lanka.
            </p>
          </Reveal>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Reveal delay={0.3}>
              <div className="flex items-start gap-3.5 rounded-2xl border border-border/50 bg-card p-5 shadow-sm">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-clay" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold">Visit our showroom</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    Samandawa Road, Aluviharaya, Matale — open 7 days.
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.38}>
              <div className="flex items-start gap-3.5 rounded-2xl border border-border/50 bg-card p-5 shadow-sm">
                <Truck className="mt-0.5 h-5 w-5 shrink-0 text-clay" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold">Islandwide delivery</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    Colombo to Jaffna — tracked &amp; insured transport.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
