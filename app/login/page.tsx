"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type LoginForm = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>();

  const router = useRouter();

  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await fetch(`/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if(!res.ok){
        toast.error("Email ou senha inválidos");
        return;
      }

      toast.success("Logado com sucesso");

      router.push("/painel");
      router.refresh();
    } catch (err) {
        toast.error("Algo deu errado.")
    }
  };

  return (
    <main className="min-h-screen bg-zinc-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo / título */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-orange-500 text-white text-xl font-bold mb-4">
            S
          </div>

          <h1 className="text-2xl font-bold text-zinc-900">
            Bem-vindo de volta
          </h1>

          <p className="text-sm text-zinc-500 mt-2">
            Entre na sua conta para continuar
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm p-6 sm:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-zinc-700 mb-2"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                placeholder="voce@exemplo.com"
                {...register("email", {
                  required: "Informe seu email",
                })}
                className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition
                  ${
                    errors.email
                      ? "border-red-400 focus:ring-2 focus:ring-red-100"
                      : "border-zinc-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  }`}
              />

              {errors.email && (
                <p className="text-xs text-red-500 mt-1.5">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Senha */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-zinc-700"
                >
                  Senha
                </label>

                <button
                  type="button"
                  className="text-xs font-medium text-orange-500 hover:text-orange-600"
                >
                  Esqueceu a senha?
                </button>
              </div>

              <input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register("password", {
                  required: "Informe sua senha",
                })}
                className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition
                  ${
                    errors.password
                      ? "border-red-400 focus:ring-2 focus:ring-red-100"
                      : "border-zinc-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  }`}
              />

              {errors.password && (
                <p className="text-xs text-red-500 mt-1.5">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Botão */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-orange-500 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Entrando..." : "Entrar"}
            </button>
          </form>

          {/* Cadastro */}
          <div className="mt-6 pt-6 border-t border-zinc-100 text-center">
            <p className="text-sm text-zinc-500">
              Ainda não tem uma conta?{" "}
              <button
                type="button"
                className="font-semibold text-orange-500 hover:text-orange-600"
              >
                Criar conta
              </button>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-zinc-400 mt-6">
          © 2026 Sua Plataforma. Todos os direitos reservados.
        </p>
      </div>
    </main>
  );
}
