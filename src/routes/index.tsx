import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Leaf, ChefHat, Truck, Award, Sparkles, Wallet,
  Star, MapPin, Phone, Clock, Mail, ArrowRight, Plus,
  ShoppingBag, Send,
} from "lucide-react";

import heroBg from "@/assets/hero-bg.jpg";
import heroVideo from "@/assets/hero-bg.mp4.asset.json";
import burgerImg from "@/assets/burger.jpg";
import pizzaImg from "@/assets/pizza.jpg";
import sandwichImg from "@/assets/sandwich.jpg";
import wrapImg from "@/assets/wrap.jpg";
import shakeImg from "@/assets/shake.jpg";
import sundaeImg from "@/assets/sundae.jpg";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Burger Grand — Fresh. Hot. Loaded With Flavor." },
      { name: "description", content: "Cinematic dining experience. Handcrafted burgers, pizzas, wraps, shakes and sundaes with premium ingredients — order now." },
    ],
  }),
  component: Home,
});

const stories = [
  { id: "burger",  img: burgerImg,  title: "Grand Spl Burger",       desc: "Our signature stack — loaded patty, cheese, fresh veggies, house sauce in a toasted bun.",       price: "₹90",  tone: "from-[oklch(0.58_0.22_27)] to-[oklch(0.72_0.19_55)]" },
  { id: "pizza",   img: pizzaImg,   title: "Grand Spl Pizza",        desc: "Stone-baked crust loaded with paneer, capsicum, corn, olives and molten mozzarella.",           price: "₹220", tone: "from-[oklch(0.72_0.19_55)] to-[oklch(0.86_0.17_88)]" },
  { id: "sandwich",img: sandwichImg,title: "Grand Spl Sandwich",     desc: "Grilled veggie patty, cheese, coleslaw and garden fresh vegetables between crisp bread.",       price: "₹100", tone: "from-[oklch(0.86_0.17_88)] to-[oklch(0.72_0.19_55)]" },
  { id: "wrap",    img: wrapImg,    title: "Paneer Wrap",            desc: "Spiced paneer, mint mayo, onions and fresh salad rolled in a soft tortilla.",                   price: "₹100", tone: "from-[oklch(0.72_0.19_55)] to-[oklch(0.58_0.22_27)]" },
  { id: "shake",   img: shakeImg,   title: "Chocolate Oreo Shake",   desc: "Thick chocolate shake blended with Oreo cookies, topped with whipped cream and drizzle.",       price: "₹130", tone: "from-[oklch(0.58_0.22_27)] to-[oklch(0.86_0.17_88)]" },
  { id: "sundae",  img: sundaeImg,  title: "Hot Chocolate Fudge",    desc: "Warm chocolate fudge over vanilla ice cream, nuts, whipped cream and a cherry.",                price: "₹90",  tone: "from-[oklch(0.86_0.17_88)] to-[oklch(0.58_0.22_27)]" },
];

const featureImages = [burgerImg, pizzaImg, sandwichImg, wrapImg, shakeImg, sundaeImg];

