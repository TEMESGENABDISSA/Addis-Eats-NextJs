import { getOrder } from "@/lib/orders";
import OrderStatus from "./OrderStatus";

export default async function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = getOrder(id);

  if (!order) {
    return <div>Order not found</div>;
  }

  return <OrderStatus id={id} initialData={order} />;
}
