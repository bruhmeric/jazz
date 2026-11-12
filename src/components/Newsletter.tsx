"use client";

import { useState } from "react";
import { Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Reveal } from "@/components/shared";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setDone(true);
    toast.success("Subscribed!", {
      description: "You'll receive inspiration, product updates and special offers.",
    });
  };

  return (
    <section aria-labelledby="newsletter-heading" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl bg-espresso px-6 py-12 text-center shadow-2xl shadow-espresso/25 sm:px-12 sm:py-16 grain">
          {/* glow accents */}
          <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-clay/25 blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-clay/20 blur-3xl" aria-hidden="true" />

          <div className="relative">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-clay/20 text-clay">
              <Mail className="h-6 w-6" aria-hidden="true" />
            </span>
            <h2 id="newsletter-heading" className="mt-5 font-display text-2xl font-semibold text-cream sm:text-3xl">
              Get the good stuff first
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-cream/70">
              Subscribe for interior inspiration, new arrivals and subscriber-only offers —
              straight to your inbox, never spam.
            </p>

            {done ? (
              <p className="mt-7 inline-flex items-center gap-2 rounded-full bg-forest/25 px-5 py-3 text-sm font-medium text-cream">
                <CheckCircle2 className="h-4 w-4 text-forest" aria-hidden="true" />
                You&apos;re on the list — welcome to the JAZZEL family!
              </p>
            ) : (
              <form onSubmit={submit} className="mx-auto mt-7 flex max-w-md flex-col gap-3 sm:flex-row">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <Input
                  id="newsletter-email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 rounded-full border-cream/25 bg-cream/10 px-5 text-cream placeholder:text-cream/40 backdrop-blur-md focus-visible:ring-clay"
                />
                <Button
                  type="submit"
                  className="group h-12 shrink-0 rounded-full bg-clay px-6 text-sm font-semibold text-espresso shadow-lg shadow-clay/25 hover:bg-cream"
                >
                  Subscribe
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Button>
              </form>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