function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-white">
      <Hero />
      <Marquee />
      <ScrollStory />
      <WhyChoose />
      <Signature />
      <Reviews />
      <Gallery />
      <Delivery />
      <Contact />
      <SiteFooter />
    </main>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const onMove = (e: React.MouseEvent) => {
    const r = wrapRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left - r.width / 2) / r.width);
    my.set((e.clientY - r.top - r.height / 2) / r.height);
  };


  return (
    <section
      ref={wrapRef}
      onMouseMove={onMove}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* Background video — covers hero on all devices, sits behind text */}
      <video
        src={heroVideo.url}
        poster={heroBg}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover"
      />
      {/* Soft vignette from bottom for text legibility (no dark filter over video) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
      />

      {/* steam particles */}
      {[...Array(8)].map((_, i) => (
        <span
          key={i}
          className="pointer-events-none absolute bottom-0 h-24 w-24 rounded-full bg-white/10 blur-2xl"
          style={{
            left: `${(i * 97) % 100}%`,
            animation: `steam ${6 + (i % 4)}s ease-in ${i * 0.6}s infinite`,
          }}
        />
      ))}

      <div className="relative z-10 mx-auto flex w-full max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex max-w-3xl flex-col justify-center pb-16"
        >
          <span className="inline-flex w-fit items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-widest text-accent">
            <Sparkles className="h-3.5 w-3.5" /> Premium kitchen · Since 2014
          </span>

          <h1 className="mt-6 font-display text-5xl font-black leading-[0.95] sm:text-6xl md:text-7xl lg:text-[5.5rem] drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
            Fresh. Hot. <br />
            <span className="text-gradient-fire">Loaded With Flavor.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base text-white/80 sm:text-lg drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
            Handcrafted burgers, wood-fired pizzas, crispy sandwiches, fresh wraps,
            thick shakes and indulgent sundaes — made with premium ingredients,
            served with fire.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/menu"
              className="btn-glow hover:btn-glow-hover group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold animate-pulse-glow"
            >
              Order Now
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="#story"
              className="inline-flex items-center gap-2 rounded-full glass px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              View Menu
            </a>
          </div>

          <div className="mt-12 flex items-center gap-8 text-sm text-white/70">
            <div>
              <div className="font-display text-2xl font-bold text-white">4.9★</div>
              <div>Rating</div>
            </div>
            <div className="h-8 w-px bg-white/20" />
            <div>
              <div className="font-display text-2xl font-bold text-white">200k+</div>
              <div>Meals served</div>
            </div>
            <div className="h-8 w-px bg-white/20" />
            <div>
              <div className="font-display text-2xl font-bold text-white">25 min</div>
              <div>Avg. delivery</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- MARQUEE ---------------- */
