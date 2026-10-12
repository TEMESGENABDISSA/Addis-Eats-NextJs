// Force dynamic: This route will read session cookies and live pricing
// In a real app, checkout depends on who is asking and current prices
export const dynamic = "force-dynamic";

export default function CheckoutPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Checkout</h1>
      <p className="mt-2 text-gray-600">Checkout functionality coming soon.</p>
    </div>
  );
}
