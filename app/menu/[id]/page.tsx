import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "../AddToCartButton";
import { dishes, getDish, getDishes } from "../dishes";

type Props = {
  params: Promise<{ id: string }>;
};

// Pre-build all dish pages at build time
// Every dish is known at build time
export async function generateStaticParams() {
  const allDishes = await getDishes();
  return allDishes.map((dish: { id: string }) => ({ id: dish.id }));
}

// Async server component - fetches dish data on the server
export default async function DishPage({ params }: Props) {
  const { id } = await params;
  const dish = await getDish(id);

  if (!dish) notFound();

  return (
    <div>
      <h1 className="text-3xl font-bold">{dish.name}</h1>
      <p className="mt-2">Category: {dish.category}</p>
      <p>Price: {dish.price} birr</p>
      <div className="mt-4">
        <AddToCartButton id={dish.id} name={dish.name} price={dish.price} />
      </div>
      <Link href="/menu" className="mt-4 inline-block underline">
        ← Back to menu
      </Link>
    </div>
  );
}
