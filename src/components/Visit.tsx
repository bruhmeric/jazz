"use client";

import { MapPin, Phone, Mail, MessageCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared";
import { BRAND } from "@/lib/products";

const osmDirections = "https://www.openstreetmap.org/search?query=Samandawa+Road,+Aluviharaya,+Matale";

export default function Visit() {
  return (
    <section id="visit" className="relative scroll-mt-24 overflow-hidden bg-jaz-cream py-16 sm:py-24">
      {/* a quiet drift of ink dots behind the contact sheet */}
      <div aria-hidden="true" className="jaz-dotgrid opacity-40" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* the words */}
          <div>
            <span className="inline-flex items-center gap-2 text-[13px] font-medium text-primary">
              <span className="h-px w-8 bg-primary/50" aria-hidden="true" />
              The showroom
            </span>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-balance sm:text-4xl md:text-[2.6rem]">
              Sit on it before you buy it
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
              Visit the showroom on Samandawa Road in Aluviharaya — every sofa, bed and
              wardrobe in the store is on the floor, with fabric swatches and finish samples.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 hover:bg-jaz-red-deep"
              >
                <a href={osmDirections} target="_blank" rel="noopener noreferrer">
                  Get directions
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-jaz-red/30 bg-background px-7 text-sm font-semibold text-primary hover:bg-accent"
              >
                <a href={`tel:${BRAND.phone1Href}`}>Call {BRAND.phone1}</a>
              </Button>
            </div>
          </div>

          {/* the contact sheet */}
          <div className="grid content-start gap-4 sm:grid-cols-2 lg:gap-6">
            <article className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <MapPin className="h-5 w-5 text-primary" aria-hidden="true" />
              <h3 className="mt-3 font-display text-lg font-semibold">The address</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                Samandawa Road, Aluviharaya, Matale, Sri Lanka
              </p>
              <a
                href={osmDirections}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary underline decoration-primary/40 underline-offset-4 transition-colors hover:decoration-primary"
              >
                See the area
              </a>
            </article>

            <article className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <Phone className="h-5 w-5 text-primary" aria-hidden="true" />
              <h3 className="mt-3 font-display text-lg font-semibold">The phones</h3>
              <ul className="mt-1.5 space-y-1 text-sm leading-relaxed text-muted-foreground">
                <li>
                  <a href={`tel:${BRAND.phone1Href}`} className="hover:text-primary transition-colors">
                    {BRAND.phone1}
                  </a>
                </li>
                <li>
                  <a href={`tel:${BRAND.phone2Href}`} className="hover:text-primary transition-colors">
                    {BRAND.phone2}
                  </a>
                </li>
              </ul>
            </article>

            <article className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <Mail className="h-5 w-5 text-primary" aria-hidden="true" />
              <h3 className="mt-3 font-display text-lg font-semibold">The email</h3>
              <a
                href={`mailto:${BRAND.email}`}
                className="mt-1.5 inline-block text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {BRAND.email}
              </a>
            </article>

            <article className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <MessageCircle className="h-5 w-5 text-primary" aria-hidden="true" />
              <h3 className="mt-3 font-display text-lg font-semibold">WhatsApp orders</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                Send your cart as a WhatsApp order — the team replies the same working day.
              </p>
              <Button
                asChild
                size="sm"
                className="mt-4 h-10 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-jaz-red-deep"
              >
                <a href={`https://wa.me/${BRAND.whatsapp}`} target="_blank" rel="noopener noreferrer">
                  Message us
                </a>
              </Button>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
