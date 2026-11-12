// Day 53 - Homework: Generic groupBy function

// Generic function to group items by a key
export function groupBy<T, K extends keyof T>(
  items: T[],
  key: K,
): Map<T[K], T[]> {
  const map = new Map<T[K], T[]>();

  for (const item of items) {
    const keyValue = item[key];
    const existing = map.get(keyValue);

    if (existing) {
      existing.push(item);
    } else {
      map.set(keyValue, [item]);
    }
  }

  return map;
}

// Test with seed orders
import { seedOrders } from "../seed-orders";

const ordersByArea = groupBy(seedOrders, "area");

console.log("Orders grouped by area:");
for (const [area, orders] of ordersByArea) {
  console.log(`${area}: ${orders.length} orders`);
}
