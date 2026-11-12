"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useCart } from "@/lib/cart";
import { formatLKR, categoryNames, type Product } from "@/lib/products";

const badgeStyles: Record<string, string> = {
  New: "bg-primary text-primary-foreground",
  Bestseller: "bg-jaz-ink text-white",
  Sale: "bg-jaz-red-deep text-white",
};

export default function ProductCard({ product, index }: { product: Product; index: number }) {
  const [quickView, setQuickView] = useState(false);
  const [qty, setQty] = useState(1);
  const { addItem } = useCart();
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const handleAdd = (e: React.MouseEvent, quantity = 1) => {
    e.stopPropagation();
    addItem(product, quantity);
    toast.success(`${product.name} added to cart`, {
      description: `${formatLKR(product.price)} · ${quantity} item${quantity > 1 ? "s" : ""}`,
      action: { label: "View Cart", onClick: () => useCart.getState().open() },
    });
  };

  return (
    <>
      <motion.article
        layout
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.18 } }}
        transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.32), ease: [0.22, 1, 0.36, 1] }}
        className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/10"
      >
        {/* image area */}
        <div className="relative aspect-[4/3.4] overflow-hidden bg-muted/60">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="img-zoom object-cover"
          />

          {/* badges */}
          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            {product.badge && (
              <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide shadow-md ${badgeStyles[product.badge]}`}>
                {product.badge === "Sale" && discount ? `-${discount}%` : product.badge}
              </span>
            )}
          </div>

          {/* hover actions */}
          <div className="absolute inset-x-0 bottom-0 flex translate-y-3 items-center justify-center gap-2 p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setQuickView(true)}
              aria-label={`Quick view ${product.name}`}
              className="h-9 rounded-full bg-background/95 text-foreground shadow-lg backdrop-blur-md hover:bg-background"
            >
              <Eye className="h-3.5 w-3.5" aria-hidden="true" />
              Quick View
            </Button>
            <Button
              size="sm"
              onClick={(e) => handleAdd(e)}
              aria-label={`Add ${product.name} to cart`}
              className="h-9 rounded-full bg-primary px-4 text-primary-foreground shadow-lg hover:bg-jaz-red-deep"
            >
              <Plus className="h-3.5 w-3.5" aria-hidden="true" />
              Add
            </Button>
          </div>
        </div>

        {/* body */}
        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <div className="flex items-center justify-between text-[11px] font-medium tracking-wide text-muted-foreground">
            <span>{categoryNames[product.category]}</span>
            <span>{product.dimensions.split("×")[0].replace(/[^\d.]/g, "")} cm wide</span>
          </div>

          <h3 className="mt-1.5 font-display text-base font-semibold leading-snug sm:text-[1.05rem]">
            <button
              onClick={() => setQuickView(true)}
              className="text-left transition-colors hover:text-primary"
            >
              {product.name}
            </button>
          </h3>

          <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <div className="mt-auto flex items-end justify-between pt-4">
            <div>
              {product.oldPrice && (
                <span className="mr-2 text-xs text-muted-foreground line-through">
                  {formatLKR(product.oldPrice)}
                </span>
              )}
              <span className="font-display text-lg font-semibold text-primary sm:text-xl">
                {formatLKR(product.price)}
              </span>
            </div>
            {/* finish swatches */}
            <div className="flex items-center gap-1.5 pb-0.5" aria-hidden="true">
              {product.colors.slice(0, 4).map((c) => (
                <span
                  key={c}
                  className="h-3.5 w-3.5 rounded-full border border-foreground/10 shadow-sm"
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.article>

      {/* ===== quick view dialog ===== */}
      <Dialog open={quickView} onOpenChange={setQuickView}>
        <DialogContent className="max-h-[92svh] overflow-y-auto rounded-2xl p-0 sm:max-w-3xl">
          <div className="grid gap-0 sm:grid-cols-2">
            <div className="relative aspect-square bg-muted/60 sm:aspect-auto sm:h-full sm:min-h-[420px]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover"
              />
              {product.badge && (
                <Badge className="absolute left-4 top-4 rounded-full bg-primary px-3 text-primary-foreground shadow-lg">
                  {product.badge}
                </Badge>
              )}
            </div>

            <div className="flex flex-col p-5 sm:p-7">
              <DialogHeader className="text-left">
                <p className="text-[12px] font-medium tracking-wide text-primary">
                  {categoryNames[product.category]}
                </p>
                <DialogTitle className="mt-1 font-display text-2xl font-semibold leading-tight">
                  {product.name}
                </DialogTitle>
                <DialogDescription className="mt-2 text-sm">
                  {product.material}
                </DialogDescription>
              </DialogHeader>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {product.description}
              </p>

              <dl className="mt-5 space-y-2.5 rounded-xl bg-jaz-cream p-4 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Material</dt>
                  <dd className="text-right font-medium">{product.material}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Dimensions</dt>
                  <dd className="text-right font-medium">{product.dimensions}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Delivery</dt>
                  <dd className="text-right font-medium text-primary">Islandwide · 7–21 days</dd>
                </div>
              </dl>

              <div className="mt-5">
                <p className="text-xs font-semibold tracking-wide text-muted-foreground">
                  Available finishes
                </p>
                <div className="mt-2 flex items-center gap-2.5">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      className="h-6 w-6 rounded-full border border-foreground/15 shadow-sm ring-offset-2 ring-offset-card transition-transform hover:scale-110"
                      style={{ backgroundColor: c }}
                      aria-label={`Finish ${c}`}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-6">
                <div className="flex items-center justify-between">
                  {product.oldPrice && (
                    <span className="mr-2 text-sm text-muted-foreground line-through">
                      {formatLKR(product.oldPrice)}
                    </span>
                  )}
                  <span className="font-display text-2xl font-semibold text-primary">
                    {formatLKR(product.price)}
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  {/* qty stepper */}
                  <div className="flex h-11 items-center rounded-full border border-border bg-card">
                    <button
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      className="grid h-11 w-11 place-items-center rounded-l-full text-lg text-muted-foreground transition-colors hover:bg-muted hover:text-primary disabled:opacity-40"
                      disabled={qty <= 1}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm font-semibold" aria-live="polite">
                      {qty}
                    </span>
                    <button
                      onClick={() => setQty((q) => Math.min(9, q + 1))}
                      className="grid h-11 w-11 place-items-center rounded-r-full text-lg text-muted-foreground transition-colors hover:bg-muted hover:text-primary disabled:opacity-40"
                      disabled={qty >= 9}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <Button
                    onClick={(e) => {
                      handleAdd(e, qty);
                      setQuickView(false);
                    }}
                    className="h-11 flex-1 rounded-full bg-primary text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:bg-jaz-red-deep"
                  >
                    Add to Cart · {formatLKR(product.price * qty)}
                  </Button>
                </div>
                <p className="mt-3 text-center text-[11px] text-muted-foreground">
                  Islandwide delivery · Free within Matale · Custom sizes on request
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
