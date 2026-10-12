import Link from "next/link";

export default function HomePage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Addis Eats</h1>
      <p className="mt-2">Ethiopian food, delivered.</p>
      <Link
        href="/menu"
        className="mt-4 inline-block rounded bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
      >
        View Menu
      </Link>
    </div>
  );
}
