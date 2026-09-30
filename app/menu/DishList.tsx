import Link from "next/link";
import type { Dish } from "./dishes";

export default function DishList({ dishes }: { dishes: Dish[] }) {
  return (
    <ul className="space-y-2">
      {dishes.map((dish) => (
        <li key={dish.id}>
          <Link href={`/menu/${dish.id}`} className="underline">
            {dish.name}
          </Link>{" "}
          <span>({dish.price} birr)</span>
        </li>
      ))}
    </ul>
  );
}
