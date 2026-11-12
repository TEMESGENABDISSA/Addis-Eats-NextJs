// Day 53 - Homework: Explicit return types for Day 52 functions

// Function 1: deliveryFee - returns number
function deliveryFee(area: string, totalSantim: number): number {
  if (totalSantim >= 50000) {
    return 0;
  } else if (area === "Bole") {
    return 4000;
  }
  return 6000;
}

// Function 2: statusMessage - returns string
type OrderStatus =
  | "PENDING"
  | "PREPARING"
  | "ON_THE_WAY"
  | "DELIVERED"
  | "CANCELLED";

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
      const unreachable: never = status;
      return unreachable;
  }
}

// Function 3: formatEtb - returns string
function formatEtb(santim: number): string {
  return new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
  }).format(santim / 100);
}

// Notes on return types:
// - deliveryFee: Inference would give number, annotation makes intent explicit
// - statusMessage: Inference would give string, annotation documents the contract
// - formatEtb: Inference would give string, annotation clarifies it returns formatted currency
