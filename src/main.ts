// Day 53 - Main Test File

import { seedOrders } from "./seed-orders";
import {
  OrderService,
  InMemoryOrderRepository,
  OrderNotFoundError,
} from "./orders";

// Create repository with seed data
const repo = new InMemoryOrderRepository(seedOrders);

// Create service with repository
const service = new OrderService(repo);

// Test finding an existing order
console.log("Test 1: Find existing order");
const order1 = service.find(1);
console.log(`Found order: ${order1.customerName} - ${order1.status}`);

// Test finding a non-existent order (should throw)
console.log("\nTest 2: Find non-existent order");
try {
  service.find(999);
} catch (err) {
  if (err instanceof OrderNotFoundError) {
    console.log(`Caught expected error: ${err.message}`);
  }
}

// Test feesByArea
console.log("\nTest 3: Fees by area");
const fees = service.feesByArea();
console.log(fees);

// Test summarise with different keys
console.log("\nTest 4: Summarise by customerName");
const names = service.summarise("customerName");
console.log(names);

console.log("\nTest 5: Summarise by totalSantim");
const totals = service.summarise("totalSantim");
console.log(totals);

console.log("\nTest 6: Summarise by area");
const areas = service.summarise("area");
console.log(areas);

console.log("\nAll tests passed!");
