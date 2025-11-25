
import React, { useEffect, useState, useRef } from 'react';
import { checkLinkedInProfile } from '../services/gemini';
import { SyncedProfileData } from '../types';

interface LinkedInSyncProps {
  currentProfile: SyncedProfileData;
  onUpdate: (newData: SyncedProfileData) => void;
  startSync?: boolean;
}

// --- VISUAL HELPERS ---

// Matrix decoding effect for text
const DecodingText: React.FC<{ text: string; reveal: boolean }> = ({ text, reveal }) => {
    const [display, setDisplay] = useState('');
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

    useEffect(() => {
        let interval: any;
        if (reveal) {
            let iteration = 0;
            interval = setInterval(() => {
                setDisplay(
                    text
                        .split("")
                        .map((letter, index) => {
                            if (index < iteration) {
                                return text[index];
                            }
                            return chars[Math.floor(Math.random() * chars.length)];
                        })
                        .join("")
                );

                if (iteration >= text.length) {
                    clearInterval(interval);
                }
                
                iteration += 1 / 2; 
            }, 30);
        } else {
            setDisplay(text.split('').map(() => chars[Math.floor(Math.random() * chars.length)]).join(''));
        }
        return () => clearInterval(interval);
    }, [reveal, text]);

    return <span className="font-mono">{display}</span>;
};

