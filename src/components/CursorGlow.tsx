"use client";
import React, { useEffect, useState } from "react";

export default function CursorGlow() {
    const [pos, setPos] = useState({ x: -100, y: -100 });
    const [lagPos, setLagPos] = useState({ x: -100, y: -100 });
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        let animationFrameId: number;

        const handleMouseMove = (e: MouseEvent) => {
            setPos({ x: e.clientX, y: e.clientY });

            const target = e.target as HTMLElement | null;
            if (target) {
                const isHoveringInteractive = target.closest(
                    'a, button, input, select, textarea, [role="button"], .border, [class*="card"], [class*="rounded"]',
                );
                setIsVisible(!isHoveringInteractive);
            }
        };

        const render = () => {
            setLagPos((prev) => ({
                x: prev.x + (pos.x - prev.x) * 0.15,
                y: prev.y + (pos.y - prev.y) * 0.15,
            }));
            animationFrameId = requestAnimationFrame(render);
        };

        window.addEventListener("mousemove", handleMouseMove);
        animationFrameId = requestAnimationFrame(render);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [pos.x, pos.y]);

    return (
        <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block">
            {/* 1. Outer Smooth Follower Glow (Hides over cards/buttons) */}
            <div
                className={`absolute w-44 h-44 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl transition-opacity duration-300 ${
                    isVisible ? "opacity-40" : "opacity-0"
                }`}
                style={{
                    left: `${lagPos.x}px`,
                    top: `${lagPos.y}px`,
                    background:
                        "radial-gradient(circle, rgba(204, 255, 0, 0.4) 0%, rgba(204, 255, 0, 0) 70%)",
                }}
            />

            {/* 2. Inner Sharp Precision Pointer (Hides over cards/buttons) */}
            <div
                className={`absolute w-2.5 h-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ccff00] shadow-[0_0_10px_#ccff00] transition-opacity duration-300 ${
                    isVisible ? "opacity-100" : "opacity-0"
                }`}
                style={{
                    left: `${pos.x}px`,
                    top: `${pos.y}px`,
                }}
            />
        </div>
    );
}
