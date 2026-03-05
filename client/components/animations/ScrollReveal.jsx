"use client";

import { motion } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { fadeInUp, slideInLeft, slideInRight, scaleIn } from '../../lib/animations';

export function ScrollReveal({
    children,
    direction = 'up',
    delay = 0,
    className = '',
    threshold = 0.1,
    stagger = false
}) {
    const { ref, isVisible } = useScrollReveal({ threshold });

    const getVariants = () => {
        switch (direction) {
            case 'left': return slideInLeft;
            case 'right': return slideInRight;
            case 'scale': return scaleIn;
            case 'none': return { hidden: { opacity: 0 }, visible: { opacity: 1 } };
            case 'up':
            default:
                return fadeInUp(delay);
        }
    };

    if (stagger) {
        return (
            <motion.div
                ref={ref}
                initial="hidden"
                animate={isVisible ? 'visible' : 'hidden'}
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: {
                            staggerChildren: 0.1,
                            delayChildren: delay
                        }
                    }
                }}
                className={className}
            >
                {children}
            </motion.div>
        );
    }

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            variants={getVariants()}
            className={className}
        >
            {children}
        </motion.div>
    );
}
