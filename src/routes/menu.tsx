import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { Search, Plus, Minus, Star, Leaf, Flame, ShoppingBag, X, Check, MapPin, Phone } from "lucide-react";

import burgerImg from "@/assets/burger.jpg";
import pizzaImg from "@/assets/pizza.jpg";
import sandwichImg from "@/assets/sandwich.jpg";
import wrapImg from "@/assets/wrap.jpg";
import shakeImg from "@/assets/shake.jpg";
import sundaeImg from "@/assets/sundae.jpg";
import { SiteFooter } from "@/components/site-footer";
import { ordersStore } from "@/lib/orders-store";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Burger Grand" },
      { name: "description", content: "Browse the full Burger Grand menu — burgers, pizzas, wraps, sandwiches, shakes, sundaes and more." },
    ],
  }),
  component: MenuPage,
});

type Item = {
  name: string; price: number; desc?: string; img: string;
  category: string; veg: boolean; spicy?: boolean; popular?: boolean; rating: number;
};

const items: Item[] = [
  // Burger
  { name: "Yummy Burger", price: 40, img: burgerImg, category: "Burger", veg: true, rating: 4.5 },
  { name: "Aloo Tikki Burger", price: 45, img: burgerImg, category: "Burger", veg: true, rating: 4.6 },
  { name: "Veg Burger", price: 50, img: burgerImg, category: "Burger", veg: true, rating: 4.5 },
  { name: "Veg Cheese Burger", price: 60, img: burgerImg, category: "Burger", veg: true, rating: 4.7 },
  { name: "Spicy Cheese Burger", price: 60, img: burgerImg, category: "Burger", veg: true, spicy: true, rating: 4.6 },
  { name: "Green Veggi Burger", price: 60, img: burgerImg, category: "Burger", veg: true, rating: 4.5 },
  { name: "Achari Burger", price: 60, img: burgerImg, category: "Burger", veg: true, rating: 4.5 },
  { name: "Loaded Burger", price: 65, img: burgerImg, category: "Burger", veg: true, rating: 4.7, popular: true },
  { name: "Cheese Loaded Burger", price: 70, img: burgerImg, category: "Burger", veg: true, rating: 4.8, popular: true },
  { name: "Double Slice Cheese Burger", price: 75, img: burgerImg, category: "Burger", veg: true, rating: 4.7 },
  { name: "Grand Spl Burger", price: 90, img: burgerImg, category: "Burger", veg: true, rating: 4.9, popular: true },
  { name: "Spicy Paneer Burger", price: 80, img: burgerImg, category: "Burger", veg: true, spicy: true, rating: 4.6 },
  { name: "Pizza Burger", price: 90, img: burgerImg, category: "Burger", veg: true, rating: 4.7 },
  { name: "Veg Whopper Burger", price: 85, img: burgerImg, category: "Burger", veg: true, rating: 4.6 },
  { name: "Maharaja Burger", price: 90, img: burgerImg, category: "Burger", veg: true, rating: 4.8 },
  { name: "Loaded Paneer Burger", price: 120, img: burgerImg, category: "Burger", veg: true, rating: 4.8 },

  // Grilled Burger
  { name: "Grilled Veg Burger", price: 60, img: burgerImg, category: "Grilled Burger", veg: true, rating: 4.5 },
  { name: "Grilled Cheese Burger", price: 70, img: burgerImg, category: "Grilled Burger", veg: true, rating: 4.6 },
  { name: "Grilled Spicy Cheese Burger", price: 80, img: burgerImg, category: "Grilled Burger", veg: true, spicy: true, rating: 4.6 },
  { name: "Grilled Cheese Paneer Burger", price: 90, img: burgerImg, category: "Grilled Burger", veg: true, rating: 4.7 },

  // Chicken Burgers
  { name: "Egg Burger", price: 70, img: burgerImg, category: "Chicken Burgers", veg: false, rating: 4.5 },
  { name: "Chicken Burger", price: 80, img: burgerImg, category: "Chicken Burgers", veg: false, rating: 4.7 },
  { name: "Cheese Chicken Burger", price: 90, img: burgerImg, category: "Chicken Burgers", veg: false, rating: 4.8, popular: true },
  { name: "Spicy Chicken Burger", price: 90, img: burgerImg, category: "Chicken Burgers", veg: false, spicy: true, rating: 4.7 },
  { name: "Chicken Pizza Burger", price: 120, img: burgerImg, category: "Chicken Burgers", veg: false, rating: 4.7 },
  { name: "Grand Chicken Burger", price: 120, img: burgerImg, category: "Chicken Burgers", veg: false, rating: 4.8 },
  { name: "Double Chicken Burger", price: 120, img: burgerImg, category: "Chicken Burgers", veg: false, rating: 4.8 },
  { name: "Chicken Whopper", price: 140, img: burgerImg, category: "Chicken Burgers", veg: false, rating: 4.8 },

  // Wrap Roll
  { name: "Aloo Wrap", price: 70, img: wrapImg, category: "Wrap Roll", veg: true, rating: 4.5 },
  { name: "Hara-Bhara Wrap", price: 80, img: wrapImg, category: "Wrap Roll", veg: true, rating: 4.6 },
  { name: "Paneer Wrap", price: 100, img: wrapImg, category: "Wrap Roll", veg: true, rating: 4.7 },
  { name: "Chaap Wrap", price: 100, img: wrapImg, category: "Wrap Roll", veg: true, rating: 4.6 },
  { name: "Egg Wrap", price: 80, img: wrapImg, category: "Wrap Roll", veg: false, rating: 4.6 },
  { name: "Chicken Wrap", price: 100, img: wrapImg, category: "Wrap Roll", veg: false, rating: 4.8, popular: true },
  { name: "Double Chicken Wrap", price: 160, img: wrapImg, category: "Wrap Roll", veg: false, rating: 4.8 },
  { name: "Double Paneer Wrap", price: 160, img: wrapImg, category: "Wrap Roll", veg: true, rating: 4.7 },

  // Grilled Sandwich
  { name: "Veg Coleslaw Sandwich", price: 60, img: sandwichImg, category: "Grilled Sandwich", veg: true, rating: 4.5 },
  { name: "Veggie Sandwich", price: 80, img: sandwichImg, category: "Grilled Sandwich", veg: true, rating: 4.6 },
  { name: "Veg Patty Sandwich", price: 80, img: sandwichImg, category: "Grilled Sandwich", veg: true, rating: 4.6 },
  { name: "Hara-Bhara Sandwich", price: 90, img: sandwichImg, category: "Grilled Sandwich", veg: true, rating: 4.6 },
  { name: "Onion Tomato Sandwich", price: 90, img: sandwichImg, category: "Grilled Sandwich", veg: true, rating: 4.4 },
  { name: "Paneer Sandwich", price: 100, img: sandwichImg, category: "Grilled Sandwich", veg: true, rating: 4.7 },
  { name: "Grand Spl Sandwich", price: 100, img: sandwichImg, category: "Grilled Sandwich", veg: true, rating: 4.8, popular: true },
  { name: "Chicken Sandwich", price: 120, img: sandwichImg, category: "Grilled Sandwich", veg: false, rating: 4.7 },
  { name: "Bombay Sandwich", price: 140, img: sandwichImg, category: "Grilled Sandwich", veg: true, rating: 4.7 },

  // Garlic Bread
  { name: "Spicy Garlic Bread", price: 70, img: sandwichImg, category: "Garlic Bread", veg: true, spicy: true, rating: 4.5 },
  { name: "Cheese Garlic Bread", price: 80, img: sandwichImg, category: "Garlic Bread", veg: true, rating: 4.7, popular: true },
  { name: "Veg Cheese Garlic Bread", price: 90, img: sandwichImg, category: "Garlic Bread", veg: true, rating: 4.7 },
  { name: "Paneer Garlic Bread", price: 100, img: sandwichImg, category: "Garlic Bread", veg: true, rating: 4.7 },
  { name: "Grand Spl Garlic Bread", price: 120, img: sandwichImg, category: "Garlic Bread", veg: true, rating: 4.8 },
  { name: "Chicken Garlic Bread", price: 130, img: sandwichImg, category: "Garlic Bread", veg: false, rating: 4.7 },

  // Pizza (Regular price)
  { name: "Plain Pizza", price: 140, img: pizzaImg, category: "Pizza", veg: true, rating: 4.5 },
  { name: "Onion and Capsicum Pizza", price: 150, img: pizzaImg, category: "Pizza", veg: true, rating: 4.6 },
  { name: "Cheese Tomato Pizza", price: 150, img: pizzaImg, category: "Pizza", veg: true, rating: 4.6 },
  { name: "Sweet Corn with Jalapeno Pizza", price: 150, img: pizzaImg, category: "Pizza", veg: true, spicy: true, rating: 4.6 },
  { name: "Mushroom and Capsicum Pizza", price: 180, img: pizzaImg, category: "Pizza", veg: true, rating: 4.7 },
  { name: "Loaded Paneer Pizza", price: 190, img: pizzaImg, category: "Pizza", veg: true, rating: 4.8, popular: true },
  { name: "Punjabi Paneer Pizza", price: 190, img: pizzaImg, category: "Pizza", veg: true, rating: 4.7 },
  { name: "Tandoori Paneer Pizza", price: 190, img: pizzaImg, category: "Pizza", veg: true, rating: 4.7 },
  { name: "Pasta Pizza", price: 200, img: pizzaImg, category: "Pizza", veg: true, rating: 4.6 },
  { name: "Grand Spl Pizza", price: 220, img: pizzaImg, category: "Pizza", veg: true, rating: 4.9, popular: true },
  { name: "Makhani Pizza", price: 220, img: pizzaImg, category: "Pizza", veg: true, rating: 4.7 },

  // Chicken Pizza
  { name: "BBQ Chicken Pizza", price: 220, img: pizzaImg, category: "Chicken Pizza", veg: false, rating: 4.8, popular: true },
  { name: "Chicken with Golden Corn Pizza", price: 220, img: pizzaImg, category: "Chicken Pizza", veg: false, rating: 4.7 },
  { name: "Tandoori Chicken Pizza", price: 230, img: pizzaImg, category: "Chicken Pizza", veg: false, rating: 4.8 },
  { name: "Non-Veg Supreme Pizza", price: 250, img: pizzaImg, category: "Chicken Pizza", veg: false, rating: 4.8 },

  // Mocktail
  { name: "Fresh Lime", price: 50, img: shakeImg, category: "Mocktail", veg: true, rating: 4.5 },
  { name: "Mint Mojito", price: 60, img: shakeImg, category: "Mocktail", veg: true, rating: 4.7, popular: true },
  { name: "Blue-Crasho", price: 60, img: shakeImg, category: "Mocktail", veg: true, rating: 4.6 },
  { name: "Water Melon", price: 60, img: shakeImg, category: "Mocktail", veg: true, rating: 4.5 },
  { name: "Green Apple", price: 60, img: shakeImg, category: "Mocktail", veg: true, rating: 4.5 },
  { name: "Orange", price: 60, img: shakeImg, category: "Mocktail", veg: true, rating: 4.5 },
  { name: "Virgin Mojito", price: 80, img: shakeImg, category: "Mocktail", veg: true, rating: 4.7 },

  // Fries
  { name: "Plain Fries", price: 70, img: sandwichImg, category: "Fries", veg: true, rating: 4.5 },
  { name: "Masala Fries", price: 80, img: sandwichImg, category: "Fries", veg: true, rating: 4.6 },
  { name: "Cheese Loaded Fries", price: 100, img: sandwichImg, category: "Fries", veg: true, rating: 4.8, popular: true },
  { name: "Jelopeno Fries", price: 100, img: sandwichImg, category: "Fries", veg: true, spicy: true, rating: 4.6 },
  { name: "Pizza Pocket", price: 100, img: pizzaImg, category: "Fries", veg: true, rating: 4.6 },
  { name: "Chicken Finger", price: 140, img: sandwichImg, category: "Fries", veg: false, rating: 4.7 },

  // Dip
  { name: "Cheese Dip", price: 30, img: sandwichImg, category: "Dip", veg: true, rating: 4.5 },
  { name: "Tandoori Dip", price: 30, img: sandwichImg, category: "Dip", veg: true, rating: 4.5 },
  { name: "Chilli Garlic Dip", price: 30, img: sandwichImg, category: "Dip", veg: true, spicy: true, rating: 4.6 },
  { name: "Peri-Peri Dip", price: 30, img: sandwichImg, category: "Dip", veg: true, spicy: true, rating: 4.6 },

  // Ice-Cream Shakes (Large price)
  { name: "Vanilla Shake", price: 100, img: shakeImg, category: "Shakes", veg: true, rating: 4.6 },
  { name: "Strawberry Shake", price: 100, img: shakeImg, category: "Shakes", veg: true, rating: 4.7 },
  { name: "Butter Scotch Shake", price: 100, img: shakeImg, category: "Shakes", veg: true, rating: 4.7 },
  { name: "Black Current Shake", price: 100, img: shakeImg, category: "Shakes", veg: true, rating: 4.6 },
  { name: "Cold Coffee", price: 100, img: shakeImg, category: "Shakes", veg: true, rating: 4.8, popular: true },
  { name: "Rose Shake", price: 100, img: shakeImg, category: "Shakes", veg: true, rating: 4.5 },
  { name: "Pineapple Shake", price: 100, img: shakeImg, category: "Shakes", veg: true, rating: 4.5 },
  { name: "Mango Shake", price: 100, img: shakeImg, category: "Shakes", veg: true, rating: 4.7 },
  { name: "Banana Shake", price: 100, img: shakeImg, category: "Shakes", veg: true, rating: 4.5 },
  { name: "Lichi Shake", price: 100, img: shakeImg, category: "Shakes", veg: true, rating: 4.6 },
  { name: "Chocolate Shake", price: 100, img: shakeImg, category: "Shakes", veg: true, rating: 4.8 },

  // Premium Thick Shakes
  { name: "Chocolate Hazelnut Shake", price: 130, img: shakeImg, category: "Premium Shakes", veg: true, rating: 4.8, popular: true },
  { name: "Mint Oreo Shake", price: 130, img: shakeImg, category: "Premium Shakes", veg: true, rating: 4.7 },
  { name: "Chocolate Peanut Butter Shake", price: 130, img: shakeImg, category: "Premium Shakes", veg: true, rating: 4.8 },
  { name: "Choco Strawberry Shake", price: 130, img: shakeImg, category: "Premium Shakes", veg: true, rating: 4.7 },
  { name: "Tutti Frutti Shake", price: 130, img: shakeImg, category: "Premium Shakes", veg: true, rating: 4.6 },
  { name: "Choco Mocha Shake", price: 130, img: shakeImg, category: "Premium Shakes", veg: true, rating: 4.7 },
  { name: "Bubblegum Shake", price: 130, img: shakeImg, category: "Premium Shakes", veg: true, rating: 4.6 },
  { name: "Kit Kat Shake", price: 130, img: shakeImg, category: "Premium Shakes", veg: true, rating: 4.8 },
  { name: "Choco Chip Shake", price: 130, img: shakeImg, category: "Premium Shakes", veg: true, rating: 4.7 },
  { name: "Choco Oreo Shake", price: 130, img: shakeImg, category: "Premium Shakes", veg: true, rating: 4.8, popular: true },
  { name: "Belgian Brownie Shake", price: 140, img: shakeImg, category: "Premium Shakes", veg: true, rating: 4.8 },
  { name: "Dark Oreo Shake", price: 140, img: shakeImg, category: "Premium Shakes", veg: true, rating: 4.7 },
  { name: "Hazelnut Coffee Shake", price: 140, img: shakeImg, category: "Premium Shakes", veg: true, rating: 4.7 },
  { name: "Red Velvet Shake", price: 140, img: shakeImg, category: "Premium Shakes", veg: true, rating: 4.8 },

  // Sundae
  { name: "Brownie with Chocolate Sos", price: 70, img: sundaeImg, category: "Sundae", veg: true, rating: 4.7 },
  { name: "Brownie Sundae", price: 90, img: sundaeImg, category: "Sundae", veg: true, rating: 4.8, popular: true },
  { name: "Hot Chocolate Fudge", price: 90, img: sundaeImg, category: "Sundae", veg: true, rating: 4.9, popular: true },
  { name: "Strawberry Sundae", price: 90, img: sundaeImg, category: "Sundae", veg: true, rating: 4.7 },
  { name: "Blueberry Sundae", price: 90, img: sundaeImg, category: "Sundae", veg: true, rating: 4.7 },
  { name: "Mango Punch", price: 90, img: sundaeImg, category: "Sundae", veg: true, rating: 4.6 },
  { name: "Pineapple Sundae", price: 90, img: sundaeImg, category: "Sundae", veg: true, rating: 4.6 },
  { name: "Fruit Sundae", price: 100, img: sundaeImg, category: "Sundae", veg: true, rating: 4.7 },
  { name: "Carmel Mocha Sundae", price: 100, img: sundaeImg, category: "Sundae", veg: true, rating: 4.8 },
  { name: "Kit-Kat Sundae", price: 100, img: sundaeImg, category: "Sundae", veg: true, rating: 4.8 },
  { name: "Chocolate Devine", price: 100, img: sundaeImg, category: "Sundae", veg: true, rating: 4.8 },
  { name: "Grand Spl Sundae", price: 150, img: sundaeImg, category: "Sundae", veg: true, rating: 4.9, popular: true },

  // Combos
  { name: "Double Treat Combo", price: 199, img: burgerImg, category: "Combos", veg: true, rating: 4.8, popular: true, desc: "Includes topping pizza" },
  { name: "Burger Combo Value Meal", price: 149, img: burgerImg, category: "Combos", veg: true, rating: 4.7, popular: true, desc: "Veg cheese burger + fries + drink" },
  { name: "Jhatpat Combo", price: 99, img: burgerImg, category: "Combos", veg: true, rating: 4.6, desc: "Veg burger + mint mojito" },
];

