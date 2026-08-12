import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, MessageCircle, MapPin, Phone, Clock } from "lucide-react";

import { restaurant, whatsappLink } from "@/lib/restaurant";

export function SiteFooter() {
  return (
    <footer className="bg-charcoal text-[oklch(0.95_0.01_85)]">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-14 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="display-xl text-3xl text-[oklch(0.98_0.01_85)]">
              Burger <span className="text-accent">Grand</span>
            </div>
            <p className="mt-3 text-sm uppercase tracking-[0.3em] text-[oklch(0.98_0.01_85)]/50">
              {restaurant.tagline}
            </p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-[oklch(0.98_0.01_85)]/65">
              Burgers, pizzas, loaded fries, wraps and thick shakes — served fresh
              near Nawada Metro Station, Uttam Nagar.
            </p>
            <div className="mt-7 flex gap-3">
              <Social href={restaurant.instagram} label="Instagram"><Instagram className="h-4 w-4" /></Social>
              <Social href={restaurant.facebook} label="Facebook"><Facebook className="h-4 w-4" /></Social>
              <Social href={whatsappLink("Hi Burger Grand!")} label="WhatsApp"><MessageCircle className="h-4 w-4" /></Social>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">Explore</h4>
            <ul className="mt-5 space-y-3 text-sm">
              {[
                ["Home", "/"],
                ["Menu", "/menu"],
                ["About", "/#about"],
                ["Gallery", "/#gallery"],
                ["Reviews", "/#reviews"],
                ["Location", "/#location"],
              ].map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="text-[oklch(0.98_0.01_85)]/65 transition hover:text-[oklch(0.98_0.01_85)]">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">Visit</h4>
            <ul className="mt-5 space-y-4 text-sm text-[oklch(0.98_0.01_85)]/65">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                <span>{restaurant.addressLine1}, {restaurant.addressLine2}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="h-4 w-4 shrink-0 text-secondary" />
                <a href={`tel:${restaurant.phone}`} className="hover:text-[oklch(0.98_0.01_85)]">{restaurant.phoneDisplay}</a>
              </li>
              <li className="flex gap-3">
                <Clock className="h-4 w-4 shrink-0 text-secondary" />
                <span>{restaurant.hours.days} · {restaurant.hours.label}</span>
              </li>
            </ul>
            <Link
              to="/menu"
              className="btn-primary hover:btn-primary-hover mt-7 inline-flex rounded-full px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em]"
            >
              Order Now
            </Link>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-[oklch(0.98_0.01_85)]/12 pt-6 text-xs text-[oklch(0.98_0.01_85)]/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Burger Grand. All Rights Reserved.</p>
          <p>Gulab Bagh · Uttam Nagar · Delhi</p>
        </div>
      </div>
    </footer>
  );
}

function Social({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="grid h-10 w-10 place-items-center rounded-full border border-[oklch(0.98_0.01_85)]/18 text-[oklch(0.98_0.01_85)]/80 transition hover:border-secondary hover:bg-secondary hover:text-white"
    >
      {children}
    </a>
  );
}
