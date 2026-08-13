import { Link } from "@tanstack/react-router";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Star } from "lucide-react";

import heroScroll from "@/assets/hero-scrub.mp4.asset.json";
import heroScrollMobile from "@/assets/hero-mobile-fixed.mp4.asset.json";
import heroScrollMobileWebm from "@/assets/hero-mobile-fixed.webm.asset.json";
import heroPoster from "@/assets/hero-poster.jpg.asset.json";
import heroPosterMobile from "@/assets/hero-mobile-poster.jpg.asset.json";
import { INR, isOpenNow, restaurant } from "@/lib/restaurant";

/**
 * Scroll-scrubbed hero video: the clip's playhead is driven directly by the
 * user's scroll position (fully reversible), smoothed with a spring so it
 * feels cinematic instead of stepping frame-to-frame.
 */
export function ExplodedBurgerHero() {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetTimeRef = useRef(0);
  const videoReadyRef = useRef(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const [desktop, setDesktop] = useState(false);
  const [calm, setCalm] = useState(false);
  const [open, setOpen] = useState(true);
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    setOpen(isOpenNow());
    const mq = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    const mqCalm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => {
      setDesktop(mq.matches);
      setCalm(mqCalm.matches);
    };
    on();
    // Each mobile frame is independently seekable. WebM covers Android and
    // Chromium; MP4 remains the native iOS/Safari fallback.
    if (window.innerWidth < 1024) {
      const probe = document.createElement("video");
      const supportsWebm = probe.canPlayType('video/webm; codecs="vp9"') !== "";
      setSrc(supportsWebm ? heroScrollMobileWebm.url : heroScrollMobile.url);
    } else {
      setSrc(heroScroll.url);
    }
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

  // mobile browsers never decode a paused <video> until it has been played
  // once; force a muted play/pause (and retry on the first user gesture) so
  // the frames exist and scroll seeking actually paints.
  useEffect(() => {
    if (!src) return;
    const v = videoRef.current;
    if (!v) return;
    let done = false;
    const unlock = async () => {
      if (done || !videoRef.current) return;
      const el = videoRef.current;
      try {
        if (el.readyState === 0) el.load();
        el.muted = true;
        await el.play();
        el.pause();
        el.currentTime = 0.001;
        done = true;
        detach();
      } catch {
        /* needs a gesture — listeners below will retry */
      }
    };
    const evts = ["touchstart", "pointerdown", "scroll", "wheel", "keydown"] as const;
    const detach = () => evts.forEach((e) => window.removeEventListener(e, unlock));
    evts.forEach((e) => window.addEventListener(e, unlock, { passive: true }));
    void unlock();
    return detach;
  }, [src]);

  // Drive the playhead from scroll. Do not wait for `seeked`: iOS can omit
  // that event for tiny seeks, which previously left the mobile loop locked.
  useEffect(() => {
    if (calm) return;
    let raf = 0;
    const updateTarget = (progress: number) => {
      const video = videoRef.current;
      const normalized = Math.min(Math.max(progress, 0), 1);
      targetTimeRef.current = video && Number.isFinite(video.duration)
        ? normalized * Math.max(video.duration - 0.04, 0)
        : normalized;
    };
    updateTarget(tl.get());
    const unsub = tl.on("change", updateTarget);

    const loop = () => {
      const video = videoRef.current;
      if (video && videoReadyRef.current && Number.isFinite(video.duration)) {
        const target = targetTimeRef.current <= 1
          ? targetTimeRef.current * Math.max(video.duration - 0.04, 0)
          : targetTimeRef.current;
        if (Math.abs(video.currentTime - target) > 1 / 30) {
          video.currentTime = target;
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      unsub();
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
      className="relative h-[300dvh] bg-ink lg:h-[250vh]"
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
      <div className="sticky top-0 h-[100dvh] min-h-[32rem]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_oklch(0.815_0.128_82_/_0.14),transparent_66%)]" />
        </div>

        <div className="relative mx-auto grid h-full max-w-7xl grid-rows-[58vh_auto] items-center gap-2 px-6 pb-8 pt-14 sm:gap-6 lg:grid-cols-[1fr_1.05fr] lg:grid-rows-1 lg:pb-0 lg:pt-0">
          {/* copy */}
          <motion.div
            style={{ y: textY, opacity: textOpacity }}
            className="relative z-[70] order-2 lg:order-1 lg:z-[90]"
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
                {...(src ? { src } : {})}
                key={src ?? "pending"}
                poster={desktop ? heroPoster.url : heroPosterMobile.url}
                className="h-full w-full object-cover"
                muted
                playsInline
                preload="auto"
                autoPlay={false}
                disablePictureInPicture
                onLoadedMetadata={(event) => {
                  videoReadyRef.current = true;
                  const progress = tl.get();
                  targetTimeRef.current = progress * Math.max(event.currentTarget.duration - 0.04, 0);
                  event.currentTarget.currentTime = targetTimeRef.current;
                }}
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
