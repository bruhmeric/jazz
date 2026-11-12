"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { SectionHeading } from "@/components/shared";

const materials: Array<[string, string, string]> = [
  ["Melamine", "Board", "Scratch-resistant, wipe-clean surfaces for wardrobes and kids' rooms."],
  ["MDF", "Board", "Painted and profiled doors, drawer fronts and headboards."],
  ["Steel", "Frame", "Powder-coated frames for office desks, beds and iron cabinets."],
];

export default function Craft() {
  const reduced = useReducedMotion();

  return (
    <section id="craft" className="relative scroll-mt-24 overflow-hidden bg-jaz-ink py-16 text-white sm:py-24">
      {/* red glows drifting through the workshop dark */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <div className="jaz-blob-dark-a" />
        <div className="jaz-blob-dark-b" />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 text-[13px] font-medium text-jaz-red-bright">
            <span className="h-px w-8 bg-primary/60" aria-hidden="true" />
            The workshop
            <span className="h-px w-8 bg-primary/60" aria-hidden="true" />
          </span>
          <h2 className="mt-4 text-3xl font-semibold leading-tight text-balance sm:text-4xl md:text-[2.6rem]">
            Made in Matale, finished by hand
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/65">
            Boards are cut, sanded, primed and lacquered in our own workshop — then checked
            piece by piece before the van leaves.
          </p>
        </div>

        {/* the photograph develops once as it comes on screen */}
        <div className="mt-12 overflow-hidden rounded-2xl">
          <motion.div
            initial={reduced ? {} : { scale: 1.04 }}
            whileInView={reduced ? {} : { scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.7, ease: [0.22, 1, 0.36, 1] }}
            className="jaz-develop relative aspect-[16/8] w-full"
          >
            <Image
              src="/assets/craft-finish.jpg"
              alt="A craftsman brushing finish onto a wooden plank in the workshop"
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover"
              priority={false}
            />
          </motion.div>
        </div>

        {/* the materials the shop really builds with */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3 sm:gap-6">
          {materials.map(([name, kind, text]) => (
            <article
              key={name}
              className="rounded-2xl border border-white/12 bg-white/[0.04] p-6 transition-colors duration-300 hover:border-primary/50 hover:bg-white/[0.07]"
            >
              <p className="font-display text-lg font-semibold">
                {name} <span className="text-white/50">{kind}</span>
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{text}</p>
            </article>
          ))}
        </div>

        {/* two workshop facts */}
        <dl className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 border-t border-white/12 pt-8">
          <div className="flex items-baseline gap-2.5">
            <dt className="sr-only">Orders built to measure</dt>
            <dd className="font-display text-2xl font-semibold text-jaz-red-bright">Every order</dd>
            <dd className="text-sm text-white/60">built to measure</dd>
          </div>
          <div className="flex items-baseline gap-2.5">
            <dt className="sr-only">Finish coat</dt>
            <dd className="font-display text-2xl font-semibold text-jaz-red-bright">3 coats</dd>
            <dd className="text-sm text-white/60">sanded between each</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
