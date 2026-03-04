'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, CheckCircle2 } from 'lucide-react';
import { AuroraBackground } from './AuroraBackground';
import { fadeInUp, staggerContainer, scaleIn } from '@/lib/animations';
import { useTypewriter } from '@/hooks/useTypewriter';
import Link from 'next/link';

export function HeroSection() {
    const subtitleText = "Track. Analyze. Level up your life.";
    const { text: typewrittenText, ref: typewriterRef } = useTypewriter(subtitleText, 50);

    return (
        <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden">
            <AuroraBackground />

            <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">

                {/* Left Content Column */}
                <motion.div
                    className="flex-1 text-center lg:text-left pt-12 lg:pt-0"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Badge */}
                    <motion.div variants={fadeInUp()} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-black/50 border border-black/5 dark:border-white/10 backdrop-blur-md mb-8">
                        <Sparkles className="w-4 h-4 text-indigo-500" />
                        <span className="text-sm font-medium tracking-wide">Meet your new personal OS</span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        variants={fadeInUp(0.1)}
                        className="text-5xl md:text-7xl lg:text-8xl font-heading font-extrabold tracking-tight leading-[1.1] mb-6 text-foreground"
                    >
                        Run your life <br className="hidden md:block lg:hidden" />
                        like <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">software.</span>
                    </motion.h1>

                    {/* Subtitle with Typewriter */}
                    <motion.p
                        ref={typewriterRef as any}
                        variants={fadeInUp(0.2)}
                        className="text-xl md:text-2xl text-muted-foreground mb-10 h-[32px] md:h-[40px]" // Fixed height prevents layout shift during typing
                    >
                        {typewrittenText}
                        <span className="inline-block w-[2px] h-[1em] bg-indigo-500 ml-1 translate-y-[2px] animate-[pulse_1s_infinite]"></span>
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div variants={fadeInUp(0.3)} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                        <Link
                            href="/register"
                            className="w-full sm:w-auto px-8 py-4 rounded-full bg-foreground text-background font-medium text-lg hover:bg-foreground/90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-black/10 dark:shadow-white/10 flex items-center justify-center gap-2 group"
                        >
                            Start for free
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                        <Link
                            href="#how-it-works"
                            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/50 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-md font-medium text-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors flex items-center justify-center"
                        >
                            See how it works
                        </Link>
                    </motion.div>

                    {/* Mini Stats Row */}
                    <motion.div variants={fadeInUp(0.5)} className="mt-12 flex items-center justify-center lg:justify-start gap-8 opacity-70">
                        <div className="flex flex-col items-center lg:items-start">
                            <span className="text-2xl font-bold font-heading text-foreground">50K+</span>
                            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider text-xs">Users</span>
                        </div>
                        <div className="w-px h-8 bg-black/10 dark:bg-white/10"></div>
                        <div className="flex flex-col items-center lg:items-start">
                            <span className="text-2xl font-bold font-heading text-foreground">2M+</span>
                            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider text-xs">Habits Logged</span>
                        </div>
                        <div className="w-px h-8 bg-black/10 dark:bg-white/10"></div>
                        <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <svg key={star} className="w-5 h-5 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>

                {/* Right Content / Mockup Preview */}
                <motion.div
                    className="flex-1 w-full max-w-lg lg:max-w-none relative mt-16 lg:mt-0 perspective-1000"
                    variants={scaleIn}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.3, duration: 0.8, type: 'spring' }}
                >
                    {/* Main Floating Mockup Card */}
                    <div className="relative z-20 bg-white/80 dark:bg-black/80 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden shadow-indigo-500/10 animate-[float_4s_ease-in-out_infinite] rotate-y-[-10deg] rotate-x-[5deg] transition-transform duration-700 hover:rotate-0 hover:scale-[1.02]">
                        {/* Fake Mac Title bar */}
                        <div className="h-8 border-b border-border bg-black/5 dark:bg-white/5 flex items-center px-4 gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                        </div>

                        {/* Fake Dashboard Content */}
                        <div className="p-6 md:p-8">
                            <div className="flex justify-between items-center mb-8">
                                <div>
                                    <h3 className="text-xl font-bold font-heading mb-1 text-foreground">Today's Focus</h3>
                                    <div className="w-32 h-2 bg-muted rounded-full"></div>
                                </div>
                                <div className="w-12 h-12 rounded-full border-4 border-indigo-500 flex items-center justify-center text-sm font-bold text-indigo-500">85%</div>
                            </div>

                            <div className="space-y-4">
                                {[
                                    { name: 'Meditate', icon: '🧘‍♀️', color: 'bg-purple-500', done: true },
                                    { name: 'Read 20 pages', icon: '📚', color: 'bg-blue-500', done: true },
                                    { name: 'Workout', icon: '🏃‍♂️', color: 'bg-green-500', done: false },
                                    { name: 'Journal', icon: '✍️', color: 'bg-orange-500', done: false },
                                ].map((habit, i) => (
                                    <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-background border border-border">
                                        <div className={`w-10 h-10 rounded-lg ${habit.color} flex items-center justify-center text-xl shadow-inner`}>
                                            {habit.icon}
                                        </div>
                                        <div className="flex-1 font-medium text-foreground">{habit.name}</div>
                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${habit.done ? 'bg-indigo-500 border-indigo-500' : 'border-muted-foreground'}`}>
                                            {habit.done && <CheckCircle2 className="w-4 h-4 text-white" />}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Floating Accents */}
                    <div className="absolute -top-12 -right-8 z-30 bg-white/90 dark:bg-zinc-900/90 backdrop-blur border border-border rounded-xl p-4 shadow-xl animate-[float_3.5s_ease-in-out_infinite_0.5s]">
                        <div className="flex items-center gap-3">
                            <div className="text-xl">🔥</div>
                            <div>
                                <div className="text-sm font-bold text-foreground">14 Day Streak!</div>
                                <div className="text-xs text-muted-foreground">Keep it up!</div>
                            </div>
                        </div>
                    </div>

                    <div className="absolute -bottom-8 -left-8 z-30 bg-white/90 dark:bg-zinc-900/90 backdrop-blur border border-border rounded-xl p-4 shadow-xl animate-[float_4.2s_ease-in-out_infinite_1s]">
                        <div className="flex items-center gap-3 space-x-2">
                            <Sparkles className="text-pink-500 w-5 h-5" />
                            <div>
                                <div className="text-sm font-bold text-foreground text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">AI Insight</div>
                                <div className="text-xs text-muted-foreground">You sleep better after reading.</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Down Indicator */}
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
