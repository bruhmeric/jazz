"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, Truck, X, MessageCircle, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useCart } from "@/lib/cart";
import { BRAND, formatLKR } from "@/lib/products";

const FREE_DELIVERY_THRESHOLD = 100000;

export default function CartDrawer() {
  const { items, isOpen, close, setQty, removeItem, subtotal, totalItems, clear } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [placed, setPlaced] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", address: "", notes: "" });

  const sub = subtotal();
  const freeDelivery = sub >= FREE_DELIVERY_THRESHOLD;

  const buildWhatsAppMessage = () => {
    const lines = items
      .map((i) => `• ${i.qty}× ${i.product.name} — ${formatLKR(i.qty * i.product.price)}`)
      .join("\n");
    return [
      `Hello JAZZEL Furnitures! I'd like to place an order:`,
      ``,
      lines,
      ``,
      `Subtotal: ${formatLKR(sub)}`,
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Delivery address: ${form.address}`,
      form.notes ? `Notes: ${form.notes}` : "",
    ]
      .filter(Boolean)
      .join("\n");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // brief simulated processing then hand over to WhatsApp
    await new Promise((r) => setTimeout(r, 900));
    const url = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(buildWhatsAppMessage())}`;
    window.open(url, "_blank", "noopener");
    setSubmitting(false);
    setPlaced(true);
    setTimeout(() => {
      setCheckoutOpen(false);
      setPlaced(false);
      close();
      clear();
      toast.success("Order sent via WhatsApp", {
        description: "Our team will confirm delivery and payment details shortly.",
      });
    }, 1600);
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={(o) => (o ? useCart.getState().open() : close())}>
        <SheetContent className="flex w-full flex-col gap-0 border-border/60 bg-background p-0 sm:max-w-md">
          {/* header */}
          <SheetHeader className="border-b border-border/60 px-5 py-4 sm:px-6">
            <SheetTitle className="flex items-center gap-2.5 font-display text-xl font-semibold">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground">
                <ShoppingBag className="h-4 w-4" aria-hidden="true" />
              </span>
              Your Cart
              {totalItems() > 0 && (
                <span className="ml-auto rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
                  {totalItems()} item{totalItems() === 1 ? "" : "s"}
                </span>
              )}
            </SheetTitle>
            <SheetDescription className="sr-only">
              Review your selected furniture and checkout via WhatsApp.
            </SheetDescription>
          </SheetHeader>

          {/* items */}
          <div className="flex-1 overflow-y-auto px-5 py-4 sm:px-6">
            <AnimatePresence mode="popLayout">
              {items.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex h-full min-h-[300px] flex-col items-center justify-center text-center"
                >
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                    className="grid h-20 w-20 place-items-center rounded-full bg-secondary/80"
                  >
                    <ShoppingBag className="h-8 w-8 text-muted-foreground" aria-hidden="true" />
                  </motion.div>
                  <h3 className="mt-5 font-display text-lg font-semibold">Your cart is empty</h3>
                  <p className="mt-2 max-w-[240px] text-sm text-muted-foreground">
                    Browse the collection and add something beautiful for your home.
                  </p>
                  <Button asChild onClick={close} className="mt-5 rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
                    <a href="#store">Start Shopping</a>
                  </Button>
                </motion.div>
              ) : (
                <ul className="space-y-3">
                  <AnimatePresence mode="popLayout" initial={false}>
                    {items.map((item) => (
                      <motion.li
                        key={item.product.id}
                        layout
                        initial={{ opacity: 0, x: 36 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 48, transition: { duration: 0.2 } }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="flex gap-3.5 rounded-2xl border border-border/50 bg-card p-3 shadow-sm"
                      >
                        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex min-w-0 flex-1 flex-col">
                          <div className="flex items-start justify-between gap-2">
                            <p className="truncate text-sm font-semibold leading-tight">
                              {item.product.name}
                            </p>
                            <button
                              onClick={() => removeItem(item.product.id)}
                              aria-label={`Remove ${item.product.name}`}
                              className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                            >
                              <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                            </button>
                          </div>
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            {formatLKR(item.product.price)} each
                          </p>
                          <div className="mt-auto flex items-center justify-between pt-2">
                            <div className="flex h-8 items-center rounded-full border border-border">
                              <button
                                onClick={() => setQty(item.product.id, item.qty - 1)}
                                aria-label="Decrease quantity"
                                className="grid h-8 w-8 place-items-center rounded-l-full text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
                              >
                                <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                              </button>
                              <span className="w-7 text-center text-xs font-semibold" aria-live="polite">
                                {item.qty}
                              </span>
                              <button
                                onClick={() => setQty(item.product.id, item.qty + 1)}
                                aria-label="Increase quantity"
                                className="grid h-8 w-8 place-items-center rounded-r-full text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
                              >
                                <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                              </button>
                            </div>
                            <span className="font-display text-sm font-bold text-primary">
                              {formatLKR(item.qty * item.product.price)}
                            </span>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </AnimatePresence>
          </div>

          {/* summary */}
          {items.length > 0 && (
            <div className="border-t border-border/60 bg-secondary/40 px-5 py-4 sm:px-6">
              {/* free delivery meter */}
              <div className="mb-3 rounded-xl bg-card p-3 shadow-sm">
                <p className="flex items-center gap-2 text-xs font-medium">
                  <Truck className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                  {freeDelivery ? (
                    <span className="text-primary">
                      You&apos;ve unlocked <strong>free islandwide delivery</strong>
                    </span>
                  ) : (
                    <span>
                      Add {formatLKR(FREE_DELIVERY_THRESHOLD - sub)} more for{" "}
                      <strong>free delivery</strong>
                    </span>
                  )}
                </p>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-jaz-red-deep"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (sub / FREE_DELIVERY_THRESHOLD) * 100)}%` }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </div>

              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="font-medium text-foreground">{formatLKR(sub)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Delivery</span>
                  <span className="font-medium text-primary">
                    {freeDelivery ? "Free" : "Quoted on confirmation"}
                  </span>
                </div>
                <div className="flex items-baseline justify-between border-t border-border/60 pt-2.5">
                  <span className="font-semibold">Total</span>
                  <span className="font-display text-xl font-bold text-primary">
                    {formatLKR(sub)}
                  </span>
                </div>
              </div>

              <Button
                onClick={() => setCheckoutOpen(true)}
                className="mt-4 h-12 w-full rounded-full bg-primary text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-xl"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Checkout via WhatsApp
              </Button>
              <p className="mt-2.5 text-center text-[11px] text-muted-foreground">
                Pay on delivery · bank transfer · card at showroom
              </p>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* ===== checkout dialog ===== */}
      <Dialog open={checkoutOpen} onOpenChange={setCheckoutOpen}>
        <DialogContent className="rounded-2xl p-0 sm:max-w-md">
          {placed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center px-8 py-12 text-center"
            >
              <motion.div
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className="grid h-16 w-16 place-items-center rounded-full bg-accent text-primary"
              >
                <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
              </motion.div>
              <h3 className="mt-4 font-display text-xl font-semibold">Order sent</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                We&apos;ve opened WhatsApp with your order details. Our team will reply with
                delivery dates and payment options.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 sm:p-7">
              <DialogHeader className="text-left">
                <DialogTitle className="font-display text-xl font-semibold">
                  Almost yours
                </DialogTitle>
                <DialogDescription>
                  Confirm your details — we&apos;ll send the order to our WhatsApp ({BRAND.phone1}).
                </DialogDescription>
              </DialogHeader>

              <div className="mt-5 space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="co-name">Full name</Label>
                    <Input
                      id="co-name"
                      required
                      placeholder="Amaya Perera"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="rounded-xl"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="co-phone">Phone</Label>
                    <Input
                      id="co-phone"
                      required
                      type="tel"
                      placeholder="077 123 4567"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="rounded-xl"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="co-address">Delivery address</Label>
                  <Input
                    id="co-address"
                    required
                    placeholder="No. 12, Temple Road, Kandy"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="co-notes">Notes (optional)</Label>
                  <Textarea
                    id="co-notes"
                    placeholder="Custom fabric colour, preferred delivery day…"
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="min-h-20 rounded-xl"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="mt-6 h-12 w-full rounded-full bg-primary text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:bg-jaz-red-deep"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    Preparing your order…
                  </>
                ) : (
                  <>
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    Send order · {formatLKR(sub)}
                  </>
                )}
              </Button>
              <button
                type="button"
                onClick={() => setCheckoutOpen(false)}
                className="mt-3 w-full text-center text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Continue shopping
              </button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
