
import Image from "next/image";

type HomeHeroProps = {
  logoPath: string;
};

export default function Banner({ logoPath }: HomeHeroProps) {
  return (
    <section className="relative h-30 max-h-105 overflow-hidden sm:h-[35vh] sm:min-h-80 md:h-[40vh]">
      <Image
        src={logoPath}
        alt="Banner da loja"
        fill
        priority
        sizes="100vw"
        className="object-cover object-top"
      />
      <div className="absolute inset-0 bg-black/50" />
    </section>
  );
}
