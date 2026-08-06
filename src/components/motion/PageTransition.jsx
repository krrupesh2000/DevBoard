import { motion, useReducedMotion } from "motion/react";

function PageTransition({ children }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: shouldReduceMotion ? 0.15 : 0.3,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export default PageTransition;
