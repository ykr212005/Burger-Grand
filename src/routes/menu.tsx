import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Search, Star, Flame, Plus, Check, ArrowRight } from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { FloatingActions } from "@/components/floating-actions";
import { items, categories } from "@/lib/menu-data";
import { cartStore, useCart } from "@/lib/cart-store";
import { INR, restaurant } from "@/lib/restaurant";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu & Prices — Burger Grand, Uttam Nagar Delhi" },
      {
        name: "description",
        content:
          "Full Burger Grand menu with prices — burgers, pizzas, wraps, grilled sandwiches, loaded fries, mocktails, thick shakes and sundaes near Nawada Metro.",
      },
      { property: "og:title", content: "Menu & Prices — Burger Grand" },
      { property: "og:description", content: "Browse every burger, pizza, wrap, shake and sundae with live prices and add them to your order." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://grand-cinematic-bites.lovable.app/menu" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://grand-cinematic-bites.lovable.app/menu" }],
  }),
  component: MenuPage,
});

function MenuPage() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const cart = useCart();

  const filtered = useMemo(
    () => items.filter((i) => (cat === "All" || i.category === cat) && i.name.toLowerCase().includes(q.toLowerCase())),
    [cat, q],
  );

  return (
    <main className="bg-offwhite pb-16 md:pb-0">
      <section className="bg-cream pt-32 pb-14">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="eyebrow">The full menu</div>
            <h1 className="display-xl mt-4 text-[clamp(2.4rem,7vw,4.6rem)]">
              Every craving,<br /><span className="text-primary">priced right.</span>
            </h1>
            <p className="mt-5 max-w-xl text-muted-foreground">
              {items.length} items made to order at {restaurant.locality}. Add anything to your
              cart and check the billing breakdown before you place the order.
            </p>
          </motion.div>

          <div className="mt-9 max-w-md">
            <div className="group relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search burgers, shakes, pizza…"
                className="w-full rounded-full border border-border bg-offwhite py-3.5 pl-11 pr-5 text-sm outline-none transition focus:border-primary"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="sticky top-[64px] z-30 border-y border-border bg-[oklch(0.988_0.008_90_/_0.95)] backdrop-blur">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-6 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`shrink-0 rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] transition ${
                cat === c ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground hover:bg-muted"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-6 py-14">
        {filtered.length === 0 ? (
          <p className="py-20 text-center text-muted-foreground">No dishes match “{q}”.</p>
        ) : (
          <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((it, i) => {
              const qty = cart[it.name] ?? 0;
              return (
                <motion.article
                  key={it.name + i}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45 }}
                  className="group flex gap-4"
                >
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden">
                    <img src={it.img} alt={it.name} loading="lazy" width={300} height={300} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`grid h-4 w-4 shrink-0 place-items-center border ${it.veg ? "border-fresh" : "border-secondary"}`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${it.veg ? "bg-fresh" : "bg-secondary"}`} />
                          </span>
                          <h2 className="truncate font-display text-[15px] font-bold uppercase tracking-[0.02em]">{it.name}</h2>
                          {it.spicy && <Flame className="h-3.5 w-3.5 shrink-0 text-secondary" />}
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {it.desc ?? it.category} · <Star className="inline h-3 w-3 fill-accent text-accent" /> {it.rating}
                        </p>
                      </div>
                      <span className="shrink-0 font-display font-bold text-primary">{INR(it.price)}</span>
                    </div>

                    <div className="mt-3 flex items-center gap-3">
                      <button
                        onClick={() => cartStore.add(it.name)}
                        className="btn-primary hover:btn-primary-hover inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em]"
                      >
                        {qty > 0 ? <><Check className="h-3 w-3" /> Added</> : <><Plus className="h-3 w-3" /> Add</>}
                      </button>
                      {qty > 0 && (
                        <span className="text-xs text-muted-foreground">
                          {qty} in cart ·{" "}
                          <button onClick={() => cartStore.remove(it.name)} className="underline hover:text-primary">remove</button>
                        </span>
                      )}
                      {it.popular && <span className="ml-auto bg-accent px-2 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-charcoal">Bestseller</span>}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}

        <div className="mt-16 border-t border-border pt-10 text-center">
          <p className="text-sm text-muted-foreground">Prefer ordering by phone or WhatsApp?</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <a href={`tel:${restaurant.phone}`} className="btn-ghost hover:btn-ghost-hover rounded-full px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.16em]">
              Call {restaurant.phoneDisplay}
            </a>
            <Link to="/" hash="location" className="btn-primary hover:btn-primary-hover inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.16em]">
              Visit the restaurant <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
      <FloatingActions />
    </main>
  );
}
