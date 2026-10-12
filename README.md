# Addis Eats

A Next.js (App Router) application for an Ethiopian food delivery menu. Built for CodeOps Days 36-40 to demonstrate file-based routing, layouts, rendering strategies, server/client components, and API routes.

## Features

### Routing & Layouts (Day 36-37)
- File-based routes: `/`, `/menu`, `/menu/[id]`, `/cart`, `/checkout`
- Dynamic dish pages using `[id]`
- Nested layouts with persistent navigation (Header/Footer in root, menu sidebar)
- Special states: `loading.tsx`, `error.tsx` and `not-found.tsx`

### Rendering Strategies (Day 37)
- Static generation (SSG) for landing page
- Incremental Static Regeneration (ISR) for menu (revalidate=3600)
- Static generation with `generateStaticParams` for dish pages
- Dynamic rendering for checkout (force-dynamic)

### Server & Client Components (Day 38)
- Server components fetch data directly (menu, dishes)
- Client components only where interactivity is needed (cart, filters, forms)
- Composition pattern: server content passed to client shells via children
- Cart state isolated in client provider component

### API Routes & Server Actions (Day 39)
- Route handlers: `GET /api/dishes`, `GET /api/dishes/[id]`, `POST /api/orders`
- Server actions with `"use server"` directive
- Shared zod validation schema for client and server
- Honest status codes (200, 201, 404, 422, 500)
- Cache invalidation with `revalidatePath`

### Cart Functionality
- Add items to cart from menu and dish pages
- View cart with item list and total
- Remove individual items or clear entire cart
- Cart count displayed in header

### Checkout
- Order summary with cart items
- Delivery details form with validation
- Server action for order placement
- Pending state and error handling with `useActionState`
- Form works without JavaScript (progressive enhancement)

## Tech Stack

- Next.js 16.3.8 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Zod (validation)

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production Build

```bash
npm run build
npm start
```

## API Endpoints

### GET /api/dishes
Returns all dishes.

```bash
curl http://localhost:3000/api/dishes
```

### GET /api/dishes/[id]
Returns a single dish by ID. Returns 404 if not found.

```bash
curl http://localhost:3000/api/dishes/kitfo
curl -i http://localhost:3000/api/dishes/not-a-dish  # 404
```

### POST /api/orders
Creates a new order. Validates name, phone (Ethiopian format), and address.

```bash
curl -i -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{"name":"Almaz","phone":"0912345678","address":"Bole Street 123"}'
```

Returns 422 with field errors on validation failure:

```bash
curl -i -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{"name":"Almaz","phone":"0912","address":"Bole"}'  # 422
```

## Build Output

```
Route (app)           Revalidate  Expires
┌ ○ /
├ ○ /_not-found
├ ƒ /api/dishes
├ ƒ /api/dishes/[id]
├ ƒ /api/orders
├ ○ /cart
├ ○ /checkout
├ ○ /menu                     1h
└ ● /menu/[id]
  ├ ● /menu/kitfo
  ├ ● /menu/shiro
  ├ ● /menu/doro-wat
  └ ● /menu/firfir

○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML (uses generateStaticParams)
ƒ  (Dynamic)  server-rendered on demand
```

## Documentation

- **STRATEGY.md**: Rendering strategy for each route with justification
- **BOUNDARY.md**: Component classification (server vs client) with rationale

## Architecture Decisions

### Rendering Strategy
- `/` - Static: Landing page with static content
- `/menu` - ISR (3600s): Dishes change occasionally, benefits from caching
- `/menu/[id]` - Static via params: All dish IDs known at build time
- `/cart` - Static route, Client component: Cart state is browser-private
- `/checkout` - Static route, Client component: Uses server action for writes

### Server/Client Boundary
Only 6 client components:
1. `app/providers.tsx` - Cart context provider (needs state)
2. `app/components/Header.tsx` - Displays cart count (uses context)
3. `app/cart/page.jsx` - Cart management (needs interactivity)
4. `app/checkout/page.tsx` - Checkout form (uses server action)
5. `app/menu/FilterShell.tsx` - Category filtering (needs state)
6. `app/menu/AddToCartButton.tsx` - Add to cart button (onClick handler)

All other components are server components for optimal performance.

## Security

- Server-side validation with zod schema (same as client)
- Session and ownership checks documented in server actions
- No sensitive data in client bundle
- API endpoints validate all inputs

## Future Enhancements

- Real authentication with sessions
- Database integration (currently in-memory storage)
- Order status polling endpoint
- Payment webhook handler
- Image optimization
- SEO metadata


