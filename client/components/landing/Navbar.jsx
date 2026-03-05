"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, CheckCircle2, Sun, Moon } from 'lucide-react';
import { useStickyHeader } from '@/hooks/useStickyHeader';
import { useTheme } from '@/hooks/useTheme';

const NAV_LINKS = [
    { name: 'Features', href: '#features' },
    { name: 'How it Works', href: '#how-it-works' },
    { name: 'Testimonials', href: '#testimonials' },
];

export function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const isSticky = useStickyHeader(50);
    const pathname = usePathname();
    const { theme, toggleTheme, mounted } = useTheme();

    const isLandingPage = pathname === '/';

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isSticky
                ? 'bg-white/70 dark:bg-black/70 backdrop-blur-2xl shadow-lg shadow-black/5 dark:shadow-white/5 border-b border-black/5 dark:border-white/5 py-3'
                : 'bg-transparent py-6'
                }`}
        >
            <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group z-50">
                    <div className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-all duration-300">
                        <CheckCircle2 className="w-5 h-5 absolute" />
                    </div>
                    <span className="font-heading font-bold text-xl tracking-tight text-foreground">
                        Habit<span className="gradient-text-warm">OS</span>
                    </span>
                </Link>

                <nav className="hidden md:flex items-center gap-8">
                    {isLandingPage && (
                        <ul className="flex items-center gap-6">
                            {NAV_LINKS.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
                                    >
                                        {link.name}
                                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 transition-all duration-300 group-hover:w-full"></span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}

                    <div className="flex items-center gap-4 ml-4">
                        {mounted && (
                            <motion.button
                                onClick={toggleTheme}
                                className="relative w-10 h-10 rounded-full bg-muted/50 dark:bg-muted/20 flex items-center justify-center text-foreground hover:bg-muted transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                aria-label="Toggle theme"
                            >
                                <AnimatePresence mode="wait">
                                    {theme === 'dark' ? (
                                        <motion.div
                                            key="sun"
                                            initial={{ rotate: -90, opacity: 0 }}
                                            animate={{ rotate: 0, opacity: 1 }}
                                            exit={{ rotate: 90, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <Sun className="w-5 h-5 text-yellow-500" />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="moon"
                                            initial={{ rotate: 90, opacity: 0 }}
                                            animate={{ rotate: 0, opacity: 1 }}
                                            exit={{ rotate: -90, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <Moon className="w-5 h-5 text-indigo-500" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        )}

                        <Link
                            href="/login"
                            className="text-sm font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                        >
                            Log in
                        </Link>
                        <Link
                            href="/register"
                            className="px-6 py-2.5 rounded-full btn-gradient text-sm font-semibold transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40"
                        >
                            Get Started →
                        </Link>
                    </div>
                </nav>

                <div className="flex items-center gap-2 md:hidden">
                    {mounted && (
                        <motion.button
                            onClick={toggleTheme}
                            className="relative w-10 h-10 rounded-full bg-muted/50 dark:bg-muted/20 flex items-center justify-center text-foreground"
                            whileTap={{ scale: 0.9 }}
                            aria-label="Toggle theme"
                        >
                            <AnimatePresence mode="wait">
                                {theme === 'dark' ? (
                                    <motion.div
                                        key="sun"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Sun className="w-5 h-5 text-yellow-500" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="moon"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Moon className="w-5 h-5 text-indigo-500" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    )}

                    <button
                        className="relative z-50 p-2 text-foreground"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <AnimatePresence mode="wait">
                            {isMobileMenuOpen ? (
                                <motion.div
                                    key="close"
                                    initial={{ opacity: 0, rotate: -90 }}
                                    animate={{ opacity: 1, rotate: 0 }}
                                    exit={{ opacity: 0, rotate: 90 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <X className="w-6 h-6" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="menu"
                                    initial={{ opacity: 0, rotate: 90 }}
                                    animate={{ opacity: 1, rotate: 0 }}
                                    exit={{ opacity: 0, rotate: -90 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Menu className="w-6 h-6" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </button>
                </div>

                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20, transition: { duration: 0.2, delay: 0.1 } }}
                            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col pt-24 px-6 pb-6 md:hidden"
                        >
                            <nav className="flex flex-col flex-1 gap-6">
                                {isLandingPage && (
                                    <ul className="flex flex-col gap-4 border-b border-border pb-6">
                                        {NAV_LINKS.map((link, i) => (
                                            <motion.li
                                                key={link.name}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                transition={{ duration: 0.3, delay: i * 0.1 }}
                                            >
                                                <Link
                                                    href={link.href}
                                                    className="text-2xl font-semibold text-foreground/80 hover:text-foreground hover:translate-x-2 transition-all inline-block"
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                >
                                                    {link.name}
                                                </Link>
                                            </motion.li>
                                        ))}
                                    </ul>
                                )}

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ duration: 0.3, delay: 0.3 }}
                                    className="flex flex-col gap-4 mt-4"
                                >
                                    <Link
                                        href="/login"
                                        className="w-full py-4 text-center rounded-2xl border border-border text-lg font-medium hover:bg-muted transition-colors"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="w-full py-4 text-center rounded-2xl btn-gradient text-lg font-semibold shadow-lg shadow-indigo-500/25"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Get Started Free →
                                    </Link>
                                </motion.div>
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
}
