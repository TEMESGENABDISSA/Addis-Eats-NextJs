"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import type { Order } from "@/lib/orders";

type OrderStatusProps = {
  id: string;
  initialData: Order;
};

export default function OrderStatus({ id, initialData }: OrderStatusProps) {
  const { data, error, isLoading } = useSWR<Order>(
    `/api/orders/${id}`,
    fetcher,
    {
      fallbackData: initialData,
      refreshInterval: 5000,
      revalidateOnFocus: false,
    }
  );

  if (error) {
    return <p className="text-red-500">Could not load the order.</p>;
  }

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Order Status</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <p className="text-sm text-gray-600">Order ID</p>
          <p className="font-mono text-lg">{data.id}</p>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600">Status</p>
          <p className="text-2xl font-semibold capitalize">{data.status}</p>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600">Customer</p>
          <p className="text-lg">{data.name}</p>
          <p className="text-lg">{data.phone}</p>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600">Delivery Address</p>
          <p className="text-lg">{data.address}</p>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600">Items</p>
          {data.items.length === 0 ? (
            <p className="text-gray-500">No items</p>
          ) : (
            <ul className="list-disc list-inside">
              {data.items.map((item, index) => (
                <li key={index}>
                  {item.name} x {item.quantity} - ETB {item.price * item.quantity}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t pt-4">
          <p className="text-sm text-gray-600">Total</p>
          <p className="text-3xl font-bold">ETB {data.total}</p>
        </div>

        <div className="mt-4 text-sm text-gray-500">
          <p>Order placed: {new Date(data.createdAt).toLocaleString()}</p>
          <p className="mt-1">Status updates automatically every 5 seconds</p>
        </div>
      </div>
    </div>
  );
}
