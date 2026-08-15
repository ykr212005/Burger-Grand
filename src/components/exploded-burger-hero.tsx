import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Star } from "lucide-react";

import heroCinePoster from "@/assets/hero-cine-poster.jpg.asset.json";

const HERO_VIDEO_SRC = "/hero-cine.mp4";
import { INR, isOpenNow, restaurant } from "@/lib/restaurant";

/**
 * Cinematic full-bleed hero: the Burger Grand film plays muted + looping
 * behind a layered vignette, with the headline revealed on load.
 */
export function ExplodedBurgerHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [open, setOpen] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setOpen(isOpenNow());
    const el = videoRef.current;
    if (!el) return;
    el.muted = true;
    const kick = () => void el.play().catch(() => {});
    kick();
    const evts = ["touchstart", "pointerdown", "scroll"] as const;
    evts.forEach((e) => window.addEventListener(e, kick, { passive: true, once: true }));
    return () => evts.forEach((e) => window.removeEventListener(e, kick));
  }, []);

  const ease = [0.22, 0.8, 0.2, 1] as const;

  return (
    <section className="relative h-[100dvh] min-h-[34rem] w-full overflow-hidden bg-ink">
      {/* poster fallback — visible immediately while the video primes */}
      <div className="absolute inset-0">
        <img
          src={heroCinePoster.url}
          alt=""
          className="h-full w-full object-cover object-center"
          decoding="async"
          fetchPriority="high"
          aria-hidden="true"
        />
      </div>

      {/* video layer fades in over the poster once it can play */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: 1.2, ease }}
      >
        <video
          ref={videoRef}
          src={heroCine.url}
          poster={heroCinePoster.url}
          className="h-full w-full object-cover object-center"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
          onLoadedData={() => setReady(true)}
          aria-label="Burger Grand cinematic film"
        />
      </motion.div>

      {/* cinematic overlays */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,_oklch(0.145_0.004_60_/_0.92)_0%,_oklch(0.145_0.004_60_/_0.45)_45%,_oklch(0.145_0.004_60_/_0.62)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_38%,_oklch(0.145_0.004_60_/_0.85)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(to_top,_var(--background),transparent)]" />

      {/* content */}
      <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease }}
          className="eyebrow"
        >
          Burger Grand Nawada
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 44 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.3, ease }}
          className="display-xl mt-5 text-[clamp(2.625rem,8.5vw,6.875rem)] drop-shadow-[0_18px_40px_oklch(0_0_0_/_0.75)]"
        >
          Bite Into <span className="text-primary">Grandeur</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.55, ease }}
          className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          Where every bite tells a story.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.72, ease }}
          className="mt-9 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
        >
          <a
            href="#menu"
            className="btn-ghost hover:btn-ghost-hover inline-flex w-full items-center justify-center rounded-full bg-[oklch(0.145_0.004_60_/_0.35)] px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] backdrop-blur-md sm:w-auto"
          >
            Explore Menu
          </a>
          <Link
            to="/menu"
            className="btn-primary hover:btn-primary-hover inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] sm:w-auto"
          >
            Order Now <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.95, ease }}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-3"
        >
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
          <div className="rounded-full bg-accent px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-ink shadow-card">
            Bestseller · {INR(90)}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
