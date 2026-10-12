"use client";

import { useCart } from "../providers";

type AddToCartButtonProps = {
  id: string;
  name: string;
  price: number;
};

export default function AddToCartButton({ id, name, price }: AddToCartButtonProps) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => addToCart({ id, name, price })}
      className="ml-2 rounded bg-orange-600 px-3 py-1 text-sm text-white hover:bg-orange-700"
    >
      Add to cart
    </button>
  );
}
