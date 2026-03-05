'use client';

import { motion } from 'framer-motion';
import { ScrollReveal } from '../animations/ScrollReveal';
import { Star } from 'lucide-react';

export function SocialProofSection() {
    return (
        <section className="py-24 md:py-32 bg-background relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 bg-indigo-50/50 dark:bg-indigo-900/10 pointer-events-none"></div>

            <div className="container mx-auto px-4 md:px-12 relative z-10">
                <div className="max-w-6xl mx-auto">

                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                        <ScrollReveal direction="right" className="order-2 lg:order-1 relative perspective-1000">
                            {/* Decorative Frame */}
                            <div className="relative rounded-[2.5rem] overflow-hidden border border-white/40 dark:border-white/10 shadow-2xl shadow-indigo-500/20 transform-gpu rotate-y-[3deg] rotate-x-[2deg] hover:rotate-0 transition-transform duration-700">
                                <img
                                    src="/images/landing/people-celebrating.png"
                                    alt="Community celebrating achievements"
                                    className="w-full h-auto max-h-[500px] object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                                {/* Floating Trust Badge */}
                                <motion.div
                                    className="absolute bottom-6 left-6 md:bottom-8 md:left-8 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl p-4 md:p-5 rounded-2xl border border-black/5 dark:border-white/10 shadow-xl"
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <div className="flex gap-1 mb-2">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <Star key={s} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                    <div className="text-sm font-bold text-foreground">Rated 4.9/5 on App Store</div>
                                    <div className="text-xs text-muted-foreground mt-0.5">Based on 10,000+ reviews</div>
                                </motion.div>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal direction="left" delay={0.2} className="order-1 lg:order-2">
                            <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-foreground mb-6 leading-tight">
                                Join 50K+ people who <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">upgraded their life.</span>
                            </h2>
                            <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">
                                Our community consists of ambitious professionals, athletes, students, and everyday people who refuse to settle for average. Built for those who want more.
                            </p>

                            <div className="grid grid-cols-2 gap-6 md:gap-10">
                                <div>
                                    <div className="text-4xl md:text-5xl font-extrabold font-heading text-foreground mb-2">2M+</div>
                                    <div className="text-sm md:text-base font-semibold text-muted-foreground uppercase tracking-wider">Habits Tracked</div>
                                </div>
                                <div>
                                    <div className="text-4xl md:text-5xl font-extrabold font-heading text-foreground mb-2">87%</div>
                                    <div className="text-sm md:text-base font-semibold text-muted-foreground uppercase tracking-wider">Success Rate*</div>
                                </div>
                                <div>
                                    <div className="text-4xl md:text-5xl font-extrabold font-heading text-foreground mb-2">142</div>
                                    <div className="text-sm md:text-base font-semibold text-muted-foreground uppercase tracking-wider">Countries</div>
                                </div>
                                <div>
                                    <div className="text-4xl md:text-5xl font-extrabold font-heading text-foreground mb-2">4.9</div>
                                    <div className="text-sm md:text-base font-semibold text-muted-foreground uppercase tracking-wider">User Rating</div>
                                </div>
                            </div>

                            <p className="text-xs text-muted-foreground/60 mt-8">*Users maintaining a streak of 30 days or more compared to other apps.</p>
                        </ScrollReveal>

                    </div>
                </div>
            </div>
        </section>
    );
}
