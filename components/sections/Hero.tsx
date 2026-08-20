import { BookConsultButton } from "@/components/book-consult-button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

/** Swap to real photo: set to "/images/dra-karla-avatar.jpg" */
const AVATAR_SRC: string | null = null;

function HeroAvatar() {
  return (
    <span
      className={cn(
        "size-9 shrink-0 overflow-hidden rounded-full sm:size-10",
        !AVATAR_SRC &&
          "bg-[linear-gradient(145deg,#F1ECE4_0%,#FAF8F5_55%,#EDE8DF_100%)]",
      )}
      aria-hidden
    >
      {AVATAR_SRC ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={AVATAR_SRC}
          alt=""
          className="size-full object-cover"
          draggable={false}
        />
      ) : null}
    </span>
  );
}

export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="scroll-anchor pt-32 pb-24 sm:pt-36 sm:pb-28 md:pt-40 md:pb-32 lg:min-h-[min(78vh,820px)] lg:pt-44 lg:pb-36"
    >
      <Container>
        <div className="hero-enter mx-auto w-full max-w-3xl lg:mx-0 lg:max-w-4xl">
          <p className="flex items-center gap-3 text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-text-secondary">
            <HeroAvatar />
            <span>Dra. Karla Armijos · Especialista ORL</span>
          </p>

          <h1
            id="hero-heading"
            className="mt-8 font-display text-[clamp(3rem,7vw,8rem)] leading-[0.96] tracking-[-0.03em] text-text-primary sm:mt-10"
          >
            <span className="block">Respirá mejor.</span>
            <span className="mt-[0.08em] block">
              Dormí{" "}
              <span className="hero-word-breathe">mejor</span>.
            </span>
          </h1>

          <p className="mt-8 max-w-md text-base leading-relaxed text-text-secondary sm:mt-10 sm:text-lg">
            Cuidado otorrinolaringológico y del sueño, con calma y un plan claro
            para cada paciente.
          </p>

          <div className="mt-10 sm:mt-12">
            <BookConsultButton variant="primary">
              Reservar consulta
            </BookConsultButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
