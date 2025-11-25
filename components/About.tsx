
import React, { useEffect, useRef, useState } from 'react';
import { SyncedProfileData } from '../types';
import { SKILLS, EXPERIENCES, PROFILE, PROJECTS, CERTIFICATES, WORK_EXPERIENCE, LEADERSHIP_EXPERIENCE, RESUME_SKILLS } from '../constants';

interface AboutProps {
  profile: SyncedProfileData;
}

// Generic reveal component for staggered animations
const ScrollReveal: React.FC<{ 
  children?: React.ReactNode; 
  delay?: number; 
  className?: string;
  as?: React.ElementType; // Allow rendering as different tags (div, p, etc)
}> = ({ children, delay = 0, className = "", as: Component = 'div' }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                // Add a small delay before setting visible to ensure element is painted if scrolling fast
                const timer = setTimeout(() => setIsVisible(true), 50);
                observer.disconnect();
                return () => clearTimeout(timer);
            }
        }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });
        
        if (ref.current) observer.observe(ref.current as Element);
        
        return () => observer.disconnect();
    }, []);

    return (
        <Component 
            ref={ref}
            className={`transition-all duration-1000 ease-out transform will-change-transform ${
                isVisible ? 'opacity-100 translate-y-0 filter-none' : 'opacity-0 translate-y-8 blur-sm'
            } ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </Component>
    )
}

export const About: React.FC<AboutProps> = ({ profile }) => {
  const [offset, setOffset] = useState(0);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [zoom, setZoom] = useState(0.75);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Basic parallax optimization
      if (sectionRef.current) {
          setOffset(window.scrollY);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock scroll when resume is open
  useEffect(() => {
      if (isResumeOpen) {
          document.body.style.overflow = 'hidden';
      } else {
          document.body.style.overflow = 'auto';
          setZoom(0.75); // Reset zoom on close to a comfortable default
      }
  }, [isResumeOpen]);

  // Split content into sentences for the staggered effect
  const content = profile.about || "Crafting digital experiences with precision and passion.";
  const sentences = content.match(/[^.!?]+[.!?]+/g) || [content];

  return (
    <section id="about" ref={sectionRef} className="relative min-h-screen bg-black text-white py-32 lg:py-48 overflow-hidden flex items-center">
      
      {/* Parallax Background Elements - Subtle Orbs */}
      <div 
        className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-900/5 rounded-full blur-[150px] pointer-events-none mix-blend-screen"
        style={{ transform: `translateY(${offset * 0.15}px) translateX(10%)` }}
      />
      <div 
        className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-900/5 rounded-full blur-[150px] pointer-events-none mix-blend-screen"
        style={{ transform: `translateY(${offset * -0.1}px) translateX(-10%)` }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Left Column: Sticky Profile/Stats */}
            <div className="lg:col-span-4 order-2 lg:order-1">
                <div className="sticky top-32 space-y-12">
                    {/* Profile Image/Logo with glass effect */}
                    <ScrollReveal delay={0} className="relative group">
                        <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        <div className="w-48 h-48 rounded-3xl bg-[#1d1d1f] border border-white/10 flex items-center justify-center overflow-hidden shadow-2xl relative z-10 backdrop-blur-md">
                        <img
                        src="/1111.png"
                        alt={profile.name} 
                        className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                        />
                        </div>
                    </ScrollReveal>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-8">
                        <ScrollReveal delay={100}>
                            <div className="text-3xl font-bold text-white mb-1">2+</div>
                            <div className="text-xs text-neutral-500 uppercase tracking-widest">Years Exp.</div>
                        </ScrollReveal>
                        <ScrollReveal delay={200}>
                            <div className="text-3xl font-bold text-white mb-1">10+</div>
                            <div className="text-xs text-neutral-500 uppercase tracking-widest">Projects</div>
                        </ScrollReveal>
                    </div>

                    <ScrollReveal delay={300} className="h-px w-full bg-gradient-to-r from-white/20 to-transparent"></ScrollReveal>

                    <ScrollReveal delay={400}>
                        <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-4">Connect</h3>
                        <div className="flex space-x-4 text-sm">
                        <a href="https://www.linkedin.com/in/txniiii/" target="_blank" rel="noopener noreferrer" className="text-neutral-300 hover:text-white transition-colors">LinkedIn</a>
                        <a href="https://github.com/txniii" target="_blank" rel="noopener noreferrer" className="text-neutral-300 hover:text-white transition-colors">GitHub</a>
                        <a href="#contact" className="text-neutral-300 hover:text-white transition-colors">Email</a>
                        </div>
                    </ScrollReveal>

                </div>
            </div>

            {/* Right Column: Scrolling Narrative */}
            <div className="lg:col-span-8 order-1 lg:order-2 flex flex-col justify-center">
                <div className="mb-16">
                    <ScrollReveal className="text-blue-500 font-medium tracking-wide uppercase text-sm mb-4 block">
                        Who I Am
                    </ScrollReveal>
                    <div className="space-y-8">
                        {sentences.map((sentence, i) => (
                            <ScrollReveal 
                                key={i} 
                                as="p"
                                delay={i * 100} // 100ms stagger between sentences
                                className="text-xl md:text-3xl lg:text-4xl font-light leading-tight text-neutral-200"
                            >
                                {sentence.trim()}
                            </ScrollReveal>
                        ))}
                        
                        {/* Append tagline if distinct from about */}
                        {profile.tagline && !profile.about.includes(profile.tagline) && (
                           <ScrollReveal 
                                delay={sentences.length * 100 + 200} 
                                as="p"
                                className="italic text-neutral-400 !text-2xl mt-8 border-l-2 border-blue-500 pl-6"
                            >
                                {profile.tagline}
                           </ScrollReveal>
                        )}
                    </div>
                    
                    {/* Resume Button */}
                    <ScrollReveal delay={sentences.length * 100 + 400} className="mt-12">
                        <button 
                            onClick={() => setIsResumeOpen(true)}
                            className="inline-flex items-center space-x-3 bg-white text-black px-8 py-4 rounded-full font-medium text-lg hover:bg-neutral-200 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:scale-105"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M12 18v-6"/><path d="m9 15 3 3 3-3"/></svg>
                            <span>View Resume</span>
                        </button>
                    </ScrollReveal>
                </div>

                {/* Interactive Focus cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                     <ScrollReveal delay={200} className="h-full">
                         <div className="h-full p-8 rounded-3xl bg-[#1d1d1f]/50 border border-white/5 hover:bg-[#1d1d1f] transition-colors duration-500 group">
                             <div className="mb-4 text-blue-500 group-hover:scale-110 transition-transform origin-left">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                             </div>
                             <h4 className="text-lg font-medium text-white mb-2">Technical Leadership</h4>
                             <p className="text-neutral-400 text-sm leading-relaxed">Driving bold ideas, technical rigor, and collaborative solutions for next-gen motorsport.</p>
                         </div>
                     </ScrollReveal>
                     
                     <ScrollReveal delay={350} className="h-full">
                         <div className="h-full p-8 rounded-3xl bg-[#1d1d1f]/50 border border-white/5 hover:bg-[#1d1d1f] transition-colors duration-500 group">
                             <div className="mb-4 text-purple-500 group-hover:scale-110 transition-transform origin-left">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>
                             </div>
                             <h4 className="text-lg font-medium text-white mb-2">Embedded Systems</h4>
                             <p className="text-neutral-400 text-sm leading-relaxed">Specializing in hardware design, RTOS, and performance-driven technology validation.</p>
                         </div>
                     </ScrollReveal>
                </div>

                {/* Key Competencies (Skills) */}
                <div className="mt-16">
                    <ScrollReveal delay={400} className="mb-6 flex items-center space-x-4">
                        <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-widest">Key Competencies</h3>
                        <div className="h-px flex-1 bg-gradient-to-r from-neutral-800 to-transparent"></div>
                    </ScrollReveal>
                    
                    <div className="flex flex-wrap gap-3">
                        {SKILLS.map((skill, i) => (
                            <ScrollReveal key={skill} delay={450 + (i * 50)}>
                                <div className="group relative px-5 py-2.5 rounded-full bg-[#1d1d1f] border border-white/10 overflow-hidden transition-all duration-300 hover:border-blue-500/30 hover:shadow-[0_0_15px_rgba(0,113,227,0.15)]">
                                    <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <span className="relative text-sm font-medium text-neutral-300 group-hover:text-white transition-colors">
                                        {skill}
                                    </span>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        {/* --- RESUME MODAL --- */}
        {isResumeOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 font-sans">
                {/* Backdrop with Blur */}
                <div 
                    className="absolute inset-0 bg-black/60 backdrop-blur-lg transition-opacity animate-fade-in"
                    onClick={() => setIsResumeOpen(false)}
                ></div>

                {/* Window Container - Apple Style */}
                <div className="relative w-full max-w-6xl h-[75vh] bg-[#2c2c2e] rounded-xl overflow-hidden shadow-2xl flex flex-col border border-white/10 animate-fade-in-up ring-1 ring-white/10">
                    
                    {/* Toolbar */}
                    <div className="h-14 bg-[#1e1e1e] border-b border-white/10 flex items-center justify-between px-6 shrink-0 relative z-50">
                        {/* Window Controls */}
                        <div className="flex items-center space-x-2 w-24">
                             <button onClick={() => setIsResumeOpen(false)} className="w-3 h-3 rounded-full bg-[#FF5F57] hover:bg-[#ff4a42] transition-colors border border-black/10"></button>
                             <div className="w-3 h-3 rounded-full bg-[#FEBC2E] border border-black/10"></div>
                             <div className="w-3 h-3 rounded-full bg-[#28C840] border border-black/10"></div>
                        </div>

                        {/* Title */}
                        <div className="flex items-center space-x-2 opacity-80">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-400"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                            <span className="text-sm font-medium text-neutral-200">Resume_2025_Final.pdf</span>
                        </div>
                        
                        {/* Toolbar Actions */}
                        <div className="flex items-center space-x-4 w-24 justify-end">
                             {/* Zoom Group */}
                             <div className="flex items-center bg-black/30 rounded-md border border-white/5">
                                <button 
                                    onClick={() => setZoom(z => Math.max(0.4, z - 0.1))}
                                    className="p-1.5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors rounded-l-md"
                                    title="Zoom Out"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"/></svg>
                                </button>
                                <div className="w-px h-4 bg-white/10"></div>
                                <button 
                                    onClick={() => setZoom(z => Math.min(1.5, z + 0.1))}
                                    className="p-1.5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors rounded-r-md"
                                    title="Zoom In"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
                                </button>
                             </div>
                             <button className="text-blue-400 hover:text-blue-300 transition-colors">
                                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                             </button>
                        </div>
                    </div>

                    {/* Scrollable Viewport */}
                    <div className="flex-1 overflow-auto bg-[#1a1a1a] flex justify-center py-12 relative custom-scrollbar">
                        {/* 
                            Zoom Container Logic: 
                            - Outer wrapper sets explicitly sized dimensions based on zoom. This forces browser scrollbars.
                            - Inner content uses transform: scale() to visually resize.
                            - This decoupling prevents 'transform' quirks where scrollbars don't appear.
                        */}
                        <div 
                            style={{ 
                                width: `${850 * zoom}px`, 
                                height: `${1150 * zoom}px`,
                                transition: 'width 0.2s, height 0.2s',
                                transformOrigin: 'top center'
                            }}
                        >
                            <div 
                                className="bg-white text-black shadow-[0_20px_50px_rgba(0,0,0,0.5)] origin-top-left transition-transform duration-200 ease-out"
                                style={{
                                    width: '850px',
                                    minHeight: '1150px',
                                    transform: `scale(${zoom})`
                                }}
                            >
                                <div className="p-16 space-y-6 leading-normal">
                                    
                                    {/* Resume Header */}
                                    <div className="border-b-2 border-black pb-6 text-center">
                                        <h1 className="text-4xl font-serif font-bold uppercase tracking-wider mb-3 text-black">{PROFILE.name}</h1>
                                        <div className="text-sm text-black font-medium flex flex-wrap justify-center gap-x-3 gap-y-1">
                                            <span>US Citizen</span>
                                            <span>|</span>
                                            <span>(908) 413-3213</span>
                                            <span>|</span>
                                            <span>mabautista358@gmail.com</span>
                                            <span>|</span>
                                            <a href="https://linkedin.com/in/txniiii" className="hover:text-blue-700 underline decoration-transparent hover:decoration-blue-700 transition-all">linkedin.com/in/txniiii</a>
                                            <span>|</span>
                                            <a href="https://github.com/txniii" className="hover:text-blue-700 underline decoration-transparent hover:decoration-blue-700 transition-all">github.com/txniii</a>
                                        </div>
                                    </div>

                                    {/* Profile */}
                                    <div className="mb-6">
                                        <h2 className="text-sm font-bold uppercase tracking-widest border-b border-black mb-2 pb-1">Career Profile</h2>
                                        <p className="text-sm text-black leading-relaxed text-justify">
                                            Passionate future Formula 1 engineer and innovator, specializing in hardware design, embedded systems, and performance-driven technology. Proven leader in diverse, high-impact teams—driving bold ideas, technical rigor, and collaborative solutions for next-gen motorsport. Eager to help shape Cadillac F1’s start-up culture, disrupt the grid, and leave my mark on the team, the car, and the sport. Ready for career-defining moments.
                                        </p>
                                    </div>

                                    {/* Education */}
                                    <div className="mb-6">
                                        <h2 className="text-sm font-bold uppercase tracking-widest border-b border-black mb-3 pb-1">Education</h2>
                                        <div className="flex justify-between font-bold text-sm mb-1">
                                            <span>New Jersey Institute of Technology (NJIT)</span>
                                            <span>Newark, NJ</span>
                                        </div>
                                        <div className="flex justify-between text-sm italic mb-2">
                                            <span>B.S. Electrical & Computer Engineering Technology (Expected)</span>
                                            <span>May 2026</span>
                                        </div>
                                        <p className="text-sm text-black leading-relaxed">
                                            <span className="font-semibold">Relevant Coursework:</span> Digital Logic Design, Embedded Systems, Computer Architecture, Numerical Methods, Integrated Circuits, Industrial Automation, Circuit Analysis (Transform Methods)
                                        </p>
                                    </div>

                                    {/* Experience */}
                                    <div className="mb-6">
                                        <h2 className="text-sm font-bold uppercase tracking-widest border-b border-black mb-3 pb-1">Experience</h2>
                                        <div className="space-y-4">
                                            {WORK_EXPERIENCE.map((exp) => (
                                                <div key={exp.id}>
                                                    <div className="flex justify-between text-sm mb-0.5">
                                                        <span className="font-bold text-black">{exp.role}</span>
                                                        <span className="font-mono text-xs pt-0.5">{exp.period}</span>
                                                    </div>
                                                    <div className="text-sm italic mb-1">{exp.company}</div>
                                                    <ul className="list-disc list-outside ml-4 text-sm space-y-1 marker:text-black">
                                                        {exp.description.split('. ').map((sent, i) => (
                                                            sent.length > 5 && <li key={i} className="pl-1 text-justify">{sent.endsWith('.') ? sent : sent + '.'}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Projects */}
                                    <div className="mb-6">
                                         <h2 className="text-sm font-bold uppercase tracking-widest border-b border-black mb-3 pb-1">Projects</h2>
                                         <div className="space-y-3">
                                            {PROJECTS.map((proj) => (
                                                <div key={proj.id}>
                                                    <div className="flex justify-between text-sm mb-0.5">
                                                        <span className="font-bold text-black">{proj.title}</span>
                                                        <span className="text-xs text-neutral-600 italic">
                                                           {proj.technologies.join(", ")}
                                                        </span>
                                                    </div>
                                                    <ul className="list-disc list-outside ml-4 text-sm space-y-1 marker:text-black">
                                                        <li className="pl-1 text-justify">{proj.longDescription || proj.description}</li>
                                                    </ul>
                                                </div>
                                            ))}
                                         </div>
                                    </div>

                                    {/* Leadership */}
                                    <div className="mb-6">
                                        <h2 className="text-sm font-bold uppercase tracking-widest border-b border-black mb-3 pb-1">Leadership Experience</h2>
                                        <div className="space-y-4">
                                            {LEADERSHIP_EXPERIENCE.map((exp) => (
                                                <div key={exp.id}>
                                                    <div className="flex justify-between text-sm mb-0.5">
                                                        <span className="font-bold text-black">{exp.role}</span>
                                                        <span className="font-mono text-xs pt-0.5">{exp.period}</span>
                                                    </div>
                                                    <div className="text-sm italic mb-1">{exp.company}</div>
                                                    <ul className="list-disc list-outside ml-4 text-sm space-y-1 marker:text-black">
                                                        {exp.description.split('. ').map((sent, i) => (
                                                            sent.length > 5 && <li key={i} className="pl-1 text-justify">{sent.endsWith('.') ? sent : sent + '.'}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                     {/* Skills & Certs */}
                                     <div className="grid grid-cols-1 gap-6">
                                        <div>
                                            <h2 className="text-sm font-bold uppercase tracking-widest border-b border-black mb-3 pb-1">Technical Skills</h2>
                                            <div className="text-sm space-y-1.5">
                                                {Object.entries(RESUME_SKILLS).map(([category, skills]) => (
                                                    <div key={category} className="flex flex-col sm:flex-row sm:gap-2">
                                                        <span className="font-bold text-black min-w-[140px]">{category}:</span> 
                                                        <span className="text-black">{skills}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <h2 className="text-sm font-bold uppercase tracking-widest border-b border-black mb-3 pb-1">Certifications</h2>
                                            <p className="text-sm leading-relaxed text-justify">
                                                {CERTIFICATES.map(c => `${c.title} — ${c.issuer}`).join(" — ")}
                                            </p>
                                        </div>

                                        <div>
                                            <h2 className="text-sm font-bold uppercase tracking-widest border-b border-black mb-3 pb-1">Personal Interests</h2>
                                            <p className="text-sm leading-relaxed">
                                                Formula 1 engineering, disruptive race technologies, automotive innovation, startup leadership, empowering diverse teams, global/cross-border mobility.
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}

      </div>
    </section>
  );
};
