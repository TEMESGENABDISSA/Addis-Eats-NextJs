"use client";

import { useActionState } from "react";
import { placeOrder } from "../actions";
import { useCart } from "../providers";

// Force dynamic: This route will read session cookies and live pricing
export const dynamic = "force-dynamic";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const [state, formAction, pending] = useActionState(placeOrder, null);

  if (cart.length === 0) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold">Checkout</h1>
        <p className="mt-2 text-gray-600">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Checkout</h1>
      
      <div className="mt-6 grid gap-8 md:grid-cols-2">
        {/* Order Summary */}
        <div>
          <h2 className="text-xl font-bold">Order Summary</h2>
          <ul className="mt-4 space-y-2">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between border-b p-2">
                <div>
                  <span className="font-semibold">{item.name}</span>
                  <span className="ml-2 text-gray-600">x{item.quantity}</span>
                </div>
                <span>{item.price * item.quantity} birr</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t pt-4">
            <p className="text-xl font-bold">Total: {total} birr</p>
          </div>
        </div>

        {/* Checkout Form */}
        <div>
          <h2 className="text-xl font-bold">Delivery Details</h2>
          <form action={formAction} className="mt-4 space-y-4">
            <input type="hidden" name="cartItems" value={JSON.stringify(cart)} />
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="mt-1 w-full rounded border p-2"
                disabled={pending}
              />
              {state?.fieldErrors?.name && (
                <p className="mt-1 text-sm text-red-600">
                  {state.fieldErrors.name[0]}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="09... or +2519..."
                className="mt-1 w-full rounded border p-2"
                disabled={pending}
              />
              {state?.fieldErrors?.phone && (
                <p className="mt-1 text-sm text-red-600">
                  {state.fieldErrors.phone[0]}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium">
                Address
              </label>
              <textarea
                id="address"
                name="address"
                required
                rows={3}
                className="mt-1 w-full rounded border p-2"
                disabled={pending}
              />
              {state?.fieldErrors?.address && (
                <p className="mt-1 text-sm text-red-600">
                  {state.fieldErrors.address[0]}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={pending}
              className="w-full rounded bg-orange-600 px-4 py-2 text-white hover:bg-orange-700 disabled:bg-gray-400"
            >
              {pending ? "Placing order..." : `Place Order (${total} birr)`}
            </button>

            {state?.error && !state.fieldErrors && (
              <p className="text-sm text-red-600">{state.error}</p>
            )}

            {state?.success && (
              <div className="rounded bg-green-100 p-4 text-green-800">
                <p className="font-bold">Order placed successfully!</p>
                <p className="text-sm">Order ID: {state.order.id}</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
