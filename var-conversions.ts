// Day 52 - Homework: Converting var to const and let

// Example 1: Counter that increments - use let because value changes
let counter = 0;
// Explanation: counter is reassigned multiple times, so let is required

// Example 2: Configuration that never changes - use const
const API_BASE_URL = "https://api.addiseats.com";
// Explanation: API_BASE_URL is a constant that never changes after assignment

// Example 3: Loop index - use let because it changes each iteration
for (let i = 0; i < 10; i++) {
  console.log(i);
}
// Explanation: i is reassigned in each loop iteration, so let is appropriate

// Example 4: Array that gets items added - use let for the array reference
let cartItems: string[] = [];
cartItems.push("Doro Wat");
cartItems.push("Kitfo");
// Explanation: While we could use const and mutate the array, let is clearer here
// because the cart reference itself might be replaced (e.g., cartItems = [])

// Example 5: Function result that never changes - use const
const total = calculateTotal(100, 50);
// Explanation: total is assigned once and never reassigned, so const is correct

function calculateTotal(a: number, b: number): number {
  return a + b;
}
