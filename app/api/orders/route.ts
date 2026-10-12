import { NextResponse } from "next/server";
import { orderSchema } from "../../../lib/schema";
import { createOrder } from "../../../lib/orders";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate with the same schema used by the client form
    const result = orderSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json(
        { 
          error: "Validation failed",
          fieldErrors: result.error.flatten().fieldErrors 
        },
        { status: 422 }
      );
    }
    
    // Create order (in production, cart items would come from session/user)
    const order = createOrder(result.data, []);
    
    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
