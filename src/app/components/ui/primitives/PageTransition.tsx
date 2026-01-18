import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";
import { forwardRef, ReactNode } from "react";

interface MotionWrapperProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
}

const MotionDiv = forwardRef<HTMLDivElement, MotionWrapperProps>(
  ({ children, ...props }, ref) => {
    const animationProps = {
      initial: { opacity: 0, y: -10 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
      transition: { duration: 0.2 },
      className: "-mt-0",
    };

    return (
      <AnimatePresence>
        <motion.div ref={ref} {...animationProps} {...props}>
          {children}
        </motion.div>
      </AnimatePresence>
    );
  }
);

MotionDiv.displayName = "MotionDiv";

export default MotionDiv;
