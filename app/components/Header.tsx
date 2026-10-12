"use client";

import Link from "next/link";
import { useCart } from "../providers";

export default function Header() {
  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="border-b p-4">
      <nav className="flex gap-4">
        <Link href="/" className="font-bold">
          Addis Eats
        </Link>
        <Link href="/menu">Menu</Link>
        <Link href="/cart">
          Cart {cartCount > 0 && `(${cartCount})`}
        </Link>
        <Link href="/checkout">Checkout</Link>
      </nav>
    </header>
  );
}
