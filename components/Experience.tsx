
import React, { useState, useRef, useEffect } from 'react';
import { WORK_EXPERIENCE, LEADERSHIP_EXPERIENCE } from '../constants';
import { Experience as ExperienceType } from '../types';

// --- SUB-COMPONENTS ---

const MetricBadge: React.FC<{ label: string; value: string; delay: number }> = ({ label, value, delay }) => (
  <div 
    className="flex flex-col items-center justify-center p-3 bg-white/5 rounded-xl border border-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors animate-fade-in-up"
    style={{ animationDelay: `${delay}ms` }}
  >
    <span className="text-xl md:text-2xl font-bold text-white tracking-tight">{value}</span>
    <span className="text-[9px] uppercase tracking-widest text-neutral-500 font-medium">{label}</span>
  </div>
);

const CompanyLogo: React.FC<{ name: string; type: string; className?: string }> = ({ name, type, className }) => {
    // Generate a placeholder visual based on name if no image
    const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2);
    
    // Color mapping
    const colors: Record<string, string> = {
        'blk': 'bg-blue-600',
        'njit': 'bg-red-600',
        'shpe': 'bg-orange-500',
        'senate': 'bg-purple-600'
    };
    
    const bgClass = colors[type] || 'bg-neutral-700';

    return (
        <div className={`flex items-center justify-center text-white font-bold rounded-xl shadow-lg ${bgClass} ${className}`}>
            {initials}
        </div>
    );
};

