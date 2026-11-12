import { cn } from "@/lib/utils";

/**
 * A scrolling ribbon of words — the brand's collections and craft phrases.
 * `tone="band"` is the solid red ribbon; `tone="line"` is the quiet bordered
 * one used between sections. The loop pauses when the pointer rests on it.
 */
export default function Marquee({
  items,
  tone = "band",
  reverse = false,
  className,
}: {
  items: string[];
  tone?: "band" | "line";
  reverse?: boolean;
  className?: string;
}) {
  const Row = () => (
    <div className="flex shrink-0 items-center">
      {items.map((it) => (
        <span key={it} className="flex items-center whitespace-nowrap">
          <span className="px-5 text-[12px] font-semibold uppercase tracking-[0.2em] sm:px-7 sm:text-[13px]">
            {it}
          </span>
          <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45 bg-current opacity-60" />
        </span>
      ))}
    </div>
  );

  return (
    <div
      aria-hidden="true"
      className={cn(
        "jaz-marquee-wrap relative overflow-hidden py-3.5",
        tone === "band"
          ? "bg-primary text-primary-foreground"
          : "border-y border-border bg-background/70 text-foreground/55 backdrop-blur-sm",
        className
      )}
    >
      <div className={cn("jaz-marquee flex w-max", reverse && "jaz-marquee-rev")}>
        <Row />
        <Row />
      </div>
    </div>
  );
}
