'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ScrollReveal } from '../animations/ScrollReveal';
import { ArrowRight, Check } from 'lucide-react';

export function CtaSection() {
    return (
        <section className="py-28 md:py-40 relative flex items-center justify-center overflow-hidden">

            {/* Bold gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

            {/* Orbiting Rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[800px] aspect-square rounded-full border border-white/10 pointer-events-none animate-[spin-slow_40s_linear_infinite]"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[600px] aspect-square rounded-full border border-white/15 pointer-events-none animate-[spin-slow_30s_linear_infinite_reverse]"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] md:w-[1000px] aspect-square rounded-full border border-white/5 pointer-events-none animate-[spin-slow_50s_linear_infinite]"></div>

            {/* Noise texture overlay */}
            <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

            <div className="container mx-auto px-4 md:px-12 relative z-10 text-center">
                <ScrollReveal direction="up" className="max-w-3xl mx-auto">
                    <h2 className="text-5xl md:text-7xl font-heading font-extrabold text-white mb-8 tracking-tight leading-[1.1]">
                        Ready to upgrade your life?
                    </h2>
                    <p className="text-xl md:text-2xl text-white/80 mb-12 leading-relaxed">
                        Join thousands of high performers using HabitOS to build unbreakable consistency. Free forever for the first 3 habits.
                    </p>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block"
                    >
                        <Link
                            href="/register"
                            className="group flex items-center justify-center gap-2 px-10 py-5 rounded-full bg-white text-indigo-700 text-lg font-bold transition-all shadow-2xl shadow-black/20 hover:shadow-white/20"
                        >
                            Start Tracking Free
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>

                    <div className="mt-8 flex items-center justify-center gap-2 text-sm text-white/60">
                        <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" />
                        </div>
                        No credit card required
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
