import Link from "next/link";
import { dishes } from "./dishes";

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = [...new Set(dishes.map((dish) => dish.category))];

  return (
    <div className="flex">
      <aside className="w-64 border-r p-4">
        <h2 className="mb-4 font-bold">Categories</h2>
        <nav className="space-y-2">
          {categories.map((category) => (
            <div
              key={category}
              className="rounded bg-gray-100 px-3 py-2 text-sm"
            >
              {category}
            </div>
          ))}
        </nav>
        <Link
          href="/"
          className="mt-6 block text-sm text-gray-600 hover:underline"
        >
          ← Back to home
        </Link>
      </aside>
      <div className="flex-1 p-8">{children}</div>
    </div>
  );
}
