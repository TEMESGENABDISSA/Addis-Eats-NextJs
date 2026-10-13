import { NextResponse } from "next/server";
import { getDishes } from "../../menu/dishes";

const PAGE_SIZE = 2;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  const page = parseInt(searchParams.get("page") || "1");

  const dishes = await getDishes();
  let filtered = dishes;

  if (query) {
    filtered = dishes.filter(
      (dish) =>
        dish.name.toLowerCase().includes(query.toLowerCase()) ||
        dish.category.toLowerCase().includes(query.toLowerCase())
    );
  }

  // Pagination
  const startIndex = (page - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const paginated = filtered.slice(startIndex, endIndex);

  return NextResponse.json({
    dishes: paginated,
    total: filtered.length,
    page,
    pageSize: PAGE_SIZE,
    totalPages: Math.ceil(filtered.length / PAGE_SIZE),
  });
}
