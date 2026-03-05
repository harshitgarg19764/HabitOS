'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Target, CheckSquare, BarChart } from 'lucide-react';
import { ScrollReveal } from '../animations/ScrollReveal';

const steps = [
    {
        title: 'Define Your Habits',
        description: 'Start simple. Choose the habits you want to build and set realistic goals that fit your life.',
        icon: Target,
        gradient: 'from-indigo-500 to-blue-500',
        shadow: 'shadow-indigo-500/30',
        num: '01'
    },
    {
        title: 'Log Daily Progress',
        description: 'Use our frictionless interface to check off your habits in seconds every day — it feels satisfying.',
        icon: CheckSquare,
        gradient: 'from-purple-500 to-violet-500',
        shadow: 'shadow-purple-500/30',
        num: '02'
    },
    {
        title: 'Unlock AI Insights',
        description: 'Watch your streaks grow as our AI analyzes your behavior and provides actionable tips for improvement.',
        icon: BarChart,
        gradient: 'from-pink-500 to-rose-500',
        shadow: 'shadow-pink-500/30',
        num: '03'
    }
];

export function HowItWorksSection() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    const pathLength = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });

    return (
        <section id="how-it-works" className="py-28 md:py-36 bg-background relative overflow-hidden" ref={containerRef}>
            {/* Subtle gradient background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-50/30 dark:via-indigo-950/10 to-transparent pointer-events-none"></div>

            <div className="container mx-auto px-4 md:px-12 relative z-10">
                <ScrollReveal direction="up" className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-sm font-bold tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 uppercase mb-5">
                        How it works
                    </h2>
                    <h3 className="text-4xl md:text-6xl font-heading font-extrabold text-foreground mb-6 leading-tight">
                        Systemize your <span className="gradient-text-warm">success.</span>
                    </h3>
                    <div className="mt-6 mx-auto w-24 h-1 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500"></div>
                </ScrollReveal>

                <div className="relative max-w-5xl mx-auto">
                    {/* Animated connecting line (Desktop) */}
                    <div className="hidden md:block absolute top-[72px] left-[10%] right-[10%] h-[3px] bg-muted/60 rounded-full overflow-hidden">
                        <motion.div
                            className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                            style={{
                                width: '100%',
                                scaleX: pathLength,
                                transformOrigin: 'left'
                            }}
                        />
                    </div>

                    {/* Animated connecting line (Mobile) */}
                    <div className="md:hidden absolute top-[10%] bottom-[10%] left-[30px] w-[3px] bg-muted/60 rounded-full overflow-hidden">
                        <motion.div
                            className="absolute top-0 left-0 right-0 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500"
                            style={{
                                height: '100%',
                                scaleY: pathLength,
                                transformOrigin: 'top'
                            }}
                        />
                    </div>

                    <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-8 relative z-10">
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            const isEven = index % 2 === 0;

                            return (
                                <div key={index} className="flex-1 relative flex flex-row md:flex-col items-start md:items-center gap-6 md:gap-8">
                                    <motion.div
                                        initial={{ scale: 0, opacity: 0 }}
                                        whileInView={{ scale: 1, opacity: 1 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ delay: 0.2, type: 'spring', damping: 15 }}
                                        className="w-16 h-16 shrink-0 md:w-[88px] md:h-[88px] rounded-full flex items-center justify-center relative z-20 mx-auto"
                                    >
                                        <div className={`w-full h-full rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-xl ${step.shadow}`}>
                                            <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                                        </div>
                                    </motion.div>

                                    <ScrollReveal
                                        direction={isEven ? 'left' : 'right'}
                                        delay={0.3}
                                        className="flex-1 md:text-center mt-2 md:mt-0"
                                    >
                                        {/* Glass card */}
                                        <div className="p-6 rounded-2xl bg-white/50 dark:bg-white/[0.03] border border-black/5 dark:border-white/8 backdrop-blur-md">
                                            <div className="inline-flex justify-center items-center px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/20 dark:to-purple-500/20 mb-4">
                                                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 tracking-wider">{step.num}</span>
                                            </div>
                                            <h4 className="text-xl md:text-2xl font-bold font-heading text-foreground mb-3">{step.title}</h4>
                                            <p className="text-muted-foreground leading-relaxed text-[0.95rem]">
                                                {step.description}
                                            </p>
                                        </div>
                                    </ScrollReveal>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
