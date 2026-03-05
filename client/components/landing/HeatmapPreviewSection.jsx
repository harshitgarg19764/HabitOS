'use client';

import { motion } from 'framer-motion';
import { ScrollReveal } from '../animations/ScrollReveal';
import { Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';

export function HeatmapPreviewSection() {
    const weeks = 20;
    const daysPerWeek = 7;
    const [cells, setCells] = useState([]);

    useEffect(() => {
        const newCells = [];
        for (let col = 0; col < weeks; col++) {
            for (let row = 0; row < daysPerWeek; row++) {
                let intensity = Math.floor(Math.random() * 5);
                if (col > 16) intensity = Math.floor(Math.random() * 3);
                newCells.push({ col, row, intensity });
            }
        }
        setCells(newCells);
    }, []);

    const getIntensityColor = (intensity) => {
        switch (intensity) {
            case 0: return 'bg-muted/30 dark:bg-muted/10';
            case 1: return 'bg-indigo-300 dark:bg-indigo-900/40';
            case 2: return 'bg-indigo-400 dark:bg-indigo-700/60';
            case 3: return 'bg-indigo-500 dark:bg-indigo-500/80';
            case 4: return 'bg-indigo-600 dark:bg-indigo-400';
            default: return 'bg-muted/30';
        }
    };

    return (
        <section className="py-24 md:py-32 bg-zinc-50 dark:bg-background relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-12">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    <ScrollReveal direction="right" className="flex-1 max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-semibold text-sm mb-6">
                            <Calendar className="w-4 h-4" />
                            <span>Visual Consistency</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-foreground mb-6">
                            See your year in <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-500">pixels.</span>
                        </h2>
                        <p className="text-lg md:text-xl text-muted-foreground mb-8">
                            Nothing motivates like a solid streak. Our rich heatmap visualizations let you see your long-term consistency at a glance, making it impossible to want to break the chain.
                        </p>

                        <div className="flex gap-8">
                            <div>
                                <div className="text-3xl font-bold font-heading text-foreground mb-1">128</div>
                                <div className="text-sm font-medium text-muted-foreground">Longest Streak</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold font-heading text-foreground mb-1">94%</div>
                                <div className="text-sm font-medium text-muted-foreground">Completion Rate</div>
                            </div>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal direction="left" delay={0.2} className="flex-1 w-full perspective-1000 relative mt-16 lg:mt-0">
                        {/* Floating 3D Streak Element */}
                        <div className="absolute -top-16 -left-8 md:-left-16 z-30 w-32 md:w-48 animate-[float_4.5s_ease-in-out_infinite_0.5s] drop-shadow-2xl pointer-events-none hidden md:block">
                            <img
                                src="/images/landing/streak-3d.png"
                                alt="3D Streak Flame"
                                className="w-full h-auto object-contain drop-shadow-[0_20px_20px_rgba(0,0,0,0.5)]"
                            />
                        </div>

                        <motion.div
                            className="bg-white/80 dark:bg-zinc-900/80 border border-black/5 dark:border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl rotate-y-[-5deg] rotate-x-[5deg] hover:rotate-0 transition-transform duration-700 lg:hover:scale-105 relative z-20"
                        >
                            <div className="flex justify-between items-end mb-6">
                                <div>
                                    <h3 className="font-bold text-foreground text-lg">Workout Activity</h3>
                                    <p className="text-sm text-muted-foreground">Last 140 days</p>
                                </div>
                                <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                                    Less
                                    <div className="flex gap-1">
                                        {[0, 1, 2, 3, 4].map(i => (
                                            <div key={i} className={`w-3 h-3 rounded-sm ${getIntensityColor(i)}`}></div>
                                        ))}
                                    </div>
                                    More
                                </div>
                            </div>

                            <motion.div
                                className="grid gap-[3px] md:gap-1.5"
                                style={{
                                    gridTemplateColumns: `repeat(${weeks}, minmax(0, 1fr))`,
                                    gridTemplateRows: `repeat(${daysPerWeek}, minmax(0, 1fr))`
                                }}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-50px" }}
                                variants={{
                                    hidden: { opacity: 0 },
                                    visible: {
                                        opacity: 1,
                                        transition: { staggerChildren: 0.005 }
                                    }
                                }}
                            >
                                {cells.map((cell, i) => (
                                    <motion.div
                                        key={i}
                                        variants={{
                                            hidden: { opacity: 0, scale: 0.5 },
                                            visible: { opacity: 1, scale: 1 }
                                        }}
                                        className={`pb-[100%] rounded-[2px] md:rounded-sm w-full h-0 relative group ${getIntensityColor(cell.intensity)} hover:ring-2 hover:ring-indigo-400 ring-offset-1 dark:ring-offset-zinc-900 transition-all cursor-pointer`}
                                    >
                                        {/* Hover Tooltip Mock */}
                                        <div className="absolute opacity-0 group-hover:opacity-100 top-0 left-1/2 -translate-x-1/2 -translate-y-full mb-2 bg-foreground text-background text-xs py-1 px-2 rounded pointer-events-none whitespace-nowrap z-10 transition-opacity">
                                            {cell.intensity} activities
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    </ScrollReveal>

                </div>
            </div>
        </section >
    );
}
