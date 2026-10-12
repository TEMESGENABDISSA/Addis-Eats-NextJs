import DishList from "./DishList";
import FilterShell from "./FilterShell";
import { getDishes } from "./dishes";

// ISR: Regenerate at most once per hour
// Dishes change occasionally; speed matters most
export const revalidate = 3600;

// Async server component - fetches data on the server
// No useState, useEffect, or loading flags needed
export default async function MenuPage() {
  const dishes = await getDishes();

  return (
    <div>
      <h1 className="text-3xl font-bold">Our menu</h1>
      <FilterShell dishes={dishes}>
        <DishList dishes={dishes} />
      </FilterShell>
    </div>
  );
}
