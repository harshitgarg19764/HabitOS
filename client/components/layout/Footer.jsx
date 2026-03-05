'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle2, Github, Twitter, Linkedin } from 'lucide-react';
import { ScrollReveal } from '../animations/ScrollReveal';

export function Footer() {
    return (
        <ScrollReveal direction="none" className="relative bg-white dark:bg-[#050505] border-t border-border mt-auto pt-16 pb-8 text-sm">
            {/* Gradient top accent */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
            <div className="container mx-auto px-4 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">

                    <div className="md:col-span-1">
                        <Link href="/" className="inline-flex items-center gap-2 group mb-6">
                            <div className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30">
                                <CheckCircle2 className="w-5 h-5 absolute" />
                            </div>
                            <span className="font-heading font-bold text-xl tracking-tight text-foreground">
                                Habit<span className="gradient-text-warm">OS</span>
                            </span>
                        </Link>
                        <p className="text-muted-foreground leading-relaxed mb-6">
                            Run your life like software. Track habits, gain AI insights, and build unbreakable consistency.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-gradient-to-br hover:from-indigo-500 hover:to-purple-500 hover:text-white transition-all duration-300"><Twitter className="w-4 h-4" /></a>
                            <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-gradient-to-br hover:from-indigo-500 hover:to-purple-500 hover:text-white transition-all duration-300"><Github className="w-4 h-4" /></a>
                            <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-gradient-to-br hover:from-indigo-500 hover:to-purple-500 hover:text-white transition-all duration-300"><Linkedin className="w-4 h-4" /></a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-foreground mb-6 uppercase tracking-wider text-xs">Product</h4>
                        <ul className="flex flex-col gap-4">
                            {['Features', 'Pricing', 'Testimonials', 'Changelog'].map(link => (
                                <li key={link}>
                                    <Link href="#" className="text-muted-foreground hover:text-foreground relative group inline-block">
                                        {link}
                                        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-foreground transition-all duration-300 group-hover:w-full"></span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-foreground mb-6 uppercase tracking-wider text-xs">Resources</h4>
                        <ul className="flex flex-col gap-4">
                            {['Blog', 'Help Center', 'API Documentation', 'Community'].map(link => (
                                <li key={link}>
                                    <Link href="#" className="text-muted-foreground hover:text-foreground relative group inline-block">
                                        {link}
                                        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-foreground transition-all duration-300 group-hover:w-full"></span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-foreground mb-6 uppercase tracking-wider text-xs">Legal</h4>
                        <ul className="flex flex-col gap-4">
                            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(link => (
                                <li key={link}>
                                    <Link href="#" className="text-muted-foreground hover:text-foreground relative group inline-block">
                                        {link}
                                        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-foreground transition-all duration-300 group-hover:w-full"></span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-muted-foreground">
                    <p>© {new Date().getFullYear()} HabitOS Inc. All rights reserved.</p>
                    <div className="flex gap-4">
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> All systems operational</span>
                    </div>
                </div>
            </div>
        </ScrollReveal>
    );
}
