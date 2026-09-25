export const premiumEase = [0.22, 1, 0.36, 1] as const;

/** Entradas en viewport (~580ms) */
export const motionDuration = 0.58;

export const staggerDelay = 0.07;

export const viewportOnce = { once: true, margin: "-72px" } as const;

const REVEAL_X = 22;
const REVEAL_Y = 18;

export type RevealAxis = "left" | "right" | "up";

export const fadeUpVariants = {
  hidden: { opacity: 0, y: REVEAL_Y },
  visible: { opacity: 1, y: 0 },
} as const;

export function getRevealVariants(axis: RevealAxis) {
  if (axis === "up") return fadeUpVariants;
  if (axis === "left") {
    return {
      hidden: { opacity: 0, x: -REVEAL_X },
      visible: { opacity: 1, x: 0 },
    } as const;
  }
  return {
    hidden: { opacity: 0, x: REVEAL_X },
    visible: { opacity: 1, x: 0 },
  } as const;
}

/** Ítems de lista: alternan izquierda / derecha */
export function getAlternatingRevealVariants(index: number) {
  return getRevealVariants(index % 2 === 0 ? "left" : "right");
}

export const motionTransition = {
  duration: motionDuration,
  ease: premiumEase,
} as const;

export const staggerContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: 0.04,
    },
  },
} as const;

/** Modal — solo opacity/transform, transiciones cortas */
export const modalBackdropTransition = {
  duration: 0.26,
  ease: premiumEase,
} as const;

export const modalPanelTransition = {
  duration: 0.32,
  ease: premiumEase,
} as const;

export const modalPanelVariants = {
  hidden: { opacity: 0, scale: 0.985, y: 10 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.985, y: 8 },
} as const;
