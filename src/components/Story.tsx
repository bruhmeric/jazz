"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform, useMotionValueEvent, type MotionValue } from "framer-motion";

const chapters = [
  {
    n: "01",
    title: "Choose your pieces",
    lines: "Browse the store, or sit on the sofas at the Matale showroom — open every drawer, compare the fabrics and finishes.",
    img: "/assets/story-showroom.jpg",
    alt: "A tufted sofa displayed against a gallery wall in the showroom",
  },
  {
    n: "02",
    title: "Built to your sizes",
    lines: "Your order goes straight to the workshop: boards cut to your measurements, edges banded, three coats sanded and brushed by hand.",
    img: "/assets/story-measure.jpg",
    alt: "A craftsman marking a plank with a pencil and tape measure in the timber store",
  },
  {
    n: "03",
    title: "Delivered and placed",
    lines: "Our van delivers islandwide and the team assembles each piece in your room — packaging goes back with them.",
    img: "/assets/story-room.jpg",
    alt: "A finished living room with the delivered sofa in place",
  },
];

const WIPE_SPAN = 0.16;

function useChapterClip(progress: MotionValue<number>, k: number): MotionValue<string> {
  // photo k (k>=2) uncovers from its foot upward over the last photo
  const start = (k - 1) / chapters.length;
  return useTransform(progress, (p) => {
    const w = Math.min(1, Math.max(0, (p - start) / WIPE_SPAN));
    return `inset(${(1 - w) * 100}% 0 0 0)`;
  });
}

function useChapterZoom(progress: MotionValue<number>, k: number): MotionValue<number> {
  // the incoming photograph settles from a slight zoom as it uncovers
  const start = (k - 1) / chapters.length;
  return useTransform(progress, (p) => {
    const w = Math.min(1, Math.max(0, (p - start) / WIPE_SPAN));
    return 1 + (1 - w) * 0.035;
  });
}

export default function Story() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [chapter, setChapter] = useState(1);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const k = Math.min(chapters.length, Math.max(1, Math.floor(p * chapters.length) + 1));
    setChapter(k);
  });

  // chapter photographs: the next uncovers over the last, settling from a zoom
  const clip1 = useTransform(scrollYProgress, () => "inset(0 0 0 0)");
  const clip2 = useChapterClip(scrollYProgress, 2);
  const clip3 = useChapterClip(scrollYProgress, 3);
  const zoom2 = useChapterZoom(scrollYProgress, 2);
  const zoom3 = useChapterZoom(scrollYProgress, 3);

  if (reduced) {
    // the still: chapters stacked, each photograph over its words
    return (
      <section id="story" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-16 sm:px-6 sm:py-24">
        <h2 className="text-3xl font-semibold leading-tight text-balance sm:text-4xl">From order to room</h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          How a JAZZEL order travels — from the showroom floor, through the workshop, to your room.
        </p>
        <div className="mt-10 space-y-10">
          {chapters.map((c) => (
            <figure key={c.n}>
              <div className="relative aspect-[16/7] overflow-hidden rounded-2xl">
                <Image src={c.img} alt={c.alt} fill sizes="(max-width: 1280px) 100vw, 1280px" className="object-cover" />
              </div>
              <figcaption className="mt-4 max-w-2xl">
                <p className="font-display text-xl font-semibold">{c.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{c.lines}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="story" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-16 sm:px-6 sm:py-24">
      <div className="max-w-2xl">
        <span className="inline-flex items-center gap-2 text-[13px] font-medium text-primary">
          <span className="h-px w-8 bg-primary/50" aria-hidden="true" />
          The order
        </span>
        <h2 className="mt-4 text-3xl font-semibold leading-tight text-balance sm:text-4xl md:text-[2.6rem]">
          From order to room
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          How a JAZZEL order travels — from the showroom floor, through the workshop, to your room.
          Scroll through the three chapters.
        </p>
      </div>

      {/* three chapters, one photograph at a time, each uncovered from its foot */}
      <div ref={ref} className="relative mt-12 h-[300vh]">
        <div className="sticky top-0 h-screen overflow-hidden rounded-2xl bg-jaz-ink">
          {chapters.map((c, i) => {
            const clip = i === 0 ? clip1 : i === 1 ? clip2 : clip3;
            const zoom = i === 0 ? undefined : i === 1 ? zoom2 : zoom3;
            return (
              <motion.div
                key={c.n}
                className="absolute inset-0"
                style={{ clipPath: clip, scale: zoom, zIndex: i + 1 }}
              >
                <Image
                  src={c.img}
                  alt={c.alt}
                  fill
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  className="object-cover"
                />
              </motion.div>
            );
          })}

          {/* chapter panel on the photograph's lower left */}
          <div className="absolute bottom-6 left-4 z-10 max-w-md rounded-2xl border border-border bg-background/95 p-6 shadow-xl backdrop-blur sm:bottom-8 sm:left-6 sm:p-8">
            <motion.div key={chapter} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
              <p className="text-[13px] font-medium text-primary">Chapter {chapters[chapter - 1].n}</p>
              <p className="mt-2 font-display text-xl font-semibold leading-snug sm:text-2xl">
                {chapters[chapter - 1].title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{chapters[chapter - 1].lines}</p>
              <p className="mt-4 text-[12px] font-medium tracking-wide text-muted-foreground" aria-hidden="true">
                {chapters[chapter - 1].n} / 03
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
