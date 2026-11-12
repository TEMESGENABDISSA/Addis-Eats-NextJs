// Day 53 - Seed Orders for Testing

import { Order, Area } from "./orders/order.types";

export const seedOrders: Order[] = [
  {
    id: 1,
    customerName: "Almaz Bekele",
    area: "Bole" as Area,
    status: "PREPARING",
    dishes: [
      { name: "Doro Wat", priceSantim: 32000 },
      { name: "Shiro", priceSantim: 18000 },
    ],
    telebirrPhone: "+251911234567",
    totalSantim: 50000,
  },
  {
    id: 2,
    customerName: "Dawit Abebe",
    area: "Kazanchis" as Area,
    status: "PENDING",
    dishes: [
      { name: "Kitfo", priceSantim: 35000 },
      { name: "Tibs", priceSantim: 29000 },
    ],
    totalSantim: 64000,
  },
  {
    id: 3,
    customerName: "Sara Tekle",
    area: "Piassa" as Area,
    status: "ON_THE_WAY",
    dishes: [
      { name: "Firfir", priceSantim: 16000 },
      { name: "Gomen", priceSantim: 15000 },
    ],
    telebirrPhone: "+251922345678",
    totalSantim: 31000,
  },
  {
    id: 4,
    customerName: "Mikael Tadesse",
    area: "Megenagna" as Area,
    status: "DELIVERED",
    dishes: [
      { name: "Kik Alicha", priceSantim: 14000 },
      { name: "Misir Wat", priceSantim: 17000 },
    ],
    totalSantim: 31000,
  },
  {
    id: 5,
    customerName: "Hanna Solomon",
    area: "Bole" as Area,
    status: "CANCELLED",
    dishes: [
      { name: "Doro Wat", priceSantim: 32000 },
    ],
    totalSantim: 32000,
  },
  {
    id: 6,
    customerName: "Kaleb Yohannes",
    area: "Kazanchis" as Area,
    status: "PENDING",
    dishes: [
      { name: "Shiro", priceSantim: 18000 },
      { name: "Tibs", priceSantim: 29000 },
      { name: "Kitfo", priceSantim: 35000 },
    ],
    telebirrPhone: "+251933456789",
    totalSantim: 82000,
  },
  {
    id: 7,
    customerName: "Ruth Mekonnen",
    area: "Bole" as Area,
    status: "DELIVERED",
    dishes: [
      { name: "Firfir", priceSantim: 16000 },
    ],
    totalSantim: 16000,
  },
  {
    id: 8,
    customerName: "Daniel Gebre",
    area: "Piassa" as Area,
    status: "PREPARING",
    dishes: [
      { name: "Misir Wat", priceSantim: 17000 },
      { name: "Kik Alicha", priceSantim: 14000 },
    ],
    telebirrPhone: "+251944567890",
    totalSantim: 31000,
  },
  {
    id: 9,
    customerName: "Bethelhem Alemu",
    area: "Megenagna" as Area,
    status: "ON_THE_WAY",
    dishes: [
      { name: "Doro Wat", priceSantim: 32000 },
      { name: "Kitfo", priceSantim: 35000 },
    ],
    totalSantim: 67000,
  },
  {
    id: 10,
    customerName: "Yonas Fikre",
    area: "Bole" as Area,
    status: "PENDING",
    dishes: [
      { name: "Tibs", priceSantim: 29000 },
    ],
    telebirrPhone: "+251955678901",
    totalSantim: 29000,
  },
  {
    id: 11,
    customerName: "Marta Tesfaye",
    area: "Kazanchis" as Area,
    status: "DELIVERED",
    dishes: [
      { name: "Gomen", priceSantim: 15000 },
      { name: "Shiro", priceSantim: 18000 },
    ],
    totalSantim: 33000,
  },
  {
    id: 12,
    customerName: "Abraham Belete",
    area: "Piassa" as Area,
    status: "CANCELLED",
    dishes: [
      { name: "Kitfo", priceSantim: 35000 },
    ],
    totalSantim: 35000,
  },
];
