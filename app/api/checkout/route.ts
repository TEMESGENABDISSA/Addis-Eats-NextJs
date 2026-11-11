import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { items, customerInfo } = body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return NextResponse.json(
      { error: "Invalid request: items array required" },
      { status: 400 }
    );
  }

  if (!customerInfo || !customerInfo.name || !customerInfo.address) {
    return NextResponse.json(
      { error: "Invalid request: customer name and address required" },
      { status: 400 }
    );
  }

  // In production, this would create an order in the database
  const orderId = `ORD-${Date.now()}`;

  return NextResponse.json({
    message: "Order placed successfully",
    orderId,
    items,
    customerInfo,
    status: "pending",
  });
}
