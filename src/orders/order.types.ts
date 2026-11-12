// Day 53 - In-Class Exercise: Order Types

// Area type - union of four delivery areas from as const array
const AREAS = ["Bole", "Kazanchis", "Piassa", "Megenagna"] as const;
export type Area = (typeof AREAS)[number];

// OrderStatus type - union of five order states
export type OrderStatus =
  | "PENDING"
  | "PREPARING"
  | "ON_THE_WAY"
  | "DELIVERED"
  | "CANCELLED";

// Dish type with name and price in santim
export interface Dish {
  name: string;
  priceSantim: number;
}

// Order type with readonly id and all required fields
export interface Order {
  readonly id: number;
  customerName: string;
  area: Area;
  status: OrderStatus;
  dishes: Dish[];
  telebirrPhone?: string;
  totalSantim: number;
}
