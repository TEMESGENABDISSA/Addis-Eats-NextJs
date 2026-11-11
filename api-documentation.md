# Addis Eats API Documentation

## API Request Tracing

### Request 1
- **Method:** GET
- **Full Path:** /api/dishes
- **Status Code:** 200
- **Request Body:** No

### Request 2
- **Method:** GET
- **Full Path:** /api/dishes/kitfo
- **Status Code:** 200
- **Request Body:** No

### Request 3
- **Method:** GET
- **Full Path:** /api/dishes?category=Meat
- **Status Code:** 200
- **Request Body:** No

### Request 4
- **Method:** POST
- **Full Path:** /api/cart
- **Status Code:** 201
- **Request Body:** Yes (JSON with dishId and quantity)

### Request 5
- **Method:** GET
- **Full Path:** /api/cart
- **Status Code:** 200
- **Request Body:** No

### Request 6
- **Method:** POST
- **Full Path:** /api/checkout
- **Status Code:** 200
- **Request Body:** Yes (JSON with cart items and customer info)

## Detailed Headers Analysis

### Request 1: GET /api/dishes

#### Request Headers
1. **Accept:** `application/json` - Tells the server the client expects JSON response
2. **User-Agent:** `Mozilla/5.0...` - Identifies the client application and browser
3. **Connection:** `keep-alive` - Requests persistent TCP connection for multiple requests

#### Response Headers
1. **Content-Type:** `application/json` - Indicates the response body is JSON format
2. **Content-Length:** `245` - Specifies the size of the response body in bytes
3. **Cache-Control:** `max-age=3600` - Directs caching behavior (cache for 1 hour)

### Request 4: POST /api/cart

#### Request Headers
1. **Content-Type:** `application/json` - Indicates the request body is JSON format
2. **Content-Length:** `67` - Specifies the size of the request body in bytes
3. **Authorization:** `Bearer token123` - Provides authentication credentials

#### Response Headers
1. **Location:** `/api/cart/items/123` - URL of the newly created resource
2. **Content-Type:** `application/json` - Indicates the response body is JSON format
3. **Date:** `Wed, 11 Nov 2026 08:00:00 GMT` - Timestamp when the response was generated

## Failing Request

### Request: GET /api/dishes/invalid-id
- **Status Code:** 404
- **Reasoning:** This is the correct status code because the requested resource (dish with ID "invalid-id") does not exist on the server. 404 Not Found is the standard HTTP status code for this scenario, as opposed to 400 Bad Request (which would imply malformed request syntax) or 500 Internal Server Error (which would indicate a server-side problem).

## Endpoint Table

| Method | Path | Purpose | Expected Success Status |
|--------|------|---------|------------------------|
| GET | /api/dishes | Retrieve all dishes with pagination | 200 |
| GET | /api/dishes/:id | Retrieve a single dish by ID | 200 |
| GET | /api/dishes?category=X | Filter dishes by category | 200 |
| POST | /api/cart | Add item to cart | 201 |
| GET | /api/cart | Retrieve cart contents | 200 |
| POST | /api/checkout | Process checkout order | 200 |

## Status Code Justifications

- **200 OK:** Used for successful GET requests that return data
- **201 Created:** Used for POST /api/cart because a new cart item is created
- **404 Not Found:** Used when a requested dish ID doesn't exist
- **400 Bad Request:** Used for malformed request bodies (missing dishId, quantity, or customer info)
- **500 Internal Server Error:** Would be used for unexpected server errors
