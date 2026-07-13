import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { Search, Plus, Minus, Star, Leaf, Flame, ShoppingBag } from "lucide-react";

import burgerImg from "@/assets/burger.jpg";
import pizzaImg from "@/assets/pizza.jpg";
import sandwichImg from "@/assets/sandwich.jpg";
import wrapImg from "@/assets/wrap.jpg";
import shakeImg from "@/assets/shake.jpg";
import sundaeImg from "@/assets/sundae.jpg";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Burger Grand" },
      { name: "description", content: "Browse the full Burger Grand menu: burgers, pizzas, sandwiches, wraps, shakes, sundaes, beverages and combos." },
      { property: "og:title", content: "Menu — Burger Grand" },
      { property: "og:description", content: "Handcrafted burgers, wood-fired pizzas, shakes and sundaes." },
    ],
  }),
  component: MenuPage,
});

type Item = {
  name: string; price: number; desc: string; img: string;
  category: string; veg: boolean; spicy?: boolean; popular?: boolean; rating: number;
};

const items: Item[] = [
  // Burgers
  { name: "Classic Cheeseburger", price: 8.5, desc: "Beef patty, cheddar, pickles, house sauce.", img: burgerImg, category: "Burgers", veg: false, rating: 4.8, popular: true },
  { name: "Signature Grand Burger", price: 12.9, desc: "Double Angus, bacon jam, aged cheddar.", img: burgerImg, category: "Burgers", veg: false, rating: 4.9, popular: true },
  { name: "Spicy Chicken Burger", price: 10.9, desc: "Crispy chicken, jalapeño mayo, slaw.", img: burgerImg, category: "Burgers", veg: false, spicy: true, rating: 4.7 },
  { name: "Veggie Delight Burger", price: 9.5, desc: "House patty, avocado, tomato, greens.", img: burgerImg, category: "Burgers", veg: true, rating: 4.6 },

  // Pizza
  { name: "Margherita", price: 14.5, desc: "Tomato, fior di latte, basil, olive oil.", img: pizzaImg, category: "Pizza", veg: true, rating: 4.8, popular: true },
  { name: "Loaded Veg", price: 15.9, desc: "Bell peppers, olives, corn, jalapeños.", img: pizzaImg, category: "Pizza", veg: true, rating: 4.7 },
  { name: "BBQ Chicken", price: 16.9, desc: "Smoked chicken, BBQ sauce, red onion.", img: pizzaImg, category: "Pizza", veg: false, rating: 4.8 },
  { name: "Diavola", price: 15.5, desc: "Spicy pepperoni, mozzarella, chili oil.", img: pizzaImg, category: "Pizza", veg: false, spicy: true, rating: 4.7 },

  // Sandwiches
  { name: "Club Sandwich", price: 10.5, desc: "Chicken, bacon, cheese, veggies.", img: sandwichImg, category: "Sandwiches", veg: false, rating: 4.7, popular: true },
  { name: "Grilled Cheese", price: 7.9, desc: "Three-cheese melt on sourdough.", img: sandwichImg, category: "Sandwiches", veg: true, rating: 4.6 },
  { name: "Chicken Sub", price: 9.5, desc: "Herbed chicken, lettuce, aioli.", img: sandwichImg, category: "Sandwiches", veg: false, rating: 4.5 },

  // Wraps
  { name: "Mexican Wrap", price: 9.9, desc: "Spiced chicken, chipotle, avocado.", img: wrapImg, category: "Wraps", veg: false, spicy: true, rating: 4.6 },
  { name: "Paneer Tikka Wrap", price: 9.5, desc: "Grilled paneer, mint yogurt.", img: wrapImg, category: "Wraps", veg: true, rating: 4.6 },
  { name: "Falafel Wrap", price: 8.9, desc: "Crispy falafel, hummus, tahini.", img: wrapImg, category: "Wraps", veg: true, rating: 4.5 },

  // Shakes
  { name: "Oreo Shake", price: 6.5, desc: "Vanilla soft-serve, Oreo, whipped cream.", img: shakeImg, category: "Shakes", veg: true, rating: 4.9, popular: true },
  { name: "Chocolate Shake", price: 6.2, desc: "Dark chocolate, milk, whipped cream.", img: shakeImg, category: "Shakes", veg: true, rating: 4.8 },
  { name: "Strawberry Shake", price: 6.2, desc: "Fresh strawberry, vanilla ice cream.", img: shakeImg, category: "Shakes", veg: true, rating: 4.7 },

  // Sundaes
  { name: "Hot Fudge Sundae", price: 7.2, desc: "Vanilla, fudge, nuts, cherry.", img: sundaeImg, category: "Sundaes", veg: true, rating: 4.9, popular: true },
  { name: "Chocolate Brownie Sundae", price: 7.9, desc: "Warm brownie, ice cream, sauce.", img: sundaeImg, category: "Sundaes", veg: true, rating: 4.8 },
  { name: "Berry Bliss Sundae", price: 7.5, desc: "Mixed berries, vanilla, granola.", img: sundaeImg, category: "Sundaes", veg: true, rating: 4.6 },

  // Beverages
  { name: "Fresh Lemonade", price: 3.5, desc: "House-pressed lemon, mint.", img: shakeImg, category: "Beverages", veg: true, rating: 4.6 },
  { name: "Iced Coffee", price: 4.2, desc: "Cold brew over ice.", img: shakeImg, category: "Beverages", veg: true, rating: 4.5 },
  { name: "Soft Drink", price: 2.5, desc: "Coke, Sprite or Fanta.", img: shakeImg, category: "Beverages", veg: true, rating: 4.3 },

  // Combos
  { name: "Grand Combo", price: 18.9, desc: "Signature burger + fries + shake.", img: burgerImg, category: "Combos", veg: false, rating: 4.9, popular: true },
  { name: "Pizza Party Combo", price: 24.9, desc: "Any large pizza + 2 drinks.", img: pizzaImg, category: "Combos", veg: true, rating: 4.7 },
  { name: "Family Feast", price: 39.9, desc: "2 burgers, 1 pizza, 2 shakes, fries.", img: burgerImg, category: "Combos", veg: false, rating: 4.8 },

  // Extras
  { name: "Loaded Fries", price: 5.5, desc: "Cheese, bacon, jalapeños, sauce.", img: sandwichImg, category: "Extras", veg: false, rating: 4.7 },
  { name: "Onion Rings", price: 4.5, desc: "Beer-battered, crispy, golden.", img: sandwichImg, category: "Extras", veg: true, rating: 4.5 },
  { name: "Mozzarella Sticks", price: 5.9, desc: "With marinara dipping sauce.", img: sandwichImg, category: "Extras", veg: true, rating: 4.6 },
];

