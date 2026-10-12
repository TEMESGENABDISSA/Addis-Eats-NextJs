import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b p-4">
      <nav className="flex gap-4">
        <Link href="/" className="font-bold">
          Addis Eats
        </Link>
        <Link href="/menu">Menu</Link>
        <Link href="/cart">Cart</Link>
        <Link href="/checkout">Checkout</Link>
      </nav>
    </header>
  );
}
