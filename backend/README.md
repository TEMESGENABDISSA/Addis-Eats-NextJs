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

## API Endpoints

- `GET /api/orders` - Get all orders (optional ?area filter)
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create new order

**Server runs on port 3001** (Next.js frontend uses 3000)

## Day 54 Implementation

- Orders module with controller, service, and repository
- Dependency injection with custom token (ORDER_REPOSITORY)
- DTO validation with class-validator
- Global ValidationPipe with whitelist and transform
