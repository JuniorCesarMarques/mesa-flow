import { CardPaymentForm } from "@/components/CardPaymentForm";

export default async function Pagamento({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  console.log(id);

  return (
    <div className="w-full max-w-xl mx-auto">
      <CardPaymentForm amount={50} />
    </div>
  );
}