const categories = [
  "All", "Burger", "Grilled Burger", "Chicken Burgers", "Wrap Roll",
  "Grilled Sandwich", "Garlic Bread", "Pizza", "Chicken Pizza",
  "Mocktail", "Fries", "Dip", "Shakes", "Premium Shakes", "Sundae", "Combos",
];

const INR = (n: number) => `₹${n.toFixed(0)}`;

function MenuPage() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [placed, setPlaced] = useState(false);

  const filtered = useMemo(
    () =>
      items.filter(
        (i) =>
          (cat === "All" || i.category === cat) &&
          i.name.toLowerCase().includes(q.toLowerCase())
      ),
    [cat, q]
  );

  const priceOf = (name: string) => items.find((i) => i.name === name)?.price ?? 0;
  const cartLines = Object.entries(cart).map(([name, qty]) => ({ name, qty, price: priceOf(name), total: priceOf(name) * qty }));
  const cartCount = cartLines.reduce((a, l) => a + l.qty, 0);
  const subtotal = cartLines.reduce((a, l) => a + l.total, 0);
  const tax = Math.round(subtotal * 0.05); // 5% GST
  const delivery = subtotal > 0 && subtotal < 300 ? 30 : 0;
  const grandTotal = subtotal + tax + delivery;

  const add = (name: string) => setCart((c) => ({ ...c, [name]: (c[name] ?? 0) + 1 }));
  const sub = (name: string) => setCart((c) => {
    const n = (c[name] ?? 0) - 1;
    const { [name]: _, ...rest } = c;
    void _;
    return n <= 0 ? rest : { ...c, [name]: n };
  });
  const clearCart = () => setCart({});

  return (
    <main className="relative min-h-screen bg-background pt-32 text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[600px] opacity-70" style={{ background: "var(--gradient-hero)" }} />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-accent">Our menu</span>
          <h1 className="mt-4 font-display text-5xl font-black sm:text-6xl md:text-7xl">
            The full <span className="text-gradient-fire">Grand</span> menu.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-white/60">
            Every item made to order with premium ingredients. Filter, search and add to cart.
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
                cat === c ? "text-white shadow-glow" : "text-white/60 hover:text-white glass"
              }`}
              style={cat === c ? { background: "var(--gradient-fire)" } : undefined}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="mt-14 grid gap-6 pb-40 sm:grid-cols-2 lg:grid-cols-3">
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
                        {INR(it.price)}
                      </div>
                    </div>
                    {it.desc && <p className="mt-2 text-sm text-white/60">{it.desc}</p>}

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
          <div className="mt-20 text-center text-white/50">No dishes match your search.</div>
        )}
      </div>

      {/* Floating "View Cart" button — appears after adding to cart */}
      <AnimatePresence>
        {cartCount > 0 && !cartOpen && (
          <motion.button
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 120, opacity: 0 }}
            onClick={() => setCartOpen(true)}
            className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 flex items-center gap-4 rounded-full bg-[image:var(--gradient-fire)] px-6 py-3.5 shadow-glow hover:scale-105 transition"
          >
            <div className="flex items-center gap-2 text-white">
              <ShoppingBag className="h-5 w-5" />
              <span className="font-semibold">View Cart</span>
              <span className="rounded-full bg-black/30 px-2.5 py-0.5 text-xs font-bold">
                {cartCount} item{cartCount > 1 ? "s" : ""}
              </span>
            </div>
            <div className="h-6 w-px bg-white/40" />
            <span className="font-display text-lg font-bold text-white">{INR(subtotal)}</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Cart / Billing Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 260 }}
              className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-[oklch(0.11_0.01_20)] border-l border-white/10 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 p-5">
                <div>
                  <div className="text-xs uppercase tracking-[0.3em] text-accent">Your order</div>
                  <h3 className="font-display text-2xl font-bold text-white">Billing Details</h3>
                </div>
                <button onClick={() => setCartOpen(false)} className="grid h-10 w-10 place-items-center rounded-full glass text-white hover:bg-white/10">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {placed ? (
                <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
                  <div className="grid h-20 w-20 place-items-center rounded-full bg-[image:var(--gradient-fire)] shadow-glow">
                    <Check className="h-10 w-10 text-white" />
                  </div>
                  <h4 className="font-display text-3xl font-black text-white">Order Placed! 🔥</h4>
                  <p className="max-w-xs text-white/70">Your delicious food is being prepared. Estimated delivery in 25–30 minutes.</p>
                  <button
                    onClick={() => { setPlaced(false); clearCart(); setCartOpen(false); }}
                    className="btn-glow hover:btn-glow-hover mt-4 rounded-full px-6 py-3 text-sm font-semibold"
                  >
                    Continue Ordering
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex-1 overflow-y-auto p-5">
                    <div className="space-y-3">
                      {cartLines.map((l) => (
                        <div key={l.name} className="flex items-center gap-3 rounded-2xl glass p-3">
                          <img src={items.find((i) => i.name === l.name)?.img} alt="" className="h-14 w-14 rounded-xl object-cover" />
                          <div className="flex-1 min-w-0">
                            <div className="truncate font-semibold text-white">{l.name}</div>
                            <div className="text-xs text-white/50">{INR(l.price)} × {l.qty}</div>
                          </div>
                          <div className="flex items-center gap-2 rounded-full bg-white/5 p-1">
                            <button onClick={() => sub(l.name)} className="grid h-7 w-7 place-items-center rounded-full bg-white/10 hover:bg-white/20"><Minus className="h-3 w-3" /></button>
                            <span className="min-w-[1.5rem] text-center text-sm font-bold">{l.qty}</span>
                            <button onClick={() => add(l.name)} className="grid h-7 w-7 place-items-center rounded-full bg-white/10 hover:bg-white/20"><Plus className="h-3 w-3" /></button>
                          </div>
                          <div className="w-16 text-right font-display font-bold text-accent">{INR(l.total)}</div>
                        </div>
                      ))}
                    </div>

                    {/* Billing summary */}
                    <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                      <h4 className="font-display text-lg font-bold text-white">Bill Summary</h4>
                      <div className="mt-4 space-y-2 text-sm">
                        <Row label={`Item total (${cartCount} item${cartCount > 1 ? "s" : ""})`} value={INR(subtotal)} />
                        <Row label="GST (5%)" value={INR(tax)} />
                        <Row label="Delivery fee" value={delivery === 0 ? "FREE" : INR(delivery)} accent={delivery === 0} />
                        {subtotal > 0 && subtotal < 300 && (
                          <div className="mt-2 rounded-lg bg-accent/10 px-3 py-2 text-xs text-accent">
                            Add {INR(300 - subtotal)} more for free delivery!
                          </div>
                        )}
                      </div>
                      <div className="mt-4 border-t border-white/10 pt-4 flex items-center justify-between">
                        <span className="font-display text-lg font-bold text-white">Grand Total</span>
                        <span className="font-display text-2xl font-black text-gradient-fire">{INR(grandTotal)}</span>
                      </div>
                    </div>

                    {/* Delivery info */}
                    <div className="mt-4 rounded-2xl glass p-4 text-xs text-white/60">
                      <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-accent" /> Shop No 1, Plot No 18, Gulaab Bagh, Nawada Metro Station</div>
                      <div className="mt-1 flex items-center gap-2"><Phone className="h-4 w-4 text-accent" /> +91 70656 56537</div>
                    </div>
                  </div>

                  <div className="border-t border-white/10 p-5">
                    <button
                      onClick={() => setPlaced(true)}
                      className="btn-glow hover:btn-glow-hover flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-base font-bold"
                    >
                      Place Order · {INR(grandTotal)}
                    </button>
                    <button onClick={clearCart} className="mt-3 w-full text-center text-xs text-white/50 hover:text-white">
                      Clear cart
                    </button>
                  </div>
                </>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="mt-32">
        <SiteFooter />
      </div>
    </main>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-white/60">{label}</span>
      <span className={`font-semibold ${accent ? "text-green-400" : "text-white"}`}>{value}</span>
    </div>
  );
}
