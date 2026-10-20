import { getSession } from "@/services/auth.service";
import { Store } from "lucide-react";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default async function Header() {
  const session = await getSession();

  const logged = !!session;

  return (
    <header className="border-b border-zinc-100">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500 text-white">
            <Store size={20} />
          </div>

          <span className="text-xl font-bold tracking-tight">
            Mesa<span className="text-orange-500">Flow</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-zinc-600 md:flex">
          <a href="#como-funciona" className="transition hover:text-zinc-900">
            Como funciona
          </a>

          <a href="#vantagens" className="transition hover:text-zinc-900">
            Vantagens
          </a>

          <a href="#precos" className="transition hover:text-zinc-900">
            Preços
          </a>

          {logged && <Link href="/painel">Painel</Link>}
        </nav>

        <div className="flex items-center gap-3">
          {!logged ? (
            <Link
              href="/login"
              className="hidden text-sm font-medium text-zinc-600 transition hover:text-zinc-900 sm:block"
            >
              Entrar
            </Link>
          ) : (
            <LogoutButton />
          )}

          <Link
            href="/criar-loja"
            className="rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
          >
            Começar agora
          </Link>
        </div>
      </div>
    </header>
  );
}
