import { Link } from "@tanstack/react-router";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Star } from "lucide-react";

import topBun from "@/assets/layer-topbun.png";
import lettuce from "@/assets/layer-lettuce.png";
import tomato from "@/assets/layer-tomato.png";
import onion from "@/assets/layer-onion.png";
import cheese from "@/assets/layer-cheese.png";
import patty from "@/assets/layer-patty.png";
import bottomBun from "@/assets/layer-bottombun.png";

import { INR, isOpenNow, restaurant } from "@/lib/restaurant";

/* ------------------------------ layer config ------------------------------ */

type Layer = {
  key: string;
  src: string;
  alt: string;
  /** assembled Y offset in px (0 = stack centre) */
  base: number;
  /** additional Y travel at full explosion (negative = up) */
  travel: number;
  /** width as % of the stage */
  w: number;
  rot: number;
  z: number;
  depth: number; // parallax multiplier
  label?: string;
  /** vertical anchor of the label line, 0..1 of stage */
  side?: "left" | "right";
};

const LAYERS: Layer[] = [
  { key: "topbun", src: topBun, alt: "Toasted sesame brioche top bun", base: -104, travel: -150, w: 62, rot: -3, z: 70, depth: 1.0, label: "Toasted Bun", side: "right" },
  { key: "lettuce", src: lettuce, alt: "Fresh green lettuce", base: -58, travel: -90, w: 66, rot: 2.5, z: 60, depth: 0.85, label: "Fresh Lettuce", side: "left" },
  { key: "tomato", src: tomato, alt: "Fresh tomato slices", base: -34, travel: -55, w: 54, rot: -2, z: 50, depth: 0.7, label: "Vine Tomato", side: "right" },
  { key: "onion", src: onion, alt: "Onion rings", base: -14, travel: -30, w: 50, rot: 3, z: 40, depth: 0.6, label: "Sweet Onion", side: "left" },
  { key: "cheese", src: cheese, alt: "Melted cheddar cheese", base: 4, travel: -10, w: 46, rot: -4, z: 30, depth: 0.5, label: "Melted Cheese", side: "right" },
  { key: "patty", src: patty, alt: "Juicy grilled patty", base: 34, travel: 10, w: 60, rot: 2, z: 20, depth: 0.45, label: "Juicy Patty", side: "left" },
  { key: "bottombun", src: bottomBun, alt: "Toasted bottom bun with signature sauce", base: 96, travel: 120, w: 62, rot: -2, z: 10, depth: 0.35, label: "Signature Sauce", side: "right" },
];

/* -------------------------------- sub parts ------------------------------- */

function LayerPiece({
  layer,
  p,
  mx,
  my,
  labelOpacity,
  showLabels,
}: {
  layer: Layer;
  p: MotionValue<number>;
  mx: MotionValue<number>;
  my: MotionValue<number>;
  labelOpacity: MotionValue<number>;
  showLabels: boolean;
}) {
  // explosion runs 0.20 -> 0.60, held to 0.80, then eases away
  const y = useTransform(p, [0, 0.2, 0.6, 0.8, 1], [layer.base, layer.base, layer.base + layer.travel, layer.base + layer.travel, layer.base + layer.travel * 0.86]);
  const rotate = useTransform(p, [0.2, 0.6, 1], [0, layer.rot, layer.rot * 0.7]);
  const rotateX = useTransform(p, [0.2, 0.6], [0, layer.rot * 1.6]);
  const zpx = useTransform(p, [0.2, 0.6], [0, layer.depth * 90]);
  const px = useTransform(mx, (v) => v * layer.depth);
  const py = useTransform(my, (v) => v * layer.depth);

  return (
    <div className="pointer-events-none absolute inset-0 grid place-items-center">
    <motion.div
      style={{ y, x: px, translateY: py, rotate, rotateX, translateZ: zpx, zIndex: layer.z }}
    >

      <div className="relative" style={{ width: `${layer.w * 8}px`, maxWidth: "60vw" }}>
        <img
          src={layer.src}
          alt={layer.alt}
          className="w-full select-none drop-shadow-[0_18px_26px_oklch(0_0_0_/_0.6)]"
          draggable={false}
        />
        {showLabels && layer.label && (
          <motion.div
            style={{ opacity: labelOpacity }}
            className={`pointer-events-none absolute top-1/2 hidden -translate-y-1/2 items-center gap-3 lg:flex ${
              layer.side === "left" ? "right-[92%] flex-row-reverse" : "left-[92%]"
            }`}
          >
            <span className="h-px w-14 bg-accent/70" />
            <span className="whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.24em] text-accent">
              {layer.label}
            </span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

function Smoke({ opacity }: { opacity: MotionValue<number> }) {
  return (
    <motion.div style={{ opacity }} className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className="absolute bottom-[22%] left-1/2 block h-64 w-64 rounded-full blur-3xl animate-smoke-drift"
          style={{
            marginLeft: `${(i - 1.5) * 70}px`,
            animationDelay: `${i * 2.4}s`,
            background:
              i % 2 === 0
                ? "radial-gradient(circle, oklch(1 0 0 / 0.14), transparent 68%)"
                : "radial-gradient(circle, oklch(0.9 0.09 82 / 0.13), transparent 68%)",
          }}
        />
      ))}
    </motion.div>
  );
}

const PARTICLES = [
  { x: 12, y: 30, s: 4, d: 0 }, { x: 78, y: 22, s: 3, d: 1.4 },
  { x: 30, y: 68, s: 5, d: 2.6 }, { x: 66, y: 74, s: 3, d: 0.8 },
  { x: 46, y: 16, s: 3, d: 3.2 }, { x: 88, y: 55, s: 4, d: 2 },
  { x: 20, y: 48, s: 3, d: 4 }, { x: 58, y: 88, s: 4, d: 1.1 },
];

function Particles({ opacity }: { opacity: MotionValue<number> }) {
  return (
    <motion.div style={{ opacity }} className="pointer-events-none absolute inset-0 z-[80]">
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full animate-particle-float"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.s,
            height: p.s,
            animationDelay: `${p.d}s`,
            background: i % 3 === 0 ? "oklch(0.93 0.05 82)" : "oklch(0.78 0.09 62 / 0.9)",
          }}
        />
      ))}
    </motion.div>
  );
}

