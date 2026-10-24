import Image from "next/image";

export default function Sobre(){

    return (
    <section className="bg-orange-50 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 md:grid-cols-2">
          <div>
            <h2 className="text-4xl font-bold">
              Comida saudável, feita com carinho.
            </h2>

            <p className="mt-6 text-lg text-gray-600">
              A Tofit combina ingredientes selecionados, preparo cuidadoso e muito carinho em cada refeição, oferecendo marmitas saborosas e equilibradas para fazer parte da sua rotina.
            </p>

            <button className="mt-8 rounded-xl bg-orange-500 px-8 py-4 font-semibold text-white hover:bg-orange-600">
              Conheça nossa história
            </button>
          </div>

          <div className="relative h-125 overflow-hidden rounded-3xl">
            <Image
              src="https://zvwxwcxquavhgoswsmim.supabase.co/storage/v1/object/public/store-platform-assets/to-fit/appearance/banner2.png"
              alt="Ambiente do restaurante"
              fill
              unoptimized
              className="object-cover object-left"
            />
          </div>
        </div>
      </section>
    )
}