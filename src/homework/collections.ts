// Day 53 - Homework: Converting lookups to Record and Map

// Example 1: Plain object lookup converted to Record
// Before (plain object):
const feeByAreaOld: { [key: string]: number } = {
  Bole: 4000,
  Kazanchis: 6000,
  Piassa: 6000,
  Megenagna: 6000,
};

// After (Record with typed keys):
type Area = "Bole" | "Kazanchis" | "Piassa" | "Megenagna";

const feeByArea: Record<Area, number> = {
  Bole: 4000,
  Kazanchis: 6000,
  Piassa: 6000,
  Megenagna: 6000,
};

// Why Record fits: The key set (delivery areas) is known at compile time and must be complete.
// If we add a new Area to the union, the Record will fail to compile until we add a fee for it.
// This provides exhaustiveness checking similar to the switch statement.

// Example 2: Plain object lookup converted to Map
// Before (plain object):
const orderCacheOld: { [key: number]: any } = {};

// After (Map):
const orderCache = new Map<number, any>();

// Why Map fits: The keys (order IDs) are added at runtime as orders come in.
// Map provides better performance for frequent additions/removals, has a proper size property,
// and allows any type as a key (though we use numbers here). It also avoids prototype pollution issues.

// Test the Record
console.log("Fee for Bole:", feeByArea["Bole"]); // 4000
console.log("Fee for Kazanchis:", feeByArea["Kazanchis"]); // 6000

// Test the Map
orderCache.set(1, { id: 1, total: 50000 });
orderCache.set(2, { id: 2, total: 32000 });
console.log("Cache size:", orderCache.size); // 2
console.log("Order 1:", orderCache.get(1));