const ExperienceCard: React.FC<{ exp: ExperienceType; index: number }> = ({ exp, index }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <div className="relative pl-8 md:pl-0"> 
            {/* Timeline Connector (Mobile/Desktop distinct) */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent md:-translate-x-1/2"></div>
            
            {/* Timeline Dot */}
            <div className={`
                absolute left-[-5px] md:left-1/2 top-12 w-3 h-3 rounded-full border-2 border-[#000] z-20 md:-translate-x-1/2 transition-colors duration-500
                ${isHovered ? `bg-${exp.color}-500 shadow-[0_0_15px_rgba(255,255,255,0.5)]` : 'bg-neutral-600'}
            `}></div>

            <div 
                className={`
                    flex flex-col md:flex-row items-center gap-8 md:gap-16 py-8
                    ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}
                `}
            >
                {/* Date / Period Column */}
                <div className={`w-full md:w-1/2 flex ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}>
                     <div className={`
                        px-4 py-1.5 rounded-full border border-white/5 bg-[#111] text-xs font-mono text-neutral-400
                        ${isHovered ? 'text-white border-white/20' : ''} transition-all duration-300
                     `}>
                        {exp.period}
                     </div>
                </div>

                {/* Main Content Card */}
                <div className="w-full md:w-1/2 perspective-1000">
                    <div
                        ref={cardRef}
                        onMouseMove={handleMouseMove}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        className="group relative bg-[#1c1c1e]/60 backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 md:p-8 overflow-hidden transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-2xl"
                    >
                        {/* Spotlight Effect */}
                        <div 
                            className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{
                                background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.06), transparent 40%)`
                            }}
                        />

                        {/* Card Content */}
                        <div className="relative z-10">
                            {/* Header */}
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-4">
                                    <CompanyLogo name={exp.company} type={exp.logo || 'blk'} className="w-12 h-12 text-sm" />
                                    <div>
                                        <h3 className="text-xl font-bold text-white leading-tight group-hover:text-blue-400 transition-colors">
                                            {exp.role}
                                        </h3>
                                        <div className="text-sm text-neutral-400 font-medium">{exp.company}</div>
                                        {exp.location && (
                                            <div className="text-xs text-neutral-600 mt-0.5 flex items-center">
                                                <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                                {exp.location}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <p className="text-neutral-300 text-sm leading-relaxed mb-6 font-light">
                                {exp.description}
                            </p>

                            {/* Metrics Grid */}
                            {exp.metrics && (
                                <div className="grid grid-cols-3 gap-2 mb-6">
                                    {exp.metrics.map((m, i) => (
                                        <MetricBadge key={i} label={m.label} value={m.value} delay={i * 100} />
                                    ))}
                                </div>
                            )}

                            {/* Tech Stack / Skills */}
                            {exp.skills && (
                                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                                    {exp.skills.map(skill => (
                                        <span 
                                            key={skill} 
                                            className="px-2.5 py-1 rounded-md bg-white/5 text-[10px] text-neutral-400 border border-white/5 group-hover:border-white/10 group-hover:text-neutral-200 transition-colors"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- MAIN COMPONENT ---

export const Experience: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'work' | 'leadership'>('work');

  const data = activeTab === 'work' ? WORK_EXPERIENCE : LEADERSHIP_EXPERIENCE;

  return (
    <section id="experience" className="py-32 bg-black relative overflow-hidden">
      
      {/* Dynamic Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className={`absolute top-[20%] right-[10%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 transition-colors duration-1000 ${activeTab === 'work' ? 'bg-blue-900' : 'bg-orange-900'}`}></div>
          <div className={`absolute bottom-[10%] left-[5%] w-[400px] h-[400px] rounded-full blur-[100px] opacity-20 transition-colors duration-1000 ${activeTab === 'work' ? 'bg-purple-900' : 'bg-red-900'}`}></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="space-y-4">
                <h2 className="text-4xl md:text-6xl font-semibold text-white tracking-tighter">
                    Professional <br/> Trajectory.
                </h2>
                <p className="text-neutral-400 max-w-md text-lg font-light">
                    A timeline of technical execution, leadership, and high-impact delivery.
                </p>
            </div>

            {/* Apple-style Segmented Control */}
            <div className="bg-[#1c1c1e] p-1 rounded-full border border-white/10 relative inline-flex">
                {/* Sliding Background */}
                <div 
                    className={`
                        absolute top-1 bottom-1 rounded-full bg-white/10 border border-white/10 shadow-lg transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
                        ${activeTab === 'work' ? 'left-1 w-[120px]' : 'left-[115px] w-[116px]'}
                    `}
                ></div>

                <button 
                    onClick={() => setActiveTab('work')}
                    className={`relative z-10 px-8 py-3 rounded-full text-sm font-medium transition-colors duration-300 ${activeTab === 'work' ? 'text-white' : 'text-neutral-500 hover:text-white'}`}
                >
                    Corporate
                </button>
                <button 
                    onClick={() => setActiveTab('leadership')}
                    className={`relative z-10 px-8 py-3 rounded-full text-sm font-medium transition-colors duration-300 ${activeTab === 'leadership' ? 'text-white' : 'text-neutral-500 hover:text-white'}`}
                >
                    Leadership
                </button>
            </div>
        </div>

        {/* Experience Timeline */}
        <div className="relative min-h-[600px] space-y-8 md:space-y-0">
            {data.map((exp, index) => (
                <ExperienceCard key={exp.id} exp={exp} index={index} />
            ))}
        </div>

        {/* Resume Download CTA */}
        <div className="mt-24 text-center">
             <div className="inline-flex flex-col items-center p-8 rounded-3xl bg-[#111] border border-white/5 hover:border-white/10 transition-all duration-300 group cursor-pointer">
                 <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white mb-4 group-hover:bg-white group-hover:text-black transition-all">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                 </div>
                 <h3 className="text-white font-bold mb-1">Detailed Resume</h3>
                 <p className="text-neutral-500 text-sm mb-4">View the full technical breakdown.</p>
                 <span className="text-blue-500 text-xs font-bold uppercase tracking-widest group-hover:text-blue-400 flex items-center">
                     Open Viewer
                     <svg className="w-3 h-3 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                 </span>
             </div>
        </div>

      </div>
    </section>
  );
};
