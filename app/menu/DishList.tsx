import Link from "next/link";
import AddToCartButton from "./AddToCartButton";
import type { Dish } from "./dishes";

export default function DishList({ dishes }: { dishes: Dish[] }) {
  return (
    <ul className="space-y-2">
      {dishes.map((dish) => (
        <li key={dish.id} className="flex items-center justify-between">
          <div>
            <Link href={`/menu/${dish.id}`} className="underline">
              {dish.name}
            </Link>{" "}
            <span className="text-gray-600">({dish.price} birr)</span>
          </div>
          <AddToCartButton id={dish.id} name={dish.name} price={dish.price} />
        </li>
      ))}
    </ul>
  );
}
