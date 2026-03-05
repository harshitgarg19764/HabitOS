'use client';

import { motion } from 'framer-motion';
import { Layers, Cpu, BarChart3, Shield, Target, Infinity as InfinityIcon } from 'lucide-react';
import { ScrollReveal } from '../animations/ScrollReveal';

const features = [
    {
        icon: <Layers className="w-6 h-6" />,
        title: "Smart Habit Tracking",
        description: "Track daily, weekly, or custom schedules. Everything adapts to your life rhythm.",
        gradient: "from-blue-500 to-cyan-500",
        shadowColor: "shadow-blue-500/20",
        glowBorder: "hover:border-blue-400/30"
    },
    {
        icon: <Cpu className="w-6 h-6" />,
        title: "AI Precision Insights",
        description: "Our engine analyzes your patterns and tells you exactly when you're most likely to succeed.",
        gradient: "from-purple-500 to-violet-500",
        shadowColor: "shadow-purple-500/20",
        glowBorder: "hover:border-purple-400/30"
    },
    {
        icon: <BarChart3 className="w-6 h-6" />,
        title: "Deep Analytics Engine",
        description: "Visualize your progress with interactive heatmaps, charts, and predictive scoring.",
        gradient: "from-indigo-500 to-blue-500",
        shadowColor: "shadow-indigo-500/20",
        glowBorder: "hover:border-indigo-400/30"
    },
    {
        icon: <Shield className="w-6 h-6" />,
        title: "Streak Protection",
        description: "Life happens. Use built-in streak freezes and smart recovery days to stay motivated.",
        gradient: "from-emerald-500 to-teal-500",
        shadowColor: "shadow-emerald-500/20",
        glowBorder: "hover:border-emerald-400/30"
    },
    {
        icon: <Target className="w-6 h-6" />,
        title: "Gamified Achievements",
        description: "Unlock badges, level up your profile, and earn rewards for your consistency.",
        gradient: "from-orange-500 to-amber-500",
        shadowColor: "shadow-orange-500/20",
        glowBorder: "hover:border-orange-400/30"
    },
    {
        icon: <InfinityIcon className="w-6 h-6" />,
        title: "Seamless Sync",
        description: "Access your data anywhere. Instantly synced across all your devices in real-time.",
        gradient: "from-pink-500 to-rose-500",
        shadowColor: "shadow-pink-500/20",
        glowBorder: "hover:border-pink-400/30"
    }
];

export function FeaturesSection() {
    return (
        <section id="features" className="relative py-28 md:py-36 overflow-hidden bg-background">
            {/* Decorative background */}
            <div className="absolute inset-0 section-gradient pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[150px] animate-[spin-slow_20s_linear_infinite] pointer-events-none"></div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <ScrollReveal direction="up" className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-sm font-bold tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500 uppercase mb-5">
                        Everything you need
                    </h2>
                    <h3 className="text-4xl md:text-6xl font-heading font-extrabold text-foreground mb-6 leading-tight">
                        Designed for <span className="gradient-text-warm">consistency.</span>
                    </h3>
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                        Stop juggling multiple apps. HabitOS combines world-class habit tracking with deep analytics and AI to help you become the best version of yourself.
                    </p>
                    {/* Decorative gradient line */}
                    <div className="mt-8 mx-auto w-24 h-1 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                </ScrollReveal>

                <ScrollReveal stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            variants={{
                                hidden: { opacity: 0, y: 40 },
                                visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 20, stiffness: 100 } }
                            }}
                            whileHover={{ y: -12 }}
                            className={`group relative p-8 md:p-9 rounded-[1.75rem] bg-white/70 dark:bg-white/[0.04] border border-black/5 dark:border-white/8 backdrop-blur-xl transition-all duration-500 shadow-xl shadow-black/[0.03] dark:shadow-none hover:shadow-2xl ${feature.shadowColor} ${feature.glowBorder} overflow-hidden`}
                        >
                            {/* Gradient top accent bar */}
                            <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                            {/* Icon */}
                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-7 text-white shadow-lg ${feature.shadowColor} transition-transform duration-300 group-hover:scale-110`}>
                                {feature.icon}
                            </div>

                            <h4 className="text-xl font-bold font-heading text-foreground mb-3">{feature.title}</h4>
                            <p className="text-muted-foreground leading-relaxed text-[0.95rem]">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </ScrollReveal>

                {/* Visual Enrichment Banner */}
                <ScrollReveal direction="up" delay={0.4} className="mt-20 lg:mt-32 max-w-5xl mx-auto w-full group perspective-1000">
                    <div className="relative rounded-[2.5rem] overflow-hidden border border-black/5 dark:border-white/10 shadow-2xl transition-transform duration-700 hover:scale-[1.02] rotate-x-[2deg] rotate-y-[-1deg] hover:rotate-0">
                        {/* Image */}
                        <img
                            src="/images/landing/feature-habits.png"
                            alt="Morning routine layout with habit tracker"
                            className="w-full h-auto max-h-[500px] object-cover"
                        />
                        {/* Overlay Gradients */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
                        <div className="absolute inset-0 bg-indigo-500/10 mix-blend-overlay group-hover:bg-transparent transition-colors duration-500 pointer-events-none"></div>

                        {/* Floating Pill */}
                        <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md px-6 py-3 rounded-full border border-black/5 dark:border-white/10 shadow-xl flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center">
                                <Target className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <span className="font-semibold text-foreground text-sm tracking-wide">Perfect your morning</span>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
