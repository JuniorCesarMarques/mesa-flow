"use client";

import { CardPayment, initMercadoPago } from "@mercadopago/sdk-react";

const publicKey = process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY;

if (!publicKey) {
  throw new Error("Mercado Pago Public Key não configurada.");
}

initMercadoPago(publicKey);

type CardPaymentFormProps = {
  amount: number;
  orderId: string;
  slug: string;
};

export function CardPaymentForm({ amount, orderId, slug }: CardPaymentFormProps) {
  const initialization = {
    amount,
  };

  const customization = {
    visual: {
      style: {
        theme: "default" as const,
        customVariables: {
          baseColor: "#F97316",
          baseColorFirstVariant: "#EA580C",
          baseColorSecondVariant: "#C2410C",
          buttonTextColor: "#FFFFFF",
        },
      },
    },
  };

  const onSubmit = async (formData: unknown) => {

     const response = await fetch(`/api/lojas/${slug}/pedidos/${orderId}/pagamentos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        formData
      }),
    });

    if (!response.ok) {
      throw new Error("Não foi possível processar o pagamento.");
    }
    const data = await response.json();

    console.log(data);
  };

  return (
    <CardPayment
      customization={customization}
      initialization={initialization}
      onSubmit={onSubmit}
    />
  );
}
