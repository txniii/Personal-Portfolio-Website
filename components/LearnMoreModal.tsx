
import React, { useState, useEffect } from 'react';
import { PROFILE, LINKEDIN_PROFILE_URL, GITHUB_PROFILE_URL } from '../constants';

interface LearnMoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// --- ICONS ---
const InstagramIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);
const TwitterIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
);
const LinkedinIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);
const DiscordIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12h.01M15 12h.01M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5z"/></svg>
);
const GithubIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
);

// --- SECTIONS ---

const PersonalProfile = () => (
  <div className="animate-fade-in-up space-y-6">
      {/* Header Card */}
      <div className="bg-[#1c1c1e] rounded-3xl p-6 md:p-8 border border-white/5 relative overflow-hidden flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-blue-900/10 to-transparent pointer-events-none"></div>
          
          <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full p-1 bg-gradient-to-br from-blue-500 to-purple-500 shrink-0">
              <img src={PROFILE.avatarUrl} alt="Profile" className="w-full h-full object-cover rounded-full border-4 border-[#1c1c1e]" />
              <div className="absolute bottom-1 right-1 w-8 h-8 bg-[#1c1c1e] rounded-full flex items-center justify-center">
                  <span className="text-lg" role="img" aria-label="Global">🌎</span>
              </div>
          </div>

          <div className="text-center md:text-left z-10 flex-1">
              <h2 className="text-3xl font-bold text-white mb-2">{PROFILE.name}</h2>
              <p className="text-blue-400 font-medium mb-4">{PROFILE.title}</p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                  <div className="px-3 py-1.5 bg-white/5 rounded-xl border border-white/5 backdrop-blur-sm">
                      <span className="block text-[10px] text-neutral-500 uppercase tracking-widest">Age</span>
                      <span className="text-white text-sm">21</span>
                  </div>
                  <div className="px-3 py-1.5 bg-white/5 rounded-xl border border-white/5 backdrop-blur-sm">
                      <span className="block text-[10px] text-neutral-500 uppercase tracking-widest">Nationality</span>
                      <span className="text-white text-sm">MEX - FRA - US</span>
                  </div>
                  <div className="px-3 py-1.5 bg-white/5 rounded-xl border border-white/5 backdrop-blur-sm">
                      <span className="block text-[10px] text-neutral-500 uppercase tracking-widest">Languages</span>
                      <span className="text-white text-sm">English, Spanish</span>
                  </div>
              </div>
          </div>
      </div>

      {/* Socials & Status Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Socials */}
          <div className="md:col-span-2 bg-[#1c1c1e] p-6 rounded-3xl border border-white/5 relative overflow-hidden group">
              <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-4 flex items-center">
                  Digital Identity
                  <div className="ml-2 h-px flex-1 bg-white/10"></div>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {[
                      { name: 'LinkedIn', icon: <LinkedinIcon />, url: LINKEDIN_PROFILE_URL },
                      { name: 'GitHub', icon: <GithubIcon />, url: GITHUB_PROFILE_URL },
                      { name: 'Instagram', icon: <InstagramIcon />, url: 'https://instagram.com/txniii' },
                      { name: 'Twitter', icon: <TwitterIcon />, url: 'https://twitter.com/txniiii' },
                      { name: 'Discord', icon: <DiscordIcon />, url: '#' },
                  ].map((social, i) => (
                      <a key={i} href={social.url} target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all hover:scale-105 group/social">
                          <div className="w-6 h-6 text-neutral-400 group-hover/social:text-white mb-2 transition-colors">
                              {social.icon}
                          </div>
                          <span className="text-[9px] text-neutral-500 uppercase tracking-wider font-bold group-hover/social:text-neutral-300">{social.name}</span>
                      </a>
                  ))}
              </div>
          </div>

          {/* Current Status */}
          <div className="bg-[#1c1c1e] p-6 rounded-3xl border border-white/5 flex flex-col justify-between relative overflow-hidden">
               <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-500/10 rounded-full blur-2xl animate-pulse"></div>
               <div>
                   <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-2">Current Status</h3>
                   <div className="flex items-center space-x-2 mb-4 bg-green-900/20 w-fit px-3 py-1 rounded-full border border-green-500/20">
                       <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-green-400 text-[10px] font-bold uppercase tracking-wide">Online & Building</span>
                   </div>
               </div>
               <div className="text-white text-sm font-medium leading-relaxed relative z-10">
                   "Currently optimizing React render cycles & tuning PID controllers for my latest drone build."
               </div>
          </div>
      </div>

      {/* Philosophy & Fun Facts Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Philosophy */}
          <div className="bg-[#1c1c1e] p-6 rounded-3xl border border-white/5 flex flex-col justify-center">
              <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-4">Core Philosophy</h3>
              <p className="text-white text-lg font-light leading-relaxed italic">
                  "I believe in the convergence of hardware ruggedness and software intelligence. Engineering is not just about making things work; it's about making them work under pressure, every time."
              </p>
          </div>

          {/* Fun Facts */}
          <div className="bg-[#1c1c1e] p-6 rounded-3xl border border-white/5">
              <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-4">Quick Trivia</h3>
              <div className="space-y-4">
                  {[
                      { icon: "🏎️", title: "Sim Racer", desc: "Optimizing setups in iRacing on weekends." },
                      { icon: "☕", title: "Espresso Fueled", desc: "My code compiles better with caffeine." },
                      { icon: "🔧", title: "Hardware", desc: "Can hand-solder 0402 SMDs without a microscope." },
                      { icon: "📄", title: "FIA Regs", desc: "I read technical regulations for leisure." }
                  ].map((fact, i) => (
                      <div key={i} className="flex items-start space-x-3">
                          <span className="text-lg">{fact.icon}</span>
                          <div>
                              <div className="text-white font-medium text-sm">{fact.title}</div>
                              <div className="text-neutral-500 text-xs">{fact.desc}</div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </div>

      {/* My Toolkit */}
      <div>
          <h3 className="text-xl font-bold text-white mb-6">The Arsenal</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#1c1c1e] p-6 rounded-3xl border border-white/5">
                  <h4 className="text-blue-400 font-bold mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                      Software & Analysis
                  </h4>
                  <div className="flex flex-wrap gap-2">
                      {["C/C++", "Python", "MATLAB", "Simulink", "Altium Designer", "SolidWorks", "Git", "React", "Linux"].map(t => (
                          <span key={t} className="px-3 py-1 bg-white/5 rounded-lg text-xs text-neutral-300 border border-white/5">{t}</span>
                      ))}
                  </div>
              </div>
              <div className="bg-[#1c1c1e] p-6 rounded-3xl border border-white/5">
                  <h4 className="text-purple-400 font-bold mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
                      Hardware & Lab
                  </h4>
                  <div className="flex flex-wrap gap-2">
                      {["Oscilloscopes", "Logic Analyzers", "Soldering Stations", "3D Printers", "FPGA Dev Boards", "ESP32", "STM32", "Sensors", "LiDAR"].map(t => (
                          <span key={t} className="px-3 py-1 bg-white/5 rounded-lg text-xs text-neutral-300 border border-white/5">{t}</span>
                      ))}
                  </div>
              </div>
          </div>
      </div>
  </div>
);

const JOURNEY_MILESTONES = [
    {
        year: "2004",
        title: "The Origin",
        subtitle: "Curiosity Unlocked",
        description: "Growing up, I was the kid who voided every warranty in the house. Remote controls, toasters, old radios—nothing was safe from my screwdriver. I didn't just want to use technology; I had a compulsive need to understand the *how* and *why* behind it.",
        icon: "🔧",
        dotColor: "bg-blue-500",
        textColor: "text-blue-400",
        status: "completed"
    },
    {
        year: "2018",
        title: "The Catalyst",
        subtitle: "Discovering Formula 1",
        description: "It's the only sport where engineering is as celebrated as athleticism. F1 represents the absolute pinnacle of human capability—the intersection of physics, data, and sheer will. I realized that the world is built by those who are willing to take things apart and put them back together better than before.",
        icon: "🏎️",
        dotColor: "bg-red-500",
        textColor: "text-red-400",
        status: "completed"
    },
    {
        year: "2022",
        title: "The Forge",
        subtitle: "NJIT & SHPE Leadership",
        description: "Enrolled at NJIT to formalize my skills in Electrical & Computer Engineering. Took on leadership roles in SHPE, learning that technical brilliance means nothing without the ability to lead and communicate diverse teams.",
        icon: "🎓",
        dotColor: "bg-purple-500",
        textColor: "text-purple-400",
        status: "completed"
    },
    {
        year: "2025",
        title: "Technical Mastery",
        subtitle: "Embedded Systems Focus",
        description: "Deep diving into RTOS, FPGA design, and sensor fusion. Influenced heavily by Adrian Newey's holistic approach—viewing packaging, suspension, and aero as one symbiotic unit.",
        icon: "💻",
        dotColor: "bg-yellow-500",
        textColor: "text-yellow-400",
        status: "current"
    },
    {
        year: "Future",
        title: "The Cadillac Vision",
        subtitle: "Target: F1 Grid",
        description: "My goal is explicit: To join the Cadillac Formula 1 Team. A startup mentality backed by American industrial heritage. I want to help build the culture and machinery that challenges European hegemony.",
        icon: "🏁",
        dotColor: "bg-green-500",
        textColor: "text-green-400",
        status: "target"
    }
];

const JourneySection = () => (
    <div className="animate-fade-in-up h-full flex flex-col">
        <div className="bg-[#1c1c1e] rounded-3xl p-8 border border-white/5 h-full overflow-y-auto custom-scrollbar relative">
             {/* Vertical Line */}
             <div className="absolute left-6 md:left-12 top-10 bottom-10 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 opacity-20"></div>

             <div className="space-y-12">
                {JOURNEY_MILESTONES.map((step, i) => (
                    <div key={i} className="relative pl-10 md:pl-16 group">
                        {/* Node Dot */}
                        <div className={`
                            absolute left-[19px] md:left-[41px] top-0 w-4 h-4 rounded-full border-4 border-[#1c1c1e] z-10 transition-all duration-500
                            ${step.status === 'current' ? `${step.dotColor} scale-125 shadow-[0_0_15px_rgba(255,255,255,0.5)]` : step.dotColor}
                            group-hover:scale-125
                        `}></div>
                        
                        {/* Connecting Line Overlay for Hover */}
                        <div className="absolute left-[25px] md:left-[47px] top-4 bottom-[-48px] w-0.5 bg-white/20 scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500"></div>

                        {/* Content Card */}
                        <div className={`
                            relative bg-white/5 border border-white/5 rounded-2xl p-6 transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:translate-x-2
                            ${step.status === 'target' ? 'border-green-500/30 bg-green-900/10' : ''}
                        `}>
                            {step.status === 'current' && (
                                <div className="absolute -right-2 -top-2">
                                    <span className="relative flex h-3 w-3">
                                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                                      <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
                                    </span>
                                </div>
                            )}

                            <div className="flex items-center justify-between mb-2">
                                <span className={`text-xs font-bold font-mono uppercase tracking-widest px-2 py-1 rounded bg-black/20 ${step.textColor}`}>
                                    {step.year}
                                </span>
                                <span className="text-xl grayscale group-hover:grayscale-0 transition-all duration-300">{step.icon}</span>
                            </div>
                            
                            <h3 className="text-xl font-bold text-white mb-0.5">{step.title}</h3>
                            <div className="text-sm text-neutral-500 font-medium mb-4">{step.subtitle}</div>
                            
                            <p className="text-neutral-300 text-sm leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    </div>
                ))}
             </div>
             
             {/* End Node */}
             <div className="relative pl-10 md:pl-16 mt-12 opacity-50">
                 <div className="absolute left-[21px] md:left-[43px] top-0 w-3 h-3 rounded-full bg-neutral-700 border-2 border-[#1c1c1e]"></div>
                 <p className="text-xs text-neutral-600 font-mono uppercase tracking-widest">To Be Continued...</p>
             </div>
        </div>
    </div>
);

const DayInLife = () => (
    <div className="animate-fade-in-up h-full">
        <h3 className="text-xl font-bold text-white mb-6">Daily Telemetry</h3>
        <div className="space-y-4 overflow-y-auto h-[600px] custom-scrollbar pr-2">
            {[
                { time: "06:30", title: "System Boot", desc: "Wake up. Double espresso. Review overnight F1 technical analysis and latest aerodynamic updates from motorsport.com.", icon: "☀️" },
                { time: "08:30", title: "Academic Rigor", desc: "NJIT Campus. Advanced Embedded Systems lecture. Arguing with professors about RTOS scheduling algorithms.", icon: "🎓" },
                { time: "11:00", title: "The Lab", desc: "Hardware prototyping. Debugging a PCB that decided to stop working for no reason. Oscilloscope probes everywhere.", icon: "🔬" },
                { time: "14:00", title: "Deep Work", desc: "Coding session. Usually C++ or Python. Developing telemetry analysis tools or optimizing simulation models.", icon: "💻" },
                { time: "17:00", title: "Physical Maintenance", desc: "Gym session. Engineering requires endurance. Listening to 'Beyond the Grid' podcast.", icon: "💪" },
                { time: "19:00", title: "Passion Projects", desc: "Working on this portfolio, 3D printing car parts, or watching old Grand Prix replays to study strategy.", icon: "🛠️" },
                { time: "23:00", title: "Shutdown", desc: "Sleep. Dreaming in G-force and tire degradation charts.", icon: "🌙" }
            ].map((slot, i) => (
                <div key={i} className="flex items-start group">
                    <div className="flex flex-col items-center mr-4">
                        <div className="w-12 h-12 rounded-xl bg-[#1c1c1e] border border-white/10 flex items-center justify-center text-xl group-hover:scale-110 group-hover:bg-blue-500/20 group-hover:border-blue-500/50 transition-all z-10 relative">
                            {slot.icon}
                        </div>
                        {i !== 6 && <div className="w-px h-16 bg-white/10 my-2 group-hover:bg-blue-500/30 transition-colors"></div>}
                    </div>
                    <div className="bg-[#1c1c1e] p-5 rounded-2xl border border-white/5 flex-1 hover:bg-white/5 transition-colors">
                        <span className="text-xs font-mono text-blue-400 font-bold mb-1 block">{slot.time}</span>
                        <h4 className="text-white font-bold mb-1">{slot.title}</h4>
                        <p className="text-neutral-400 text-sm leading-relaxed">{slot.desc}</p>
                    </div>
                </div>
            ))}

            <div className="mt-8 pt-8 border-t border-white/5">
                <h4 className="text-white font-bold mb-4">Weekend Protocol</h4>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#1c1c1e] p-4 rounded-2xl border border-white/5">
                        <div className="text-red-400 font-bold text-xs uppercase tracking-wider mb-2">Sim Racing</div>
                        <p className="text-neutral-400 text-sm">Logging laps in iRacing. Analyzing telemetry traces to improve braking efficiency.</p>
                    </div>
                    <div className="bg-[#1c1c1e] p-4 rounded-2xl border border-white/5">
                        <div className="text-green-400 font-bold text-xs uppercase tracking-wider mb-2">Race Day</div>
                        <p className="text-neutral-400 text-sm">Watching the Grand Prix with live timing screens open. Analyzing pit strategy in real-time.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const EducationSection = () => (
    <div className="animate-fade-in-up space-y-6 h-full overflow-y-auto custom-scrollbar pr-2">
         <div className="bg-gradient-to-br from-[#1c1c1e] to-black p-8 rounded-3xl border border-white/10 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-2xl"></div>
             
             <div className="flex items-start justify-between relative z-10">
                 <div>
                     <div className="text-red-500 font-bold text-sm uppercase tracking-widest mb-2">University</div>
                     <h2 className="text-3xl font-bold text-white mb-2">NJIT</h2>
                     <p className="text-xl text-neutral-300">New Jersey Institute of Technology</p>
                 </div>
                 <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center p-2 shadow-lg">
                     <span className="text-red-600 font-black text-2xl">NJIT</span>
                 </div>
             </div>
             
             <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                 <div>
                     <div className="text-neutral-500 text-xs font-bold uppercase tracking-wider mb-1">Degree</div>
                     <div className="text-white font-medium">B.S. Electrical & Computer Engineering Technology</div>
                 </div>
                 <div>
                     <div className="text-neutral-500 text-xs font-bold uppercase tracking-wider mb-1">Graduation</div>
                     <div className="text-white font-medium">Expected May 2026</div>
                 </div>
             </div>
         </div>

         {/* Leadership */}
         <div className="bg-[#1c1c1e] p-8 rounded-3xl border border-white/5">
            <h3 className="text-xl font-bold text-white mb-6">Leadership & Impact</h3>
            <div className="space-y-6">
                <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20 shrink-0">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    </div>
                    <div>
                        <h4 className="text-white font-bold">Community Outreach Director</h4>
                        <div className="text-xs text-neutral-500 uppercase tracking-widest mb-1">NJIT SHPE</div>
                        <p className="text-neutral-400 text-sm leading-relaxed">
                            Expanded chapter to 150+ members. Directed strategy for 15+ initiatives, achieving 45% recruitment growth.
                        </p>
                    </div>
                </div>

                <div className="w-full h-px bg-white/5"></div>

                <div className="flex items-start space-x-4">
                     <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 border border-purple-500/20 shrink-0">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                    </div>
                    <div>
                        <h4 className="text-white font-bold">Community Service Coordinator</h4>
                        <div className="text-xs text-neutral-500 uppercase tracking-widest mb-1">NJIT Senate</div>
                        <p className="text-neutral-400 text-sm leading-relaxed">
                            Forged 10+ strategic nonprofit partnerships. Delivered 350+ service hours with 95% volunteer retention.
                        </p>
                    </div>
                </div>
            </div>
         </div>

         <div className="bg-[#1c1c1e] p-8 rounded-3xl border border-white/5">
             <h3 className="text-xl font-bold text-white mb-6">Coursework Highlights</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {[
                     "Embedded Systems & Microcontrollers",
                     "Digital Logic & Circuit Design",
                     "Computer Architecture",
                     "Industrial Automation & Control",
                     "Network Protocol Analysis",
                     "Transform Methods in Engineering"
                 ].map((course, i) => (
                     <div key={i} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
                         <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                         <span className="text-neutral-300 text-sm">{course}</span>
                     </div>
                 ))}
             </div>
         </div>
    </div>
);

const InterestsSection = () => (
    <div className="animate-fade-in-up space-y-6 h-full overflow-y-auto custom-scrollbar pr-2">
        <div>
            <h3 className="text-xl font-bold text-white mb-2">Obsessions & Pursuits</h3>
            <p className="text-neutral-400 mb-6">What occupies my mind when I'm not in the lab.</p>

            {/* Music / Audio Widget (New) */}
            <div className="bg-[#1c1c1e] p-6 rounded-3xl border border-white/5 flex items-center space-x-6 relative overflow-hidden mb-6">
                {/* Animated Equalizer Background */}
                <div className="absolute inset-0 opacity-10 flex items-end justify-between px-10 pb-2 pointer-events-none">
                     {[...Array(24)].map((_,i) => (
                         <div key={i} className="w-1 bg-white animate-pulse" style={{ height: `${Math.random() * 80 + 20}%`, animationDuration: `${0.4 + Math.random()}s` }}></div>
                     ))}
                </div>

                <div className="relative z-10 w-20 h-20 bg-neutral-800 rounded-xl shadow-2xl flex items-center justify-center overflow-hidden shrink-0 group">
                    <img src="https://i.scdn.co/image/ab67616d0000b273e71dd154e83c748bb747444c" alt="Album Art" className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-white fill-white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                        </div>
                    </div>
                </div>
                
                <div className="relative z-10 flex-1">
                    <div className="flex items-center justify-between mb-1">
                        <div className="text-[10px] text-green-400 font-bold uppercase tracking-widest flex items-center">
                            <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
                            Spotify
                        </div>
                        <div className="text-[10px] text-neutral-500 font-mono">0:45 / 3:12</div>
                    </div>
                    <h4 className="text-white font-bold text-lg leading-tight">Smooth Operator</h4>
                    <p className="text-neutral-400 text-sm">Sade • F1 Race Weekend Mix</p>
                </div>
            </div>

            {/* EDC / Gear Grid (New) */}
            <div className="bg-[#1c1c1e] p-6 rounded-3xl border border-white/5 mb-6">
                <h4 className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-6">Everyday Carry (EDC)</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                        { item: "MacBook Pro M3", type: "Workstation" },
                        { item: "Fluke 87V", type: "Multimeter" },
                        { item: "Saleae Logic 8", type: "Analyzer" },
                        { item: "Sony WH-1000XM5", type: "Audio" }
                    ].map((gear, i) => (
                        <div key={i} className="bg-white/5 p-3 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                            <div className="text-white font-medium text-sm truncate">{gear.item}</div>
                            <div className="text-neutral-500 text-[10px] uppercase">{gear.type}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Sim Racing Card */}
                <div className="bg-[#1c1c1e] p-6 rounded-3xl border border-white/5 relative overflow-hidden group hover:border-white/20 transition-all">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-2xl group-hover:bg-red-500/20 transition-colors"></div>
                    <div className="flex items-center space-x-4 mb-4 relative z-10">
                        <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-xl">🏎️</div>
                        <h4 className="text-white font-bold text-lg">Sim Racing</h4>
                    </div>
                    <p className="text-neutral-400 text-sm mb-4 leading-relaxed">
                        It's not just a game; it's data validation. I use iRacing to understand vehicle dynamics, tire thermals, and the physics of trail braking.
                    </p>
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs border-b border-white/5 pb-2">
                            <span className="text-neutral-500">Platform</span>
                            <span className="text-white font-mono">iRacing / ACC</span>
                        </div>
                        <div className="flex justify-between text-xs border-b border-white/5 pb-2">
                            <span className="text-neutral-500">Rig</span>
                            <span className="text-white font-mono">Direct Drive Wheel</span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-neutral-500">Focus</span>
                            <span className="text-white font-mono">Telemetry Analysis</span>
                        </div>
                    </div>
                </div>

                {/* Media/Reading Card */}
                <div className="bg-[#1c1c1e] p-6 rounded-3xl border border-white/5 relative overflow-hidden group hover:border-white/20 transition-all">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-colors"></div>
                    <div className="flex items-center space-x-4 mb-4 relative z-10">
                        <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-xl">📚</div>
                        <h4 className="text-white font-bold text-lg">Input Stream</h4>
                    </div>
                    <p className="text-neutral-400 text-sm mb-4 leading-relaxed">
                        Continuous learning is the engine of innovation. My current rotation of technical literature and podcasts.
                    </p>
                    <ul className="space-y-3">
                        <li className="flex items-start space-x-3">
                            <svg className="w-4 h-4 text-blue-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                            <div className="text-xs">
                                <span className="block text-white font-medium">How to Build a Car</span>
                                <span className="text-neutral-500">Adrian Newey</span>
                            </div>
                        </li>
                        <li className="flex items-start space-x-3">
                            <svg className="w-4 h-4 text-purple-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                            <div className="text-xs">
                                <span className="block text-white font-medium">Beyond the Grid</span>
                                <span className="text-neutral-500">F1 Official Podcast</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        {/* Favorite Tracks/Cars Strip */}
        <div className="bg-[#1c1c1e] p-6 rounded-3xl border border-white/5">
            <h4 className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-6">Favorites</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: "Track", val: "Suzuka Circuit", sub: "Sector 1 Flow" },
                    { label: "Chassis", val: "McLaren MP4/4", sub: "Lowline Aero" },
                    { label: "Engine", val: "Ferrari V10", sub: "3.0L Naturally Aspirated" },
                    { label: "Driver", val: "Ayrton Senna", sub: "Pure Commitment" }
                ].map((item, i) => (
                    <div key={i} className="p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                        <div className="text-[10px] text-neutral-500 uppercase mb-1">{item.label}</div>
                        <div className="text-white font-bold text-sm truncate">{item.val}</div>
                        <div className="text-[10px] text-neutral-400 truncate">{item.sub}</div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

// --- MAIN MODAL COMPONENT ---

export const LearnMoreModal: React.FC<LearnMoreModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'journey' | 'routine' | 'education' | 'interests'>('profile');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
      if (isOpen) {
          setMounted(true);
          document.body.style.overflow = 'hidden';
      } else {
          const timer = setTimeout(() => setMounted(false), 500);
          document.body.style.overflow = 'auto';
          return () => clearTimeout(timer);
      }
  }, [isOpen]);

  if (!mounted && !isOpen) return null;

  return (
    <div 
        className={`fixed inset-0 z-[200] flex items-center justify-center p-4 transition-all duration-500 ${isOpen ? 'opacity-100 backdrop-blur-xl' : 'opacity-0 backdrop-blur-none pointer-events-none'}`}
    >
      
      {/* Background Dimmer */}
      <div className="absolute inset-0 bg-black/80" onClick={onClose}></div>
      
      {/* Main Container */}
      <div 
        className={`
            relative w-full max-w-5xl bg-[#0f0f11] border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row h-[90vh] md:h-[750px]
            transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) ring-1 ring-white/5
            ${isOpen ? 'scale-100 translate-y-0' : 'scale-90 translate-y-20'}
        `}
      >
        
        {/* Close Button */}
        <button 
            onClick={onClose} 
            className="absolute top-4 right-4 z-50 p-2 bg-white/5 hover:bg-white/20 rounded-full text-white transition-colors backdrop-blur-md border border-white/5"
        >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>

        {/* --- LEFT COLUMN: NAVIGATION --- */}
        <div className="w-full md:w-64 bg-[#151516] border-b md:border-b-0 md:border-r border-white/5 flex flex-col p-6 relative z-20">
            <div className="mb-10 mt-2">
                 <div className="text-white font-bold text-xl tracking-tight">About Me.</div>
                 <div className="text-neutral-500 text-xs mt-1">Marco Antonio Bautista</div>
            </div>

            <nav className="space-y-2">
                {[
                    { id: 'profile', label: 'Who I Am', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
                    { id: 'journey', label: 'My Story', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
                    { id: 'routine', label: 'Day in the Life', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
                    { id: 'education', label: 'Education', icon: 'M12 14l9-5-9-5-9 5 9 5z' },
                    { id: 'interests', label: 'Interests', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
                ].map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id as any)}
                        className={`w-full flex items-center px-4 py-3.5 rounded-xl transition-all duration-300 group relative overflow-hidden ${activeTab === item.id ? 'bg-white text-black font-semibold shadow-lg scale-105' : 'text-neutral-400 hover:bg-white/5 hover:text-white'}`}
                    >
                        <svg className={`w-5 h-5 mr-3 transition-colors ${activeTab === item.id ? 'text-black' : 'text-neutral-500 group-hover:text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                        </svg>
                        {item.label}
                    </button>
                ))}
            </nav>

            <div className="mt-auto pt-6 border-t border-white/5">
                <div className="flex items-center space-x-3 opacity-60">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-[10px] uppercase tracking-widest text-neutral-400">Open to Work</span>
                </div>
            </div>
        </div>

        {/* --- MAIN CONTENT AREA --- */}
        <div className="flex-1 bg-[#050505] p-6 md:p-10 overflow-y-auto custom-scrollbar relative">
            
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto h-full">
                {activeTab === 'profile' && <PersonalProfile />}
                {activeTab === 'journey' && <JourneySection />}
                {activeTab === 'routine' && <DayInLife />}
                {activeTab === 'education' && <EducationSection />}
                {activeTab === 'interests' && <InterestsSection />}
            </div>

        </div>
      </div>
    </div>
  );
};
