import { Order } from "./order.types";

export const SEED: Order[] = [
  {
    id: 1,
    customerId: 2, // customer
    customerName: "Abebe",
    area: "Bole",
    status: "PENDING",
    restaurantId: 1,
    lines: [{ dishId: 1, quantity: 1 }],
    totalSantim: 32000,
  },
  {
    id: 2,
    customerId: 2, // customer
    customerName: "Kebede",
    area: "Bole",
    status: "PREPARING",
    restaurantId: 2,
    lines: [{ dishId: 3, quantity: 1 }],
    totalSantim: 35000,
  },
  {
    id: 3,
    customerId: 2, // customer
    courierId: 3, // courier
    customerName: "Almaz",
    area: "Kazanchis",
    status: "ON_THE_WAY",
    restaurantId: 3,
    lines: [{ dishId: 5, quantity: 1 }],
    totalSantim: 16000,
  },
  {
    id: 4,
    customerId: 2, // customer
    courierId: 3, // courier
    customerName: "Dawit",
    area: "Piassa",
    status: "DELIVERED",
    restaurantId: 4,
    lines: [{ dishId: 7, quantity: 1 }],
    totalSantim: 14000,
  },
  {
    id: 5,
    customerId: 2, // customer
    customerName: "Hanna",
    area: "Megenagna",
    status: "CANCELLED",
    restaurantId: 1,
    lines: [{ dishId: 2, quantity: 1 }],
    totalSantim: 18000,
  },
  {
    id: 6,
    customerId: 2, // customer
    customerName: "Mikael",
    area: "Bole",
    status: "PENDING",
    restaurantId: 1,
    lines: [{ dishId: 4, quantity: 1 }],
    totalSantim: 15000,
  },
  {
    id: 7,
    customerId: 2, // customer
    customerName: "Sara",
    area: "Kazanchis",
    status: "PREPARING",
    restaurantId: 2,
    lines: [{ dishId: 6, quantity: 1 }],
    totalSantim: 29000,
  },
  {
    id: 8,
    customerId: 2, // customer
    courierId: 3, // courier
    customerName: "Yosef",
    area: "Piassa",
    status: "ON_THE_WAY",
    restaurantId: 3,
    lines: [{ dishId: 8, quantity: 1 }],
    totalSantim: 17000,
  },
  {
    id: 9,
    customerId: 2, // customer
    courierId: 3, // courier
    customerName: "Rahel",
    area: "Megenagna",
    status: "DELIVERED",
    restaurantId: 4,
    lines: [{ dishId: 1, quantity: 1 }],
    totalSantim: 32000,
  },
  {
    id: 10,
    customerId: 2, // customer
    customerName: "Tewodros",
    area: "Bole",
    status: "CANCELLED",
    restaurantId: 2,
    lines: [{ dishId: 3, quantity: 1 }],
    totalSantim: 35000,
  },
  {
    id: 11,
    customerId: 2, // customer
    customerName: "Birtukan",
    area: "Kazanchis",
    status: "PENDING",
    restaurantId: 1,
    lines: [{ dishId: 2, quantity: 1 }],
    totalSantim: 18000,
  },
  {
    id: 12,
    customerId: 2, // customer
    customerName: "Kaleb",
    area: "Piassa",
    status: "PREPARING",
    restaurantId: 4,
    lines: [{ dishId: 7, quantity: 1 }],
    totalSantim: 14000,
  },
  {
    id: 13,
    customerId: 2, // customer
    courierId: 3, // courier
    customerName: "Meron",
    area: "Megenagna",
    status: "ON_THE_WAY",
    restaurantId: 1,
    lines: [{ dishId: 4, quantity: 1 }],
    totalSantim: 15000,
  },
  {
    id: 14,
    customerId: 2, // customer
    courierId: 3, // courier
    customerName: "Natan",
    area: "Bole",
    status: "DELIVERED",
    restaurantId: 3,
    lines: [{ dishId: 5, quantity: 1 }],
    totalSantim: 16000,
  },
];
