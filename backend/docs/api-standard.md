# Addis Eats API Standard

## Naming

- Plural nouns for collections (e.g., `/restaurants`, `/orders`)
- Lower case, hyphenated (e.g., `/order-items`, not `/orderItems` or `/Order_Items`)
- No verbs in paths (e.g., `/orders`, not `/createOrder`)
- The id identifies, nothing else (e.g., `/orders/1`, not `/orders/get/1`)
- Nest to show belonging (e.g., `/restaurants/1/dishes`)
- No file extensions (e.g., `/orders`, not `/orders.json`)
- No trailing slash (e.g., `/orders`, not `/orders/`)
- Filters go in the query string (e.g., `?status=PENDING`, not `/orders/status/PENDING`)
- Keep nesting to two levels maximum

## Versioning

- URI versioning: `/api/v1/...`
- The entire API surface moves together when versioning
- Default version is "1"
- Unversioned paths return 404

## Methods

- **POST**: Creates a new resource (server assigns id)
- **GET**: Reads resources (safe, idempotent)
- **PATCH**: Changes part of a resource (not idempotent by default)
- **DELETE**: Removes a resource (idempotent)
- **PUT**: Not used (clients never hold whole representation)

## Responses

### Collections
```typescript
{
  items: T[];
  total: number;
  limit: number;
  offset: number;
}
```

### Single Members
The object itself (not wrapped)

### Errors
```typescript
{
  statusCode: number;
  message: string;
  path: string;
  timestamp: string;
  requestId?: string;
}
```

## Query Controls (Reserved Names)

The following query parameter names are reserved for API controls and cannot be used as field names:

- `limit` - Maximum items per page (max 50)
- `offset` - Number of items to skip
- `sort` - Sort field (leading `-` for descending, e.g., `-name`)
- `fields` - Comma-separated list of fields to return (sparse response)
- `q` - Free text search
- `after` - Cursor for cursor-based pagination

### Filtering Convention

- Equality: `?status=PENDING`
- Multiple values: `?status=PENDING,PREPARING` (comma-separated)
- Ranges: `?minPriceSantim=10000&maxPriceSantim=50000`
- Sorting: `?sort=name` (ascending), `?sort=-totalSantim` (descending)
- Multiple sorts: `?sort=area,-totalSantim` (left to right priority)

## Status Codes

- **200 OK**: Successful read
- **201 Created**: Resource created (with `Location` header)
- **204 No Content**: Successful delete (no body)
- **400 Bad Request**: Malformed request or validation failure
- **404 Not Found**: Resource does not exist
- **409 Conflict**: Valid but clashes (e.g., cancelling delivered order)
- **422 Unprocessable Entity**: Well-formed but semantically invalid
- **500 Internal Server Error**: Server error (never on purpose)

## HTTP Headers

- **Cache-Control**: 
  - `no-store` on write operations (POST, PATCH, DELETE)
  - `public, max-age=60` on read operations (GET)
- **Location**: Returned on 201 responses pointing to the new resource
