
import React, { useState, useEffect } from 'react';

export const IntroSequence: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [isExiting, setIsExiting] = useState(false);
  const [accessGranted, setAccessGranted] = useState(false);

  useEffect(() => {
    // Prevent scrolling during intro
    document.body.style.overflow = 'hidden';

    // Simulate boot progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // Random increments for realism
        return Math.min(prev + Math.random() * 8, 100);
      });
    }, 150);

    // Terminal boot sequence
    const lines = [
      "INITIALIZING SECURE KERNEL...",
      "LOADING NEURAL INTERFACES...",
      "DECRYPTING BIOMETRIC DATA...",
      "ALLOCATING MEMORY BLOCKS...",
      "CONNECTING TO SATELLITE UPLINK [SAT-04]...",
      "BYPASSING FIREWALL...",
      "SYNCING PROJECT DATABASES...",
      "OPTIMIZING GRAPHICS DRIVERS...",
      "SYSTEM CHECK: OK",
    ];

    let lineIndex = 0;
    const lineInterval = setInterval(() => {
      if (lineIndex < lines.length) {
        setBootLines(prev => [...prev.slice(-6), lines[lineIndex]]);
        lineIndex++;
      } else {
        clearInterval(lineInterval);
        
        // Sequence completion logic
        setTimeout(() => {
            setAccessGranted(true);
            setTimeout(() => {
                setIsExiting(true);
                setTimeout(() => {
                    document.body.style.overflow = 'auto';
                    onComplete();
                }, 1000);
            }, 1800);
        }, 500);
      }
    }, 300);

    return () => {
      clearInterval(progressInterval);
      clearInterval(lineInterval);
      document.body.style.overflow = 'auto';
    };
  }, [onComplete]);

  if (isExiting) {
      // Return a fading out overlay or null depending on preference. 
      // Keeping it mounted but invisible allows for CSS transition.
  }

  return (
    <div className={`fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center font-mono overflow-hidden transition-all duration-1000 ease-in-out ${isExiting ? 'opacity-0 scale-105 pointer-events-none blur-sm' : 'opacity-100'}`}>
        
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[length:30px_30px] opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80"></div>
        
        {/* Scanline */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent h-[10%] w-full animate-[scan_3s_linear_infinite] opacity-30"></div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center w-full max-w-lg px-6">
            
            {/* Logo Container with Glitch Effect */}
            <div className="relative mb-12 group">
                 <div className="absolute inset-0 bg-cyan-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
                 {/* Ring Animation */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-cyan-500/30 rounded-full animate-[spin_s_linear_infinite]"></div>
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-dashed border-cyan-500/20 rounded-full animate-[spin_3s_linear_infinite_reverse]"></div>
            </div>

            {/* Access Granted Message */}
            {accessGranted ? (
                <div className="text-center animate-fade-in-up">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tighter drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
                        ACCESS GRANTED
                    </h2>
                    <p className="text-cyan-400 text-sm tracking-[0.3em] uppercase animate-pulse">
                        Bienviendo, Pendejo
                    </p>
                </div>
            ) : (
                <div className="w-full space-y-6">
                     {/* Terminal Lines */}
                     <div className="h-32 flex flex-col justify-end space-y-1 text-xs md:text-sm">
                         {bootLines.map((line, i) => (
                             <div key={i} className="flex items-center space-x-2 text-cyan-500/80">
                                 <span className="text-cyan-800">{`>`}</span>
                                 <span>{line}</span>
                             </div>
                         ))}
                     </div>

                     {/* Progress Bar */}
                     <div className="w-full">
                         <div className="flex justify-between text-[10px] text-cyan-600 mb-1 uppercase tracking-widest">
                             <span>System Loading</span>
                             <span>{Math.round(progress)}%</span>
                         </div>
                         <div className="h-1 w-full bg-cyan-900/30 rounded-full overflow-hidden">
                             <div 
                                className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)] transition-all duration-200 ease-out"
                                style={{ width: `${progress}%` }}
                             ></div>
                         </div>
                     </div>
                </div>
            )}

        </div>

        <style>{`
            @keyframes scan {
                0% { transform: translateY(-100%); }
                100% { transform: translateY(1000%); }
            }
        `}</style>
    </div>
  );
};
