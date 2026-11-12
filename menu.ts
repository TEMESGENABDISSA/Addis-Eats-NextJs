// Day 52 - Homework: Menu with Ethiopian dishes

// Helper function to format ETB amounts (copied from order.ts for standalone use)
function formatEtb(santim: number): string {
  return new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
  }).format(santim / 100);
}

// Dish type (reused from order.ts for consistency)
type Dish = {
  name: string;
  priceSantim: number;
};

// Eight real Ethiopian dishes with prices in santim
const menu: Dish[] = [
  { name: "Doro Wat", priceSantim: 32000 }, // 320 ETB
  { name: "Kitfo", priceSantim: 35000 }, // 350 ETB
  { name: "Shiro", priceSantim: 18000 }, // 180 ETB
  { name: "Tibs", priceSantim: 29000 }, // 290 ETB
  { name: "Firfir", priceSantim: 16000 }, // 160 ETB
  { name: "Gomen", priceSantim: 15000 }, // 150 ETB
  { name: "Kik Alicha", priceSantim: 14000 }, // 140 ETB
  { name: "Misir Wat", priceSantim: 17000 }, // 170 ETB
];

// Function returning dishes under a given price
function dishesUnderPrice(maxPriceSantim: number): Dish[] {
  return menu.filter((dish) => dish.priceSantim < maxPriceSantim);
}

// Function returning total of whole menu formatted in ETB
function menuTotal(): string {
  const totalSantim = menu.reduce((sum, dish) => sum + dish.priceSantim, 0);
  return formatEtb(totalSantim);
}

// Test the functions
console.log("Dishes under 200 ETB:");
console.log(dishesUnderPrice(20000));

console.log("\nMenu total:");
console.log(menuTotal());