/* ---------------------------------- hero ---------------------------------- */

export function ExplodedBurgerHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4, restDelta: 0.0005 });

  const [desktop, setDesktop] = useState(false);
  const [open, setOpen] = useState(true);
  useEffect(() => {
    setOpen(isOpenNow());
    const mq = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    const on = () => setDesktop(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  // camera / composition
  const stageScale = useTransform(p, [0, 0.2, 0.6, 0.8, 1], [1, 1.02, 0.9, 0.9, 0.74]);
  const stageY = useTransform(p, [0.8, 1], [0, -70]);
  const stageOpacity = useTransform(p, [0.9, 1], [1, 0.25]);
  const textY = useTransform(p, [0, 0.35, 1], [0, -40, -170]);
  const textOpacity = useTransform(p, [0, 0.28, 0.45], [1, 1, 0]);
  const labelOpacity = useTransform(p, [0.58, 0.68, 0.92, 1], [0, 1, 1, 0]);
  const smokeOpacity = useTransform(p, [0, 0.2, 0.6, 0.85, 1], [0.35, 0.55, 1, 0.8, 0]);
  const particleOpacity = useTransform(p, [0.15, 0.4, 0.85, 1], [0, 1, 0.9, 0]);
  const hintOpacity = useTransform(p, [0, 0.12], [1, 0]);

  const mxRaw = useMotionValue(0);
  const myRaw = useMotionValue(0);
  const mx = useSpring(mxRaw, { stiffness: 70, damping: 18 });
  const my = useSpring(myRaw, { stiffness: 70, damping: 18 });
  const tilt = useTransform(mx, [-14, 14], [2.5, -2.5]);

  return (
    <section
      ref={ref}
      className="relative bg-ink"
      style={{ height: "250vh" }}
      onMouseMove={(e) => {
        if (!desktop) return;
        const r = e.currentTarget.getBoundingClientRect();
        mxRaw.set(((e.clientX - r.left) / r.width - 0.5) * 28);
        myRaw.set(((e.clientY - window.scrollY - r.top) / window.innerHeight - 0.5) * 18);
      }}
      onMouseLeave={() => { mxRaw.set(0); myRaw.set(0); }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_oklch(0.815_0.128_82_/_0.14),transparent_66%)]" />

        <div className="relative mx-auto grid h-full max-w-7xl items-center gap-6 px-6 lg:grid-cols-[1fr_1.05fr]">
          {/* copy */}
          <motion.div style={{ y: textY, opacity: textOpacity }} className="relative z-[90] pt-24 lg:pt-0">
            <div className="eyebrow">Burger Grand Nawada</div>
            <h1 className="display-xl mt-4 text-[clamp(2.4rem,7vw,5.2rem)]">
              Bite Into
              <br />
              <span className="text-primary">Grandeur.</span>
            </h1>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
              Every layer, made to order. Scroll to take The Grand apart —
              toasted bun, fresh lettuce, melted cheese and a flame-grilled patty.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link to="/menu" className="btn-primary hover:btn-primary-hover inline-flex items-center gap-2 rounded-full px-7 py-4 text-xs font-bold uppercase tracking-[0.18em]">
                Order Now <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#menu" className="btn-ghost hover:btn-ghost-hover inline-flex rounded-full px-7 py-4 text-xs font-bold uppercase tracking-[0.18em]">
                Explore Menu
              </a>
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em]">
                <span className={`h-2 w-2 rounded-full ${open ? "animate-pulse-dot bg-fresh" : "bg-secondary"}`} />
                {open ? "Open Now" : "Closed"}
              </div>
              <div className="flex items-center gap-3">
                <div className="flex text-accent">
                  {[0, 1, 2, 3, 4].map((i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <span className="text-xs text-muted-foreground">
                  <strong className="text-foreground">{restaurant.rating}/5</strong> · {restaurant.reviewCount.toLocaleString()}+ reviews
                </span>
              </div>
            </div>
          </motion.div>

          {/* stage */}
          <motion.div
            style={{ scale: stageScale, y: stageY, opacity: stageOpacity, rotate: desktop ? tilt : 0 }}
            className="relative h-[58vh] w-full lg:h-[80vh]"
          >
            <Smoke opacity={smokeOpacity} />
            <div className="absolute inset-0" style={{ perspective: 1200, transformStyle: "preserve-3d" }}>
              {LAYERS.map((l) => (
                <LayerPiece key={l.key} layer={l} p={p} mx={mx} my={my} labelOpacity={labelOpacity} showLabels={desktop} />
              ))}
            </div>
            <Particles opacity={particleOpacity} />

            <motion.div
              style={{ x: mx, translateY: my }}
              className="absolute right-2 top-6 z-[95] flex h-20 w-20 animate-badge-float items-center justify-center rounded-full bg-accent text-center text-[9px] font-bold uppercase leading-tight tracking-[0.14em] text-ink shadow-card sm:right-6"
            >
              ★<br />Bestseller<br />{INR(90)}
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          style={{ opacity: hintOpacity }}
          className="pointer-events-none absolute bottom-6 left-1/2 z-[95] -translate-x-1/2 text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground"
        >
          Scroll to unwrap
        </motion.div>
      </div>
    </section>
  );
}
