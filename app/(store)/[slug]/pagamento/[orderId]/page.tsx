import { CardPaymentForm } from "@/components/CardPaymentForm";

export default async function Pagamento({
  params,
}: {
  params: Promise<{ orderId: string, slug: string }>;
}) {
  const { orderId, slug } = await params;


  return (
    <div className="w-full max-w-xl mx-auto">
      <CardPaymentForm amount={50} orderId={orderId} slug={slug} />
    </div>
  );
}
