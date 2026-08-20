export const premiumEase = [0.22, 1, 0.36, 1] as const;

/** Shared motion duration (~700ms) for framer-motion */
export const motionDuration = 0.7;

/** Shared duration for GSAP scroll entrances */
export const gsapDuration = 0.75;

/** GSAP easing aligned with premium feel */
export const gsapEase = "power2.out";

export const staggerDelay = 0.08;

export const viewportOnce = { once: true, margin: "-80px" } as const;

export const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
} as const;

export const motionTransition = {
  duration: motionDuration,
  ease: premiumEase,
} as const;
