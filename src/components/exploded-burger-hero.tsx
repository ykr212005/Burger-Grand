import { Link } from "@tanstack/react-router";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Star } from "lucide-react";

import heroScroll from "@/assets/hero-scrub.mp4.asset.json";
import heroPoster from "@/assets/hero-poster.jpg.asset.json";
import { INR, isOpenNow, restaurant } from "@/lib/restaurant";

/**
 * Scroll-scrubbed hero video: the clip's playhead is driven directly by the
 * user's scroll position (fully reversible), smoothed with a spring so it
 * feels cinematic instead of stepping frame-to-frame.
 */
export function ExplodedBurgerHero() {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const [desktop, setDesktop] = useState(false);
  const [calm, setCalm] = useState(false);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setOpen(isOpenNow());
    const mq = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    const mqCalm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => {
      setDesktop(mq.matches);
      setCalm(mqCalm.matches);
    };
    on();
    mq.addEventListener("change", on);
    mqCalm.addEventListener("change", on);
    return () => {
      mq.removeEventListener("change", on);
      mqCalm.removeEventListener("change", on);
    };
  }, []);

  const p = useSpring(scrollYProgress, { stiffness: 110, damping: 26, mass: 0.35, restDelta: 0.001 });
  const still = useMotionValue(0);
  const tl = calm ? still : p;

  // drive the video playhead from the scrubbed timeline
  useEffect(() => {
    if (calm) return;
    let raf = 0;
    let target = 0;
    const unsub = tl.on("change", (v) => {
      target = Math.min(Math.max(v, 0), 1);
    });
    let seeking = false;
    const loop = () => {
      const v = videoRef.current;
      if (v && v.readyState >= 2 && Number.isFinite(v.duration) && !seeking) {
        const next = target * (v.duration - 0.05);
        const cur = v.currentTime;
        if (Math.abs(cur - next) > 1 / 60) {
          // ease toward the target so fast scrolls stay fluid instead of snapping
          const eased = cur + (next - cur) * 0.35;
          seeking = true;
          v.currentTime = eased;
          const done = () => {
            seeking = false;
            v.removeEventListener("seeked", done);
          };
          v.addEventListener("seeked", done);
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      unsub();
      cancelAnimationFrame(raf);
    };
  }, [tl, calm]);

  const stageScale = useTransform(tl, [0, 0.6, 1], [1.04, 1, 0.94]);
  const stageOpacity = useTransform(tl, [0, 0.05, 0.9, 1], [0.9, 1, 1, 0.3]);
  const textY = useTransform(tl, [0, 0.35, 1], [0, -40, -170]);
  const textOpacity = useTransform(tl, [0, 0.28, 0.45], [1, 1, 0]);
  const hintOpacity = useTransform(tl, [0, 0.12], [1, 0]);

  const mxRaw = useMotionValue(0);
  const myRaw = useMotionValue(0);
  const mx = useSpring(mxRaw, { stiffness: 70, damping: 18 });
  const my = useSpring(myRaw, { stiffness: 70, damping: 18 });

  return (
    <section
      ref={ref}
      className="relative h-[200vh] bg-ink lg:h-[250vh]"
      onMouseMove={(e) => {
        if (!desktop) return;
        const r = e.currentTarget.getBoundingClientRect();
        mxRaw.set(((e.clientX - r.left) / r.width - 0.5) * 24);
        myRaw.set(((e.clientY - window.scrollY - r.top) / window.innerHeight - 0.5) * 16);
      }}
      onMouseLeave={() => {
        mxRaw.set(0);
        myRaw.set(0);
      }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_oklch(0.815_0.128_82_/_0.14),transparent_66%)]" />

        <div className="relative mx-auto grid h-full max-w-7xl grid-rows-[58vh_auto] items-center gap-2 px-6 pb-8 pt-14 sm:gap-6 lg:grid-cols-[1fr_1.05fr] lg:grid-rows-1 lg:pb-0 lg:pt-0">
          {/* copy */}
          <motion.div
            style={{ y: textY, opacity: textOpacity }}
            className="relative z-[20] order-2 lg:order-1 lg:z-[90]"
          >
            <div className="eyebrow">Burger Grand Nawada</div>
            <h1 className="display-xl mt-4 text-[clamp(2.4rem,7vw,5.2rem)]">
              Bite Into
              <br />
              <span className="text-primary">Grandeur.</span>
            </h1>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
              Every layer, made to order. Scroll to watch The Grand come together —
              toasted bun, fresh lettuce, melted cheese and a flame-grilled patty.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                to="/menu"
                className="btn-primary hover:btn-primary-hover inline-flex items-center gap-2 rounded-full px-7 py-4 text-xs font-bold uppercase tracking-[0.18em]"
              >
                Order Now <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#menu"
                className="btn-ghost hover:btn-ghost-hover inline-flex rounded-full px-7 py-4 text-xs font-bold uppercase tracking-[0.18em]"
              >
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
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">
                  <strong className="text-foreground">{restaurant.rating}/5</strong> ·{" "}
                  {restaurant.reviewCount.toLocaleString()}+ reviews
                </span>
              </div>
            </div>
          </motion.div>

          {/* scroll-scrubbed video stage */}
          <motion.div
            style={{ scale: stageScale, opacity: stageOpacity, x: desktop ? mx : 0, y: desktop ? my : 0 }}
            className="relative z-[60] order-1 h-full w-full lg:order-2 lg:h-[82vh]"
          >
            <div
              className="relative h-full w-full overflow-hidden rounded-[2rem]"
              style={{ contain: "paint", willChange: "transform", backfaceVisibility: "hidden" }}
            >
              <video
                ref={videoRef}
                src={heroScroll.url}
                poster={heroPoster.url}
                className="h-full w-full object-cover"
                muted
                playsInline
                preload="auto"
                autoPlay={false}
                disablePictureInPicture
                aria-label="The Grand burger being assembled"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,_oklch(0.145_0.004_60_/_0.75),transparent_45%)]" />
            </div>

            <motion.div className="absolute left-2 top-4 z-[95] sm:left-6 sm:top-6">
              <div className="animate-badge-float rounded-full bg-accent px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-ink shadow-card">
                Bestseller · {INR(90)}
              </div>
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
