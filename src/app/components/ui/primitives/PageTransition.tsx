import { motion, HTMLMotionProps } from 'framer-motion';
import React, { forwardRef, ReactNode } from 'react';

interface MotionWrapperProps extends HTMLMotionProps<'div'> {
    children: ReactNode;
}

const MotionFileItem = forwardRef<HTMLDivElement, MotionWrapperProps>(
    ({ children, ...props }, ref) => {

        const animationProps = {
            initial: { opacity: 0, y: -10 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -20 },
            transition: { duration: 0.2 },
            className: "-mt-0", 
        };

        return (
            <motion.div
                ref={ref}
                {...animationProps}
                {...props}
            >
                {children}
            </motion.div>
        );
    }
);

MotionFileItem.displayName = 'MotionFileItem';

export default MotionFileItem;