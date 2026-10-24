import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChefHat,
  ClipboardList,
  LayoutDashboard,
  ShoppingBag,
  Smartphone,
  Store,
  Truck,
  Zap,
} from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-clip bg-white text-zinc-900">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-orange-100 blur-3xl" />
        <div className="absolute -left-40 top-80 h-96 w-96 rounded-full bg-orange-50 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:gap-16 sm:px-6 sm:py-24 lg:grid-cols-2 lg:py-32">
          <div className="min-w-0">
            <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-2 text-xs font-medium text-orange-700 sm:mb-6 sm:px-4 sm:text-sm">
              <Zap size={15} className="shrink-0" />
              Sua loja online em poucos minutos
            </div>

            <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-6xl">
              Transforme seu negócio em uma{" "}
              <span className="text-orange-500">loja online</span>.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-600 sm:mt-6 sm:text-lg sm:leading-8">
              Crie sua própria loja, cadastre seus produtos, receba pedidos e
              gerencie tudo em um só lugar. Simples para você e fácil para seus
              clientes.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row">
              <Link
                href="/criar-loja"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3.5 font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600 sm:w-auto sm:px-6"
              >
                Criar minha loja
                <ArrowRight size={18} />
              </Link>

              <a
                href="#como-funciona"
                className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-zinc-200 px-5 py-3.5 text-center font-semibold text-zinc-700 transition hover:bg-zinc-50 sm:w-auto sm:px-6"
              >
                Saiba como funciona
              </a>
            </div>

            <div className="mt-7 flex flex-col gap-3 text-sm text-zinc-500 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-3">
              <span className="flex items-center gap-2">
                <Check size={16} className="shrink-0 text-orange-500" />
                Sem complicação
              </span>

              <span className="flex items-center gap-2">
                <Check size={16} className="shrink-0 text-orange-500" />
                Fácil de configurar
              </span>

              <span className="flex items-center gap-2">
                <Check size={16} className="shrink-0 text-orange-500" />
                Feito para pequenos negócios
              </span>
            </div>
          </div>

          {/* Dashboard mockup */}
          <div className="relative mx-auto w-full min-w-0 max-w-xl">
            <div className="absolute -inset-2 rounded-3xl bg-orange-100/70 blur-2xl sm:-inset-4 sm:rounded-4xl" />

            <div className="relative rounded-2xl border border-zinc-200 bg-white p-2 shadow-2xl sm:rounded-3xl sm:p-3">
              <div className="rounded-xl bg-zinc-50 p-2.5 sm:rounded-2xl sm:p-5">
                {/* Fake browser */}
                <div className="mb-3 flex items-center gap-1.5 sm:mb-5 sm:gap-2">
                  <div className="h-2 w-2 rounded-full bg-zinc-300 sm:h-3 sm:w-3" />
                  <div className="h-2 w-2 rounded-full bg-zinc-300 sm:h-3 sm:w-3" />
                  <div className="h-2 w-2 rounded-full bg-zinc-300 sm:h-3 sm:w-3" />

                  <div className="ml-2 h-6 min-w-0 flex-1 rounded-lg bg-white sm:ml-4 sm:h-7" />
                </div>

                <div className="grid min-w-0 grid-cols-[42px_minmax(0,1fr)] gap-2 sm:grid-cols-[80px_minmax(0,1fr)] sm:gap-4">
                  <div className="rounded-lg bg-white p-1.5 sm:rounded-xl sm:p-3">
                    <div className="mx-auto h-6 w-6 rounded-md bg-orange-500 sm:h-8 sm:w-8 sm:rounded-lg" />

                    <div className="mt-4 space-y-3 sm:mt-6">
                      <div className="h-1.5 rounded bg-orange-100 sm:h-2" />
                      <div className="h-1.5 rounded bg-zinc-100 sm:h-2" />
                      <div className="h-1.5 rounded bg-zinc-100 sm:h-2" />
                      <div className="h-1.5 rounded bg-zinc-100 sm:h-2" />
                    </div>
                  </div>

                  <div className="min-w-0">
                    <div className="mb-3 flex min-w-0 items-center justify-between gap-2 sm:mb-4">
                      <div className="min-w-0 flex-1">
                        <div className="h-3 w-20 max-w-full rounded bg-zinc-800 sm:h-4 sm:w-32" />
                        <div className="mt-2 h-2 w-14 rounded bg-zinc-200 sm:w-20" />
                      </div>

                      <div className="h-7 w-14 shrink-0 rounded-md bg-orange-500 sm:h-9 sm:w-24 sm:rounded-lg" />
                    </div>

                    <div className="grid grid-cols-3 gap-1 sm:gap-3">
                      {[
                        ["Pedidos", "128"],
                        ["Vendas", "R$ 4.280"],
                        ["Produtos", "46"],
                      ].map(([label, value]) => (
                        <div
                          key={label}
                          className="min-w-0 rounded-lg bg-white p-1.5 sm:rounded-xl sm:p-4"
                        >
                          <p className="truncate text-[9px] text-zinc-400 sm:text-xs">
                            {label}
                          </p>
                          <p className="mt-1 whitespace-nowrap text-[10px] font-bold sm:mt-2 sm:text-lg">
                            {value}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-2 rounded-lg bg-white p-2 sm:mt-4 sm:rounded-xl sm:p-4">
                      <div className="flex items-end gap-1 sm:gap-2">
                        {[35, 55, 42, 70, 60, 82, 68, 92].map(
                          (height, i) => (
                            <div
                              key={i}
                              className="min-w-0 flex-1 rounded-t-sm bg-orange-400 sm:rounded-t-md"
                              style={{
                                height: `${height * 0.65}px`,
                              }}
                            />
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-zinc-200 bg-white p-4 shadow-xl sm:block">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
                  <ShoppingBag size={19} />
                </div>

                <div>
                  <p className="text-xs text-zinc-400">Novo pedido</p>
                  <p className="font-bold">R$ 84,90</p>
                </div>

                <Check size={18} className="text-green-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logos / Social proof */}
      <section className="border-y border-zinc-100 bg-zinc-50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
          <p className="text-center text-xs font-medium leading-5 text-zinc-400 sm:text-sm">
            UMA PLATAFORMA PARA DIFERENTES TIPOS DE NEGÓCIO
          </p>

          <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-3 text-sm font-semibold text-zinc-400 sm:mt-7 sm:gap-x-16 sm:text-lg">
            <span>Restaurantes</span>
            <span>Pizzarias</span>
            <span>Hamburguerias</span>
            <span>Pastelarias</span>
            <span>Cafeterias</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="recursos"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24"
      >
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-orange-500 sm:text-sm">
            Tudo em um só lugar
          </span>

          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            Tudo que você precisa para vender online
          </h2>

          <p className="mt-4 text-base leading-7 text-zinc-600 sm:text-lg sm:leading-normal">
            Do cadastro dos produtos até o recebimento do pedido, o MesaFlow
            simplifica a operação do seu negócio.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:mt-16 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          <Feature
            icon={<Store />}
            title="Sua própria loja"
            description="Tenha uma página personalizada para apresentar seu negócio, seus produtos e sua identidade."
          />

          <Feature
            icon={<ShoppingBag />}
            title="Pedidos online"
            description="Permita que seus clientes façam pedidos diretamente pela sua loja."
          />

          <Feature
            icon={<LayoutDashboard />}
            title="Painel de controle"
            description="Acompanhe pedidos, produtos, vendas e informações importantes do seu negócio."
          />

          <Feature
            icon={<ClipboardList />}
            title="Cardápio digital"
            description="Organize categorias, produtos, preços, descrições e adicionais de forma simples."
          />

          <Feature
            icon={<Smartphone />}
            title="Experiência mobile"
            description="Sua loja funciona perfeitamente no celular, onde seus clientes mais acessam."
          />

          <Feature
            icon={<Truck />}
            title="Gestão de entrega"
            description="Tenha uma estrutura preparada para organizar pedidos e entregas."
          />
        </div>
      </section>

      {/* How it works */}
      <section id="como-funciona" className="bg-zinc-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="grid gap-10 sm:gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-orange-400 sm:text-sm">
                Simples assim
              </span>

              <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
                Sua loja pronta em poucos passos.
              </h2>

              <p className="mt-5 text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8">
                Você não precisa entender de programação ou tecnologia.
                Configure seu negócio e deixe o MesaFlow cuidar da parte
                complicada.
              </p>

              <Link
                href="/criar-loja"
                className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3.5 font-semibold transition hover:bg-orange-600 sm:mt-8 sm:w-auto sm:px-6"
              >
                Começar agora
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <Step
                number="01"
                title="Crie seu negócio"
                description="Informe o nome, identidade e informações básicas da sua loja."
              />

              <Step
                number="02"
                title="Monte seu cardápio"
                description="Adicione categorias, produtos, preços, fotos e descrições."
              />

              <Step
                number="03"
                title="Publique sua loja"
                description="Compartilhe o endereço da sua loja e comece a receber pedidos."
              />

              <Step
                number="04"
                title="Gerencie tudo"
                description="Acompanhe pedidos e mantenha seu negócio organizado pelo painel."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section
        id="vantagens"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24"
      >
        <div className="grid gap-10 sm:gap-16 lg:grid-cols-2 lg:items-center">
          <div className="order-2 min-w-0 lg:order-1">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="min-w-0 rounded-2xl bg-orange-50 p-3.5 sm:rounded-3xl sm:p-8">
                <ChefHat className="text-orange-500" size={26} />
                <p className="mt-7 text-2xl font-bold sm:mt-12 sm:text-3xl">
                  100%
                </p>
                <p className="mt-1 text-xs leading-5 text-zinc-500 sm:text-sm">
                  focado em negócios de alimentação
                </p>
              </div>

              <div className="mt-5 min-w-0 rounded-2xl bg-zinc-100 p-3.5 sm:mt-8 sm:rounded-3xl sm:p-8">
                <Smartphone className="text-zinc-700" size={26} />
                <p className="mt-7 text-2xl font-bold sm:mt-12 sm:text-3xl">
                  24h
                </p>
                <p className="mt-1 text-xs leading-5 text-zinc-500 sm:text-sm">
                  sua loja disponível
                </p>
              </div>

              <div className="min-w-0 rounded-2xl bg-zinc-950 p-3.5 text-white sm:rounded-3xl sm:p-8">
                <Zap className="text-orange-400" size={26} />
                <p className="mt-7 text-2xl font-bold sm:mt-12 sm:text-3xl">
                  Fácil
                </p>
                <p className="mt-1 text-xs leading-5 text-zinc-400 sm:text-sm">
                  de configurar e usar
                </p>
              </div>

              <div className="mt-5 min-w-0 rounded-2xl border border-zinc-200 p-3.5 sm:mt-8 sm:rounded-3xl sm:p-8">
                <Store className="text-orange-500" size={26} />
                <p className="mt-7 text-2xl font-bold sm:mt-12 sm:text-3xl">
                  Sua
                </p>
                <p className="mt-1 text-xs leading-5 text-zinc-500 sm:text-sm">
                  marca e identidade
                </p>
              </div>
            </div>
          </div>

          <div className="order-1 min-w-0 lg:order-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-orange-500 sm:text-sm">
              Feito para você
            </span>

            <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
              Menos tempo configurando. Mais tempo cuidando do seu negócio.
            </h2>

            <p className="mt-5 text-base leading-7 text-zinc-600 sm:mt-6 sm:text-lg sm:leading-8">
              O MesaFlow foi pensado para tirar a complexidade da tecnologia
              das suas mãos e colocar as ferramentas certas para o seu negócio
              trabalhar melhor.
            </p>

            <div className="mt-7 space-y-4 sm:mt-8">
              {[
                "Interface simples e intuitiva",
                "Cardápio totalmente personalizável",
                "Gestão centralizada dos produtos",
                "Pedidos organizados em um único lugar",
                "Acesso pelo computador ou celular",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-100">
                    <Check size={14} className="text-orange-600" />
                  </div>

                  <span className="min-w-0 font-medium leading-6 text-zinc-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="precos" className="px-4 pb-16 sm:px-6 sm:pb-24">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-orange-500 px-5 py-12 text-center text-white sm:rounded-4xl sm:px-16 sm:py-20">
          <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
            Pronto para colocar seu negócio online?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-orange-50 sm:text-lg sm:leading-normal">
            Crie sua loja, monte seu cardápio e comece a receber pedidos.
            Simples, rápido e do seu jeito.
          </p>

          <Link
            href="/criar-loja"
            className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-4 font-semibold text-orange-600 shadow-lg transition hover:bg-orange-50 sm:mt-8 sm:w-auto sm:px-7"
          >
            Criar minha loja
            <ArrowRight size={18} />
          </Link>

          <p className="mt-5 text-xs leading-5 text-orange-100 sm:text-sm">
            Comece agora e configure sua loja em poucos minutos.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-100">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-7 sm:flex-row sm:items-center sm:justify-between sm:gap-5 sm:px-6 sm:py-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500 text-white">
              <Store size={17} />
            </div>

            <span className="font-bold">
              Mesa<span className="text-orange-500">Flow</span>
            </span>
          </div>

          <p className="text-xs leading-5 text-zinc-400 sm:text-sm">
            © 2026 MesaFlow. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </main>
  );
}

function Feature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group min-w-0 rounded-2xl border border-zinc-200 p-5 transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-500/5 sm:p-7">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-500 transition group-hover:bg-orange-500 group-hover:text-white">
        {icon}
      </div>

      <h3 className="mt-5 text-lg font-bold sm:mt-6">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-zinc-500 sm:text-base sm:leading-7">
        {description}
      </p>
    </div>
  );
}

function Step({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex min-w-0 gap-3 rounded-2xl border border-zinc-800 bg-zinc-900 p-4 sm:gap-5 sm:p-6">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-sm font-bold sm:h-10 sm:w-10">
        {number}
      </div>

      <div className="min-w-0">
        <h3 className="font-bold">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-zinc-400">
          {description}
        </p>
      </div>
    </div>
  );
}