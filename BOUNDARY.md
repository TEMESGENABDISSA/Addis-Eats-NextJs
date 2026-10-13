# Component Boundaries for Addis Eats

This document outlines which components run on the server vs. the client, and the rationale for each boundary decision.

## Component Classification

### Server Components (Default)

| Component | Runs On | Why |
|-----------|---------|-----|
| `app/layout.tsx` | Server | Root layout, owns html/body, passes children to CartProvider |
| `app/page.tsx` | Server | Landing page, no interactivity, static content |
| `app/menu/layout.tsx` | Server | Menu layout shell, no interactivity |
| `app/menu/DishList.tsx` | Server | Pure markup from data, ships no JavaScript |
| `app/menu/[id]/page.tsx` | Server | Fetches dish data, no interactivity |
| `app/components/Footer.tsx` | Server | Static footer, no interactivity |
| `app/menu/dishes.tsx` | Server | Data module, async functions for server fetching |
| `app/menu/loading.tsx` | Server | Loading state for menu segment |
| `app/not-found.tsx` | Server | 404 page, no interactivity |
| `app/orders/[id]/page.tsx` | Server | Fetches order data, passes to client for polling |

### Client Components (Marked with "use client")

| Component | Runs On | Why |
|-----------|---------|-----|
| `app/providers.tsx` | Client | Context provider requires state (cart) |
| `app/components/Header.tsx` | Client | Uses cart context to display cart count |
| `app/cart/page.jsx` | Client | Uses cart context, has onClick handlers |
| `app/checkout/page.tsx` | Client | Uses server action and useActionState, has form interactivity |
| `app/menu/page.tsx` | Client | Uses SWR for search-as-you-type, needs state management |
| `app/menu/FilterShell.tsx` | Client | Holds selected category state, onClick handlers |
| `app/menu/SearchBox.tsx` | Client | Uses SWR with debounced key, pagination state |
| `app/menu/AddToCartButton.tsx` | Client | onClick handler, calls cart context |
| `app/menu/error.tsx` | Client | Has onClick handler for reset button |
| `app/orders/[id]/OrderStatus.tsx` | Client | Uses SWR for polling order status every 5 seconds |

## Boundary Decisions

### 1. Root Layout → CartProvider
- **Pattern**: Server component wraps client provider via children
- **Rationale**: Layout stays server, provider is isolated client component
- **Benefit**: Only the provider (~2 kB) ships to browser, not the entire layout

### 2. Menu Page → SearchBox → FilterShell → DishList
- **Pattern**: Client page with SWR → Client search shell → Client filter shell → Server content
- **Rationale**: Menu page converted to client for search-as-you-type with SWR. SearchBox uses debounced key and null key for conditional fetching. FilterShell needs category state. DishList is pure markup.
- **Benefit**: Search-as-you-type with race-condition safety, filtering in browser, dish cards as plain HTML

### 3. DishList → AddToCartButton
- **Pattern**: Server component imports client component
- **Rationale**: Button needs onClick handler, list is pure markup
- **Benefit**: Only the button ships to browser, not the entire list

### 4. Header → CartProvider
- **Pattern**: Client component uses context from client provider
- **Rationale**: Header needs cart count which is in context
- **Benefit**: Smallest leaf that needs interactivity

### 5. Checkout Page → Server Action
- **Pattern**: Client component calls server action via form
- **Rationale**: Checkout needs interactivity (form, pending state, error handling) and writes data
- **Benefit**: Form works without JavaScript (progressive enhancement), server action handles validation and writes

### 6. Order Status Page → SWR Polling
- **Pattern**: Server component fetches data, passes to client component for polling
- **Rationale**: Server renders initial order data for SEO and first paint. Client component uses SWR to poll every 5 seconds for live status updates.
- **Benefit**: No loading spinner on first paint (fallbackData), live updates without page refresh

## Key Principles Applied

1. **Server by default** - Every component starts as server, only add "use client" when genuinely needed
2. **Push to leaves** - Client directives are on the smallest interactive pieces (buttons, filters)
3. **Pass, don't import** - Server content passed to client shells as children, not imported
4. **Async on server** - Data fetching happens in async server components, no useEffect needed

## Bundle Impact

### Before (Hypothetical)
If all components were client:
- Entire app bundle shipped to browser
- All React code runs in browser
- Larger JavaScript payload

### After (Current Implementation)
- 10 client components (interactive leaves for search, polling, cart)
- Most markup rendered as HTML on server
- Minimal JavaScript shipped (~5-10 kB for interactive parts)
- Faster initial page load
- Better SEO (content in HTML)

## Error Boundary Note

`app/menu/error.tsx` must be a client component because:
- It has an onClick handler for the reset button
- Error boundaries in Next.js app router require "use client"
- This is the correct placement - error catching happens at segment level

## Server Actions Note

`app/actions.ts` contains server actions marked with `"use server"`:
- Server actions are the exception to the "functions cannot cross boundary" rule
- They run on the server but can be called from client components
- Used for writes (placeOrder, cancelOrder) from your own UI
- Security checks must be inside the action (session, ownership validation)
- Forms using server actions work before JavaScript loads (progressive enhancement)

## SWR Note

SWR is used for client-side data fetching in two places:
- **Order Status Polling**: `app/orders/[id]/OrderStatus.tsx` polls `/api/orders/[id]` every 5 seconds
- **Menu Search**: `app/menu/SearchBox.tsx` searches dishes with debounced key and pagination

SWR provides:
- Caching and deduplication (same key = one network request)
- Revalidation on focus and reconnect (configurable)
- Race-condition safety (last response wins)
- keepPreviousData (prevents flashing between searches)
- fallbackData (seeds client query with server data)

SWR is only used for what genuinely must be client-side:
- Polling (server components cannot poll)
- Search-as-you-type (triggered by user typing, needs debouncing)
- Pagination beyond first page (triggered by user interaction)

## Future Considerations

- Cart page will remain client (user-specific state)
- Checkout may need to read cookies/session (dynamic route already set)
- Search/filter functionality would be client (user interaction)
- Order tracking would be client (polling for live updates)
