# Addis Eats API Backend

NestJS backend for the Addis Eats food delivery service.

## Installation

```bash
cd backend
npm install
```

## Running the App

```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

## Response Shape Convention

**Collections:** All list endpoints return `Page<T>` with the following shape:
```typescript
{
  items: T[];
  total: number;
  limit: number;
  offset: number;
}
```

**Single Members:** Single item endpoints return the object itself (not wrapped).

**Errors:** Errors follow Nest's default shape:
```typescript
{
  statusCode: number;
  message: string;
  error: string;
}
```

## API Endpoints

### Restaurants
- `GET /api/restaurants` - List all restaurants (supports ?area, ?isOpen, ?limit, ?offset, ?sort)
- `GET /api/restaurants/open` - List only open restaurants
- `GET /api/restaurants/:id` - Get restaurant by ID
- `GET /api/restaurants/:id/dishes` - Get dishes for a specific restaurant
- `GET /api/restaurants/:id/orders` - Get orders for a specific restaurant
- `POST /api/restaurants` - Create new restaurant

### Dishes
- `GET /api/dishes` - List all dishes (supports ?restaurantId)
- `GET /api/dishes/:id` - Get dish by ID
- `POST /api/dishes` - Create new dish

### Orders
- `GET /api/orders` - List all orders (supports ?status, ?area, ?limit, ?offset, ?sort)
- `GET /api/orders/pending` - List only pending orders
- `GET /api/orders/:id` - Get order by ID
- `PATCH /api/orders/:id/status` - Update order status
- `DELETE /api/orders/:id` - Cancel order (returns 204)
- `POST /api/orders` - Create new order

**Server runs on port 3001** (Next.js frontend uses 3000)

## Implementation History

### Day 56
- Added `Page<T>` interface for consistent collection responses
- Added query DTOs with filtering, sorting, and pagination
- Added sub-resource routes: `/restaurants/:id/dishes`, `/restaurants/:id/orders`
- Added `/api/orders/pending` static route (above /:id)
- Added `PATCH /api/orders/:id/status` endpoint
- Added `DELETE /api/orders/:id` with 204 status
- Added 14 seeded orders across all areas and statuses

### Day 55
- Restaurants module with full CRUD
- Dishes module with validation
- Global exception filter for domain errors (404 mapping)
- In-memory repositories with seed data

### Day 54
- Orders module with controller, service, and repository
- Dependency injection with custom tokens
- DTO validation with class-validator
- Global ValidationPipe with whitelist and transform
