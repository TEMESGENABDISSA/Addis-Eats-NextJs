"use client";

import { useCart } from "../app/providers";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Your cart</h1>
      {cart.length === 0 ? (
        <p className="mt-2 text-gray-600">Your cart is currently empty.</p>
      ) : (
        <div className="mt-4">
          <ul className="space-y-2">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between border-b p-2">
                <div>
                  <span className="font-semibold">{item.name}</span>
                  <span className="ml-2 text-gray-600">
                    x{item.quantity}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span>{item.price * item.quantity} birr</span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t pt-4">
            <p className="text-xl font-bold">Total: {total} birr</p>
            <button
              onClick={clearCart}
              className="mt-4 rounded bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
