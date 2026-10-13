# Rendering Strategies for Addis Eats

This document outlines the rendering strategy for each route in the Addis Eats Next.js application, with justification for each decision.

## Route Strategy Table

| Route | Strategy | Justification |
|-------|----------|---------------|
| `/` | Static (SSG) | Landing page with static content, no dynamic data, no user-specific content |
| `/menu` | Dynamic (Client component) | Converted to client component for search functionality with SWR |
| `/menu/[id]` | Static via generateStaticParams | All dish IDs are known at build time, dishes don't change frequently, can be pre-built |
| `/cart` | Static route, Client component | Route is static (no server data), but component is client for cart state management |
| `/checkout` | Dynamic (force-dynamic) | Will read session cookies and user-specific data, server action writes data |
| `/orders/[id]` | Server component with SWR polling | Server renders initial order data, SWR polls every 5 seconds for status updates |

## Detailed Explanations

### `/` - Home Page
- **Strategy**: Static Site Generation (SSG)
- **Why**: The landing page displays static marketing content with today's specials. No user-specific data, no database queries, no cookies or headers. The content is the same for all visitors and doesn't change frequently.
- **Build symbol**: ○ (static)

### `/menu` - Menu Page
- **Strategy**: Client component with SWR
- **Why**: The menu now includes search-as-you-type functionality with SWR. The search box uses a debounced key, null key when empty, and keepPreviousData to prevent flashing. Since this is triggered by user typing and needs race-condition safety, it must be client-side. The revalidate export is kept for potential future server-side rendering.
- **Build symbol**: λ (dynamic - client component)
- **Configuration**: `export const revalidate = 3600;` (kept for potential future use)

### `/menu/[id]` - Dish Detail Page
- **Strategy**: Static via generateStaticParams
- **Why**: All dish IDs are known at build time from the dishes array. Each dish page can be pre-generated at build time. Since dish details don't change frequently, static generation is ideal for performance. The `generateStaticParams` function returns all dish IDs, so Next.js builds all dish pages during the build process.
- **Build symbol**: ● (prerendered from params)
- **Configuration**: `export async function generateStaticParams()`

### `/cart` - Cart Page
- **Strategy**: Static route with Client component
- **Why**: The route itself is static (no server data fetching, no cookies, no headers). However, the page component is marked `"use client"` because cart state (items, quantities, total) is private to the browser tab and managed in client-side context. The cart needs interactivity (add items, remove items, clear cart) and doesn't need to persist to the server until checkout. This is user-specific state that doesn't belong on the server.
- **Build symbol**: ○ (static route, but component renders on client)
- **Note**: The route is static (○), but the component is client (`"use client"`)

### `/checkout` - Checkout Page
- **Strategy**: Static route with Client component and force-dynamic
- **Why**: The page is a client component (`"use client"`) that uses a server action to place orders. While the route itself doesn't fetch server data (making it static), the `force-dynamic` export is included because in production this page would read session cookies and user-specific data. The server action handles the write operation with proper validation. The client component uses `useActionState` for pending state and error handling.
- **Build symbol**: ○ (static route with client component)
- **Configuration**: `export const dynamic = "force-dynamic";` (for future session integration)

### `/orders/[id]` - Order Status Page
- **Strategy**: Server component with SWR polling
- **Why**: The server component fetches the initial order data and passes it to the client component as `fallbackData`. This ensures the first paint has real data and is SEO-friendly. The client component then uses SWR to poll the order status every 5 seconds (`refreshInterval: 5000`). This combines server-side rendering for the initial load with client-side polling for live updates. The page is dynamic because order IDs are not known at build time.
- **Build symbol**: λ (dynamic)
- **Configuration**: Server component fetches order, SWR with `fallbackData` and `refreshInterval: 5000`

## API Routes

| Route | Method | Strategy | Justification |
|-------|--------|----------|---------------|
| `/api/dishes` | GET | Dynamic | Reads dishes data, supports search query and pagination |
| `/api/dishes/[id]` | GET | Dynamic | Fetches single dish, returns 404 if not found |
| `/api/orders` | POST | Dynamic | Writes data (creates order), never cached |
| `/api/orders/[id]` | GET | Dynamic | Fetches single order for polling, returns 404 if not found |

## Special Files

| File | Purpose | Strategy |
|------|---------|----------|
| `app/loading.tsx` | Root loading state | Server component |
| `app/menu/loading.tsx` | Menu segment loading state | Server component |
| `app/menu/error.tsx` | Menu segment error boundary | Client component (required for error recovery) |
| `app/not-found.tsx` | 404 page | Server component |

## Cache Invalidation

After a successful order placement via server action, `revalidatePath("/orders")` is called to invalidate any cached pages that might display order information. This ensures that pages showing order data stay fresh after writes.

## Decision Process

For each route, we asked:
1. **Who is asking?** - If nobody in particular, it can be static
2. **How stale may it be?** - If an hour is acceptable, use ISR
3. **Do I know the IDs?** - If yes, use generateStaticParams
4. **Does it read a cookie?** - If yes, it must be dynamic
5. **Is it private to one tab?** - If yes, render on the client

## Verification

The build output (`npm run build`) should show:
- `/` marked as ○ (static)
- `/menu` marked as ○ (static with ISR)
- `/menu/[id]` marked as ● (prerendered from params)
- `/cart` marked as λ (dynamic - client component)
- `/checkout` marked as λ (dynamic)

Any disagreement between this document and the build output indicates either a bug or a decision that needs re-evaluation.
