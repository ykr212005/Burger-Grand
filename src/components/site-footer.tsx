import { Flame, Instagram, Facebook, Twitter, Youtube } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-[oklch(0.09_0.005_20)] pt-24">
      {/* glowing divider */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[image:var(--gradient-fire)] opacity-70" />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-24 blur-3xl opacity-40"
        style={{ background: "var(--gradient-fire)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 pb-10">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-[image:var(--gradient-fire)] shadow-glow">
                <Flame className="h-5 w-5 text-white" />
              </span>
              <span className="font-display text-xl font-bold text-white">
                Burger <span className="text-gradient-fire">Grand</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-white/60">
              Handcrafted burgers, wood-fired pizzas, thick shakes and
              indulgent sundaes — made fresh, served hot.
            </p>
            <div className="mt-6 flex gap-3">
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-10 w-10 place-items-center rounded-full glass text-white/80 transition hover:text-white hover:shadow-glow"
                  aria-label="social"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <FooterCol
            title="Explore"
            links={[
              ["Home", "/"],
              ["Menu", "/menu"],
              ["Story", "/#story"],
              ["Gallery", "/#gallery"],
            ]}
          />
          <FooterCol
            title="Company"
            links={[
              ["Contact", "/#contact"],
              ["Delivery", "/#delivery"],
              ["Careers", "#"],
              ["Reviews", "/#reviews"],
            ]}
          />
          <FooterCol
            title="Legal"
            links={[
              ["Privacy Policy", "#"],
              ["Terms of Service", "#"],
              ["Cookie Policy", "#"],
              ["Refunds", "#"],
            ]}
          />
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/50 md:flex-row">
          <p>© {new Date().getFullYear()} Burger Grand. All rights reserved.</p>
          <p>Crafted with fire, served with love.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="font-display text-sm font-semibold uppercase tracking-widest text-white/80">
        {title}
      </h4>
      <ul className="mt-4 space-y-2 text-sm">
        {links.map(([label, href]) => (
          <li key={label}>
            <a
              href={href}
              className="text-white/60 transition hover:text-accent"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
