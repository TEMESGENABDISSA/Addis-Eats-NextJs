import { NextResponse } from "next/server";
import { getDishes } from "../../menu/dishes";

export async function GET() {
  const dishes = await getDishes();
  return NextResponse.json(dishes);
}
