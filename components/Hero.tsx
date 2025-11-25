
import React, { useState } from 'react';
import { SyncedProfileData } from '../types';
import { LearnMoreModal } from './LearnMoreModal';

interface HeroProps {
  profile: SyncedProfileData;
}

export const Hero: React.FC<HeroProps> = ({ profile }) => {
  const [isWarping, setIsWarping] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLearnMore = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWarping(true);

    // After warp animation starts, open the modal
    setTimeout(() => {
        setIsModalOpen(true);
    }, 600);

    // Reset warp effect after modal is fully open/transitioned
    setTimeout(() => {
        setIsWarping(false);
    }, 1500);
  };

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden pt-20">
      
      {/* Styles for Warp Animation */}
      <style>{`
          @keyframes warp-streak {
              0% { transform: translateX(0) scaleX(0.1); opacity: 0; }
              15% { opacity: 1; }
              100% { transform: translateX(80vw) scaleX(5); opacity: 0; }
          }
          .animate-warp {
              animation: warp-streak 0.8s cubic-bezier(0.6, 0, 0.2, 1) forwards;
          }
      `}</style>

      {/* Cinematic Warp Overlay */}
      {isWarping && (
          <div className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center overflow-hidden">
              {/* Darken Backdrop */}
              <div className="absolute inset-0 bg-black/90 animate-fade-in duration-300"></div>
              
              {/* Radiating Light Lines */}
              <div className="absolute inset-0 flex items-center justify-center">
                  {[...Array(24)].map((_, i) => (
                      <div 
                        key={i}
                        className="absolute h-[2px] w-1/2 left-1/2 top-1/2 origin-left"
                        style={{
                            transform: `rotate(${i * 15}deg)`,
                        }}
                      >
                          <div 
                            className="w-full h-full bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-warp"
                            style={{ animationDelay: `${Math.random() * 0.2}s` }}
                          ></div>
                      </div>
                  ))}
              </div>
              
              {/* Central Flash / Singularity */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_100px_60px_rgba(255,255,255,0.5)] animate-ping" style={{ animationDuration: '0.6s' }}></div>
              <div className="absolute top-[60%] left-1/2 -translate-x-1/2 text-blue-400 font-mono text-xs tracking-[1em] opacity-80 animate-pulse">
                  ACCESSING_HUB
              </div>
          </div>
      )}

      {/* Learn More Modal */}
      <LearnMoreModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[120px] -z-10 animate-pulse-slow"></div>

      {/* Main Content - Scales up/blurs during warp */}
      <div className={`text-center z-10 flex flex-col items-center max-w-3xl px-6 transition-all duration-700 ease-in-out ${isWarping ? 'scale-150 opacity-0 blur-md' : 'scale-100 opacity-100 blur-0'}`}>
        
      {/* Profile Picture Container */}
      <div className="mb-12 w-40 h-40 md:w-48 md:h-48 relative group animate-fade-in-up">
      <div className="absolute inset-0 bg-white/5 rounded-[2.5rem] rotate-6 transition-transform duration-500 group-hover:rotate-12"></div>
      <div className="absolute inset-0 bg-[#1d1d1f] rounded-[2.5rem] border border-white/10 flex items-center justify-center overflow-hidden shadow-2xl backdrop-blur-sm">
      <img 
        src="/1111.png" 
        alt="Portrait of Marco Bautista" 
        loading="eager"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
        onError={(e) => {
            e.currentTarget.style.display = 'none';
        }}
      />
      </div>
      </div>

        {/* Dynamic Sync Badge */}
        {profile.lastSynced && (
          <div className="animate-fade-in mb-6 inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-[10px] uppercase tracking-widest text-neutral-400">Synced with LinkedIn</span>
          </div>
        )}

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          {profile.name}
        </h1>
        
        <div className="animate-fade-in-up" style={{animationDelay: '0.15s'}}>
          {profile.company && (
            <p className="text-lg md:text-xl text-blue-500 font-medium mb-2">
              {profile.title} at {profile.company}
            </p>
          )}
          {!profile.company && (
             <p className="text-lg md:text-xl text-blue-500 font-medium mb-2">
             {profile.title}
           </p>
          )}
        </div>

        <p className="text-xl md:text-2xl text-neutral-400 font-light max-w-2xl leading-relaxed animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          {profile.tagline}
        </p>
        
        <div className="mt-12 animate-fade-in-up flex gap-4" style={{animationDelay: '0.3s'}}>
             <a href="#work" className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-neutral-200 transition-colors">
            View Work
          </a>
             <button 
                onClick={handleLearnMore}
                className="group relative px-8 py-3 rounded-full font-medium text-white border border-white/20 hover:border-white transition-all duration-300 overflow-hidden"
             >
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="relative z-10 group-hover:tracking-wider transition-all duration-300">Learn More</span>
          </button>
        </div>
      </div>
    </section>
  );
};
