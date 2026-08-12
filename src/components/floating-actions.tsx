import { Link } from "@tanstack/react-router";
import { MessageCircle, UtensilsCrossed, MapPin, Phone, ShoppingBag } from "lucide-react";

import { restaurant, whatsappLink } from "@/lib/restaurant";

export function FloatingActions() {
  return (
    <>
      <a
        href={whatsappLink("Hi Burger Grand! I'd like to place an order.")}
        target="_blank"
        rel="noreferrer"
        className="animate-float-soft fixed bottom-24 right-4 z-40 inline-flex items-center gap-2 rounded-full bg-[oklch(0.62_0.15_150)] px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-lift transition hover:brightness-110 md:bottom-6"
        aria-label="Order on WhatsApp"
      >
        <MessageCircle className="h-4 w-4" />
        <span className="hidden sm:inline">Order on WhatsApp</span>
      </a>

      <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t border-border bg-[oklch(0.988_0.008_90_/_0.96)] backdrop-blur-md md:hidden">
        <Link to="/menu" className="flex flex-col items-center gap-1 py-3 text-[10px] font-semibold uppercase tracking-[0.14em]">
          <UtensilsCrossed className="h-4 w-4 text-primary" /> Menu
        </Link>
        <a href="/#location" className="flex flex-col items-center gap-1 py-3 text-[10px] font-semibold uppercase tracking-[0.14em]">
          <MapPin className="h-4 w-4 text-primary" /> Location
        </a>
        <a href={`tel:${restaurant.phone}`} className="flex flex-col items-center gap-1 py-3 text-[10px] font-semibold uppercase tracking-[0.14em]">
          <Phone className="h-4 w-4 text-primary" /> Call
        </a>
        <Link to="/menu" className="flex flex-col items-center gap-1 bg-primary py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary-foreground">
          <ShoppingBag className="h-4 w-4" /> Order
        </Link>
      </nav>
    </>
  );
}
