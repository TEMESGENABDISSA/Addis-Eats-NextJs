import Link from "next/link";

export default function HomePage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">Addis Eats</h1>
      <p className="mt-2">Ethiopian food, delivered.</p>
      <nav className="mt-4 flex gap-4 underline">
        <Link href="/menu">Menu</Link>
        <Link href="/cart">Cart</Link>
        <Link href="/checkout">Checkout</Link>
      </nav>
    </main>
  );
}
