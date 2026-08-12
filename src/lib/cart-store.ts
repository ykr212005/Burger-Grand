import { useSyncExternalStore } from "react";

export type Cart = Record<string, number>;

const KEY = "bg_cart_v1";

function read(): Cart {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "{}");
  } catch {
    return {};
  }
}

let cart: Cart = read();
const listeners = new Set<() => void>();

function emit() {
  if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(cart));
  listeners.forEach((l) => l());
}

export const cartStore = {
  subscribe(l: () => void) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
  get() {
    return cart;
  },
  add(name: string, qty = 1) {
    cart = { ...cart, [name]: (cart[name] ?? 0) + qty };
    emit();
  },
  remove(name: string) {
    const next = (cart[name] ?? 0) - 1;
    const { [name]: _drop, ...rest } = cart;
    void _drop;
    cart = next <= 0 ? rest : { ...cart, [name]: next };
    emit();
  },
  clear() {
    cart = {};
    emit();
  },
};

const empty: Cart = {};
export function useCart() {
  return useSyncExternalStore(cartStore.subscribe, cartStore.get, () => empty);
}
