"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Hand, RotateCcw, SwatchBook } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import SofaConfigurator, { fabrics } from "@/components/three/SofaConfigurator";
import { Reveal } from "@/components/shared";
import { BRAND } from "@/lib/products";

export default function Customize() {
  const [activeColor, setActiveColor] = useState(fabrics[0].color);
  const reduced = useReducedMotion();

  const pick = (color: number, name: string) => {
    setActiveColor(color);
    toast.info(`Fabric: ${name}`, {
      description: "Ask us about custom sizes at checkout.",
    });
  };

  return (
    <section id="customize" className="relative overflow-hidden bg-espresso py-20 text-cream sm:py-28">
      {/* subtle radial glow */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(179,112,63,0.28),transparent_60%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        {/* copy */}
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-clay/40 bg-clay/15 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-clay">
              <SwatchBook className="h-3.5 w-3.5" aria-hidden="true" />
              Custom-Made Designs
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-cream sm:text-4xl md:text-[2.7rem]">
              See it. Spin it.
              <br />
              <span className="text-clay">Make it yours.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-5 max-w-md text-base leading-relaxed text-cream/75">
              This is our Milano sofa — live in 3D. Drag to look around, tap a fabric to
              reupholster instantly. At JAZZEL, every design can be resized, refinished and
              rebuilt around your room.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/60">
                Choose your fabric
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                {fabrics.map((f) => (
                  <button
                    key={f.name}
                    onClick={() => pick(f.color, f.name)}
                    aria-label={`Fabric ${f.name}`}
                    aria-pressed={activeColor === f.color}
                    className={`group flex items-center gap-2.5 rounded-full border px-3.5 py-2 text-xs font-medium transition-all duration-300 ${
                      activeColor === f.color
                        ? "border-clay bg-cream/95 text-espresso shadow-lg shadow-clay/20"
                        : "border-cream/25 bg-cream/5 text-cream/80 hover:border-cream/50 hover:bg-cream/10"
                    }`}
                  >
                    <span
                      className="h-5 w-5 rounded-full border border-white/25 shadow-inner"
                      style={{ backgroundColor: f.swatch }}
                      aria-hidden="true"
                    />
                    {f.name}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <ul className="mt-8 space-y-2.5 text-sm text-cream/70">
              {[
                "Made-to-measure sizing for any room",
                "Hundreds of fabrics & wood finishes in showroom",
                "Free design consultation on WhatsApp",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-clay" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.5}>
            <Button asChild className="mt-9 h-12 rounded-full bg-clay px-7 text-sm font-semibold text-espresso shadow-xl shadow-clay/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-cream">
              <a
                href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(
                  "Hi JAZZEL! I'd like a custom furniture design consultation."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Start a Custom Order
              </a>
            </Button>
          </Reveal>
        </div>

        {/* 3D configurator */}
        <motion.div
          initial={{ opacity: 0, scale: reduced ? 1 : 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="relative aspect-[4/3.2] w-full overflow-hidden rounded-3xl border border-cream/15 bg-gradient-to-br from-[#2c231b] via-[#3a2e24] to-[#241d16] shadow-2xl">
            <SofaConfigurator className="absolute inset-0" activeColor={activeColor} onPickColor={setActiveColor} />

            {/* drag hint */}
            <motion.div
              animate={reduced ? {} : { opacity: [0.55, 1, 0.55] }}
              transition={{ duration: 2.6, repeat: Infinity }}
              className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 rounded-full bg-espresso/60 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-cream/90 backdrop-blur-md"
            >
              <Hand className="h-3.5 w-3.5 text-clay" aria-hidden="true" />
              Drag to rotate
            </motion.div>

            <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] font-medium text-cream/60">
              <span className="flex items-center gap-1.5">
                <RotateCcw className="h-3 w-3" aria-hidden="true" />
                Auto-rotates when idle
              </span>
              <span>Milano Sofa · 3D</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
