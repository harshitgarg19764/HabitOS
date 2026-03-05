'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, CheckCircle2, Users, Zap, Star } from 'lucide-react';
import { AuroraBackground } from './AuroraBackground';
import { fadeInUp, staggerContainer, scaleIn } from '@/lib/animations';
import { useTypewriter } from '@/hooks/useTypewriter';
import Link from 'next/link';
import { useState, useEffect } from 'react';

function Particles() {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        const newParticles = [...Array(25)].map((_, i) => ({
            top: Math.random() * 100,
            left: Math.random() * 100,
            duration: Math.random() * 10 + 10,
            delay: Math.random() * 10,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.3 + 0.1,
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {particles.map((particle, i) => (
                <div
                    key={i}
                    className="absolute rounded-full bg-indigo-400/40 dark:bg-white/30"
                    style={{
                        top: `${particle.top}%`,
                        left: `${particle.left}%`,
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        opacity: particle.opacity,
                        animation: `float ${particle.duration}s linear infinite`,
                        animationDelay: `-${particle.delay}s`,
                    }}
                />
            ))}
        </div>
    );
}

export function HeroSection() {
    const subtitleText = "Track. Analyze. Level up your life.";
    const { text: typewrittenText, ref: typewriterRef } = useTypewriter(subtitleText, 50);

    return (
        <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden">
            <AuroraBackground />
            <Particles />

            <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">

                <motion.div
                    className="flex-1 text-center lg:text-left pt-12 lg:pt-0"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Badge Pill */}
                    <motion.div variants={fadeInUp()} className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/60 dark:bg-white/10 border border-indigo-200/50 dark:border-indigo-500/20 backdrop-blur-xl mb-8 shadow-lg shadow-indigo-500/10">
                        <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                        </span>
                        <span className="text-sm font-semibold tracking-wide bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">Meet your new personal OS</span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        variants={fadeInUp(0.1)}
                        className="text-5xl md:text-7xl lg:text-[5.5rem] font-heading font-extrabold tracking-tight leading-[1.05] mb-6 text-foreground"
                    >
                        Run your life <br className="hidden md:block lg:hidden" />
                        like <span className="gradient-text-warm">software.</span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        ref={typewriterRef}
                        variants={fadeInUp(0.2)}
                        className="text-xl md:text-2xl text-muted-foreground mb-10 h-[32px] md:h-[40px] font-medium"
                    >
                        {typewrittenText}
                        <span className="inline-block w-[2px] h-[1em] bg-indigo-500 ml-1 translate-y-[2px] animate-[pulse_1s_infinite]"></span>
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div variants={fadeInUp(0.3)} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                        <Link
                            href="/register"
                            className="w-full sm:w-auto px-8 py-4 rounded-full btn-gradient text-lg flex items-center justify-center gap-2 group shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all hover:scale-[1.03] active:scale-95"
                        >
                            Start for free
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                        <Link
                            href="#how-it-works"
                            className="w-full sm:w-auto px-8 py-4 rounded-full glass font-semibold text-lg hover:bg-white/80 dark:hover:bg-white/10 transition-all flex items-center justify-center hover:scale-[1.02]"
                        >
                            See how it works
                        </Link>
                    </motion.div>

                    {/* Stats - Glass Cards */}
                    <motion.div variants={fadeInUp(0.5)} className="mt-14 flex items-center justify-center lg:justify-start gap-4 md:gap-6">
                        <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/10 backdrop-blur-md">
                            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                                <Users className="w-4 h-4 text-indigo-500" />
                            </div>
                            <div>
                                <span className="text-lg font-bold font-heading text-foreground">50K+</span>
                                <span className="text-xs text-muted-foreground ml-1.5">users</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/10 backdrop-blur-md">
                            <div className="w-9 h-9 rounded-xl bg-purple-500/10 flex items-center justify-center">
                                <Zap className="w-4 h-4 text-purple-500" />
                            </div>
                            <div>
                                <span className="text-lg font-bold font-heading text-foreground">2M+</span>
                                <span className="text-xs text-muted-foreground ml-1.5">habits</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/10 backdrop-blur-md">
                            <div className="flex gap-0.5">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star key={star} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                ))}
                            </div>
                            <span className="text-sm font-semibold text-foreground">4.9</span>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Hero Feature Visual */}
                <motion.div
                    className="flex-1 w-full max-w-lg lg:max-w-none relative mt-16 lg:mt-0 perspective-1000"
                    variants={scaleIn}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.3, duration: 0.8, type: 'spring' }}
                >
                    <div className="relative z-20 aspect-[4/5] md:aspect-[4/3] lg:aspect-[4/5] w-full max-w-[500px] mx-auto xl:ml-auto xl:mr-10 transform-gpu rotate-y-[-5deg] rotate-x-[5deg] hover:rotate-0 transition-transform duration-700 hover:scale-[1.02]">
                        {/* Main Image */}
                        <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden border border-white/40 dark:border-white/10 shadow-2xl shadow-indigo-500/20">
                            <img
                                src="/images/landing/hero-lifestyle.png"
                                alt="Person using HabitOS while enjoying coffee"
                                className="w-full h-full object-cover"
                            />
                            {/* Inner gradient shadow for depth */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 mix-blend-multiply"></div>
                        </div>

                        {/* Floating 3D Streak Element */}
                        <div className="absolute -top-12 -right-6 md:-right-16 z-30 w-40 md:w-56 animate-[float_4s_ease-in-out_infinite] drop-shadow-2xl">
                            <img
                                src="/images/landing/streak-3d.png"
                                alt="3D Streak Flame"
                                className="w-full h-auto object-contain drop-shadow-[0_20px_20px_rgba(0,0,0,0.5)]"
                            />
                        </div>

                        {/* Floating AI Insight Card */}
                        <div className="absolute -bottom-6 -left-4 md:-left-8 z-30 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border border-white/50 dark:border-white/10 rounded-2xl p-4 shadow-xl shadow-purple-500/10 animate-[float_4.2s_ease-in-out_infinite_1s] max-w-xs">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 flex flex-shrink-0 items-center justify-center shadow-md shadow-purple-500/30">
                                    <Sparkles className="text-white w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-sm font-bold gradient-text-warm">AI Insight</div>
                                    <div className="text-xs text-muted-foreground leading-tight mt-0.5">You sleep better after reading.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex justify-center text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
            >
                <Link href="#features" className="p-3 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors animate-bounce">
                    <ArrowDown className="w-5 h-5" />
                </Link>
            </motion.div>
        </section>
    );
}
