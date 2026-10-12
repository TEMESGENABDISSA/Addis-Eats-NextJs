# Component Boundaries for Addis Eats

This document outlines which components run on the server vs. the client, and the rationale for each boundary decision.

## Component Classification

### Server Components (Default)

| Component | Runs On | Why |
|-----------|---------|-----|
| `app/layout.tsx` | Server | Root layout, owns html/body, passes children to CartProvider |
| `app/page.tsx` | Server | Landing page, no interactivity, static content |
| `app/menu/page.tsx` | Server | Fetches dishes data, no state or handlers |
| `app/menu/layout.tsx` | Server | Menu layout shell, no interactivity |
| `app/menu/DishList.tsx` | Server | Pure markup from data, ships no JavaScript |
| `app/menu/[id]/page.tsx` | Server | Fetches dish data, no interactivity |
| `app/components/Footer.tsx` | Server | Static footer, no interactivity |
| `app/menu/dishes.tsx` | Server | Data module, async functions for server fetching |
| `app/menu/loading.tsx` | Server | Loading state for menu segment |
| `app/not-found.tsx` | Server | 404 page, no interactivity |

### Client Components (Marked with "use client")

| Component | Runs On | Why |
|-----------|---------|-----|
| `app/providers.tsx` | Client | Context provider requires state (cart) |
| `app/components/Header.tsx` | Client | Uses cart context to display cart count |
| `app/cart/page.jsx` | Client | Uses cart context, has onClick handlers |
| `app/checkout/page.tsx` | Client | Uses server action and useActionState, has form interactivity |
| `app/menu/FilterShell.tsx` | Client | Holds selected category state, onClick handlers |
| `app/menu/AddToCartButton.tsx` | Client | onClick handler, calls cart context |
| `app/menu/error.tsx` | Client | Has onClick handler for reset button |

## Boundary Decisions

### 1. Root Layout → CartProvider
- **Pattern**: Server component wraps client provider via children
- **Rationale**: Layout stays server, provider is isolated client component
- **Benefit**: Only the provider (~2 kB) ships to browser, not the entire layout

### 2. Menu Page → FilterShell → DishList
- **Pattern**: Server page → Client shell → Server content (via children)
- **Rationale**: FilterShell needs state for category selection, DishList is pure markup
- **Benefit**: Filtering interaction in browser, dish cards as plain HTML

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
- Only 7 client components (small interactive leaves)
- Most markup rendered as HTML on server
- Minimal JavaScript shipped (~2-5 kB for interactive parts)
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

## Future Considerations

- Cart page will remain client (user-specific state)
- Checkout may need to read cookies/session (dynamic route already set)
- Search/filter functionality would be client (user interaction)
- Order tracking would be client (polling for live updates)
