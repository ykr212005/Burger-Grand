# New Top Bun + 60 FPS Mobile Scroll

## 1. Replace the top bun
The screenshot shows a tall, glossy, heavily seeded sesame brioche dome with warm rim lighting. The screenshot itself is a UI capture (too low-res and not transparent), so it is used as a style reference only.

- Generate a new transparent PNG top bun matching that reference: tall domed brioche, dense sesame seeds, glossy warm highlight, soft shadow, shot straight-on so it stacks cleanly.
- Save as `src/assets/layer-topbun.png`, replacing the current file so no import changes are needed.
- Nudge the top bun layer's width/offset in `LAYERS` if the new dome reads taller than the old art.

## 2. Smooth 60 FPS on mobile
Current hero animates 7 layers, each with 6 live motion values, plus smoke, particles and a stage spring.

- Drop per-layer 3D on touch devices: skip `rotateX` and `translateZ`, keep only `y` + `rotate`, so layers stay on cheap 2D compositing.
- Skip the mouse-parallax motion values entirely when not on a fine pointer (no `x`/`translateY` bindings at all on mobile).
- Reduce spring work: lighter spring config on mobile and a larger `restDelta` so the animation settles instead of ticking.
- Layer hygiene: `will-change: transform`, `backface-visibility: hidden`, `contain: paint` on the stage; lighten the heavy multi-pixel `drop-shadow` (expensive per frame) to a cheaper baked shadow on small screens.
- Cut background cost: fewer smoke blobs and smaller blur radius on mobile, particles reduced further (blur-3xl on 4 elements is the biggest paint cost).
- Respect `prefers-reduced-motion`: render the assembled burger with no scroll scrub.

## Technical notes
All work is in `src/components/exploded-burger-hero.tsx` plus the regenerated `src/assets/layer-topbun.png`. No data, routing, or cart logic changes. Verified afterwards with a typecheck and a scroll pass in a mobile-sized viewport.
