import { NextResponse } from "next/server";
import { getDish } from "../../../menu/dishes";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const dish = await getDish(id);

  if (!dish) {
    return NextResponse.json(
      { error: "No such dish" },
      { status: 404 }
    );
  }

  return NextResponse.json(dish);
}
