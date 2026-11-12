# Day 53 - Language Fundamentals II

## In-Class Exercise: The Addis Eats Order Service

### Files Created

**src/orders/order.types.ts**
- Moved Order, Dish, Area, and OrderStatus from Day 52
- Exported by name for use across modules

**src/orders/order.errors.ts**
- `OrderNotFoundError` - carries orderId for 404 responses
- `PaymentDeclinedError` - carries phone and reason for payment failures

**src/orders/order.repository.ts**
- `OrderRepository` interface with `byId()` and `all()`
- `InMemoryOrderRepository` implementation using `Map<number, Order>`
- Constructor accepts seed orders for initialization

**src/orders/order.service.ts**
- `OrderService` class with repository injected via constructor
- `find(id)` - throws `OrderNotFoundError` if not found
- `feesByArea()` - returns `Record<Area, number>` for all delivery fees
- `summarise<K extends keyof Order>(key)` - generic method to extract field values

**src/orders/index.ts**
- Barrel file re-exporting all order module exports
- Allows clean imports: `import { Order } from "./orders"`

**src/seed-orders.ts**
- 12 sample orders for testing
- Covers all areas and order statuses

**src/main.ts**
- Test file demonstrating all functionality
- Imports through barrel file only

### Acceptance Criteria Met

1. ✅ tsc reports zero errors with strict on
2. ✅ No `any`, and no error thrown as a string
3. ✅ feesByArea rejects a missing area at build time (Record<Area, number>)
4. ✅ summarise("name") is string[], not any[] (generic with constraint)
5. ✅ Nothing imports past the barrel file (all imports use "./orders")

### Running the Code

```bash
cd src
tsc --watch
node ../dist/main.js
```

## Homework

### Files Created

**src/homework/group-by.ts**
- Generic `groupBy<T, K extends keyof T>(items, key)` function
- Returns `Map<T[K], T[]>` grouped by the specified key
- Tested with seed orders grouped by area

**src/homework/return-types.ts**
- Three functions from Day 52 with explicit return types
- `deliveryFee(): number`
- `statusMessage(): string`
- `formatEtb(): string`
- Notes on why explicit types are useful

**src/homework/collections.ts**
- Plain object lookup converted to `Record<Area, number>`
- Plain object cache converted to `Map<number, any>`
- Two-sentence explanation for each choice

## Key Concepts Implemented

- **Function signatures** with explicit return types
- **Interfaces** for contracts (OrderRepository)
- **Classes** with parameter properties and implements
- **Generics** with constraints (summarise, groupBy)
- **Collections**: Map for runtime keys, Record for compile-time keys
- **Domain errors**: Custom Error subclasses
- **ES modules**: Named exports and barrel file pattern
