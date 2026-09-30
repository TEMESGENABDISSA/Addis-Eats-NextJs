import Link from "next/link";

export default function CartPage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">Your cart</h1>
      <nav className="mt-4 flex gap-4 underline">
        <Link href="/">Home</Link>
        <Link href="/menu">Menu</Link>
        <Link href="/checkout">Checkout</Link>
      </nav>
    </main>
  );
}
