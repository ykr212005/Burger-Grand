import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Star, MapPin, Phone, Clock, ArrowRight, ArrowLeft, Plus, Check,
  Leaf, Flame, Sparkles, Wallet, Timer, ChefHat, Navigation,
} from "lucide-react";

import heroBurger from "@/assets/hero-burger.png";
import burgerImg from "@/assets/burger.jpg";
import pizzaImg from "@/assets/pizza.jpg";
import friesImg from "@/assets/fries.jpg";
import shakeImg from "@/assets/shake.jpg";
import wrapImg from "@/assets/wrap.jpg";
import sundaeImg from "@/assets/sundae.jpg";
import sandwichImg from "@/assets/sandwich.jpg";
import interiorImg from "@/assets/interior.jpg";
import comboImg from "@/assets/combo.jpg";
import heroLoop from "@/assets/hero-loop.mp4.asset.json";

import { SiteFooter } from "@/components/site-footer";
import { FloatingActions } from "@/components/floating-actions";
import { items } from "@/lib/menu-data";
import { cartStore } from "@/lib/cart-store";
import { INR, isOpenNow, restaurant, whatsappLink } from "@/lib/restaurant";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Burger Grand | Burgers, Pizza & Fast Food Near Nawada Metro, Delhi" },
      {
        name: "description",
        content:
          "Burger Grand in Gulab Bagh, Uttam Nagar offers delicious burgers, pizzas, loaded fries, wraps, shakes and more near Nawada Metro Station.",
      },
      { property: "og:title", content: "Burger Grand | Burgers, Pizza & Shakes Near Nawada Metro" },
      { property: "og:description", content: "Big flavours, loaded bites and thick shakes in Gulab Bagh, Uttam Nagar — near Nawada Metro Station, Delhi." },
      { property: "og:type", content: "restaurant" },
      { property: "og:url", content: "https://grand-cinematic-bites.lovable.app/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://grand-cinematic-bites.lovable.app/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Restaurant",
          name: restaurant.name,
          servesCuisine: ["Fast Food", "Burgers", "Pizza", "Beverages"],
          priceRange: "₹₹",
          telephone: restaurant.phone,
          url: "https://grand-cinematic-bites.lovable.app/",
          address: {
            "@type": "PostalAddress",
            streetAddress: restaurant.addressLine1,
            addressLocality: "Uttam Nagar, New Delhi",
            addressRegion: "DL",
            postalCode: "110059",
            addressCountry: "IN",
          },
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
              opens: "11:00",
              closes: "23:59",
            },
          ],
          hasMenu: "https://grand-cinematic-bites.lovable.app/menu",
        }),
      },
    ],
  }),
  component: HomePage,
});

/* ---------------------------------- shared --------------------------------- */

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, delay, ease: [0.2, 0.8, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHead({ eyebrow, title, sub, align = "left" }: { eyebrow: string; title: React.ReactNode; sub?: string; align?: "left" | "center" }) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <Reveal>
        <div className="eyebrow">{eyebrow}</div>
        <h2 className="display-xl mt-4 text-[clamp(2rem,5.2vw,3.6rem)]">{title}</h2>
        {sub && <p className="mt-4 text-base leading-relaxed text-muted-foreground">{sub}</p>}
      </Reveal>
    </div>
  );
}

function AddButton({ name, compact = false }: { name: string; compact?: boolean }) {
  const [added, setAdded] = useState(false);
  return (
    <button
      onClick={() => {
        cartStore.add(name);
        setAdded(true);
        setTimeout(() => setAdded(false), 1200);
      }}
      className={`inline-flex items-center gap-2 rounded-full text-[11px] font-bold uppercase tracking-[0.14em] transition ${
        compact ? "px-4 py-2" : "px-5 py-2.5"
      } ${added ? "bg-fresh text-white" : "btn-primary hover:btn-primary-hover"}`}
    >
      {added ? <><Check className="h-3.5 w-3.5" /> Added</> : <><Plus className="h-3.5 w-3.5" /> Add</>}
    </button>
  );
}

function VegDot({ veg }: { veg: boolean }) {
  return (
    <span
      title={veg ? "Vegetarian" : "Non-vegetarian"}
      className={`grid h-4 w-4 shrink-0 place-items-center border ${veg ? "border-fresh" : "border-secondary"}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${veg ? "bg-fresh" : "bg-secondary"}`} />
    </span>
  );
}

const byName = (n: string) => items.find((i) => i.name === n)!;

