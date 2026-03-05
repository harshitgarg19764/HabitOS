'use client';

import { useEffect, useState } from 'react';

export function AuroraBackground({ className = '' }) {
    const [points, setPoints] = useState([]);

    useEffect(() => {
        const initialPoints = Array.from({ length: 5 }).map(() => ({
            x: Math.random() * 100,
            y: Math.random() * 100,
            vx: (Math.random() - 0.5) * 0.15,
            vy: (Math.random() - 0.5) * 0.15,
        }));

        setPoints(initialPoints);

        let animationFrameId;
        let currentPoints = [...initialPoints];

        const animate = () => {
            currentPoints = currentPoints.map(p => {
                let newX = p.x + p.vx;
                let newY = p.y + p.vy;

                if (newX <= 0 || newX >= 100) p.vx *= -1;
                if (newY <= 0 || newY >= 100) p.vy *= -1;

                newX = Math.max(0, Math.min(100, newX));
                newY = Math.max(0, Math.min(100, newY));

                return { ...p, x: newX, y: newY };
            });

            setPoints(currentPoints);
            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    if (points.length === 0) return null;

    return (
        <div className={`absolute inset-0 overflow-hidden -z-10 ${className}`}>
            <div className="absolute inset-0 bg-[#faf9f7] dark:bg-[#0a0a10] transition-colors duration-500" />

            <div className="absolute inset-0 opacity-50 dark:opacity-35 blur-[120px] saturate-[1.8]">
                <div
                    className="absolute w-[70%] h-[70%] bg-gradient-to-br from-blue-400 to-cyan-300 dark:from-blue-600 dark:to-cyan-500 rounded-full mix-blend-multiply dark:mix-blend-screen transition-transform duration-100 ease-linear"
                    style={{ transform: `translate(${points[0].x}%, ${points[0].y}%) scale(1.2)` }}
                />
                <div
                    className="absolute w-[60%] h-[60%] bg-gradient-to-br from-indigo-400 to-violet-400 dark:from-indigo-600 dark:to-violet-500 rounded-full mix-blend-multiply dark:mix-blend-screen transition-transform duration-100 ease-linear"
                    style={{ transform: `translate(${points[1].x}%, ${points[1].y}%) scale(1.1)` }}
                />
                <div
                    className="absolute w-[55%] h-[55%] bg-gradient-to-br from-purple-400 to-fuchsia-400 dark:from-purple-600 dark:to-fuchsia-500 rounded-full mix-blend-multiply dark:mix-blend-screen transition-transform duration-100 ease-linear"
                    style={{ transform: `translate(${points[2].x}%, ${points[2].y}%) scale(1.3)` }}
                />
                <div
                    className="absolute w-[50%] h-[50%] bg-gradient-to-br from-pink-300 to-rose-400 dark:from-pink-500 dark:to-rose-600 rounded-full mix-blend-multiply dark:mix-blend-screen transition-transform duration-100 ease-linear"
                    style={{ transform: `translate(${points[3].x}%, ${points[3].y}%) scale(1.15)` }}
                />
                <div
                    className="absolute w-[45%] h-[45%] bg-gradient-to-br from-amber-200 to-orange-300 dark:from-amber-500 dark:to-orange-500 rounded-full mix-blend-multiply dark:mix-blend-screen transition-transform duration-100 ease-linear"
                    style={{ transform: `translate(${points[4].x}%, ${points[4].y}%) scale(1.0)` }}
                />
            </div>

            {/* Subtle noise texture overlay */}
            <div className="absolute inset-0 opacity-[0.12] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
        </div>
    );
}
