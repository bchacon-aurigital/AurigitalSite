"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
    const [progress, setProgress] = useState(0);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 1;
            });
        }, 30);
        
        return () => clearInterval(interval);
    }, []);
    
    return (
        <div className="fixed inset-0 bg-[#2B4A55] z-[9999] flex items-center justify-center">
            <div className="text-center">
                <div className="relative w-40 h-40 mx-auto mb-4">
                    <div className="absolute inset-0 flex items-center justify-center">
                    </div>
                    <Image
                        src="/assets/logo.svg"
                        alt="Swissol Logo"
                        fill
                        className="z-10 w-10 h-0"
                        priority
                    />
                </div>

                <div className="w-64 h-3 bg-gray-700/50 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-gradient-to-r from-[#fbbf08] to-[#FFA90B] rounded-full"
                        style={{ width: `${progress}%`, transition: 'width 0.3s ease' }}
                    />
                </div>
                
                <div className="mt-4 text-white font-medium">
                    <span className="text-[#fbbf08]">{progress}%</span> Cargando...
                </div>
            </div>
        </div>
    );
}