import Link from "next/link";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
import { dishes } from "./dishes";

export default function MenuPage() {
  const categories = [...new Set(dishes.map((dish) => dish.category))];

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">Our menu</h1>
      <CategoryBar categories={categories} />
      <DishList dishes={dishes} />
      <nav className="mt-6 flex gap-4 underline">
        <Link href="/">Home</Link>
        <Link href="/cart">Cart</Link>
      </nav>
    </main>
  );
}
