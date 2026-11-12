"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { BRAND } from "@/lib/products";

const links = [
  { href: "#store", label: "Store" },
  { href: "#collections", label: "Collections" },
  { href: "#craft", label: "Craft" },
  { href: "#story", label: "Story" },
  { href: "#visit", label: "Visit" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems, open, lastAddedTick } = useCart();
  const count = totalItems();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-[72px] sm:px-6"
        aria-label="Main navigation"
      >
        {/* logo — the client's own mark */}
        <a href="#top" className="flex shrink-0 items-center" aria-label="JAZZEL home">
          <Image
            src="/brand/jazzel-logo.png"
            alt="JAZZEL — Home & Office Furniture"
            width={158}
            height={40}
            priority

          />
        </a>

        {/* desktop words */}
        <ul className="hidden items-center gap-7 text-[15px] font-medium lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="link-sweep text-foreground/75 transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={`tel:${BRAND.phone1Href}`}
            className="hidden items-center gap-1.5 text-[15px] font-medium text-foreground/75 transition-colors hover:text-primary md:flex"
          >
            <Phone className="h-3.5 w-3.5" aria-hidden="true" />
            {BRAND.phone1}
          </a>

          {/* the main action — one filled button, pill look */}
          <Button
            asChild
            size="sm"
            className="hidden h-10 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-jaz-red-deep lg:inline-flex"
          >
            <a href="#store">Shop the store</a>
          </Button>

          {/* cart */}
          <button
            onClick={open}
            aria-label={`Open cart, ${count} item${count === 1 ? "" : "s"}`}
            className="relative grid h-11 w-11 place-items-center rounded-full bg-secondary text-foreground transition-colors duration-200 hover:bg-primary hover:text-primary-foreground active:scale-[0.97]"
          >
            <ShoppingBag className="h-[18px] w-[18px]" aria-hidden="true" />
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={lastAddedTick}
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 24 }}
                  className="cart-pop absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground shadow-md"
                >
                  {count > 99 ? "99+" : count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {/* mobile menu toggle */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="grid h-11 w-11 place-items-center rounded-full bg-secondary text-foreground transition-colors hover:bg-primary hover:text-primary-foreground active:scale-[0.97] lg:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* mobile sheet */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-b border-border bg-background lg:hidden"
          >
            <ul className="space-y-1 px-6 py-4 text-base font-medium">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-xl px-4 py-3 text-foreground/85 transition-colors hover:bg-secondary hover:text-primary"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <Button asChild className="h-11 w-full rounded-full bg-primary text-sm font-semibold text-primary-foreground hover:bg-jaz-red-deep">
                  <a href="#store" onClick={() => setMenuOpen(false)}>
                    Shop the store
                  </a>
                </Button>
              </li>
              <li className="pt-1 pb-2 text-center">
                <a
                  href={`tel:${BRAND.phone1Href}`}
                  className="text-sm font-medium text-foreground/70 hover:text-primary"
                >
                  Call {BRAND.phone1}
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
