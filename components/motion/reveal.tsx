"use client";

import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
  type Variants,
} from "framer-motion";
import {
  getRevealVariants,
  motionTransition,
  staggerContainerVariants,
  viewportOnce,
  type RevealAxis,
} from "@/lib/motion";

type RevealProps = HTMLMotionProps<"div"> & {
  from?: RevealAxis;
  delay?: number;
};

/** Entrada al scroll — opacity + slide ligero. */
export function Reveal({
  from = "up",
  delay = 0,
  className,
  children,
  ...rest
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const variants = getRevealVariants(from);

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView={shouldReduceMotion ? undefined : "visible"}
      viewport={viewportOnce}
      variants={variants}
      transition={{ ...motionTransition, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

type RevealStaggerProps = HTMLMotionProps<"div">;

/** Contenedor con hijos motion que heredan stagger. */
export function RevealStagger({
  className,
  children,
  ...rest
}: RevealStaggerProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView={shouldReduceMotion ? undefined : "visible"}
      viewport={viewportOnce}
      variants={staggerContainerVariants}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

type RevealItemProps = HTMLMotionProps<"li"> & {
  from?: RevealAxis;
  index?: number;
};

export function RevealItem({
  from,
  index = 0,
  className,
  children,
  ...rest
}: RevealItemProps) {
  const axis: RevealAxis =
    from ?? (index % 2 === 0 ? "left" : "right");
  const variants: Variants = {
    hidden: getRevealVariants(axis).hidden,
    visible: {
      ...getRevealVariants(axis).visible,
      transition: motionTransition,
    },
  };

  return (
    <motion.li className={className} variants={variants} {...rest}>
      {children}
    </motion.li>
  );
}
