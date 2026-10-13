# Data Fetching Strategy

This document documents every client-side query in the application, its key, refresh rule, and the justification.

## Query Keys and Strategies

### Order Status Polling

**Component**: `app/orders/[id]/OrderStatus.tsx`

**Key**: `/api/orders/${id}`

**Configuration**:
```typescript
useSWR(`/api/orders/${id}`, fetcher, {
  fallbackData: initialData,
  refreshInterval: 5000,
  revalidateOnFocus: false,
})
```

**Why**:
- **Polling (refreshInterval: 5000)**: Order status changes on the server (pending → confirmed → cancelled). The user needs to see updates without refreshing.
- **No focus revalidation (revalidateOnFocus: false)**: Order status doesn't change when the user switches tabs. Avoids unnecessary requests.
- **fallbackData**: Server component fetches the order and passes it as initial data. No loading spinner on first paint; page arrives complete and indexable.

**Seeding**: The server component (`app/orders/[id]/page.tsx`) fetches the order and passes it as `initialData` to the client component. This ensures the first paint has real data and is SEO-friendly.

---

### Menu Search

**Component**: `app/menu/SearchBox.tsx`

**Key**: `/api/dishes?q=${debounced}&page=${page}` (when searching) or `null` (when empty)

**Configuration**:
```typescript
useSWR(
  debounced ? `/api/dishes?q=${debounced}&page=${page}` : null,
  fetcher,
  {
    keepPreviousData: true,
  }
)
```

**Why**:
- **Null key when empty**: No search term means no request. Avoids fetching all dishes when the user hasn't typed anything.
- **Debounced (300ms)**: Prevents a request per keystroke. Waits for the user to stop typing before fetching.
- **keepPreviousData: true**: Prevents the list from flashing empty between search terms. Shows the previous results while the new ones load.
- **Page in query string**: Pagination state is in the URL, making results shareable and bookmarkable.

**Pagination**: 
- PAGE_SIZE = 2 (small for demonstration)
- Page number in query string (`?page=1`, `?page=2`)
- Previous/Next buttons to navigate pages
- Resets to page 1 when search term changes

---

## Server vs Client Fetching

### Server Components (No SWR needed)

- **`app/menu/page.tsx`** (before Day 41): Fetches dishes directly on server using `getDishes()`. No client-side fetching needed for initial menu load.
- **`app/menu/[id]/page.tsx`**: Fetches single dish on server. Prerendered via `generateStaticParams`.

### Client Components (SWR needed)

- **`app/orders/[id]/OrderStatus.tsx`**: Polls for status updates. Server components cannot poll.
- **`app/menu/SearchBox.tsx`**: Search-as-you-type. Triggered by user typing, needs debouncing and race-condition safety.

## Why SWR Instead of useEffect?

A hand-written `useEffect` would need:
1. Caching (to avoid duplicate requests)
2. Deduplication (multiple components sharing data)
3. Race-condition safety (last response wins)
4. Cleanup (cancel on unmount)
5. Debouncing logic
6. Pagination state management

SWR provides all of this in one hook, with a declarative API based on the **key**.

## Key Design Principles

1. **Server first**: If a server component can fetch it, let it. SWR is only for what genuinely must be client-side (polling, search-as-you-type).
2. **Key drives behavior**: The key identifies the cache entry and triggers refetches. Changing the key changes the data.
3. **Null means don't fetch**: Conditional fetching via `null` key instead of wrapping hooks in `if` statements.
4. **Seed from server**: Use `fallbackData` to pass server-rendered data to SWR, eliminating the first loading state.
5. **URL for state**: Pagination state in the query string makes results shareable and bookmarkable.
