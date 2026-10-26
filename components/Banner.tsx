
import Image from "next/image";

type HomeHeroProps = {
  logoPath: string;
};

export default function Banner({ logoPath }: HomeHeroProps) {
  return (
    <section className="relative h-30 overflow-hidden sm:h-50 md:h-80">
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
