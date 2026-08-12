import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, MapPin, ShoppingBag, ClipboardList, Plus, Minus, Trash2 } from "lucide-react";

import { useOrders, ordersStore } from "@/lib/orders-store";
import { cartStore, useCart } from "@/lib/cart-store";
import { priceOf } from "@/lib/menu-data";
import { INR, restaurant, whatsappLink } from "@/lib/restaurant";

const links = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/#about", label: "About" },
  { href: "/#specials", label: "Specials" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/#location", label: "Location" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [panel, setPanel] = useState<null | "cart" | "orders">(null);
  const orders = useOrders();
  const cart = useCart();
  const count = Object.values(cart).reduce((a, b) => a + b, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-border bg-[oklch(0.16_0.005_60_/_0.88)] backdrop-blur-md shadow-[0_10px_30px_-24px_oklch(0.19_0.02_40_/_0.6)]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6 lg:grid-cols-[auto_1fr_auto]">
          <Link to="/" className="flex min-w-0 items-center gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-primary text-[0.8rem] font-bold text-primary-foreground">
              BG
            </span>
            <span className="min-w-0">
              <span className="block truncate font-display text-base font-bold uppercase tracking-tight">
                Burger Grand
              </span>
              <span className="hidden items-center gap-1 text-[10px] uppercase tracking-[0.22em] text-muted-foreground sm:flex">
                <MapPin className="h-3 w-3 text-secondary" /> {restaurant.locality}
              </span>
            </span>
          </Link>

          <nav className="hidden justify-center gap-7 lg:flex">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="group relative text-[13px] font-medium uppercase tracking-[0.12em] text-foreground/75 transition hover:text-primary"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPanel("orders")}
              aria-label="Your orders"
              className="relative hidden h-10 items-center gap-2 rounded-full border border-border px-4 text-xs font-semibold uppercase tracking-[0.14em] transition hover:bg-muted sm:inline-flex"
            >
              <ClipboardList className="h-4 w-4 text-primary" /> Orders
              {orders.length > 0 && (
                <span className="grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] text-primary-foreground">
                  {orders.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setPanel("cart")}
              aria-label="Your cart"
              className="relative grid h-10 w-10 place-items-center rounded-full border border-border transition hover:bg-muted"
            >
              <ShoppingBag className="h-4 w-4" />
              {count > 0 && (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                  {count}
                </span>
              )}
            </button>

            <Link
              to="/menu"
              className="btn-primary hover:btn-primary-hover hidden rounded-full px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] md:inline-flex"
            >
              Order Now
            </Link>

            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
              className="grid h-10 w-10 place-items-center rounded-full border border-border lg:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mx-4 mb-3 overflow-hidden rounded-2xl surface p-4 shadow-card lg:hidden"
            >
              <div className="flex flex-col">
                {links.map((l, i) => (
                  <motion.a
                    key={l.label}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.03 * i }}
                    className="border-b border-border/60 py-3 text-sm font-medium uppercase tracking-[0.14em] last:border-0"
                  >
                    {l.label}
                  </motion.a>
                ))}
                <Link
                  to="/menu"
                  onClick={() => setOpen(false)}
                  className="btn-primary hover:btn-primary-hover mt-4 rounded-full px-6 py-3 text-center text-xs font-semibold uppercase tracking-[0.16em]"
                >
                  Order Now
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <Drawer open={panel !== null} onClose={() => setPanel(null)}>
        {panel === "cart" ? (
          <CartPanel onClose={() => setPanel(null)} onPlaced={() => setPanel("orders")} />
        ) : (
          <OrdersPanel orders={orders} onClose={() => setPanel(null)} />
        )}
      </Drawer>
    </>
  );
}

