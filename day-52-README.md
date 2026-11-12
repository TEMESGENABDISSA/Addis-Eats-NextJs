# Day 52 - Node.js + Nest.js: Track Setup & Language Fundamentals I

## In-Class Exercise: Typing the Addis Eats Order

### Files
- `order.ts` - Complete TypeScript implementation of order types and functions
- `menu.ts` - Homework: Ethiopian dishes menu with filtering and total calculation
- `var-conversions.ts` - Homework: Converting var to const/let with explanations
- `node-vs-browser.md` - Homework: Explanation of Node.js vs browser differences
- `tsconfig.json` - TypeScript configuration with strict mode enabled

### Running the Code

```bash
# Compile order.ts
tsc --watch order.ts

# Run the compiled JavaScript
node order.js
```

### Acceptance Criteria Met
1. ✅ tsc reports zero errors with strict on
2. ✅ No use of `any` anywhere in the file
3. ✅ Every ETB amount printed through one helper (formatEtb)
4. ✅ Adding a status breaks the build at exactly one line (exhaustive switch)
5. ✅ Files pushed to GitHub

### Implementation Details

**order.ts:**
- `Area` type: Union of four delivery areas from `as const` array
- `OrderStatus` type: Union of five order states with exhaustive switch
- `Dish` type: Name and price in santim
- `Order` type: Readonly id, customer name, area, status, dishes, optional TeleBirr phone, total
- `deliveryFee()`: Free above 500 ETB, 40 ETB to Bole, 60 ETB elsewhere
- `statusMessage()`: Exhaustive switch with never default for compile-time safety
- `receipt()`: Multi-line template literal with Intl.NumberFormat for ETB formatting

**menu.ts:**
- Eight real Ethiopian dishes with prices in santim
- `dishesUnderPrice()`: Filter dishes by maximum price
- `menuTotal()`: Calculate and format total menu price in ETB

**var-conversions.ts:**
- Five examples of converting var to const/let
- One-sentence explanation for each choice

**node-vs-browser.md:**
- Detailed explanation of Node.js capabilities vs browser limitations