/* ----------------------------------- hero ---------------------------------- */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const burgerY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const burgerScale = useTransform(scrollYProgress, [0, 1], [1, 0.82]);
  const burgerRot = useTransform(scrollYProgress, [0, 1], [0, 8]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 90, damping: 18 });
  const sy = useSpring(my, { stiffness: 90, damping: 18 });

  const [mode, setMode] = useState<"delivery" | "pickup">("delivery");
  const [open, setOpen] = useState(true);
  useEffect(() => setOpen(isOpenNow()), []);

  return (
    <section
      ref={ref}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width - 0.5) * 26);
        my.set(((e.clientY - r.top) / r.height - 0.5) * 20);
      }}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
      className="relative overflow-hidden bg-cream pt-28 pb-16 sm:pt-32 lg:pt-36"
    >
      <div className="pointer-events-none absolute -right-32 top-10 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,_oklch(0.816_0.129_84_/_0.34),transparent_65%)]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1.05fr_1fr]">
        <motion.div style={{ y: textY, opacity: textOpacity }}>
          <Reveal>
            <div className="eyebrow">Burger • Pizza • Shakes</div>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="display-xl mt-5 text-[clamp(2.7rem,8vw,5.6rem)]">
              Taste the
              <br />
              <span className="text-primary">Extraordinary.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
              Fresh ingredients. Bigger bites. Unmatched flavour. Discover burgers,
              pizzas, loaded fries and handcrafted shakes right near Nawada Metro.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/menu" className="btn-primary hover:btn-primary-hover inline-flex items-center gap-2 rounded-full px-7 py-4 text-xs font-bold uppercase tracking-[0.18em]">
                Order Now <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#menu" className="btn-ghost hover:btn-ghost-hover inline-flex rounded-full px-7 py-4 text-xs font-bold uppercase tracking-[0.18em]">
                Explore Menu
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-7 inline-flex rounded-full border border-border p-1">
              {(["delivery", "pickup"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`rounded-full px-5 py-2 text-[11px] font-bold uppercase tracking-[0.16em] transition ${
                    mode === m ? "bg-charcoal text-offwhite" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em]">
                <span className={`h-2 w-2 rounded-full ${open ? "animate-pulse-dot bg-fresh" : "bg-secondary"}`} />
                {open ? "Open Now" : "Closed"} <span className="font-normal normal-case tracking-normal text-muted-foreground">· Serving Nawada &amp; Uttam Nagar</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex text-accent">
                  {[0, 1, 2, 3, 4].map((i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <span className="text-xs text-muted-foreground">
                  <strong className="text-foreground">{restaurant.rating}/5</strong> · {restaurant.reviewCount.toLocaleString()}+ happy customers
                </span>
              </div>
            </div>
          </Reveal>
        </motion.div>

        <div className="relative">
          <motion.div
            style={{ y: burgerY, scale: burgerScale, rotate: burgerRot, x: sx, translateY: sy }}
            className="relative z-10 mx-auto max-w-[34rem]"
          >
            <img
              src={heroBurger}
              alt="The Grand double cheeseburger with melting cheese, lettuce and tomato"
              width={1200}
              height={1200}
              className="w-full drop-shadow-[0_40px_50px_oklch(0.19_0.02_40_/_0.28)]"
            />
            <div className="absolute left-0 top-8 rounded-full bg-charcoal px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-offwhite">
              Bestseller
            </div>
            <div className="absolute -bottom-2 right-2 rounded-full border border-border bg-offwhite px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] shadow-card">
              Grand Spl · {INR(90)}
            </div>
          </motion.div>

          <video
            className="pointer-events-none absolute -bottom-4 left-0 z-20 hidden h-36 w-56 border-4 border-offwhite object-cover shadow-lift sm:block"
            src={heroLoop.url}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- marquee --------------------------------- */

function Marquee() {
  const words = ["Fresh Ingredients", "Loaded Cheese", "Quick Service", "Great Value", "Made To Order", "Nawada Metro"];
  return (
    <div className="border-y border-border bg-charcoal py-4 text-offwhite">
      <div className="flex w-max animate-marquee gap-10">
        {[0, 1].map((k) => (
          <div key={k} className="flex gap-10">
            {words.map((w) => (
              <span key={w + k} className="flex items-center gap-10 whitespace-nowrap text-xs font-semibold uppercase tracking-[0.3em]">
                {w} <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------- menu ----------------------------------- */

const tabs = [
  { key: "Burger", label: "Burgers", img: burgerImg },
  { key: "Pizza", label: "Pizza", img: pizzaImg },
  { key: "Fries", label: "Sides", img: friesImg },
  { key: "Wrap Roll", label: "Wraps", img: wrapImg },
  { key: "Premium Shakes", label: "Shakes", img: shakeImg },
  { key: "Sundae", label: "Desserts", img: sundaeImg },
];

function MenuSection() {
  const [tab, setTab] = useState(tabs[0].key);
  const list = useMemo(() => items.filter((i) => i.category === tab).slice(0, 6), [tab]);

  return (
    <section id="menu" className="bg-offwhite py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHead
          eyebrow="Our menu"
          title={<>Come hungry.<br />Leave happy.</>}
          sub="Big flavours, loaded bites and comfort food made for serious cravings."
        />

        <div className="mt-10 flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`rounded-full px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] transition ${
                tab === t.key ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground hover:bg-muted"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((it, i) => (
            <Reveal key={it.name} delay={i * 0.05}>
              <article className="group h-full">
                <div className="relative overflow-hidden">
                  <img
                    src={it.img}
                    alt={it.name}
                    loading="lazy"
                    width={800}
                    height={600}
                    className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {it.popular && (
                    <span className="absolute left-3 top-3 bg-charcoal px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-offwhite">
                      Bestseller
                    </span>
                  )}
                </div>
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <VegDot veg={it.veg} />
                      <h3 className="truncate font-display text-lg font-bold">{it.name}</h3>
                      {it.spicy && <Flame className="h-3.5 w-3.5 shrink-0 text-secondary" />}
                    </div>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                      {it.desc ?? "Freshly prepared, loaded and finished with our signature Grand sauce."}
                    </p>
                  </div>
                  <span className="shrink-0 font-display text-lg font-bold text-primary">{INR(it.price)}</span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Star className="h-3.5 w-3.5 fill-accent text-accent" /> {it.rating}
                  </span>
                  <AddButton name={it.name} compact />
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-14 text-center">
            <Link to="/menu" className="btn-ghost hover:btn-ghost-hover inline-flex items-center gap-2 rounded-full px-8 py-4 text-xs font-bold uppercase tracking-[0.18em]">
              See the full menu <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------ signature burger ---------------------------- */

const highlights = [
  { icon: Leaf, title: "100% Fresh Ingredients", text: "Prepped daily, never pre-made." },
  { icon: Sparkles, title: "Signature Sauce", text: "The Grand recipe you can't copy." },
  { icon: ChefHat, title: "Freshly Grilled", text: "Made only after you order." },
  { icon: Flame, title: "Loaded With Cheese", text: "Double slice, properly melted." },
];

function SignatureBurger() {
  return (
    <section id="specials" className="bg-cream py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2">
        <Reveal>
          <div className="relative">
            <img src={burgerImg} alt="The Grand Burger" loading="lazy" width={1000} height={1200} className="h-[30rem] w-full object-cover" />
            <div className="absolute -bottom-6 -right-2 hidden bg-primary px-6 py-5 text-primary-foreground sm:block">
              <div className="font-display text-3xl font-bold">{INR(90)}</div>
              <div className="text-[10px] uppercase tracking-[0.2em]">Grand Spl Burger</div>
            </div>
          </div>
        </Reveal>

        <div>
          <SectionHead eyebrow="The Grand Burger" title={<>Built for<br />big cravings.</>} sub="Toasted bun, double cheese, crisp veggies and our signature Grand sauce — the burger Nawada keeps coming back for." />
          <div className="mt-10 divide-y divide-border border-y border-border">
            {highlights.map((h, i) => (
              <Reveal key={h.title} delay={i * 0.08}>
                <div className="flex items-center gap-4 py-4">
                  <h.icon className="h-5 w-5 shrink-0 text-primary" />
                  <div className="min-w-0">
                    <div className="font-display text-sm font-bold uppercase tracking-[0.1em]">{h.title}</div>
                    <div className="text-sm text-muted-foreground">{h.text}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-8 flex flex-wrap gap-3">
              <AddButton name="Grand Spl Burger" />
              <Link to="/menu" className="btn-ghost hover:btn-ghost-hover inline-flex rounded-full px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em]">
                Try The Grand
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ pizza + fries ------------------------------- */

function FeatureSplit({
  id, eyebrow, title, sub, image, alt, picks, reverse, tone = "offwhite",
}: {
  id?: string; eyebrow: string; title: React.ReactNode; sub: string; image: string; alt: string;
  picks: string[]; reverse?: boolean; tone?: "offwhite" | "cream";
}) {
  return (
    <section id={id} className={`py-24 ${tone === "cream" ? "bg-cream" : "bg-offwhite"}`}>
      <div className={`mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
        <Reveal>
          <img src={image} alt={alt} loading="lazy" width={1200} height={900} className="h-[26rem] w-full object-cover" />
        </Reveal>
        <div>
          <SectionHead eyebrow={eyebrow} title={title} sub={sub} />
          <div className="mt-8 divide-y divide-border border-y border-border">
            {picks.map((p) => {
              const it = byName(p);
              return (
                <div key={p} className="flex items-center justify-between gap-4 py-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <VegDot veg={it.veg} />
                    <span className="truncate font-display text-sm font-bold uppercase tracking-[0.06em]">{it.name}</span>
                  </div>
                  <div className="flex shrink-0 items-center gap-4">
                    <span className="font-display font-bold text-primary">{INR(it.price)}</span>
                    <AddButton name={it.name} compact />
                  </div>
                </div>
              );
            })}
          </div>
          <Reveal>
            <Link to="/menu" className="btn-ghost hover:btn-ghost-hover mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-xs font-bold uppercase tracking-[0.16em]">
              Explore more <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- bestsellers -------------------------------- */

function Bestsellers() {
  const scroller = useRef<HTMLDivElement>(null);
  const best = items.filter((i) => i.popular).slice(0, 8);
  const nudge = (dir: number) => scroller.current?.scrollBy({ left: dir * 340, behavior: "smooth" });

  return (
    <section className="bg-charcoal py-24 text-offwhite">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <div className="eyebrow text-accent">Bestsellers</div>
            <h2 className="display-xl mt-4 text-[clamp(2rem,5vw,3.4rem)]">What everyone&apos;s ordering</h2>
          </div>
          <div className="flex gap-2">
            <button onClick={() => nudge(-1)} aria-label="Previous" className="grid h-11 w-11 place-items-center rounded-full border border-offwhite/25 transition hover:bg-offwhite/10">
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button onClick={() => nudge(1)} aria-label="Next" className="grid h-11 w-11 place-items-center rounded-full border border-offwhite/25 transition hover:bg-offwhite/10">
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div ref={scroller} className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {best.map((it, i) => (
            <article key={it.name} className="w-[19rem] shrink-0 snap-start">
              <div className="relative overflow-hidden">
                <img src={it.img} alt={it.name} loading="lazy" width={800} height={600} className="h-48 w-full object-cover" />
                <span className="absolute left-3 top-3 bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-charcoal">
                  #{String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="mt-4 flex items-start justify-between gap-3">
                <h3 className="font-display text-base font-bold uppercase">{it.name}</h3>
                <span className="font-display font-bold text-accent">{INR(it.price)}</span>
              </div>
              <p className="mt-1 flex items-center gap-1 text-xs text-offwhite/60">
                <Star className="h-3.5 w-3.5 fill-accent text-accent" /> {it.rating} · {it.category}
              </p>
              <div className="mt-4"><AddButton name={it.name} compact /></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- combo ----------------------------------- */

function Combo() {
  return (
    <section className="relative overflow-hidden bg-primary py-24 text-primary-foreground">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">The perfect combo</div>
          <h2 className="display-xl mt-4 text-[clamp(2.2rem,5.4vw,3.8rem)]">Why choose one?</h2>
          <p className="mt-5 max-w-md text-primary-foreground/80">
            Burger + loaded fries + a thick shake. The full Grand experience for less
            than you&apos;d expect.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <span className="font-display text-4xl font-bold">{INR(199)}</span>
            <AddButton name="Double Treat Combo" />
            <a
              href={whatsappLink("Hi Burger Grand! I'd like to order the Double Treat Combo.")}
              target="_blank" rel="noreferrer"
              className="rounded-full border border-primary-foreground/40 px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] transition hover:bg-primary-foreground/10"
            >
              Order on WhatsApp
            </a>
          </div>
        </div>
        <Reveal>
          <img src={comboImg} alt="Burger, fries and shake combo" loading="lazy" width={1400} height={900} className="h-[24rem] w-full object-cover" />
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------------- why ------------------------------------ */

const why = [
  { n: "01", icon: Flame, t: "Big Flavour", d: "Freshly prepared food packed with flavour." },
  { n: "02", icon: Leaf, t: "Fresh Ingredients", d: "Quality ingredients in every single bite." },
  { n: "03", icon: Timer, t: "Quick Service", d: "Good food without the long wait." },
  { n: "04", icon: Wallet, t: "Great Value", d: "Premium taste without premium prices." },
];

function Why() {
  return (
    <section className="bg-offwhite py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHead eyebrow="Why Burger Grand" title="Made properly. Every time." />
        <div className="mt-12 border-t border-border">
          {why.map((w, i) => (
            <Reveal key={w.n} delay={i * 0.06}>
              <div className="group grid grid-cols-[auto_minmax(0,1fr)] items-center gap-6 border-b border-border py-8 transition-colors hover:bg-cream md:grid-cols-[5rem_1fr_1.2fr_auto]">
                <span className="font-display text-sm font-bold text-muted-foreground">{w.n}</span>
                <h3 className="font-display text-xl font-bold uppercase md:text-2xl">{w.t}</h3>
                <p className="col-span-2 text-sm text-muted-foreground md:col-span-1">{w.d}</p>
                <w.icon className="hidden h-5 w-5 text-primary transition-transform group-hover:translate-x-1 md:block" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- about ----------------------------------- */

function About() {
  return (
    <section id="about" className="bg-cream py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <img src={interiorImg} alt="Inside Burger Grand, Uttam Nagar" loading="lazy" width={1200} height={900} className="h-[26rem] w-full object-cover" />
        </Reveal>
        <div>
          <SectionHead
            eyebrow="Our story"
            title={<>Made for cravings.<br />Built for hangouts.</>}
            sub="Burger Grand is your neighbourhood destination for burgers, pizzas, loaded fries, wraps, shakes and everything that makes a casual food outing worth remembering."
          />
          <Reveal>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {[["Gulab Bagh", "Our home block"], ["Uttam Nagar", "Delhi 110059"], ["Nawada Metro", "2 min walk"]].map(([a, b]) => (
                <div key={a}>
                  <div className="font-display text-base font-bold uppercase">{a}</div>
                  <div className="text-sm text-muted-foreground">{b}</div>
                </div>
              ))}
            </div>
            <a href="#location" className="btn-ghost hover:btn-ghost-hover mt-9 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-xs font-bold uppercase tracking-[0.16em]">
              Visit us <ArrowRight className="h-4 w-4" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- gallery ---------------------------------- */

const gallery = [
  { img: burgerImg, cap: "Cheese loaded burger" },
  { img: pizzaImg, cap: "Grand Spl pizza" },
  { img: friesImg, cap: "Cheese loaded fries" },
  { img: shakeImg, cap: "Thick premium shakes" },
  { img: interiorImg, cap: "Our dining room" },
  { img: wrapImg, cap: "Paneer wrap roll" },
  { img: sundaeImg, cap: "Hot chocolate fudge" },
  { img: sandwichImg, cap: "Grilled sandwiches" },
];

function Gallery() {
  return (
    <section id="gallery" className="bg-offwhite py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead eyebrow="Follow the cravings" title="The Grand experience" />
          <a href={restaurant.instagram} target="_blank" rel="noreferrer" className="btn-ghost hover:btn-ghost-hover rounded-full px-6 py-3 text-xs font-bold uppercase tracking-[0.16em]">
            @BurgerGrand
          </a>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
          {gallery.map((g, i) => (
            <Reveal key={g.cap} delay={i * 0.04}>
              <figure className={`group relative overflow-hidden ${i % 5 === 0 ? "md:row-span-2 md:h-[32rem]" : "h-[15.5rem]"}`}>
                <img src={g.img} alt={g.cap} loading="lazy" width={800} height={800} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <figcaption className="absolute inset-x-0 bottom-0 translate-y-full bg-charcoal/80 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-offwhite transition-transform duration-400 group-hover:translate-y-0">
                  {g.cap}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- reviews ---------------------------------- */

const reviews = [
  { name: "Ved Prakash", text: "Really good burgers at an affordable price. Perfect place to hang out with friends." },
  { name: "Verified Customer", text: "The Grand Spl burger and cheese loaded fries are unbeatable for the price. Quick service too." },
  { name: "Verified Customer", text: "Thick shakes here are seriously good — the Kit Kat one is my regular order." },
  { name: "Verified Customer", text: "Fresh food, friendly staff and right next to Nawada Metro. Can't ask for more." },
];

function Reviews() {
  return (
    <section id="reviews" className="bg-cream py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHead eyebrow="Reviews" title={<>Don&apos;t take our<br />word for it.</>} />
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="font-display text-5xl font-bold text-primary">{restaurant.rating}</span>
              <div>
                <div className="flex text-accent">{[0, 1, 2, 3, 4].map((i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
                <div className="text-xs text-muted-foreground">{restaurant.reviewCount.toLocaleString()}+ reviews</div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {reviews.map((r) => (
            <blockquote key={r.text} className="w-[21rem] shrink-0 snap-start surface p-7">
              <div className="flex text-accent">{[0, 1, 2, 3, 4].map((i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}</div>
              <p className="mt-5 text-[15px] leading-relaxed">“{r.text}”</p>
              <footer className="mt-6 text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">— {r.name}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- location --------------------------------- */

function Location() {
  const [open, setOpen] = useState(true);
  useEffect(() => setOpen(isOpenNow()), []);

  return (
    <section id="location" className="bg-offwhite py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHead eyebrow="Find us" title="Come find us." sub={`${restaurant.addressLine1}, ${restaurant.addressLine2}`} />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <iframe
              title="Burger Grand location map"
              src={restaurant.mapsEmbed}
              loading="lazy"
              className="h-[24rem] w-full border border-border"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>

          <div className="space-y-6">
            <div className="surface p-6">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em]">
                <span className={`h-2 w-2 rounded-full ${open ? "animate-pulse-dot bg-fresh" : "bg-secondary"}`} />
                {open ? "Open now · Fresh & ready to serve" : "Currently closed"}
              </div>
              <div className="mt-5 flex items-center justify-between border-t border-border pt-5 text-sm">
                <span className="font-display font-bold uppercase tracking-[0.1em]">{restaurant.hours.days}</span>
                <span className="text-muted-foreground">{restaurant.hours.label}</span>
              </div>
            </div>

            <ul className="space-y-4 text-sm">
              <li className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span>{restaurant.addressLine1}, {restaurant.addressLine2}</span></li>
              <li className="flex gap-3"><Phone className="h-4 w-4 shrink-0 text-primary" /><a href={`tel:${restaurant.phone}`} className="hover:text-primary">{restaurant.phoneDisplay}</a></li>
              <li className="flex gap-3"><Clock className="h-4 w-4 shrink-0 text-primary" /><span>Dine-in · Takeaway · Home delivery in Uttam Nagar</span></li>
              <li className="flex gap-3"><Navigation className="h-4 w-4 shrink-0 text-primary" /><span>Street parking available near Nawada Metro Gate 1</span></li>
            </ul>

            <div className="flex flex-wrap gap-3">
              <a href={restaurant.mapsDirections} target="_blank" rel="noreferrer" className="btn-primary hover:btn-primary-hover rounded-full px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.16em]">
                Get Directions
              </a>
              <a href={`tel:${restaurant.phone}`} className="btn-ghost hover:btn-ghost-hover rounded-full px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.16em]">
                Call Now
              </a>
              <Link to="/menu" className="btn-ghost hover:btn-ghost-hover rounded-full px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.16em]">
                Order Online
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------- page ----------------------------------- */

function HomePage() {
  return (
    <main className="pb-16 md:pb-0">
      <Hero />
      <Marquee />
      <MenuSection />
      <SignatureBurger />
      <FeatureSplit
        eyebrow="Pizza"
        title="More than just burgers."
        sub="Hand-stretched bases, generous cheese and toppings that actually reach the crust."
        image={pizzaImg}
        alt="Grand Special cheese pizza"
        picks={["Grand Spl Pizza", "Loaded Paneer Pizza", "Makhani Pizza", "Cheese Garlic Bread"]}
      />
      <FeatureSplit
        eyebrow="Loaded fries"
        title="Fries. But make them Grand."
        sub="Crispy cut fries buried under molten cheese, jalapeños and house masala."
        image={friesImg}
        alt="Cheese loaded fries with jalapenos"
        picks={["Cheese Loaded Fries", "Jelopeno Fries", "Masala Fries", "Chicken Finger"]}
        reverse
        tone="cream"
      />
      <FeatureSplit
        eyebrow="Thick shakes"
        title="Shake up your cravings."
        sub="Blended thick, topped generously and served cold — dessert in a glass."
        image={shakeImg}
        alt="Premium thick milkshakes"
        picks={["Kit Kat Shake", "Choco Mocha Shake", "Belgian Brownie Shake", "Cold Coffee"]}
      />
      <Bestsellers />
      <Combo />
      <Why />
      <About />
      <Gallery />
      <Reviews />
      <Location />
      <SiteFooter />
      <FloatingActions />
    </main>
  );
}
