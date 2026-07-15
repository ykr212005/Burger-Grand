import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Flame, ClipboardList, MapPin, Phone } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useOrders } from "@/lib/orders-store";

const links = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/#story", label: "Story" },
  { to: "/#gallery", label: "Gallery" },
  { to: "/#contact", label: "Contact" },
];

const INR = (n: number) => `₹${n.toFixed(0)}`;

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const orders = useOrders();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? "py-2" : "py-4"
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 sm:px-6 ${
            scrolled ? "glass rounded-2xl" : ""
          } transition-all duration-300`}
        >
          <Link to="/" className="flex items-center gap-2 py-2">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[image:var(--gradient-fire)] shadow-glow">
              <Flame className="h-5 w-5 text-white" />
            </span>
            <span className="font-display text-lg font-bold tracking-tight text-white">
              Burger <span className="text-gradient-fire">Grand</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <a
                key={l.to}
                href={l.to}
                className="group relative text-sm font-medium text-white/80 transition hover:text-white"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[image:var(--gradient-fire)] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setOrderOpen(true)}
              aria-label="Your Order"
              className="relative inline-flex items-center gap-2 rounded-full glass px-3 py-2 text-sm font-semibold text-white hover:bg-white/10 sm:px-4"
            >
              <ClipboardList className="h-4 w-4 text-accent" />
              <span className="hidden sm:inline">Your Order</span>
              {orders.length > 0 && (
                <span className="grid h-5 min-w-[1.25rem] place-items-center rounded-full bg-[image:var(--gradient-fire)] px-1 text-[10px] font-bold text-white shadow-glow">
                  {orders.length}
                </span>
              )}
            </button>

            <a
              href="/menu"
              className="btn-glow hover:btn-glow-hover hidden rounded-full px-5 py-2.5 text-sm font-semibold md:inline-flex"
            >
              Order Now
            </a>

            <button
              onClick={() => setOpen((o) => !o)}
              className="grid h-10 w-10 place-items-center rounded-xl glass text-white md:hidden"
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="mx-4 mt-2 rounded-2xl glass p-4 md:hidden">
            <div className="flex flex-col gap-3">
              {links.map((l) => (
                <a
                  key={l.to}
                  href={l.to}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 text-white/90 hover:bg-white/5"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="/menu"
                onClick={() => setOpen(false)}
                className="btn-glow hover:btn-glow-hover mt-2 rounded-full px-5 py-3 text-center text-sm font-semibold"
              >
                Order Now
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Your Order Drawer */}
      <AnimatePresence>
        {orderOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOrderOpen(false)}
              className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 260 }}
              className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col bg-[oklch(0.11_0.01_20)] border-l border-white/10 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 p-5">
                <div>
                  <div className="text-xs uppercase tracking-[0.3em] text-accent">Your order</div>
                  <h3 className="font-display text-2xl font-bold text-white">
                    {orders.length > 0 ? "Placed Orders" : "No Orders Yet"}
                  </h3>
                </div>
                <button
                  onClick={() => setOrderOpen(false)}
                  className="grid h-10 w-10 place-items-center rounded-full glass text-white hover:bg-white/10"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {orders.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
                  <div className="grid h-20 w-20 place-items-center rounded-full glass">
                    <ClipboardList className="h-10 w-10 text-accent" />
                  </div>
                  <p className="max-w-xs text-white/70">
                    You haven't placed any orders yet. Explore the menu and grab a Grand meal!
                  </p>
                  <Link
                    to="/menu"
                    onClick={() => setOrderOpen(false)}
                    className="btn-glow hover:btn-glow-hover mt-2 rounded-full px-6 py-3 text-sm font-semibold"
                  >
                    Browse Menu
                  </Link>
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto p-5">
                  <div className="space-y-4">
                    {orders.map((o) => (
                      <div
                        key={o.id}
                        className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="text-xs uppercase tracking-widest text-white/50">
                              Order #{o.id}
                            </div>
                            <div className="text-xs text-white/50">
                              {new Date(o.createdAt).toLocaleString()}
                            </div>
                          </div>
                          <span className="rounded-full bg-[image:var(--gradient-fire)] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-glow">
                            {o.status}
                          </span>
                        </div>

                        <div className="mt-3 space-y-1.5">
                          {o.lines.map((l) => (
                            <div key={l.name} className="flex items-center justify-between text-sm">
                              <span className="text-white/80">
                                {l.name}{" "}
                                <span className="text-white/40">× {l.qty}</span>
                              </span>
                              <span className="font-semibold text-white">
                                {INR(l.price * l.qty)}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="mt-3 space-y-1 border-t border-white/10 pt-3 text-xs">
                          <Row label="Subtotal" value={INR(o.subtotal)} />
                          <Row label="GST (5%)" value={INR(o.tax)} />
                          <Row
                            label="Delivery"
                            value={o.delivery === 0 ? "FREE" : INR(o.delivery)}
                          />
                          <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-2">
                            <span className="font-display font-bold text-white">Total</span>
                            <span className="font-display text-lg font-black text-gradient-fire">
                              {INR(o.total)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 rounded-2xl glass p-4 text-xs text-white/60">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-accent" /> Gulab Bhag, Block D, Uttam Nagar, Nawada
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <Phone className="h-4 w-4 text-accent" /> +91 70656 56537
                    </div>
                  </div>
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-white/50">{label}</span>
      <span className="font-semibold text-white/90">{value}</span>
    </div>
  );
}
