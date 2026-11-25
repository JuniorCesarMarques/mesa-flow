"use client";

import { CardPayment, initMercadoPago } from "@mercadopago/sdk-react";

const publicKey = process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY;

if (!publicKey) {
  throw new Error("Mercado Pago Public Key não configurada.");
}

initMercadoPago(publicKey);

type CardPaymentFormProps = {
  amount: number;
};

export function CardPaymentForm({ amount }: CardPaymentFormProps) {
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

  const onSubmit = async () => {
    // Ainda não processamos pagamentos nesta etapa.
    throw new Error("Processamento de pagamento ainda não configurado.");
  };

  return <CardPayment customization={customization} initialization={initialization} onSubmit={onSubmit} />;
}
