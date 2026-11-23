import { FreteFieldsType } from "./calcularFrete";

export async function getCoordinates(address: FreteFieldsType) {
const params = new URLSearchParams({
  street: `${address.numero}, ${address.logradouro}`,
  city: address.localidade,
  state: "São Paulo",
  country: "Brasil",
  countrycodes: "br",
  format: "jsonv2",
  limit: "1",
});

  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?${params}`,
    {
      headers: {
        "User-Agent": "MesaFlow/1.0 (contato: seu-email@gmail.com)",
        Accept: "application/json",
      },
    },
  );

  console.log("URL:", `https://nominatim.openstreetmap.org/search?${params}`)

  if (!response.ok) {
    const error = await response.text();

    console.error("Nominatim:", {
      status: response.status,
      statusText: response.statusText,
      body: error,
    });

    throw new Error("Erro ao buscar endereço");
  }

  const data = await response.json();

  if (!data.length) {
    return null;
  }

  return {
    latitude: Number(data[0].lat),
    longitude: Number(data[0].lon),
  };
}