function Marquee() {
  const items = ["Handcrafted", "Fresh Daily", "Wood-Fired", "Premium Angus", "Zero Preservatives", "Fast Delivery", "Award Winning"];
  return (
    <div className="relative border-y border-white/10 bg-black py-4">
      <div className="flex overflow-hidden">
        <div className="flex animate-marquee shrink-0 items-center gap-16 pr-16">
          {[...items, ...items].map((t, i) => (
            <span key={i} className="flex items-center gap-3 whitespace-nowrap font-display text-2xl font-bold uppercase tracking-widest text-white/40">
              {t} <span className="text-accent">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- SCROLL STORY ---------------- */
function ScrollStory() {
  return (
    <section id="story" className="relative">
      {stories.map((s, i) => (
        <StorySection key={s.id} s={s} idx={i} />
      ))}
    </section>
  );
}

function StorySection({ s, idx }: { s: (typeof stories)[number]; idx: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-15, 15]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.05, 0.9]);
  const reverse = idx % 2 === 1;

  return (
    <div
      ref={ref}
      className="relative flex min-h-[95vh] items-center overflow-hidden py-24"
    >
      {/* accent glow */}
      <div className={`pointer-events-none absolute -inset-24 bg-gradient-to-br ${s.tone} opacity-[0.12] blur-3xl`} />

      {/* steam */}
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className="pointer-events-none absolute bottom-1/3 h-16 w-16 rounded-full bg-white/10 blur-2xl"
          style={{ left: `${20 + i * 15}%`, animation: `steam ${5 + i}s ease-in ${i * 0.4}s infinite` }}
        />
      ))}

      <div className={`relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
        <motion.div style={{ y }} className="relative flex justify-center">
          <motion.img
            src={s.img}
            alt={s.title}
            width={900}
            height={900}
            loading="lazy"
            style={{ rotate, scale }}
            className="h-[380px] w-[380px] sm:h-[460px] sm:w-[460px] object-contain drop-shadow-[0_30px_60px_oklch(0_0_0/0.6)]"
          />
          <div className={`absolute -inset-8 -z-10 rounded-full bg-gradient-to-br ${s.tone} opacity-25 blur-3xl`} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <span className="font-display text-8xl font-black text-white/5 leading-none">
            0{idx + 1}
          </span>
          <h2 className="-mt-14 font-display text-4xl font-black sm:text-5xl md:text-6xl">
            <span className="text-gradient-fire">{s.title}</span>
          </h2>
          <p className="mt-6 max-w-lg text-lg text-white/70">{s.desc}</p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <div className="font-display text-4xl font-bold text-accent">{s.price}</div>
            <Link
              to="/menu"
              className="btn-glow hover:btn-glow-hover inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
            >
              Order {s.title.split(" ").pop()}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ---------------- WHY ---------------- */
function WhyChoose() {
  const items = [
    { icon: Leaf, title: "Fresh Ingredients", desc: "Sourced daily from local farms." },
    { icon: ChefHat, title: "Handmade Daily", desc: "Every dish crafted by our chefs." },
    { icon: Truck, title: "Fast Delivery", desc: "Hot at your door in under 30 min." },
    { icon: Award, title: "Premium Quality", desc: "Only the finest cuts and cheeses." },
    { icon: Sparkles, title: "Hygienic Kitchen", desc: "Certified safe & spotless." },
    { icon: Wallet, title: "Affordable Prices", desc: "Luxury flavor, everyday value." },
  ];
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-accent">Why Burger Grand</span>
          <h2 className="mt-4 font-display text-4xl font-black sm:text-5xl md:text-6xl">
            Obsessed with <span className="text-gradient-fire">every bite</span>.
          </h2>
        </div>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="group relative overflow-hidden rounded-3xl glass p-8 transition hover:-translate-y-2 hover:shadow-glow"
            >
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity group-hover:opacity-70"
                   style={{ background: "var(--gradient-fire)" }} />
              <div className="relative grid h-14 w-14 place-items-center rounded-2xl bg-[image:var(--gradient-fire)] shadow-glow">
                <f.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="relative mt-6 font-display text-xl font-bold text-white">{f.title}</h3>
              <p className="relative mt-2 text-sm text-white/60">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- SIGNATURE ---------------- */
const signature = [
  { name: "Grand Spl Burger", img: burgerImg, price: 90, rating: 4.9, tag: "Best Seller" },
  { name: "Grand Spl Pizza", img: pizzaImg, price: 220, rating: 4.9, tag: "Chef's Pick" },
  { name: "Loaded Paneer Pizza", img: pizzaImg, price: 190, rating: 4.8 },
  { name: "Cheese Chicken Burger", img: burgerImg, price: 90, rating: 4.8, tag: "Popular" },
  { name: "Grand Spl Sandwich", img: sandwichImg, price: 100, rating: 4.8 },
  { name: "Chicken Wrap", img: wrapImg, price: 100, rating: 4.8 },
  { name: "Choco Oreo Shake", img: shakeImg, price: 130, rating: 4.8, tag: "Premium" },
  { name: "Cold Coffee", img: shakeImg, price: 100, rating: 4.8 },
  { name: "Hot Chocolate Fudge", img: sundaeImg, price: 90, rating: 4.9 },
];

function Signature() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-accent">Signature meals</span>
            <h2 className="mt-4 font-display text-4xl font-black sm:text-5xl md:text-6xl">
              The <span className="text-gradient-fire">Grand</span> favourites.
            </h2>
          </div>
          <Link to="/menu" className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:gap-3 transition-all">
            View full menu <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {signature.map((s, i) => (
            <TiltCard key={s.name + i}>
              <div className="group relative overflow-hidden rounded-3xl glass">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={s.img}
                    alt={s.name}
                    width={800}
                    height={600}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  {s.tag && (
                    <span className="absolute left-4 top-4 rounded-full bg-[image:var(--gradient-fire)] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-glow">
                      {s.tag}
                    </span>
                  )}
                  <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full glass px-3 py-1 text-xs font-semibold text-white">
                    <Star className="h-3 w-3 fill-accent text-accent" /> {s.rating}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-lg font-bold text-white">{s.name}</h3>
                    <div className="font-display text-lg font-bold text-accent">₹{s.price}</div>
                  </div>
                  <Link to="/menu" className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-white/5 py-2.5 text-sm font-semibold text-white transition hover:bg-[image:var(--gradient-fire)] hover:shadow-glow">
                    <Plus className="h-4 w-4" /> Add to cart
                  </Link>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 120, damping: 12 });
  const sry = useSpring(ry, { stiffness: 120, damping: 12 });

  const move = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 10);
    rx.set(-py * 10);
  };
  const reset = () => { rx.set(0); ry.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={move}
      onMouseLeave={reset}
      style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" as const }}
      className="[perspective:1000px]"
    >
      {children}
    </motion.div>
  );
}

/* ---------------- REVIEWS ---------------- */
const reviews = [
  { name: "Ved Prakash", text: "One of the hidden gems. Order the veg cheese burger and you'll be surprised — better than mainstream franchises. Don't take my word for it, just try one and feel the crisp. Tip: try the brownie too!", rating: 5, verified: true, source: "Google" },
  { name: "Amara J.", text: "The signature burger is the best I've had in the city. Cinematic vibes, cinematic flavor.", rating: 5 },
  { name: "Diego R.", text: "Wood-fired pizza with a crust that's crisp and chewy. Perfection.", rating: 5 },
  { name: "Priya S.", text: "Delivery arrived hot and beautifully packed. The Oreo shake stole the show.", rating: 5 },
  { name: "Marcus O.", text: "Absolutely premium. It felt like fine dining ordered to my couch.", rating: 5 },
  { name: "Léa K.", text: "The sundae was theatre in a glass. My kids won't stop asking to go back.", rating: 5 },
];

function Reviews() {
  return (
    <section id="reviews" className="relative overflow-hidden py-32">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <span className="text-xs uppercase tracking-[0.3em] text-accent">Official Reviews</span>
        <h2 className="mt-4 font-display text-4xl font-black sm:text-5xl md:text-6xl">
          Loved by <span className="text-gradient-fire">thousands</span>.
        </h2>
        <a
          href="https://share.google/1Jdm6PHgAdQhy8l6e"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
        >
          <Star className="h-4 w-4 fill-accent text-accent" /> Read reviews on Google
        </a>
      </div>

      <div className="mt-16 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_15%,#000_85%,transparent)]">
        <div className="flex animate-marquee gap-6 pr-6" style={{ animationDuration: "60s" }}>
          {[...reviews, ...reviews].map((r, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="w-[340px] shrink-0 rounded-3xl glass p-6"
            >
              <div className="flex gap-1 text-accent">
                {Array.from({ length: r.rating }).map((_, k) => (
                  <Star key={k} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-white/80">"{r.text}"</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-[image:var(--gradient-fire)] font-display font-bold text-white">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{r.name}</div>
                  <div className="text-xs text-white/50">Verified diner</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- GALLERY ---------------- */
function Gallery() {
  const items = [
    { img: burgerImg, span: "row-span-2" },
    { img: pizzaImg, span: "" },
    { img: sandwichImg, span: "" },
    { img: shakeImg, span: "row-span-2" },
    { img: wrapImg, span: "" },
    { img: sundaeImg, span: "" },
  ];
  return (
    <section id="gallery" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-accent">Gallery</span>
          <h2 className="mt-4 font-display text-4xl font-black sm:text-5xl md:text-6xl">
            A feast for the <span className="text-gradient-fire">eyes</span>.
          </h2>
        </div>

        <div className="mt-14 grid auto-rows-[220px] grid-cols-2 gap-4 md:grid-cols-4">
          {items.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className={`group relative overflow-hidden rounded-3xl ${it.span}`}
            >
              <img
                src={it.img}
                alt=""
                loading="lazy"
                width={800}
                height={800}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-125"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- DELIVERY ---------------- */
function Delivery() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["-10%", "110%"]);

  const cards = [
    { icon: Truck, title: "Fast Delivery", desc: "Under 30 minutes, guaranteed hot." },
    { icon: ShoppingBag, title: "Online Ordering", desc: "Order in seconds from any device." },
    { icon: MapPin, title: "Pickup", desc: "Skip the wait — grab & go." },
    { icon: ChefHat, title: "Catering", desc: "Premium spreads for your events." },
  ];

  return (
    <section id="delivery" ref={ref} className="relative overflow-hidden py-32">
      {/* moving delivery scooter (emoji illustration) */}
      <motion.div
        style={{ x }}
        className="pointer-events-none absolute top-10 select-none text-6xl"
        aria-hidden
      >
        🛵
      </motion.div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-accent">Delivery</span>
          <h2 className="mt-4 font-display text-4xl font-black sm:text-5xl md:text-6xl">
            From our kitchen, <span className="text-gradient-fire">to your table</span>.
          </h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-3xl glass p-8 transition hover:-translate-y-2 hover:shadow-glow"
            >
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[image:var(--gradient-fire)] shadow-glow">
                <c.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="mt-6 font-display text-xl font-bold text-white">{c.title}</h3>
              <p className="mt-2 text-sm text-white/60">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- CONTACT ---------------- */
function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="text-xs uppercase tracking-[0.3em] text-accent">Contact</span>
            <h2 className="mt-4 font-display text-4xl font-black sm:text-5xl md:text-6xl">
              Come <span className="text-gradient-fire">say hi</span>.
            </h2>
            <p className="mt-4 max-w-md text-white/70">
              Reservations, catering, feedback or just a chat — we're here.
            </p>

            <ul className="mt-10 space-y-6">
              <ContactRow icon={MapPin} label="Address" value="Shop No 1, Plot No 18, Gulaab Bagh, Nawada Metro Station, New Delhi" />
              <ContactRow icon={Phone} label="Phone" value="+91 70656 56537" />
              <ContactRow icon={Mail} label="Email" value="hello@burgergrand.com" />
              <ContactRow icon={Clock} label="Hours" value="Mon–Sun · 11:00 AM — 12:00 AM" />
            </ul>

            <div className="mt-10 overflow-hidden rounded-3xl glass">
              <iframe
                title="Burger Grand — Nawada location"
                src="https://www.google.com/maps?q=Burger+Grand+Nawada+Metro+Station+Gulaab+Bagh&output=embed"
                className="h-64 w-full grayscale-[30%]"
                loading="lazy"
              />
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={(e) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 3000); }}
            className="rounded-3xl glass p-8"
          >
            <h3 className="font-display text-2xl font-bold text-white">Send us a message</h3>
            <p className="mt-2 text-sm text-white/60">We reply within a few hours.</p>

            <div className="mt-6 grid gap-4">
              <Field label="Name" type="text" name="name" placeholder="Your name" />
              <Field label="Email" type="email" name="email" placeholder="you@email.com" />
              <Field label="Phone" type="tel" name="phone" placeholder="+1 555 000 0000" />
              <div>
                <label className="mb-2 block text-xs uppercase tracking-widest text-white/60">Message</label>
                <textarea
                  rows={4}
                  placeholder="Tell us what's on your mind…"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40"
                />
              </div>
              <button
                type="submit"
                className="btn-glow hover:btn-glow-hover inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold"
              >
                {sent ? "Sent! 🔥" : (<>Send message <Send className="h-4 w-4" /></>)}
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-widest text-white/60">{label}</label>
      <input
        {...props}
        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40"
      />
    </div>
  );
}

function ContactRow({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <li className="flex items-start gap-4">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[image:var(--gradient-fire)] shadow-glow">
        <Icon className="h-5 w-5 text-white" />
      </div>
      <div className="min-w-0">
        <div className="text-xs uppercase tracking-widest text-white/50">{label}</div>
        <div className="font-medium text-white">{value}</div>
      </div>
    </li>
  );
}

// suppress unused warning
void featureImages;