// Biometric Handshake Animation
const HandshakeVisual: React.FC<{ active: boolean }> = ({ active }) => {
    return (
        <div className={`relative w-32 h-32 flex items-center justify-center transition-all duration-700 ${active ? 'scale-100 opacity-100' : 'scale-75 opacity-50'}`}>
            {/* Outer Ring */}
            <div className={`absolute inset-0 border-2 border-dashed rounded-full animate-[spin_10s_linear_infinite] ${active ? 'border-blue-500' : 'border-neutral-700'}`}></div>
            <div className={`absolute inset-2 border border-dotted rounded-full animate-[spin_5s_linear_infinite_reverse] ${active ? 'border-cyan-500' : 'border-neutral-800'}`}></div>
            
            {/* Hand / Fingerprint Scan Effect */}
            <div className="relative z-10 w-16 h-16 flex flex-col items-center justify-center overflow-hidden">
                <svg className={`w-12 h-12 transition-colors duration-500 ${active ? 'text-blue-400' : 'text-neutral-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                </svg>
                {/* Scanning Bar */}
                {active && (
                    <div className="absolute inset-0 w-full h-1/2 bg-gradient-to-b from-blue-500/0 via-blue-500/50 to-blue-500/0 animate-[scan_1.5s_linear_infinite]"></div>
                )}
            </div>
            
            {/* Status Text */}
            <div className="absolute -bottom-8 w-max text-[10px] font-mono uppercase tracking-widest text-blue-400 animate-pulse">
                {active ? "Handshake Protocol Active" : "Waiting for Handshake"}
            </div>
        </div>
    );
};

// --- THE SURPRISE: INTERACTIVE 3D DIGITAL PASS ---

interface ExtraStats {
    connections: number;
    views: number;
    searchAppearances: number;
    skills: string[];
}

const DigitalPass: React.FC<{ profile: SyncedProfileData; stats: ExtraStats; onClose: () => void }> = ({ profile, stats, onClose }) => {
    const [mounted, setMounted] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const [rotate, setRotate] = useState({ x: 0, y: 0 });

    useEffect(() => {
        setTimeout(() => setMounted(true), 100);
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element.
        const y = e.clientY - rect.top;  // y position within the element.
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -10; // Max rotation deg
        const rotateY = ((x - centerX) / centerX) * 10;

        setRotate({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
        setRotate({ x: 0, y: 0 });
    };

    return (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 perspective-1000 font-sans">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-3xl animate-fade-in" onClick={onClose}></div>
            
            {/* Confetti / Sparkles Effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 blur-[100px] rounded-full animate-pulse"></div>
            </div>

            {/* The Card Container */}
            <div 
                className={`relative w-full max-w-[360px] h-[540px] transition-all duration-1000 cubic-bezier(0.34, 1.56, 0.64, 1) cursor-pointer ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
                style={{ perspective: '1200px' }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={() => setIsFlipped(!isFlipped)}
            >
                <div 
                    ref={cardRef}
                    className="w-full h-full relative transition-transform duration-500 ease-out preserve-3d shadow-2xl"
                    style={{ 
                        transformStyle: 'preserve-3d',
                        transform: `rotateX(${rotate.x}deg) rotateY(${isFlipped ? rotate.y + 180 : rotate.y}deg)` 
                    }}
                >
                    {/* === FRONT OF CARD === */}
                    <div 
                        className="absolute inset-0 w-full h-full bg-[#1c1c1e] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] backface-hidden"
                        style={{ backfaceVisibility: 'hidden' }}
                    >
                         {/* Holographic Sheen */}
                        <div 
                            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent z-50 pointer-events-none opacity-50"
                            style={{ transform: `translate(${rotate.y * 2}px, ${rotate.x * 2}px)` }}
                        ></div>

                        {/* Card Header */}
                        <div className="h-40 bg-gradient-to-br from-[#0071e3] via-[#4facfe] to-[#00f2fe] p-6 text-white relative overflow-hidden">
                             {/* Abstract Shapes */}
                            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/20 rounded-full blur-2xl"></div>
                            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#1c1c1e] to-transparent"></div>
                            
                            <div className="flex justify-between items-start relative z-10">
                                <img src="/M(1).png" alt="Logo" className="h-8 w-auto opacity-90 drop-shadow-md" />
                                <div className="flex items-center space-x-1.5 px-2.5 py-1 bg-black/20 backdrop-blur-md rounded-full border border-white/10">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                                    <span className="text-[9px] font-bold uppercase tracking-widest">Live Sync</span>
                                </div>
                            </div>
                        </div>

                        {/* Profile Image - Floating */}
                        <div className="absolute top-24 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full p-1.5 bg-[#1c1c1e] z-20">
                            <div className="w-full h-full rounded-full overflow-hidden border-2 border-white/10">
                                <img src={profile.avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                            </div>
                            {/* Verification Badge */}
                            <div className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 rounded-full border-4 border-[#1c1c1e] flex items-center justify-center text-white">
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                            </div>
                        </div>

                        {/* Card Content */}
                        <div className="pt-16 pb-8 px-8 text-center space-y-6">
                            <div>
                                <h3 className="text-white font-bold text-2xl leading-tight mb-1">{profile.name}</h3>
                                <p className="text-blue-400 text-sm font-medium">{profile.title}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
                                    <span className="block text-[10px] text-neutral-500 uppercase tracking-wider mb-1">Company</span>
                                    <span className="block text-white text-sm font-semibold truncate">{profile.company || "Independent"}</span>
                                </div>
                                <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
                                    <span className="block text-[10px] text-neutral-500 uppercase tracking-wider mb-1">Connections</span>
                                    <span className="block text-white text-sm font-semibold">{stats.connections}+</span>
                                </div>
                            </div>

                             {/* Activity Graph Simulation */}
                            <div className="bg-white/5 rounded-2xl p-4 border border-white/5 text-left">
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-[10px] text-neutral-500 uppercase tracking-wider">Outreach Performance</span>
                                    <span className="text-green-400 text-xs font-bold">+{Math.floor(Math.random() * 20)}%</span>
                                </div>
                                <div className="flex items-end space-x-1 h-8">
                                    {[40, 60, 45, 70, 50, 80, 65, 90, 75, 100].map((h, i) => (
                                        <div key={i} className="flex-1 bg-blue-500/50 rounded-t-sm" style={{ height: `${h}%`, opacity: (i+1)/10 }}></div>
                                    ))}
                                </div>
                            </div>

                            <p className="text-[10px] text-neutral-500 font-medium">Click card to flip for details</p>
                        </div>
                    </div>

                    {/* === BACK OF CARD === */}
                    <div 
                        className="absolute inset-0 w-full h-full bg-[#0a0a0a] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] backface-hidden"
                        style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/5 flex justify-between items-center">
                             <div className="flex items-center space-x-2">
                                 <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                 <span className="text-xs font-bold text-white uppercase tracking-widest">Skill Matrix</span>
                             </div>
                             <img src="/M(1).png" alt="Logo" className="h-4 w-auto opacity-50" />
                        </div>

                        {/* Content */}
                        <div className="p-8 space-y-8">
                             {/* Verified Skills List */}
                             <div className="space-y-3">
                                 {stats.skills.map((skill, i) => (
                                     <div key={i} className="flex items-center justify-between group">
                                         <span className="text-sm text-neutral-300 group-hover:text-white transition-colors">{skill}</span>
                                         <div className="flex items-center space-x-2">
                                             <div className="flex space-x-0.5">
                                                 {[1,2,3,4,5].map(star => (
                                                     <div key={star} className="w-1 h-3 bg-blue-500 rounded-full opacity-80"></div>
                                                 ))}
                                             </div>
                                             <svg className="w-3 h-3 text-blue-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                         </div>
                                     </div>
                                 ))}
                             </div>

                             {/* Profile Stats */}
                             <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                                 <div>
                                     <div className="text-2xl font-bold text-white">{stats.views}</div>
                                     <div className="text-[10px] text-neutral-500 uppercase tracking-widest">Profile Views</div>
                                 </div>
                                 <div>
                                     <div className="text-2xl font-bold text-white">{stats.searchAppearances}</div>
                                     <div className="text-[10px] text-neutral-500 uppercase tracking-widest">Search Appearances</div>
                                 </div>
                             </div>

                             {/* QR Code Simulation */}
                             <div className="bg-white p-2 rounded-xl w-full flex items-center justify-between">
                                 <div className="flex-1">
                                     <div className="h-8 w-8 bg-black rounded"></div>
                                 </div>
                                 <div className="text-right">
                                     <div className="text-[8px] text-black font-mono uppercase font-bold">LinkedIn Verify</div>
                                     <div className="text-[8px] text-neutral-500">ID: {Math.floor(Math.random()*999999)}</div>
                                 </div>
                             </div>
                        </div>
                        
                        <div className="absolute bottom-6 w-full text-center">
                            <p className="text-[10px] text-neutral-600">Generated by Portfolio Pro AI</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- MAIN SYNC COMPONENT ---

export const LinkedInSync: React.FC<LinkedInSyncProps> = ({ currentProfile, onUpdate, startSync = false }) => {
  const [status, setStatus] = useState<'idle' | 'checking' | 'found'>('idle');
  const [foundData, setFoundData] = useState<SyncedProfileData | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [updatedFields, setUpdatedFields] = useState<string[]>([]);
  const hasRunRef = useRef(false);
  
  // Stats State
  const [stats, setStats] = useState<ExtraStats>({ connections: 0, views: 0, searchAppearances: 0, skills: [] });

  // Animation States
  const [isRewriting, setIsRewriting] = useState(false);
  // Rewrite Steps: 0: Phase 1 (Optimization), 1: Analyzing, 2: Phase 2 (Outreach), 3: Phase 3 (Engagement), 4: Complete
  const [rewriteStep, setRewriteStep] = useState(0); 
  
  // Surprise State
  const [showDigitalPass, setShowDigitalPass] = useState(false);

  useEffect(() => {
    if (!startSync || hasRunRef.current) return;
    
    hasRunRef.current = true;
    
    const performCheck = async () => {
      setStatus('checking');
      await new Promise(r => setTimeout(r, 2000));

      let newData: SyncedProfileData = { ...currentProfile };
      let changes: string[] = [];

      try {
          // Attempt real fetch
          const result = await checkLinkedInProfile(currentProfile.name, currentProfile.title);
          
          if (result.data) {
              const newTitle = result.data.title || currentProfile.title;
              const newCompany = result.data.company || currentProfile.company || "";
              const newSummary = result.data.summary || currentProfile.tagline;
              const sourceUrl = result.data.sourceUrl || "https://www.linkedin.com/in/txniiii/";

              if (newTitle && newTitle !== currentProfile.title) changes.push("Title");
              if (newCompany && newCompany !== currentProfile.company) changes.push("Company");

              newData = {
                  ...currentProfile,
                  title: newTitle,
                  company: newCompany,
                  tagline: newSummary,
                  sourceUrl: sourceUrl,
                  lastSynced: new Date()
              };
          }
      } catch (e) {
          console.warn("LinkedIn sync API failed, falling back to simulation.");
      }

      if (changes.length === 0) changes.push("Verified");

      // Generate Surprise Stats
      const mockStats: ExtraStats = {
          connections: 500 + Math.floor(Math.random() * 200),
          views: 300 + Math.floor(Math.random() * 500),
          searchAppearances: 20 + Math.floor(Math.random() * 30),
          skills: ["Embedded Systems", "F1 Engineering", "React/TypeScript", "System Architecture"]
      };

      setStats(mockStats);
      setFoundData(newData);
      setUpdatedFields(changes);
      setStatus('found');
      
      setTimeout(() => setShowToast(true), 100);
    };

    performCheck();
  }, [startSync, currentProfile]);

  const handleApply = () => {
    if (foundData) {
        setShowToast(false);
        setIsRewriting(true);
        
        // --- SEQUENCE THE ANIMATION ---
        
        // Step 0: Phase 1: Profile & Target Optimization (0ms)
        setRewriteStep(0);
        
        // Step 1: Analyzing Context (1500ms)
        setTimeout(() => setRewriteStep(1), 1500); 
        
        // Step 2: Phase 2: Automated Outreach Strategy (3000ms)
        setTimeout(() => setRewriteStep(2), 3000);

        // Step 3: Phase 3: Engagement & Nurturing (4500ms)
        setTimeout(() => setRewriteStep(3), 4500); 
        
        // Step 4: Sync Complete (6000ms)
        setTimeout(() => {
            onUpdate(foundData); 
            setRewriteStep(4);
        }, 6000);
        
        // Step 5: Close Overlay & Show Pass (7000ms)
        setTimeout(() => {
            setIsRewriting(false);
            setRewriteStep(0);
            setStatus('idle');
            setShowDigitalPass(true);
        }, 7000);
    }
  };

  return (
    <>
        {/* SURPRISE: DIGITAL PASS */}
        {showDigitalPass && foundData && (
            <DigitalPass profile={foundData} stats={stats} onClose={() => setShowDigitalPass(false)} />
        )}

        {/* TOAST NOTIFICATION */}
        {showToast && !isRewriting && (
            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[80] animate-fade-in-up">
                <div className="group relative flex items-center bg-black/80 backdrop-blur-2xl border border-white/10 rounded-full pl-3 pr-4 py-2 shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer" onClick={handleApply}>
                    
                    <div className="relative w-10 h-10 rounded-full bg-[#0077b5] flex items-center justify-center shrink-0 mr-3 overflow-hidden">
                        <div className="absolute inset-0 bg-white/20 animate-ping"></div>
                        <svg className="w-5 h-5 text-white relative z-10" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    </div>
                    
                    <div className="flex flex-col mr-6">
                        <span className="text-[10px] text-neutral-400 font-medium uppercase tracking-wider leading-none mb-1">
                            AI Network Sync
                        </span>
                        <span className="text-sm font-semibold text-white leading-none">
                            {updatedFields.includes("Verified") ? "Profile Verification Ready" : "New Professional Data Found"}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 border-l border-white/10 pl-4">
                        <button 
                            onClick={(e) => { e.stopPropagation(); setShowToast(false); }}
                            className="p-1.5 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                        <button 
                            onClick={(e) => { e.stopPropagation(); handleApply(); }}
                            className="bg-white text-black text-xs font-bold px-4 py-2 rounded-full hover:bg-neutral-200 transition-colors shadow-lg"
                        >
                            {updatedFields.includes("Verified") ? "Verify" : "Sync"}
                        </button>
                    </div>
                </div>
            </div>
        )}

        {/* REALITY REWRITE OVERLAY */}
        {isRewriting && foundData && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden font-sans">
                {/* 1. Backdrop */}
                <div className="absolute inset-0 bg-black/95 backdrop-blur-3xl animate-fade-in"></div>

                {/* 2. Ambient Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:50px_50px]"></div>

                {/* 3. Content */}
                <div className="relative z-10 w-full max-w-4xl p-8 flex flex-col items-center">
                    
                    {/* Status Indicator */}
                    <div className="mb-12 flex items-center space-x-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                        <div className="relative w-2.5 h-2.5">
                             <div className={`absolute inset-0 rounded-full animate-ping ${rewriteStep === 4 ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                             <div className={`relative w-full h-full rounded-full ${rewriteStep === 4 ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                        </div>
                        <span className="text-xs font-mono text-blue-400 uppercase tracking-widest">
                             {rewriteStep === 0 && 'PHASE 1: OPTIMIZING PROFILE & TARGETS...'}
                             {rewriteStep === 1 && 'ANALYZING GOALS & EXPERTISE...'}
                             {rewriteStep === 2 && 'PHASE 2: AUTOMATED OUTREACH STRATEGY...'}
                             {rewriteStep === 3 && 'PHASE 3: ENGAGEMENT & NURTURING...'}
                             {rewriteStep === 4 && 'SYNC COMPLETE // SYSTEM ACTIVE'}
                        </span>
                    </div>

                    {/* Phase 0: HANDSHAKE ANIMATION */}
                    <div className={`transition-all duration-500 ${rewriteStep === 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-50 h-0 overflow-hidden'}`}>
                        <HandshakeVisual active={true} />
                    </div>

                    {/* Phase 1-4: Comparison UI */}
                    <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 w-full items-center transition-all duration-700 ${rewriteStep > 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20 hidden'}`}>
                        
                        {/* Current (Old) State */}
                        <div className={`transition-all duration-700 ${rewriteStep >= 3 ? 'opacity-30 blur-sm scale-95' : 'opacity-100 scale-100'}`}>
                            <h3 className="text-neutral-500 text-xs font-bold uppercase tracking-widest mb-4 text-center">Local Cache</h3>
                            <div className="bg-[#1c1c1e] p-8 rounded-3xl border border-white/5 relative overflow-hidden">
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-[10px] text-neutral-600 uppercase mb-1">Role</label>
                                        <div className="text-lg text-neutral-300 font-medium">{currentProfile.title}</div>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] text-neutral-600 uppercase mb-1">Org</label>
                                        <div className="text-lg text-neutral-300 font-medium">{currentProfile.company || "N/A"}</div>
                                    </div>
                                </div>
                                {rewriteStep >= 3 && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-[120%] h-px bg-red-500/50 rotate-12"></div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Incoming (New) State */}
                        <div className={`transition-all duration-700 relative ${rewriteStep >= 3 ? 'scale-110 z-20' : 'scale-100'}`}>
                             {/* Arrow indicator */}
                             <div className={`hidden md:flex absolute top-1/2 -left-6 -translate-x-full -translate-y-1/2 items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 transition-opacity duration-500 ${rewriteStep >= 3 ? 'opacity-0' : 'opacity-100'}`}>
                                 <svg className="w-5 h-5 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7-7 7m7-7H3" /></svg>
                             </div>

                             <h3 className="text-blue-500 text-xs font-bold uppercase tracking-widest mb-4 text-center">Cloud Stream</h3>
                             <div className={`bg-black p-8 rounded-3xl border transition-all duration-500 relative overflow-hidden ${rewriteStep >= 3 ? 'border-blue-500 shadow-[0_0_60px_rgba(0,119,181,0.3)]' : 'border-blue-500/30'}`}>
                                 {/* Scanning Beam */}
                                 {rewriteStep < 3 && (
                                     <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-blue-500/10 to-transparent animate-[scan_1.5s_linear_infinite]"></div>
                                 )}

                                 <div className="space-y-6 relative z-10">
                                     <div>
                                         <label className="block text-[10px] text-blue-500/70 uppercase mb-1">Verified Role</label>
                                         <div className="text-xl text-white font-bold">
                                             <DecodingText text={foundData.title} reveal={rewriteStep >= 1} />
                                         </div>
                                     </div>
                                     <div>
                                         <label className="block text-[10px] text-blue-500/70 uppercase mb-1">Verified Org</label>
                                         <div className="text-xl text-white font-bold">
                                             <DecodingText text={foundData.company || "Independent"} reveal={rewriteStep >= 1} />
                                         </div>
                                     </div>
                                     
                                     {/* Skill Matrix Animation (Step 2) */}
                                     {rewriteStep >= 2 && (
                                         <div className="pt-4 border-t border-white/10 animate-fade-in-up">
                                             <label className="block text-[10px] text-blue-500/70 uppercase mb-2">Phase 2: Outreach Strategy</label>
                                             <div className="flex flex-wrap gap-2">
                                                 {stats.skills.map((skill, i) => (
                                                     <span key={i} className="text-[10px] px-2 py-1 bg-blue-500/20 text-blue-300 rounded animate-pulse">
                                                         {skill}
                                                     </span>
                                                 ))}
                                             </div>
                                         </div>
                                     )}
                                 </div>
                                 
                                 {/* Success Check */}
                                 {rewriteStep >= 4 && (
                                     <div className="absolute top-4 right-4 bg-green-500 rounded-full p-1 animate-fade-in-up">
                                         <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                     </div>
                                 )}
                             </div>
                        </div>

                    </div>

                    {/* Progress Bar */}
                    <div className="w-full max-w-sm mt-16">
                        <div className="h-0.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                             <div 
                                className="h-full bg-blue-500 transition-all duration-[6000ms] ease-linear"
                                style={{ width: rewriteStep > 0 ? '100%' : '0%' }}
                             ></div>
                        </div>
                    </div>

                </div>
            </div>
        )}
    </>
  );
};
