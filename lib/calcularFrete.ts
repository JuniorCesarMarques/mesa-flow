import { getCoordinates } from "./nominatim";

export type FreteFieldsType = {
  logradouro: string;
  numero: string;
  bairro: string;
  localidade: string;
  uf: string;
  cep: string;
  pais: string;
};

type EnderecosType = {
  enderecoLoja: FreteFieldsType;
  enderecoCliente: FreteFieldsType;
};

type Coordinates = {
  latitude: number;
  longitude: number;
};


async function calcularDistancia(
  origem: Coordinates,
  destino: Coordinates,
): Promise<number> {
  const response = await fetch(
    `https://router.project-osrm.org/route/v1/driving/${origem.longitude},${origem.latitude};${destino.longitude},${destino.latitude}?overview=false`,
  );

  const data = await response.json();

  const distanciaKm = data.routes[0].distance / 1000;

  return distanciaKm;
}

export const calcularFrete = async (
  enderecoCliente: FreteFieldsType,
  enderecoLoja: FreteFieldsType,
) => {

  const coordenadasCliente = await getCoordinates(enderecoCliente);
  const coordernadasLoja = await getCoordinates(enderecoLoja);

      console.log(coordenadasCliente, coordernadasLoja)

  if (coordenadasCliente && coordernadasLoja) {
    const distancia = await calcularDistancia(
      coordenadasCliente,
      coordernadasLoja,
    );

    console.log(coordenadasCliente, coordernadasLoja)

    console.log("Distancia:", distancia.toFixed(2));
  }
};
