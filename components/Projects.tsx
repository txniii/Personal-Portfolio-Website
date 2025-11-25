
import React, { useState, useMemo, useEffect } from 'react';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import { findProjectsForProfile } from '../services/gemini';
import { PROFILE } from '../constants';

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>(PROJECTS);
  const [isSyncing, setIsSyncing] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Modal State
  const [modalTab, setModalTab] = useState<'brief' | 'architecture' | 'data'>('brief');
  const [terminalText, setTerminalText] = useState('');

  // Dynamically derive categories from current projects
  const categories = useMemo(() => {
    const uniqueCats = Array.from(new Set(projects.map(p => p.category)));
    return ['All', ...uniqueCats];
  }, [projects]);

  // Filter projects based on selection
  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return projects;
    return projects.filter(p => p.category === activeCategory);
  }, [activeCategory, projects]);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setModalTab('brief');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    setTerminalText('');
  };

  const handleClose = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  const handleSyncProjects = async () => {
    setIsSyncing(true);
    // Simulate loading and fetching
    const newProjects = await findProjectsForProfile(PROFILE.name);
    if (newProjects.length > 0) {
        setProjects(prev => [...prev, ...newProjects]);
    }
    setIsSyncing(false);
  };

  // Typing effect for the modal description
  useEffect(() => {
    if (selectedProject && modalTab === 'brief') {
        const fullText = selectedProject.longDescription || selectedProject.description;
        setTerminalText(''); // Reset before typing
        
        let i = 0;
        const speed = 10; // ms per char
        const timer = setInterval(() => {
            if (i < fullText.length) {
                setTerminalText(prev => fullText.substring(0, i + 1));
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
        return () => clearInterval(timer);
    }
  }, [selectedProject, modalTab]);

  return (
    <section id="work" className="py-32 bg-neutral-900/30 relative">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
             <div className="space-y-6">
                 <h2 className="text-3xl font-semibold text-white tracking-tight">Selected Work.</h2>
                 
                 {/* Filter Pills */}
                 <div className="flex flex-wrap gap-2">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 border ${
                                activeCategory === cat
                                ? 'bg-white text-black border-white scale-105 shadow-lg'
                                : 'bg-transparent text-neutral-400 border-neutral-800 hover:border-neutral-600 hover:text-white'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                 </div>
             </div>

             <button 
                onClick={handleSyncProjects}
                disabled={isSyncing}
                className="text-xs font-medium text-neutral-500 hover:text-white transition-colors flex items-center space-x-2 group mb-1"
             >
                <span className={isSyncing ? "animate-spin" : "group-hover:rotate-180 transition-transform duration-500"}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>
                </span>
                <span>{isSyncing ? 'Discovering...' : 'Refresh from Network'}</span>
             </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              onClick={() => handleProjectClick(project)}
              className="group relative bg-[#1d1d1f] border border-white/5 rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-500 ease-out cursor-pointer hover:-translate-y-3 shadow-lg hover:shadow-2xl animate-fade-in"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                
                {/* Hover Overlay: Darkens image slightly for interaction feel and text legibility if needed */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 z-10"></div>
                
                {/* Subtle gradient for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 z-10 pointer-events-none"></div>
                
                {/* Quick category pill */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-full z-20">
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider">{project.category}</span>
                </div>
              </div>
              
              <div className="p-6 relative">
                <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-medium text-white group-hover:text-blue-400 transition-colors">{project.title}</h3>
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    </div>
                </div>
                <p className="text-neutral-400 text-sm leading-relaxed line-clamp-2">{project.description}</p>
                
                <div className="mt-4 flex flex-wrap gap-2">
                    {project.technologies?.slice(0, 3).map(tech => (
                        <span key={tech} className="text-[10px] text-neutral-500 border border-neutral-800 px-2 py-0.5 rounded">{tech}</span>
                    ))}
                </div>
              </div>
            </div>
          ))}
          {filteredProjects.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center py-20 text-neutral-500 animate-fade-in">
                  <p className="text-lg">No projects found in this category.</p>
              </div>
          )}
        </div>
      </div>

      {/* CLASSIFIED MODAL OVERLAY */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 font-mono">
            
            {/* Global Styles for this Modal */}
            <style>{`
                @keyframes scanline {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(100%); }
                }
                @keyframes cursor-blink {
                    0%, 100% { opacity: 0; }
                    50% { opacity: 1; }
                }
                .animate-scanline {
                    animation: scanline 2.5s linear infinite;
                }
                .animate-cursor {
                    animation: cursor-blink 1s step-end infinite;
                }
                .scif-bg {
                    background-color: #020405;
                    background-image: linear-gradient(rgba(6,182,212,0.03) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(6,182,212,0.03) 1px, transparent 1px);
                    background-size: 20px 20px;
                }
            `}</style>

            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/95 backdrop-blur-xl transition-opacity" 
                onClick={handleClose}
            >
                <div className="absolute inset-0 opacity-20 pointer-events-none bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[length:40px_40px]"></div>
            </div>

            {/* Modal Content */}
            <div className="relative w-full max-w-6xl bg-[#020405] rounded-lg overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.15)] border border-cyan-900/50 flex flex-col md:flex-row h-[90vh] animate-fade-in-up group">
                
                {/* CRT Scanline & Noise Effects */}
                <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden rounded-lg">
                     <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_2px,3px_100%] bg-repeat opacity-20"></div>
                     <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent h-[15%] w-full animate-scanline opacity-40"></div>
                </div>

                {/* Top Bar (SCIF Header) */}
                <div className="absolute top-0 left-0 right-0 h-12 bg-cyan-950/10 border-b border-cyan-500/20 flex justify-between items-center px-4 z-40">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2 text-cyan-500 text-[10px] tracking-[0.2em]">
                            <span className="w-1.5 h-1.5 bg-cyan-500 rounded-sm animate-pulse"></span>
                            <span>SECURE_LINK // ESTABLISHED</span>
                        </div>
                        <div className="hidden md:block h-4 w-px bg-cyan-500/20"></div>
                        <div className="hidden md:block text-cyan-700 text-[10px] tracking-widest">
                            CLEARANCE: TOP SECRET
                        </div>
                    </div>
                    <button 
                        onClick={handleClose}
                        className="group flex items-center space-x-2 text-cyan-500 hover:text-white hover:bg-cyan-900/30 px-3 py-1.5 rounded border border-cyan-500/20 hover:border-cyan-400 transition-all duration-300"
                    >
                        <span className="text-[10px] font-bold tracking-widest uppercase">Terminate</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>

                {/* Left: Visual Data Feed */}
                <div className="w-full md:w-1/3 h-64 md:h-auto bg-black relative border-r border-cyan-500/20 flex flex-col">
                    <div className="relative flex-1 overflow-hidden">
                        <img 
                            src={selectedProject.image} 
                            alt={selectedProject.title} 
                            className="w-full h-full object-cover opacity-60 filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700"
                        />
                        {/* HUD Overlay */}
                        <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none">
                             <div className="flex justify-between items-start">
                                 <div className="border border-cyan-500/30 p-1">
                                     <div className="w-2 h-2 bg-cyan-500/50"></div>
                                 </div>
                                 <div className="text-[8px] text-cyan-500 font-mono flex flex-col items-end">
                                     <span>CAM_04</span>
                                     <span>REC_ACTIVE</span>
                                 </div>
                             </div>
                             
                             {/* Crosshair */}
                             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 border border-cyan-500/20 rounded-full flex items-center justify-center">
                                 <div className="w-1 h-1 bg-cyan-500/50"></div>
                                 <div className="absolute top-0 bottom-0 w-px bg-cyan-500/20"></div>
                                 <div className="absolute left-0 right-0 h-px bg-cyan-500/20"></div>
                             </div>

                             <div className="flex justify-between items-end">
                                 <div className="text-[8px] text-cyan-400 font-mono">
                                     OBJ: {selectedProject.title.substring(0, 10).toUpperCase()}_
                                 </div>
                                 <div className="flex space-x-1">
                                     {[1,2,3,4].map(i => <div key={i} className="w-1 h-3 bg-cyan-500/40"></div>)}
                                 </div>
                             </div>
                        </div>
                    </div>
                    
                    {/* Stats Panel */}
                    <div className="h-1/3 bg-[#050a0c] border-t border-cyan-500/20 p-6 flex flex-col justify-center space-y-4">
                        <div>
                            <div className="text-[10px] text-cyan-700 uppercase tracking-widest mb-1">PROJECT_VECTOR</div>
                            <div className="text-lg text-cyan-100 font-bold tracking-tight">{selectedProject.category}</div>
                        </div>
                        
                        <div>
                             <div className="flex justify-between text-[10px] text-cyan-600 mb-1">
                                 <span>SYSTEM INTEGRITY</span>
                                 <span>98.4%</span>
                             </div>
                             <div className="w-full bg-cyan-900/20 h-1 rounded-full overflow-hidden">
                                 <div className="h-full bg-cyan-500 w-[98%] animate-pulse"></div>
                             </div>
                        </div>
                        
                        <div className="flex justify-between items-center text-[10px] font-mono text-cyan-600">
                             <span className="flex items-center gap-1">
                                 <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                 DEPLOYED
                             </span>
                             <span>ID: {selectedProject.id.padStart(4, '0')}</span>
                        </div>
                    </div>
                </div>

                {/* Right: Terminal Content */}
                <div className="w-full md:w-2/3 p-8 md:p-12 pt-20 overflow-y-auto custom-scrollbar bg-[#020405] scif-bg relative">
                    
                    <div className="mb-8 border-b border-cyan-500/20 pb-6">
                        <div className="flex items-center space-x-2 mb-2">
                            <span className="px-1.5 py-0.5 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-bold uppercase tracking-wider rounded-sm">
                                CLASSIFIED
                            </span>
                            <span className="text-cyan-700 text-[10px] tracking-widest">// EYES ONLY</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight uppercase font-mono leading-tight">
                            {selectedProject.title}
                        </h2>
                    </div>

                    {/* Tab Navigation */}
                    <div className="flex space-x-6 mb-8 border-b border-cyan-900/30">
                        <button 
                            onClick={() => setModalTab('brief')}
                            className={`pb-2 text-xs font-bold uppercase tracking-widest transition-colors ${modalTab === 'brief' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-cyan-800 hover:text-cyan-600'}`}
                        >
                            Mission Brief
                        </button>
                        <button 
                             onClick={() => setModalTab('architecture')}
                             className={`pb-2 text-xs font-bold uppercase tracking-widest transition-colors ${modalTab === 'architecture' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-cyan-800 hover:text-cyan-600'}`}
                        >
                             System Architecture
                        </button>
                        <button 
                             onClick={() => setModalTab('data')}
                             className={`pb-2 text-xs font-bold uppercase tracking-widest transition-colors ${modalTab === 'data' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-cyan-800 hover:text-cyan-600'}`}
                        >
                             Field Data
                        </button>
                    </div>

                    <div className="min-h-[250px]">
                        {modalTab === 'brief' && (
                             <div className="animate-fade-in">
                                 <h4 className="text-[10px] text-cyan-600 font-bold uppercase tracking-[0.2em] mb-4 flex items-center">
                                    <svg className="w-3 h-3 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    Overview
                                </h4>
                                <div className="bg-cyan-950/10 border border-cyan-500/10 p-6 rounded-sm mb-6">
                                    <p className="text-cyan-100/90 text-sm leading-relaxed font-mono whitespace-pre-wrap">
                                        {terminalText}
                                        <span className="inline-block w-2 h-4 bg-cyan-500 ml-1 align-middle animate-cursor"></span>
                                    </p>
                                </div>
                                <div className="flex gap-4">
                                     <a 
                                        href={selectedProject.link || "#"} 
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center px-6 py-3 bg-cyan-500/10 border border-cyan-500/40 text-cyan-400 text-xs font-bold uppercase tracking-wider hover:bg-cyan-500 hover:text-black transition-all duration-300"
                                     >
                                        Execute Launch
                                        <svg className="ml-2 w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                     </a>
                                </div>
                             </div>
                        )}

                        {modalTab === 'architecture' && (
                            <div className="animate-fade-in grid grid-cols-2 gap-4">
                                {selectedProject.technologies?.map((tech, i) => (
                                    <div key={tech} className="bg-black/40 border border-cyan-500/20 p-4 flex items-center justify-between group hover:border-cyan-500/50 transition-colors">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-1.5 h-1.5 bg-cyan-800 group-hover:bg-cyan-400 rounded-full transition-colors"></div>
                                            <span className="text-cyan-100 font-mono text-sm">{tech}</span>
                                        </div>
                                        <div className="text-[10px] text-cyan-700 font-bold">V.{1 + i}.0</div>
                                    </div>
                                ))}
                                {/* Mock visual for visualizer */}
                                <div className="col-span-2 mt-4 border border-cyan-500/20 h-24 relative overflow-hidden flex items-center justify-center bg-cyan-950/10">
                                    <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_49%,rgba(6,182,212,0.1)_50%,transparent_51%)] bg-[length:20px_100%]"></div>
                                    <span className="text-xs text-cyan-600 font-mono tracking-widest animate-pulse">GENERATING ARCHITECTURE GRAPH...</span>
                                </div>
                            </div>
                        )}

                        {modalTab === 'data' && (
                            <div className="animate-fade-in space-y-4">
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    <div className="bg-cyan-900/10 border border-cyan-500/20 p-4 text-center">
                                        <div className="text-[10px] text-cyan-600 uppercase tracking-wider mb-1">Performance</div>
                                        <div className="text-2xl font-bold text-white font-mono">98/100</div>
                                    </div>
                                    <div className="bg-cyan-900/10 border border-cyan-500/20 p-4 text-center">
                                        <div className="text-[10px] text-cyan-600 uppercase tracking-wider mb-1">Uptime</div>
                                        <div className="text-2xl font-bold text-white font-mono">99.9%</div>
                                    </div>
                                    <div className="bg-cyan-900/10 border border-cyan-500/20 p-4 text-center">
                                        <div className="text-[10px] text-cyan-600 uppercase tracking-wider mb-1">Latency</div>
                                        <div className="text-2xl font-bold text-white font-mono">&lt;50ms</div>
                                    </div>
                                </div>
                                
                                <div className="p-4 border border-cyan-500/20 bg-black/40">
                                    <h5 className="text-[10px] text-cyan-600 uppercase tracking-wider mb-4">Optimization Metrics</h5>
                                    {[
                                        { label: "Codebase Efficiency", val: 85 },
                                        { label: "Resource Usage", val: 42 },
                                        { label: "Security Compliance", val: 100 }
                                    ].map((m, i) => (
                                        <div key={i} className="mb-3 last:mb-0">
                                            <div className="flex justify-between text-xs text-cyan-300 mb-1 font-mono">
                                                <span>{m.label}</span>
                                                <span>{m.val}%</span>
                                            </div>
                                            <div className="h-1 bg-cyan-900/30 w-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-cyan-500" 
                                                    style={{ width: `${m.val}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mt-8 pt-6 border-t border-cyan-500/10 flex justify-between items-center">
                         <div className="text-[9px] text-cyan-800 font-mono">ENCRYPTION: AES-256-GCM</div>
                         <div className="text-[9px] text-cyan-800 font-mono">TIMESTAMP: {new Date().toISOString()}</div>
                    </div>
                </div>
            </div>
        </div>
      )}
    </section>
  );
};