function Drawer({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-ink/70 backdrop-blur-[2px]"
          />
          <motion.aside
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 280 }}
            className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col border-l border-border bg-offwhite"
          >
            {children}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function PanelHead({ eyebrow, title, onClose }: { eyebrow: string; title: string; onClose: () => void }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border p-6">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h3 className="mt-1 font-display text-2xl font-bold uppercase">{title}</h3>
      </div>
      <button onClick={onClose} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-full border border-border hover:bg-muted">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

function CartPanel({ onClose, onPlaced }: { onClose: () => void; onPlaced: () => void }) {
  const cart = useCart();
  const lines = Object.entries(cart).map(([name, qty]) => ({ name, qty, price: priceOf(name) }));
  const subtotal = lines.reduce((a, l) => a + l.price * l.qty, 0);
  const tax = Math.round(subtotal * 0.05);
  const delivery = subtotal > 0 && subtotal < 300 ? 30 : 0;
  const total = subtotal + tax + delivery;

  const place = () => {
    ordersStore.add({ lines, subtotal, tax, delivery, total });
    cartStore.clear();
    onPlaced();
  };

  if (lines.length === 0) {
    return (
      <>
        <PanelHead eyebrow="Your cart" title="Nothing here yet" onClose={onClose} />
        <div className="flex flex-1 flex-col items-center justify-center gap-5 p-8 text-center">
          <ShoppingBag className="h-10 w-10 text-primary" />
          <p className="max-w-xs text-sm text-muted-foreground">
            Add a Grand burger, loaded fries or a thick shake to get started.
          </p>
          <Link to="/menu" onClick={onClose} className="btn-primary hover:btn-primary-hover rounded-full px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em]">
            Explore Menu
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <PanelHead eyebrow="Your cart" title="Billing Details" onClose={onClose} />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-4">
          {lines.map((l) => (
            <div key={l.name} className="flex items-center justify-between gap-3 border-b border-border pb-4">
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold">{l.name}</div>
                <div className="text-xs text-muted-foreground">{INR(l.price)} each</div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button onClick={() => cartStore.remove(l.name)} aria-label="Remove one" className="grid h-8 w-8 place-items-center rounded-full border border-border hover:bg-muted">
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-5 text-center text-sm font-semibold">{l.qty}</span>
                <button onClick={() => cartStore.add(l.name)} aria-label="Add one" className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground hover:bg-secondary">
                  <Plus className="h-3.5 w-3.5" />
                </button>
                <span className="w-14 text-right text-sm font-bold">{INR(l.price * l.qty)}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-2 rounded-xl surface p-5 text-sm">
          <Row label="Subtotal" value={INR(subtotal)} />
          <Row label="GST (5%)" value={INR(tax)} />
          <Row label="Delivery" value={delivery === 0 ? "FREE" : INR(delivery)} />
          <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
            <span className="font-display text-base font-bold uppercase">Total</span>
            <span className="font-display text-2xl font-bold text-primary">{INR(total)}</span>
          </div>
          {delivery > 0 && (
            <p className="pt-1 text-xs text-muted-foreground">Add {INR(300 - subtotal)} more for free delivery.</p>
          )}
        </div>

        <button onClick={place} className="btn-primary hover:btn-primary-hover mt-5 w-full rounded-full px-6 py-4 text-xs font-bold uppercase tracking-[0.18em]">
          Place Order · {INR(total)}
        </button>
        <a
          href={whatsappLink(
            `Hi Burger Grand! I'd like to order:\n${lines.map((l) => `${l.qty} × ${l.name}`).join("\n")}\nTotal: ${INR(total)}`
          )}
          target="_blank"
          rel="noreferrer"
          className="btn-ghost hover:btn-ghost-hover mt-3 flex w-full items-center justify-center rounded-full px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.16em]"
        >
          Order on WhatsApp
        </a>
        <button onClick={() => cartStore.clear()} className="mt-4 inline-flex w-full items-center justify-center gap-2 text-xs uppercase tracking-[0.16em] text-muted-foreground hover:text-primary">
          <Trash2 className="h-3.5 w-3.5" /> Clear cart
        </button>
      </div>
    </>
  );
}

function OrdersPanel({ orders, onClose }: { orders: ReturnType<typeof useOrders>; onClose: () => void }) {
  if (orders.length === 0) {
    return (
      <>
        <PanelHead eyebrow="Your orders" title="No Orders Yet" onClose={onClose} />
        <div className="flex flex-1 flex-col items-center justify-center gap-5 p-8 text-center">
          <ClipboardList className="h-10 w-10 text-primary" />
          <p className="max-w-xs text-sm text-muted-foreground">Your placed orders will appear here.</p>
          <Link to="/menu" onClick={onClose} className="btn-primary hover:btn-primary-hover rounded-full px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em]">
            Browse Menu
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <PanelHead eyebrow="Your orders" title="Placed Orders" onClose={onClose} />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-5">
          {orders.map((o, idx) => {
            const cancelled = o.status === "Cancelled";
            const canCancel = idx === 0 && o.status === "Preparing";
            return (
              <div key={o.id} className={`rounded-xl surface p-5 ${cancelled ? "opacity-60" : ""}`}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Order #{o.id}</div>
                    <div className="text-xs text-muted-foreground">{new Date(o.createdAt).toLocaleString()}</div>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] ${cancelled ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground"}`}>
                    {o.status}
                  </span>
                </div>
                <div className="mt-4 space-y-1.5 text-sm">
                  {o.lines.map((l) => (
                    <div key={l.name} className="flex items-center justify-between">
                      <span className="text-foreground/80">{l.name} <span className="text-muted-foreground">× {l.qty}</span></span>
                      <span className="font-semibold">{INR(l.price * l.qty)}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 space-y-1 border-t border-border pt-3 text-xs">
                  <Row label="Subtotal" value={INR(o.subtotal)} />
                  <Row label="GST (5%)" value={INR(o.tax)} />
                  <Row label="Delivery" value={o.delivery === 0 ? "FREE" : INR(o.delivery)} />
                  <div className="mt-2 flex items-center justify-between border-t border-border pt-2">
                    <span className="font-display font-bold uppercase">Total</span>
                    <span className="font-display text-lg font-bold text-primary">{INR(o.total)}</span>
                  </div>
                </div>
                {canCancel && (
                  <button
                    onClick={() => { if (confirm("Cancel this order before delivery?")) ordersStore.cancel(o.id); }}
                    className="btn-ghost hover:btn-ghost-hover mt-4 w-full rounded-full px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em]"
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
