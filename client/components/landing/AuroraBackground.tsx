import { useEffect, useState } from 'react';

interface Point {
    x: number;
    y: number;
    vx: number;
    vy: number;
}

export function AuroraBackground({ className = '' }: { className?: string }) {
    const [points, setPoints] = useState<Point[]>([]);

    useEffect(() => {
        // Generate 4 randomized control points for the blobs
        const initialPoints = Array.from({ length: 4 }).map(() => ({
            x: Math.random() * 100,
            y: Math.random() * 100,
            vx: (Math.random() - 0.5) * 0.2, // Velocity X
            vy: (Math.random() - 0.5) * 0.2, // Velocity Y
        }));

        setPoints(initialPoints);

        let animationFrameId: number;
        let currentPoints = [...initialPoints];

        const animate = () => {
            currentPoints = currentPoints.map(p => {
                let newX = p.x + p.vx;
                let newY = p.y + p.vy;

                // Bounce off walls
                if (newX <= 0 || newX >= 100) p.vx *= -1;
                if (newY <= 0 || newY >= 100) p.vy *= -1;

                // Clamp values to keep them in view
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
            {/* Base Background */}
            <div className="absolute inset-0 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-500" />

            {/* Animated Gradient Blobs */}
            <div className="absolute inset-0 opacity-40 dark:opacity-30 blur-[100px] saturate-150">
                <div
                    className="absolute w-3/4 h-3/4 bg-blue-400 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-screen transition-transform duration-100 ease-linear"
                    style={{ transform: `translate(${points[0].x}%, ${points[0].y}%) scale(1.2)` }}
                />
                <div
                    className="absolute w-2/3 h-2/3 bg-indigo-400 dark:bg-indigo-600 rounded-full mix-blend-multiply dark:mix-blend-screen transition-transform duration-100 ease-linear"
                    style={{ transform: `translate(${points[1].x}%, ${points[1].y}%) scale(1.1)` }}
                />
                <div
                    className="absolute w-3/5 h-3/5 bg-purple-400 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-screen transition-transform duration-100 ease-linear"
                    style={{ transform: `translate(${points[2].x}%, ${points[2].y}%) scale(1.3)` }}
                />
                <div
                    className="absolute w-1/2 h-1/2 bg-cyan-400 dark:bg-cyan-600 rounded-full mix-blend-multiply dark:mix-blend-screen transition-transform duration-100 ease-linear"
                    style={{ transform: `translate(${points[3].x}%, ${points[3].y}%) scale(1.4)` }}
                />
            </div>

            {/* Noise Texture Overlay */}
            <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
        </div>
    );
}
