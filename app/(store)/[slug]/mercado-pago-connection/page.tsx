type Props = {
  storeSlug: string;
};

export function MercadoPagoConnection({ storeSlug }: Props) {
  return (
    <a
      href={`/api/lojas/${storeSlug}/integracoes/mercado-pago/conectar`}
      className="..."
    >
      Conectar Mercado Pago
    </a>
  );
}