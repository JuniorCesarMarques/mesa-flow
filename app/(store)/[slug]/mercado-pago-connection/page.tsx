type Props = {
  storeSlug: string;
};

export default function MercadoPagoConnection({ storeSlug }: Props) {
  return (
    <a
      href={`/api/lojas/${storeSlug}/integracoes/mercado-pago/conectar`}
      className="..."
    >
      Conectar Mercado Pago
    </a>
  );
}