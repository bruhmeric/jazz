"use client";

import type { ReactNode } from "react";

/** Section heading: a plain label above the h2, one muted run-on line allowed. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  id,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  id?: string;
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <span
        className={`inline-flex items-center gap-2 text-[13px] font-medium text-primary ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        <span className="h-px w-8 bg-primary/50" aria-hidden="true" />
        {eyebrow}
        {align === "center" ? <span className="h-px w-8 bg-primary/50" aria-hidden="true" /> : null}
      </span>
      <h2 id={id} className="mt-4 text-3xl font-semibold leading-tight text-balance sm:text-4xl md:text-[2.6rem]">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}

/** Small helper for a two-part heading: the claim, then its muted second sentence. */
export function Muted({ children }: { children: ReactNode }) {
  return <span className="text-muted-foreground">{children}</span>;
}
