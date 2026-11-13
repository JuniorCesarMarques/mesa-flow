
"use client";

import { useForm } from "react-hook-form";
import { MapPin, UserRound, Truck } from "lucide-react";

export type CheckoutFormData = {
  nome_cliente: string;
  telefone_cliente: string;
  cep: string;
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  observacao: string;
};

type CheckoutFormProps = {
  onSubmit: (data: CheckoutFormData) => void | Promise<void>;
};

const inputClass = `
  w-full rounded-xl border border-gray-200 bg-white px-4 py-3
  text-sm text-gray-800 placeholder:text-gray-400
  outline-none transition
  focus:border-orange-500 focus:ring-2 focus:ring-orange-100
`;

const labelClass = "mb-1.5 block text-sm font-medium text-gray-700";

export default function CheckoutForm({ onSubmit }: CheckoutFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormData>({
    mode: "onBlur",
    defaultValues: {
      nome_cliente: "",
      telefone_cliente: "",
      cep: "",
      rua: "",
      numero: "",
      complemento: "",
      bairro: "",
      cidade: "",
      observacao: "",
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto w-full max-w-2xl space-y-6"
    >
      {/* Dados pessoais */}
      <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
            <UserRound size={20} />
          </div>

          <div>
            <h2 className="font-semibold text-gray-800">
              Seus dados
            </h2>
            <p className="text-sm text-gray-500">
              Como podemos entrar em contato?
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className={labelClass}>Nome completo</label>
            <input
              {...register("nome_cliente", {
                required: "Informe seu nome.",
                minLength: {
                  value: 3,
                  message: "Informe seu nome completo.",
                },
              })}
              placeholder="Seu nome"
              autoComplete="name"
              className={inputClass}
            />
            {errors.nome_cliente && (
              <p className="mt-1 text-xs text-red-500">
                {errors.nome_cliente.message}
              </p>
            )}
          </div>

          <div>
            <label className={labelClass}>WhatsApp</label>
            <input
              {...register("telefone_cliente", {
                required: "Informe seu telefone.",
                minLength: {
                  value: 10,
                  message: "Informe um telefone válido.",
                },
              })}
              type="tel"
              placeholder="(00) 00000-0000"
              autoComplete="tel"
              className={inputClass}
            />
            {errors.telefone_cliente && (
              <p className="mt-1 text-xs text-red-500">
                {errors.telefone_cliente.message}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Endereço */}
      <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
            <MapPin size={20} />
          </div>

          <div>
            <h2 className="font-semibold text-gray-800">
              Endereço de entrega
            </h2>
            <p className="text-sm text-gray-500">
              Onde deseja receber seu pedido?
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="max-w-[180px]">
            <label className={labelClass}>CEP</label>
            <input
              {...register("cep", {
                pattern: {
                  value: /^\d{5}-?\d{3}$/,
                  message: "Informe um CEP válido.",
                },
              })}
              placeholder="00000-000"
              autoComplete="postal-code"
              className={inputClass}
            />
            {errors.cep && (
              <p className="mt-1 text-xs text-red-500">
                {errors.cep.message}
              </p>
            )}
          </div>

          <div>
            <label className={labelClass}>Rua</label>
            <input
              {...register("rua", {
                required: "Informe a rua.",
              })}
              placeholder="Nome da rua ou avenida"
              autoComplete="address-line1"
              className={inputClass}
            />
            {errors.rua && (
              <p className="mt-1 text-xs text-red-500">
                {errors.rua.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Número</label>
              <input
                {...register("numero", {
                  required: "Informe o número.",
                })}
                placeholder="Número"
                className={inputClass}
              />
              {errors.numero && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.numero.message}
                </p>
              )}
            </div>

            <div>
              <label className={labelClass}>
                Complemento
                <span className="ml-1 font-normal text-gray-400">
                  (opcional)
                </span>
              </label>
              <input
                {...register("complemento")}
                placeholder="Apto, bloco..."
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Bairro</label>
            <input
              {...register("bairro", {
                required: "Informe o bairro.",
              })}
              placeholder="Seu bairro"
              autoComplete="address-level3"
              className={inputClass}
            />
            {errors.bairro && (
              <p className="mt-1 text-xs text-red-500">
                {errors.bairro.message}
              </p>
            )}
          </div>

          <div>
            <label className={labelClass}>Cidade</label>
            <input
              {...register("cidade", {
                required: "Informe a cidade.",
              })}
              placeholder="Sua cidade"
              autoComplete="address-level2"
              className={inputClass}
            />
            {errors.cidade && (
              <p className="mt-1 text-xs text-red-500">
                {errors.cidade.message}
              </p>
            )}
          </div>

          <div>
            <label className={labelClass}>
              Observações
              <span className="ml-1 font-normal text-gray-400">
                (opcional)
              </span>
            </label>
            <textarea
              {...register("observacao")}
              rows={3}
              placeholder="Alguma orientação para a entrega?"
              className={`${inputClass} resize-none`}
            />
          </div>
        </div>
      </section>

      {/* Frete */}
      <section className="rounded-2xl border border-orange-100 bg-orange-50/50 p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-orange-600">
            <Truck size={20} />
          </div>

          <div>
            <h3 className="font-semibold text-gray-800">
              Entrega
            </h3>
            <p className="text-sm text-gray-500">
              O valor do frete será calculado após informar o endereço.
            </p>
          </div>
        </div>
      </section>

      <button
        type="submit"
        disabled={isSubmitting}
        className="
          w-full rounded-xl bg-orange-500 px-6 py-4
          font-semibold text-white shadow-sm transition
          hover:bg-orange-600 active:scale-[0.99]
          disabled:cursor-not-allowed disabled:opacity-60
        "
      >
        {isSubmitting ? "Enviando..." : "Continuar"}
      </button>
    </form>
  );
}
