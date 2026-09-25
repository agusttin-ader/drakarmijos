"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { BookConsultButton } from "@/components/book-consult-button";
import { DoctorName } from "@/components/ui/doctor-name";
import { Container } from "@/components/ui/container";
import { SiteImage } from "@/components/ui/site-image";
import {
  motionTransition,
  premiumEase,
  staggerDelay,
} from "@/lib/motion";
import { siteCopy, siteData } from "@/lib/site-data";

const HERO_LOGO = "/images/logo.png";

const copyContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay + 0.01,
      delayChildren: 0.12,
    },
  },
} as const;

const copyItemVariants = {
  hidden: { opacity: 0, x: -22, y: 10 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: motionTransition,
  },
} as const;

const logoVariants = {
  hidden: { opacity: 0, scale: 0.94, x: 28 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 0.85, ease: premiumEase, delay: 0.15 },
  },
} as const;

/** Ciclo ~5.8s — ritmo respiratorio calmado (inhalar / exhalar). */
const logoBreathTransition = {
  duration: 5.8,
  ease: "easeInOut" as const,
  repeat: Infinity,
  repeatType: "mirror" as const,
} as const;

/** Hero estilo feed IG — papel claro + sello mint del perfil. */
export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const motionProps = shouldReduceMotion
    ? { initial: false as const, animate: undefined }
    : { initial: "hidden" as const, animate: "visible" as const };

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative scroll-anchor min-h-[min(100svh,720px)] overflow-hidden bg-background sm:min-h-[100svh]"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 brand-pattern opacity-[0.35]" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_85%_35%,rgba(152,214,213,0.35),transparent_60%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-transparent to-brand-mint-wash/80"
      />

      <Container className="relative z-10 flex min-h-[min(100svh,720px)] flex-col justify-end gap-6 pb-10 pt-[5.5rem] sm:min-h-[100svh] sm:justify-center sm:gap-10 sm:pb-16 sm:pt-28 md:pb-20 lg:grid lg:min-h-[100svh] lg:grid-cols-12 lg:items-center lg:gap-10 lg:pb-24 lg:pt-28 xl:gap-14 2xl:pb-28 2xl:pt-32 3xl:gap-16">
        <motion.div
          className="min-w-0 lg:col-span-6 xl:col-span-5"
          variants={shouldReduceMotion ? undefined : copyContainerVariants}
          {...motionProps}
        >
          <motion.div
            variants={shouldReduceMotion ? undefined : copyItemVariants}
            className="flex items-center gap-2.5"
          >
            <span aria-hidden className="accent-rule w-8 sm:w-10" />
            <p className="eyebrow text-primary">Rinología · Sueño · Buenos Aires</p>
          </motion.div>

          <motion.div variants={shouldReduceMotion ? undefined : copyItemVariants}>
            <DoctorName className="mt-5 text-[clamp(3rem,8.5vw,5.5rem)] leading-[1.02] text-primary 2xl:text-[clamp(3.25rem,6vw,6.25rem)]">
              {siteData.doctor.name}
            </DoctorName>
          </motion.div>

          <motion.h1
            id="hero-heading"
            variants={shouldReduceMotion ? undefined : copyItemVariants}
            className="mt-4 max-w-xl font-display text-[clamp(1.5rem,3.2vw,2.2rem)] font-light leading-[1.15] tracking-tight text-text-primary 2xl:max-w-2xl"
          >
            Otorrino en Buenos Aires — ronquidos, apnea del sueño y rinología
          </motion.h1>

          <motion.p
            variants={shouldReduceMotion ? undefined : copyItemVariants}
            className="mt-3 max-w-lg font-display text-[clamp(1.2rem,2.8vw,1.65rem)] font-light leading-snug text-primary"
          >
            Respira mejor. Duerme mejor.
          </motion.p>

          <motion.p
            variants={shouldReduceMotion ? undefined : copyItemVariants}
            className="prose-measure mt-4 text-[0.9375rem] leading-[1.65] text-text-secondary sm:hidden"
          >
            {siteCopy.heroLeadMobile}
          </motion.p>
          <motion.p
            variants={shouldReduceMotion ? undefined : copyItemVariants}
            className="prose-measure mt-4 hidden text-[0.9375rem] leading-[1.65] text-text-secondary sm:block sm:text-base"
          >
            Otorrinolaringóloga en {siteCopy.clinicsListConjunction}. {siteCopy.heroLead}
          </motion.p>

          <motion.div
            variants={shouldReduceMotion ? undefined : copyItemVariants}
            className="mt-8 flex flex-wrap items-center gap-4 sm:mt-9"
          >
            <BookConsultButton variant="primary" className="shadow-soft">
              {siteData.cta.book}
            </BookConsultButton>
            <Link
              href={siteData.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-text-secondary underline-offset-4 transition-colors hover:text-primary hover:underline"
            >
              {siteData.social.instagramHandle}
            </Link>
            <Link
              href="#specialties"
              className="text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              Especialidades
            </Link>
          </motion.div>

          <motion.p
            variants={shouldReduceMotion ? undefined : copyItemVariants}
            className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-text-secondary"
          >
            {siteData.doctor.title} · {siteData.doctor.license}
          </motion.p>
        </motion.div>

        <motion.figure
          className="relative mx-auto mt-6 w-full max-w-[min(100%,14rem)] sm:mt-8 sm:max-w-xs lg:col-span-6 lg:mx-0 lg:mt-0 lg:max-w-md lg:justify-self-end xl:col-span-7 xl:max-w-lg 2xl:max-w-xl"
          aria-label="Emblema — mismo sello que Instagram"
          variants={shouldReduceMotion ? undefined : logoVariants}
          {...motionProps}
        >
          <div className="relative aspect-square w-full">
            {!shouldReduceMotion ? (
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-[8%] rounded-full bg-brand-aqua/25 blur-2xl"
                animate={{
                  scale: [0.94, 1.03, 0.94],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={logoBreathTransition}
              />
            ) : (
              <div
                aria-hidden
                className="pointer-events-none absolute inset-[8%] rounded-full bg-brand-aqua/20 blur-2xl"
              />
            )}
            <motion.div
              className="relative size-full overflow-hidden rounded-full ring-[0.75px] ring-primary-deep/55 sm:ring-1 sm:ring-primary/40"
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      scale: [1, 1.018, 1],
                      y: [0, -3, 0],
                    }
              }
              transition={logoBreathTransition}
            >
              <SiteImage
                src={HERO_LOGO}
                alt=""
                width={680}
                height={680}
                priority
                sizes="(max-width: 1023px) 16rem, 28rem"
                className="size-full object-cover object-center"
              />
            </motion.div>
          </div>
        </motion.figure>
      </Container>
    </section>
  );
}
