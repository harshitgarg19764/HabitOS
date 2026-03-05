"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { pageTransition } from '../../lib/animations';

export function PageTransition({ children }) {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                variants={pageTransition}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="min-h-screen flex flex-col"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
