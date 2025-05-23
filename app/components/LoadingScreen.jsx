"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
    const [progress, setProgress] = useState(0);
    const [showLogo, setShowLogo] = useState(false);
    const [textVisible, setTextVisible] = useState(false);
    
    useEffect(() => {
        const logoTimer = setTimeout(() => {
            setShowLogo(true);
        }, 200);

        const textTimer = setTimeout(() => {
            setTextVisible(true);
        }, 800);
        
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 2;
            });
        }, 50);
        
        return () => {
            clearInterval(interval);
            clearTimeout(logoTimer);
            clearTimeout(textTimer);
        };
    }, []);
    
    return (
        <div className="fixed inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#1A1A1A] to-[#000000] z-[9999] flex items-center justify-center overflow-hidden">



            <div className="text-center z-10 relative">
                <div className={`relative w-32 h-32 mx-auto mb-8 transition-all duration-1000 ease-out ${showLogo ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                    <div className="absolute inset-0 bg-[#B2FF00]/20 rounded-full blur-xl animate-pulse"></div>
                    <div className="relative w-full h-full bg-[#B2FF00]/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-[#B2FF00]/30">
                        <Image
                            src="/assets/AurigitalChat2.svg"
                            alt="Aurigital Logo"
                            width={60}
                            height={60}
                            className="z-10 "
                            priority
                        />
                    </div>
                </div>

                <div className={`mb-8 transition-all duration-1000 ease-out ${textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <h1 className="text-3xl md:text-4xl font-qurova font-medium text-white mb-2 tracking-wider">
                        AURIGITAL
                    </h1>
                </div>

                <div className={`w-80 mx-auto transition-all duration-1000 ease-out ${textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <div className="relative">
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                            <div 
                                className="h-full bg-gradient-to-r from-[#B2FF00] to-[#7ACC00] rounded-full transition-all duration-300 ease-out relative"
                                style={{ width: `${progress}%` }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                            </div>
                        </div>
                        
                    </div>
                </div>

                <div className={`flex justify-center space-x-2 mt-6 transition-all duration-1000 ease-out ${textVisible ? 'opacity-100' : 'opacity-0'}`}>
                    {[0, 1, 2].map((dot) => (
                        <div
                            key={dot}
                            className="w-2 h-2 bg-[#B2FF00] rounded-full animate-bounce"
                            style={{
                                animationDelay: `${dot * 0.3}s`,
                                animationDuration: '1.5s'
                            }}
                        ></div>
                    ))}
                </div>
            </div>

        </div>
    );
}