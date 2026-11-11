import { NextResponse } from "next/server";

// In-memory cart storage (in production, use database)
let cart: { dishId: string; quantity: number }[] = [];

export async function GET() {
  return NextResponse.json({ items: cart });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { dishId, quantity } = body;

  if (!dishId || !quantity || quantity < 1) {
    return NextResponse.json(
      { error: "Invalid request: dishId and quantity (>=1) required" },
      { status: 400 }
    );
  }

  // Check if item already exists in cart
  const existingIndex = cart.findIndex((item) => item.dishId === dishId);
  if (existingIndex >= 0) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({ dishId, quantity });
  }

  return NextResponse.json(
    { message: "Item added to cart", items: cart },
    { status: 201 }
  );
}
