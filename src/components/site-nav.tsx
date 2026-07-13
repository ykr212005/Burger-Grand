import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Flame } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/#story", label: "Story" },
  { to: "/#gallery", label: "Gallery" },
  { to: "/#contact", label: "Contact" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 ${
          scrolled ? "glass rounded-2xl" : ""
        } transition-all duration-300`}
      >
        <Link to="/" className="flex items-center gap-2 py-2">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[image:var(--gradient-fire)] shadow-glow">
            <Flame className="h-5 w-5 text-white" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-white">
            Burger <span className="text-gradient-fire">Grand</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.to}
              href={l.to}
              className="group relative text-sm font-medium text-white/80 transition hover:text-white"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[image:var(--gradient-fire)] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href="/menu"
            className="btn-glow hover:btn-glow-hover inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold"
          >
            Order Now
          </a>
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          className="grid h-10 w-10 place-items-center rounded-xl glass text-white md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="mx-4 mt-2 rounded-2xl glass p-4 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((l) => (
              <a
                key={l.to}
                href={l.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-white/90 hover:bg-white/5"
              >
                {l.label}
              </a>
            ))}
            <a
              href="/menu"
              onClick={() => setOpen(false)}
              className="btn-glow hover:btn-glow-hover mt-2 rounded-full px-5 py-3 text-center text-sm font-semibold"
            >
              Order Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
