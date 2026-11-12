"use client";

import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Asterisk, ChevronDown, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Marquee from "@/components/Marquee";

const ribbon = [
  "Sofas", "Beds", "Wardrobes", "TV & media", "Dressing tables",
  "Kids' world", "Office & study", "Dining", "Made to order in Matale",
];

export default function Hero() {
  const reduced = useReducedMotion();

  /* ---- the pointer breathes life into the photograph ---- */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 55, damping: 16 });
  const sy = useSpring(my, { stiffness: 55, damping: 16 });

  const imgX = useTransform(sx, (v) => (reduced ? 0 : v * 20));
  const imgY = useTransform(sy, (v) => (reduced ? 0 : v * 12));
  const rotX = useTransform(sy, (v) => (reduced ? 0 : v * -3.5));
  const rotY = useTransform(sx, (v) => (reduced ? 0 : v * 3.5));
  const badgeX = useTransform(sx, (v) => (reduced ? 0 : -v * 26));
  const badgeY = useTransform(sy, (v) => (reduced ? 0 : -v * 18));

  function onMove(e: React.MouseEvent<HTMLElement>) {
    if (reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  const rise = (delay: number, y = 26) => ({
    initial: { opacity: 0, y: reduced ? 0 : y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  const lines = ["Home and office", "furniture"];

  return (
    <section id="top" className="relative overflow-hidden pt-16 sm:pt-[72px]">
      <div className="mx-auto flex min-h-[calc(100svh-4rem)] max-w-7xl flex-col px-4 pb-10 sm:min-h-[calc(100svh-4.5rem)] sm:px-6 sm:pb-14">
        {/* ===== head row: the name left, the lead and buttons right ===== */}
        <div className="grid flex-none gap-8 pt-10 sm:pt-14 lg:grid-cols-12 lg:gap-6 lg:pt-16">
          <div className="lg:col-span-7">
            <motion.p {...rise(0.05, 14)} className="text-sm font-medium text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                Samandawa Road, Matale, Sri Lanka
              </span>
            </motion.p>
            <h1 className="mt-3 font-display text-[clamp(2.5rem,6.2vw,4.5rem)] font-semibold leading-[1.03] tracking-[-0.02em] text-balance">
              {lines.map((t, i) => (
                <span key={t} className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
                  <motion.span
                    className="block"
                    initial={reduced ? {} : { y: "112%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.95, delay: 0.12 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {t}
                  </motion.span>
                </span>
              ))}
            </h1>
          </div>

          <div className="flex flex-col justify-end lg:col-span-5 lg:pb-2">
            <motion.p {...rise(0.3)} className="max-w-md text-[15px] leading-relaxed text-muted-foreground sm:text-base">
              Sofas, beds, wardrobes and kids&rsquo; rooms in melamine, MDF and steel — built
              to your sizes and delivered islandwide.
            </motion.p>
            <motion.div {...rise(0.45)} className="mt-6 flex flex-wrap items-center gap-3">
              <Button
                asChild
                size="lg"
                className="group h-12 rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 hover:bg-jaz-red-deep"
              >
                <a href="#store">
                  Shop the store
                  <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-jaz-red/30 bg-background px-7 text-sm font-semibold text-primary hover:bg-accent"
              >
                <a href="#visit">See the showroom</a>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* ===== the photograph: your image, creatively edited ===== */}
        <div
          className="relative mt-8 flex flex-1 flex-col sm:mt-10"
          style={{ perspective: 1400 }}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
        >
          {/* the curtain draws back… */}
          <motion.div
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 1.15, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 min-h-[340px] w-full flex-1 overflow-hidden rounded-[2rem] bg-jaz-paper shadow-2xl shadow-jaz-ink/10 sm:min-h-[400px] lg:min-h-[420px]"
          >
            {/* …the print floats on the pointer and tilts a little */}
            <motion.div style={{ x: imgX, y: imgY, rotateX: rotX, rotateY: rotY, scale: 1.09 }} className="absolute inset-0">
              {/* …and it never sits still — a slow breath of zoom */}
              <motion.div
                className="absolute inset-0"
                animate={reduced ? {} : { scale: [1, 1.028, 1] }}
                transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src="/brand/hero-edit.jpg"
                  alt="A three-piece button-tufted sofa suite in the JAZZEL showroom"
                  fill
                  priority
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  className="object-cover"
                />
              </motion.div>
            </motion.div>

            {/* …while the red duotone of the same print develops away into full colour */}
            <motion.div
              aria-hidden="true"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ delay: 0.8, duration: 1.9, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image
                src="/brand/hero-duotone.jpg"
                alt=""
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover"
              />
            </motion.div>

            {/* the plate caption, like a print in a catalogue */}
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-4 left-4 z-10 rounded-full border border-white/40 bg-white/85 px-4 py-1.5 text-[11px] font-medium tracking-wide text-foreground/80 backdrop-blur"
            >
              No. 01 — The button-tufted showroom suite
            </motion.span>

            {/* the scroll cue */}
            <motion.a
              href="#collections"
              aria-label="Scroll to the collections"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.7, duration: 0.6 }}
              className="absolute bottom-4 right-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-background/90 text-primary shadow-lg backdrop-blur transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <ChevronDown className="jaz-bob h-5 w-5" aria-hidden="true" />
            </motion.a>
          </motion.div>

          {/* the rotating showroom badge, floating above the print's corner */}
          <motion.div style={{ x: badgeX, y: badgeY }} className="absolute -top-7 right-4 z-20 sm:-top-9 sm:right-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.3, duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative grid h-20 w-20 place-items-center rounded-full border border-jaz-red/25 bg-background/95 shadow-xl backdrop-blur sm:h-28 sm:w-28"
            >
              <svg viewBox="0 0 100 100" className="jaz-spin absolute inset-0 h-full w-full" aria-hidden="true">
                <defs>
                  <path id="jaz-badge-arc" d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" />
                </defs>
                <text fontSize="7.2" letterSpacing="1.6" className="fill-primary/70">
                  <textPath href="#jaz-badge-arc" textLength="225" lengthAdjust="spacingAndGlyphs">
                    JAZZEL FURNITURES · MATALE · SRI LANKA ·
                  </textPath>
                </text>
              </svg>
              <Asterisk className="h-6 w-6 text-primary sm:h-7 sm:w-7" aria-hidden="true" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ===== the ribbon ===== */}
      <Marquee items={ribbon} />
    </section>
  );
}
