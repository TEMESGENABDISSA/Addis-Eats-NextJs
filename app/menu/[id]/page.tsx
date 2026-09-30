import Link from "next/link";
import { notFound } from "next/navigation";
import { getDish } from "../dishes";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function DishPage({ params }: Props) {
  const { id } = await params;
  const dish = getDish(id);

  if (!dish) notFound();

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">{dish.name}</h1>
      <p className="mt-2">Category: {dish.category}</p>
      <p>Price: {dish.price} birr</p>
      <Link href="/menu" className="mt-4 inline-block underline">
        ← Back to menu
      </Link>
    </main>
  );
}
