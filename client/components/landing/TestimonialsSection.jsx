'use client';

import { motion } from 'framer-motion';
import { ScrollReveal } from '../animations/ScrollReveal';

const testimonials = [
    {
        name: "Sarah Jenkins",
        role: "Product Manager",
        avatar: "SJ",
        quote: "HabitOS completely changed how I organize my days. The AI insights alone have made me 2x more productive.",
        rating: 5,
        gradient: "from-blue-500 to-cyan-500"
    },
    {
        name: "David Chen",
        role: "Freelance Designer",
        avatar: "DC",
        quote: "The animations and the feel of this app make me actually want to log my habits. Simply beautiful.",
        rating: 5,
        gradient: "from-purple-500 to-violet-500"
    },
    {
        name: "Elena Rodriguez",
        role: "Software Engineer",
        avatar: "ER",
        quote: "I've tried 10 different habit trackers. This is the only one that stuck. The streak protection feature is genius.",
        rating: 5,
        gradient: "from-pink-500 to-rose-500"
    },
    {
        name: "Marcus Thorne",
        role: "Fitness Coach",
        avatar: "MT",
        quote: "I recommend HabitOS to all my clients now. Seeing the heatmap build up over months is incredibly motivating.",
        rating: 5,
        gradient: "from-emerald-500 to-teal-500"
    },
    {
        name: "Jessica Wu",
        role: "Medical Student",
        avatar: "JW",
        quote: "A lifesaver for studying. It predicts my burnout days before they happen so I can rest. Worth every penny.",
        rating: 5,
        gradient: "from-orange-500 to-amber-500"
    }
];

// Duplicate array for infinite scroll effect
const doubleTestimonials = [...testimonials, ...testimonials];

export function TestimonialsSection() {
    return (
        <section id="testimonials" className="py-28 md:py-36 relative overflow-hidden bg-background">
            {/* Subtle warm gradient background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-50/30 dark:via-purple-950/10 to-transparent pointer-events-none"></div>

            <div className="container mx-auto px-4 md:px-12 relative z-10 mb-16">
                <ScrollReveal direction="up" className="text-center max-w-2xl mx-auto">
                    <h2 className="text-sm font-bold tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500 uppercase mb-5">
                        Wall of Love
                    </h2>
                    <h3 className="text-4xl md:text-6xl font-heading font-extrabold text-foreground mb-6 leading-tight">
                        Loved by <span className="gradient-text-warm">thousands.</span>
                    </h3>
                    <div className="mt-6 mx-auto w-24 h-1 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"></div>
                </ScrollReveal>
            </div>

            {/* Marquee Container */}
            <div className="relative w-full overflow-hidden flex flex-col gap-6 py-4">

                {/* Left/Right Fade Masks */}
                <div className="absolute top-0 bottom-0 left-0 w-24 md:w-48 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
                <div className="absolute top-0 bottom-0 right-0 w-24 md:w-48 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>

                {/* Animated Track */}
                <motion.div
                    className="flex gap-6 md:gap-8 w-max px-4"
                    animate={{
                        x: ['0%', '-50%']
                    }}
                    transition={{
                        ease: "linear",
                        duration: 40,
                        repeat: Infinity,
                    }}
                >
                    <div className="flex gap-6 md:gap-8 group">
                        {doubleTestimonials.map((t, i) => (
                            <div
                                key={i}
                                className="w-[320px] md:w-[400px] shrink-0 relative bg-white/70 dark:bg-white/[0.04] border border-black/5 dark:border-white/8 rounded-[1.75rem] p-7 md:p-8 shadow-xl shadow-black/[0.03] dark:shadow-none hover:-translate-y-2 transition-all duration-300 backdrop-blur-md overflow-hidden"
                            >
                                {/* Gradient left accent */}
                                <div className={`absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b ${t.gradient}`}></div>

                                <div className="flex gap-1 mb-6">
                                    {[...Array(t.rating)].map((_, idx) => (
                                        <svg key={idx} className="w-5 h-5 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>

                                <blockquote className="text-lg md:text-xl text-foreground font-medium leading-relaxed mb-8">
                                    &ldquo;{t.quote}&rdquo;
                                </blockquote>

                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white font-bold tracking-wider shadow-lg`}>
                                        {t.avatar}
                                    </div>
                                    <div>
                                        <div className="font-bold text-foreground">{t.name}</div>
                                        <div className="text-sm text-muted-foreground">{t.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            <style jsx>{`
                .w-max:hover {
                    animation-play-state: paused !important;
                }
            `}</style>
        </section>
    );
}
