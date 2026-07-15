import { useSyncExternalStore } from "react";

export type OrderLine = { name: string; qty: number; price: number };
export type Order = {
  id: string;
  createdAt: number;
  lines: OrderLine[];
  subtotal: number;
  tax: number;
  delivery: number;
  total: number;
  status: "Preparing" | "Out for delivery" | "Delivered";
};

const KEY = "bg_orders_v1";

function read(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

let orders: Order[] = read();
const listeners = new Set<() => void>();

function emit() {
  if (typeof window !== "undefined") {
    localStorage.setItem(KEY, JSON.stringify(orders));
  }
  listeners.forEach((l) => l());
}

export const ordersStore = {
  subscribe(l: () => void) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
  get() {
    return orders;
  },
  add(o: Omit<Order, "id" | "createdAt" | "status">) {
    orders = [
      {
        ...o,
        id: `BG${Date.now().toString().slice(-6)}`,
        createdAt: Date.now(),
        status: "Preparing",
      },
      ...orders,
    ];
    emit();
  },
  clear() {
    orders = [];
    emit();
  },
};

const empty: Order[] = [];
export function useOrders() {
  return useSyncExternalStore(
    ordersStore.subscribe,
    ordersStore.get,
    () => empty,
  );
}
