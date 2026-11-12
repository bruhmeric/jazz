"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** A red thread of progress across the very top of the page as you scroll. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 110, damping: 26, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-jaz-red-deep via-primary to-jaz-red-bright"
    />
  );
}
