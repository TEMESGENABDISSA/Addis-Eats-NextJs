// Day 52 - In-Class Exercise: Typing the Addis Eats Order

// Area type - union of four delivery areas from as const array
const AREAS = ["Bole", "Kazanchis", "Piassa", "Megenagna"] as const;
type Area = (typeof AREAS)[number];

// OrderStatus type - union of five order states
type OrderStatus =
  | "PENDING"
  | "PREPARING"
  | "ON_THE_WAY"
  | "DELIVERED"
  | "CANCELLED";

// Dish type with name and price in santim
type Dish = {
  name: string;
  priceSantim: number;
};

// Order type with readonly id and all required fields
type Order = {
  readonly id: number;
  customerName: string;
  area: Area;
  status: OrderStatus;
  dishes: Dish[];
  telebirrPhone?: string;
  totalSantim: number;
};

// Helper function to format ETB amounts
function formatEtb(santim: number): string {
  return new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
  }).format(santim / 100);
}

// Delivery fee calculation - free above 500 ETB, 40 ETB to Bole, 60 ETB elsewhere
function deliveryFee(order: Order): number {
  if (order.totalSantim >= 50000) {
    return 0; // Free delivery for orders over 500 ETB
  } else if (order.area === "Bole") {
    return 4000; // 40 ETB to Bole
  }
  return 6000; // 60 ETB elsewhere
}

// Status message with exhaustive switch and never default
function statusMessage(status: OrderStatus): string {
  switch (status) {
    case "PENDING":
      return "Waiting for the restaurant to accept";
    case "PREPARING":
      return "Your food is being cooked";
    case "ON_THE_WAY":
      return "The rider has left the restaurant";
    case "DELIVERED":
      return "Delivered - enjoy your meal";
    case "CANCELLED":
      return "This order was cancelled";
    default:
      // If a sixth status is ever added to the union,
      // this line stops compiling. That is the point.
      const unreachable: never = status;
      return unreachable;
  }
}

// Receipt generation using multi-line template literal
function receipt(order: Order): string {
  const fee = deliveryFee(order);
  const total = order.totalSantim + fee;

  const dishLines = order.dishes
    .map((dish) => `  ${dish.name}................${formatEtb(dish.priceSantim)}`)
    .join("\n");

  return `
================================
       ADDIS EATS RECEIPT
================================

Order #${order.id}
Customer: ${order.customerName}
Area: ${order.area}
Status: ${statusMessage(order.status)}

--------------------------------
DISHES:
${dishLines}
--------------------------------
Subtotal: ${formatEtb(order.totalSantim)}
Delivery: ${formatEtb(fee)}
--------------------------------
TOTAL:    ${formatEtb(total)}

${order.telebirrPhone ? `TeleBirr: ${order.telebirrPhone}` : ""}

Thank you for ordering with Addis Eats!
================================
`;
}

// Test with sample orders
const sampleOrder1: Order = {
  id: 4821,
  customerName: "Almaz Bekele",
  area: "Bole",
  status: "PREPARING",
  dishes: [
    { name: "Doro Wat", priceSantim: 32000 },
    { name: "Shiro", priceSantim: 18000 },
  ],
  telebirrPhone: "+251911234567",
  totalSantim: 50000,
};

const sampleOrder2: Order = {
  id: 4822,
  customerName: "Dawit Abebe",
  area: "Kazanchis",
  status: "PENDING",
  dishes: [
    { name: "Kitfo", priceSantim: 35000 },
    { name: "Tibs", priceSantim: 29000 },
  ],
  totalSantim: 64000,
};

// Test the functions
console.log(receipt(sampleOrder1));
console.log(statusMessage(sampleOrder1.status));
console.log(deliveryFee(sampleOrder1));

// Export for use in other files
export { formatEtb };
