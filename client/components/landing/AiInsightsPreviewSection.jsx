'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Brain, Zap, ArrowRight } from 'lucide-react';
import { ScrollReveal } from '../animations/ScrollReveal';

const insights = [
    {
        id: 1,
        title: "Optimal Routine Found",
        description: "You're 3x more likely to complete your workout if you read for 20 minutes first.",
        icon: Brain,
        color: "from-blue-500 to-indigo-500",
        type: "Pattern Detected"
    },
    {
        id: 2,
        title: "Energy Slump Warning",
        description: "Your mood scores dip around 3PM on Thursdays. Try scheduling your hardest work earlier in the day.",
        icon: Zap,
        color: "from-orange-500 to-red-500",
        type: "Predictive Alert"
    },
    {
        id: 3,
        title: "Weekend Motivation",
        description: "You've crushed your meditation goal every Saturday this month. Keep the weekend momentum going!",
        icon: Sparkles,
        color: "from-fuchsia-500 to-pink-500",
        type: "Encouragement"
    }
];

export function AiInsightsPreviewSection() {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % insights.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-24 md:py-32 relative overflow-hidden bg-background">
            {/* Background mesh */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-background to-background pointer-events-none"></div>

            <div className="container mx-auto px-4 md:px-12 relative z-10">
                <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">

                    <ScrollReveal direction="left" className="flex-1 max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 font-semibold text-sm mb-6 border border-purple-200 dark:border-purple-500/30">
                            <Sparkles className="w-4 h-4" />
                            <span>Powered by GPT-4o</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-foreground mb-6">
                            An assistant that actually <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">understands you.</span>
                        </h2>
                        <p className="text-lg md:text-xl text-muted-foreground mb-8">
                            HabitOS doesn't just show you data. It learns your unique rhythms, detects unseen patterns, and serves up hyper-personalized insights to optimize your daily life.
                        </p>

                        <div className="flex flex-col gap-4">
                            {['Identifies correlations between habits', 'Predicts burnout before it happens', 'Personalizes daily motivational quotes'].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="font-medium text-foreground">{item}</span>
                                </div>
                            ))}
                        </div>
                    </ScrollReveal>

                    <ScrollReveal direction="right" delay={0.2} className="flex-1 w-full perspective-1000 mt-16 lg:mt-0 relative">

                        {/* Background Analytics Image */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-auto opacity-30 dark:opacity-20 blur-md pointer-events-none mix-blend-screen md:hidden lg:block -z-10">
                            <img
                                src="/images/landing/feature-analytics.png"
                                alt="Abstract Analytics Background"
                                className="w-full h-auto object-cover"
                            />
                        </div>

                        {/* Floating 3D Brain */}
                        <div className="relative w-48 md:w-64 mx-auto mb-6 lg:mb-8 animate-[float_5s_ease-in-out_infinite] z-20">
                            <img
                                src="/images/landing/feature-ai-brain.png"
                                alt="3D AI Neural Brain"
                                className="w-full h-auto object-contain drop-shadow-[0_0_40px_rgba(168,85,247,0.4)]"
                            />
                        </div>

                        <div className="relative h-[320px] md:h-[350px] w-full max-w-md mx-auto transform-gpu rotate-y-[5deg] rotate-x-[5deg] z-30">

                            {/* Decorative background cards to give depth */}
                            <div className="absolute inset-0 bg-background/50 border border-border rounded-3xl transform translate-y-8 scale-90 blur-sm opacity-50"></div>
                            <div className="absolute inset-0 bg-background/80 border border-border rounded-3xl transform translate-y-4 scale-95 blur-[2px] opacity-80"></div>

                            <div className="absolute inset-0 bg-white/40 dark:bg-zinc-900/60 backdrop-blur-2xl border border-white/50 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col items-center justify-center p-6 md:p-8">

                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeIndex}
                                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                                        transition={{ duration: 0.5, type: 'spring' }}
                                        className="w-full flex flex-col h-full justify-between"
                                    >
                                        <div className="flex justify-between items-center mb-6">
                                            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{insights[activeIndex].type}</span>
                                            <div className="flex gap-1">
                                                {insights.map((_, i) => (
                                                    <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-6 bg-purple-500' : 'w-2 bg-border'}`}></div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex-1">
                                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${insights[activeIndex].color} flex items-center justify-center mb-6 shadow-lg`}>
                                                {(() => {
                                                    const Icon = insights[activeIndex].icon;
                                                    return <Icon className="w-7 h-7 text-white" />;
                                                })()}
                                            </div>

                                            <h3 className="text-2xl font-bold font-heading text-foreground mb-4">
                                                {insights[activeIndex].title}
                                            </h3>

                                            <p className="text-muted-foreground text-lg leading-relaxed">
                                                {insights[activeIndex].description}
                                            </p>
                                        </div>

                                        <div className="mt-8 flex items-center text-sm font-semibold text-purple-600 dark:text-purple-400 group cursor-pointer group">
                                            View deep dive
                                            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </motion.div>
                                </AnimatePresence>

                                {/* Animated Confidene Bar */}
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
                                    <motion.div
                                        key={`progress-${activeIndex}`}
                                        initial={{ width: '0%' }}
                                        animate={{ width: '100%' }}
                                        transition={{ duration: 4, ease: "linear" }}
                                        className={`h-full bg-gradient-to-r ${insights[activeIndex].color}`}
                                    />
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                </div>
            </div>
        </section>
    );
}
