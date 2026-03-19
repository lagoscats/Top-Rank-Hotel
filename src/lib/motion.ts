import type { Easing } from "framer-motion";

export const TRANSITION_EASE: Easing = [0.16, 1, 0.3, 1];

export const fadeUpVariant = {
  initial: { opacity: 0, y: 20 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: TRANSITION_EASE },
  },
  viewport: { once: true, margin: "-100px" },
};

export const fadeInVariant = {
  initial: { opacity: 0 },
  whileInView: {
    opacity: 1,
    transition: { duration: 0.6, ease: TRANSITION_EASE },
  },
  viewport: { once: true },
};

export const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
  viewport: { once: true, margin: "-50px" },
};

export const scaleInVariant = {
  initial: { opacity: 0, scale: 0.95 },
  whileInView: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: TRANSITION_EASE },
  },
  viewport: { once: true },
};