const categories = ["All", "Burgers", "Pizza", "Sandwiches", "Wraps", "Shakes", "Sundaes", "Beverages", "Combos", "Extras"];

function MenuPage() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const [cart, setCart] = useState<Record<string, number>>({});

  const filtered = useMemo(
    () =>
      items.filter(
        (i) =>
          (cat === "All" || i.category === cat) &&
          i.name.toLowerCase().includes(q.toLowerCase())
      ),
    [cat, q]
  );

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const add = (name: string) => setCart((c) => ({ ...c, [name]: (c[name] ?? 0) + 1 }));
  const sub = (name: string) => setCart((c) => {
    const n = (c[name] ?? 0) - 1;
    const { [name]: _, ...rest } = c;
    void _;
    return n <= 0 ? rest : { ...c, [name]: n };
  });

  return (
    <main className="relative min-h-screen bg-background pt-32 text-white">
      {/* backdrop */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[600px] opacity-70" style={{ background: "var(--gradient-hero)" }} />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-accent">Our menu</span>
          <h1 className="mt-4 font-display text-5xl font-black sm:text-6xl md:text-7xl">
            The full <span className="text-gradient-fire">Grand</span> menu.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-white/60">
            Every item is made to order with premium ingredients. Filter, search and add to cart.
          </p>
        </motion.div>

        {/* Search */}
        <div className="mx-auto mt-10 max-w-xl">
          <div className="group relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40 transition group-focus-within:text-accent" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search dishes..."
              className="w-full rounded-full border border-white/10 bg-white/5 py-4 pl-12 pr-6 text-white placeholder:text-white/40 backdrop-blur focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40"
            />
          </div>
        </div>

        {/* Category tabs */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`relative rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                cat === c
                  ? "text-white shadow-glow"
                  : "text-white/60 hover:text-white glass"
              }`}
              style={cat === c ? { background: "var(--gradient-fire)" } : undefined}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((it) => {
              const qty = cart[it.name] ?? 0;
              return (
                <motion.div
                  key={it.name}
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  className="group relative flex flex-col overflow-hidden rounded-3xl glass"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={it.img} alt={it.name} loading="lazy" width={800} height={600} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute left-3 top-3 flex gap-2">
                      {it.popular && (
                        <span className="rounded-full bg-[image:var(--gradient-fire)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-glow">
                          Popular
                        </span>
                      )}
                      {it.spicy && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-primary/90 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                          <Flame className="h-3 w-3" /> Spicy
                        </span>
                      )}
                    </div>
                    <div className="absolute right-3 top-3 flex items-center gap-1">
                      <span
                        title={it.veg ? "Vegetarian" : "Non-vegetarian"}
                        className={`grid h-6 w-6 place-items-center rounded border ${
                          it.veg ? "border-green-400/60 bg-green-400/10" : "border-red-400/60 bg-red-400/10"
                        }`}
                      >
                        {it.veg ? <Leaf className="h-3 w-3 text-green-400" /> : <span className="h-2 w-2 rounded-full bg-red-400" />}
                      </span>
                      <div className="ml-1 inline-flex items-center gap-1 rounded-full glass px-2 py-1 text-xs font-semibold">
                        <Star className="h-3 w-3 fill-accent text-accent" /> {it.rating}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-display text-lg font-bold text-white">{it.name}</h3>
                      <div className="whitespace-nowrap font-display text-lg font-bold text-accent">
                        ${it.price.toFixed(2)}
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-white/60">{it.desc}</p>

                    <div className="mt-auto pt-5">
                      {qty === 0 ? (
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => add(it.name)}
                          className="flex w-full items-center justify-center gap-2 rounded-full bg-white/5 py-2.5 text-sm font-semibold transition hover:bg-[image:var(--gradient-fire)] hover:shadow-glow"
                        >
                          <Plus className="h-4 w-4" /> Add to cart
                        </motion.button>
                      ) : (
                        <div className="flex items-center justify-between rounded-full bg-[image:var(--gradient-fire)] p-1 shadow-glow">
                          <button onClick={() => sub(it.name)} className="grid h-9 w-9 place-items-center rounded-full bg-black/20 text-white hover:bg-black/40">
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="font-display text-base font-bold text-white">{qty}</span>
                          <button onClick={() => add(it.name)} className="grid h-9 w-9 place-items-center rounded-full bg-black/20 text-white hover:bg-black/40">
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="mt-20 text-center text-white/50">
            No dishes match your search.
          </div>
        )}
      </div>

      {/* floating cart */}
      <AnimatePresence>
        {cartCount > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2"
          >
            <div className="flex items-center gap-4 rounded-full glass px-4 py-2 pl-6 shadow-glow">
              <div className="flex items-center gap-2 text-sm text-white">
                <ShoppingBag className="h-4 w-4 text-accent" />
                <span className="font-semibold">{cartCount} item{cartCount > 1 ? "s" : ""}</span>
              </div>
              <button className="btn-glow hover:btn-glow-hover rounded-full px-5 py-2 text-sm font-semibold">
                Checkout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-32">
        <SiteFooter />
      </div>
    </main>
  );
}
