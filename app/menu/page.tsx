import { Suspense } from "react";
import DishList from "./DishList";
import DishSkeleton from "./DishSkeleton";
import { dishes } from "./dishes";

// ISR: Regenerate at most once per hour
// Dishes change occasionally; speed matters most
export const revalidate = 3600;

export default function MenuPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Our menu</h1>
      <Suspense fallback={<DishSkeleton />}>
        <DishList dishes={dishes} />
      </Suspense>
    </div>
  );
}
