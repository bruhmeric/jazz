"use client";

import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/lib/products";

const storeLinks = [
  { href: "#store", label: "Shop the store" },
  { href: "#collections", label: "Collections" },
  { href: "#visit", label: "Visit the showroom" },
];

const companyLinks = [
  { href: "#craft", label: "The workshop" },
  { href: "#story", label: "From order to room" },
  { href: "#features", label: "Built to your sizes" },
];

export default function Footer() {
  return (
    <footer id="contact" className="mt-auto">
      {/* the close: the client's own photograph, slowly breathing, the big buttons below it */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="jaz-kenburns absolute inset-0">
            <Image
              src="/brand/hero-edit.jpg"
              alt="A three-piece button-tufted sofa set in the JAZZEL showroom"
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-jaz-ink/85 via-jaz-ink/45 to-jaz-ink/15" aria-hidden="true" />
        </div>

        <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 py-20 text-center sm:px-6 sm:py-28">
          <p className="text-[13px] font-medium tracking-wide text-white/70">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              Samandawa Road, Matale
            </span>
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold leading-tight text-white text-balance sm:text-4xl md:text-[2.6rem]">
            Bring the showroom home
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-white/70">
            Sofas, beds, wardrobes and kids&rsquo; rooms built in the Matale workshop and
            delivered islandwide across Sri Lanka.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="group h-12 rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground shadow-xl hover:bg-jaz-red-deep"
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
              className="h-12 rounded-full border-white/30 bg-white/10 px-7 text-sm font-semibold text-white backdrop-blur transition-colors hover:border-white/60 hover:bg-white/20"
            >
              <a href="#visit">See the showroom</a>
            </Button>
          </div>
        </div>
      </div>

      {/* the directory — signed off with the big outlined wordmark */}
      <div className="relative overflow-hidden bg-jaz-ink text-white/70">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-4 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-display text-[22vw] font-bold leading-none tracking-tight text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.07)]"
        >
          JAZZEL
        </span>
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <div className="grid gap-10 md:grid-cols-12">
            {/* brand */}
            <div className="md:col-span-5">
              <Image
                src="/brand/jazzel-logo-white.png"
                alt="JAZZEL — Home & Office Furniture"
                width={158}
                height={40}
              />
              <p className="mt-5 max-w-xs text-sm leading-relaxed">
                Home and office furniture made to order in Matale — melamine, MDF, steel and
                upholstery, delivered islandwide.
              </p>
            </div>

            {/* link columns */}
            <nav className="md:col-span-3" aria-label="Store">
              <h3 className="text-sm font-semibold text-white">The store</h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {storeLinks.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="transition-colors hover:text-white">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav className="md:col-span-2" aria-label="Company">
              <h3 className="text-sm font-semibold text-white">The company</h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {companyLinks.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="transition-colors hover:text-white">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* contact column */}
            <div className="md:col-span-2">
              <h3 className="text-sm font-semibold text-white">Contact</h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li>
                  <a href={`tel:${BRAND.phone1Href}`} className="transition-colors hover:text-white">
                    {BRAND.phone1}
                  </a>
                </li>
                <li>
                  <a href={`https://wa.me/${BRAND.whatsapp}`} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a href={`mailto:${BRAND.email}`} className="transition-colors hover:text-white">
                    Email us
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* legal row */}
          <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row">
            <p>© {new Date().getFullYear()} {BRAND.name} Furnitures · {BRAND.legalName}</p>
            <p>Photographs via stock libraries</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
