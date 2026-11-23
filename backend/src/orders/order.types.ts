// Order types for the Addis Eats API

const AREAS = ["Bole", "Kazanchis", "Piassa", "Megenagna"] as const;
export type Area = (typeof AREAS)[number];

export type OrderStatus =
  | "PENDING"
  | "PREPARING"
  | "ON_THE_WAY"
  | "DELIVERED"
  | "CANCELLED";

export interface OrderLine {
  dishId: number;
  quantity: number;
}

export interface Order {
  readonly id: number;
  customerId: number; // User who placed the order
  courierId?: number; // Courier assigned to deliver
  customerName: string;
  area: Area;
  status: OrderStatus;
  restaurantId: number;
  lines: OrderLine[];
  telebirrPhone?: string;
  totalSantim: number;
}
