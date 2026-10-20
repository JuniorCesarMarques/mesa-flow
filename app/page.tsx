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
    <main className="min-h-screen bg-white text-zinc-900">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-orange-100 blur-3xl" />
        <div className="absolute -left-40 top-80 h-96 w-96 rounded-full bg-orange-50 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 lg:grid-cols-2 lg:py-32">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-medium text-orange-700">
              <Zap size={15} />
              Sua loja online em poucos minutos
            </div>

            <h1 className="max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
              Transforme seu negócio em uma{" "}
              <span className="text-orange-500">loja online</span>.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
              Crie sua própria loja, cadastre seus produtos, receba pedidos e
              gerencie tudo em um só lugar. Simples para você e fácil para seus
              clientes.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/criar-loja"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600"
              >
                Criar minha loja
                <ArrowRight size={18} />
              </Link>

              <a
                href="#como-funciona"
                className="inline-flex items-center justify-center rounded-xl border border-zinc-200 px-6 py-3.5 font-semibold text-zinc-700 transition hover:bg-zinc-50"
              >
                Saiba como funciona
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-zinc-500">
              <span className="flex items-center gap-2">
                <Check size={16} className="text-orange-500" />
                Sem complicação
              </span>

              <span className="flex items-center gap-2">
                <Check size={16} className="text-orange-500" />
                Fácil de configurar
              </span>

              <span className="flex items-center gap-2">
                <Check size={16} className="text-orange-500" />
                Feito para pequenos negócios
              </span>
            </div>
          </div>

          {/* Dashboard mockup */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-4xl bg-orange-100/70 blur-2xl" />

            <div className="relative rounded-3xl border border-zinc-200 bg-white p-3 shadow-2xl">
              <div className="rounded-2xl bg-zinc-50 p-5">
                {/* Fake browser */}
                <div className="mb-5 flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-zinc-300" />
                  <div className="h-3 w-3 rounded-full bg-zinc-300" />
                  <div className="h-3 w-3 rounded-full bg-zinc-300" />

                  <div className="ml-4 h-7 flex-1 rounded-lg bg-white" />
                </div>

                <div className="grid grid-cols-[80px_1fr] gap-4">
                  <div className="rounded-xl bg-white p-3">
                    <div className="mx-auto h-8 w-8 rounded-lg bg-orange-500" />

                    <div className="mt-6 space-y-3">
                      <div className="h-2 rounded bg-orange-100" />
                      <div className="h-2 rounded bg-zinc-100" />
                      <div className="h-2 rounded bg-zinc-100" />
                      <div className="h-2 rounded bg-zinc-100" />
                    </div>
                  </div>

                  <div>
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <div className="h-4 w-32 rounded bg-zinc-800" />
                        <div className="mt-2 h-2 w-20 rounded bg-zinc-200" />
                      </div>

                      <div className="h-9 w-24 rounded-lg bg-orange-500" />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {[
                        ["Pedidos", "128"],
                        ["Vendas", "R$ 4.280"],
                        ["Produtos", "46"],
                      ].map(([label, value]) => (
                        <div
                          key={label}
                          className="rounded-xl bg-white p-4"
                        >
                          <p className="text-xs text-zinc-400">{label}</p>
                          <p className="mt-2 text-lg font-bold">{value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 rounded-xl bg-white p-4">
                      <div className="flex items-end gap-2">
                        {[35, 55, 42, 70, 60, 82, 68, 92].map((height, i) => (
                          <div
                            key={i}
                            className="flex-1 rounded-t-md bg-orange-400"
                            style={{ height: `${height}px` }}
                          />
                        ))}
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
        <div className="mx-auto max-w-7xl px-6 py-10">
          <p className="text-center text-sm font-medium text-zinc-400">
            UMA PLATAFORMA PARA DIFERENTES TIPOS DE NEGÓCIO
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-10 text-lg font-semibold text-zinc-400 sm:gap-16">
            <span>Restaurantes</span>
            <span>Pizzarias</span>
            <span>Hamburguerias</span>
            <span>Pastelarias</span>
            <span>Cafeterias</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="recursos" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-orange-500">
            Tudo em um só lugar
          </span>

          <h2 className="mt-3 text-4xl font-bold tracking-tight">
            Tudo que você precisa para vender online
          </h2>

          <p className="mt-4 text-lg text-zinc-600">
            Do cadastro dos produtos até o recebimento do pedido, o MesaFlow
            simplifica a operação do seu negócio.
          </p>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
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
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-orange-400">
                Simples assim
              </span>

              <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
                Sua loja pronta em poucos passos.
              </h2>

              <p className="mt-5 text-lg leading-8 text-zinc-400">
                Você não precisa entender de programação ou tecnologia.
                Configure seu negócio e deixe o MesaFlow cuidar da parte
                complicada.
              </p>

              <Link
                href="/criar-loja"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 font-semibold transition hover:bg-orange-600"
              >
                Começar agora
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="space-y-4">
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
      <section id="vantagens" className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-3xl bg-orange-50 p-8">
                <ChefHat className="text-orange-500" size={28} />
                <p className="mt-12 text-3xl font-bold">100%</p>
                <p className="mt-1 text-sm text-zinc-500">
                  focado em negócios de alimentação
                </p>
              </div>

              <div className="mt-8 rounded-3xl bg-zinc-100 p-8">
                <Smartphone className="text-zinc-700" size={28} />
                <p className="mt-12 text-3xl font-bold">24h</p>
                <p className="mt-1 text-sm text-zinc-500">
                  sua loja disponível
                </p>
              </div>

              <div className="rounded-3xl bg-zinc-950 p-8 text-white">
                <Zap className="text-orange-400" size={28} />
                <p className="mt-12 text-3xl font-bold">Fácil</p>
                <p className="mt-1 text-sm text-zinc-400">
                  de configurar e usar
                </p>
              </div>

              <div className="mt-8 rounded-3xl border border-zinc-200 p-8">
                <Store className="text-orange-500" size={28} />
                <p className="mt-12 text-3xl font-bold">Sua</p>
                <p className="mt-1 text-sm text-zinc-500">
                  marca e identidade
                </p>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <span className="text-sm font-semibold uppercase tracking-wider text-orange-500">
              Feito para você
            </span>

            <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              Menos tempo configurando. Mais tempo cuidando do seu negócio.
            </h2>

            <p className="mt-6 text-lg leading-8 text-zinc-600">
              O MesaFlow foi pensado para tirar a complexidade da tecnologia
              das suas mãos e colocar as ferramentas certas para o seu negócio
              trabalhar melhor.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Interface simples e intuitiva",
                "Cardápio totalmente personalizável",
                "Gestão centralizada dos produtos",
                "Pedidos organizados em um único lugar",
                "Acesso pelo computador ou celular",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-100">
                    <Check size={14} className="text-orange-600" />
                  </div>

                  <span className="font-medium text-zinc-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="precos" className="px-6 pb-24">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-orange-500 px-8 py-20 text-center text-white sm:px-16">
          <h2 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            Pronto para colocar seu negócio online?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-orange-50">
            Crie sua loja, monte seu cardápio e comece a receber pedidos.
            Simples, rápido e do seu jeito.
          </p>

          <Link
            href="/criar-loja"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-4 font-semibold text-orange-600 shadow-lg transition hover:bg-orange-50"
          >
            Criar minha loja
            <ArrowRight size={18} />
          </Link>

          <p className="mt-5 text-sm text-orange-100">
            Comece agora e configure sua loja em poucos minutos.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-100">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500 text-white">
              <Store size={17} />
            </div>

            <span className="font-bold">
              Mesa<span className="text-orange-500">Flow</span>
            </span>
          </div>

          <p className="text-sm text-zinc-400">
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
    <div className="group rounded-2xl border border-zinc-200 p-7 transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-500/5">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-500 transition group-hover:bg-orange-500 group-hover:text-white">
        {icon}
      </div>

      <h3 className="mt-6 text-lg font-bold">{title}</h3>

      <p className="mt-2 leading-7 text-zinc-500">{description}</p>
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
    <div className="flex gap-5 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-sm font-bold">
        {number}
      </div>

      <div>
        <h3 className="font-bold">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-zinc-400">
          {description}
        </p>
      </div>
    </div>
  );
}