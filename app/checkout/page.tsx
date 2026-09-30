import Link from "next/link";

export default function CheckoutPage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">Checkout</h1>
      <nav className="mt-4 flex gap-4 underline">
        <Link href="/">Home</Link>
        <Link href="/menu">Menu</Link>
        <Link href="/cart">Cart</Link>
      </nav>
    </main>
  );
}
