import Image from "next/image";

export default function Banner() {
  return (
    <section className="relative w-full overflow-hidden">
      <Image
        src="/banner-doacao.jpg"
        alt="Plataforma para doação de medicamentos em boas condições e descarte ambientalmente correto de resíduos farmacêuticos. Coleta domiciliar, descarte consciente e doação solidária."
        width={7680}
        height={2400}
        priority
        className="h-auto w-full object-cover"
        sizes="100vw"
      />
    </section>
  );
}
