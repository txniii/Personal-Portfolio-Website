
import React, { useState } from 'react';
import { EVENTS } from '../constants';
import { EventItem } from '../types';

// --- SUB-COMPONENTS ---

const EventLogo: React.FC<{ type?: string; className?: string }> = ({ type, className }) => {
    let bgColor = "bg-neutral-800";
    let content = "EV";
    
    if (type === 'shpe') {
        bgColor = "bg-orange-600";
        content = "SHPE";
    } else if (type === 'alpfa') {
        bgColor = "bg-red-700";
        content = "ALPFA";
    } else if (type === 'njit') {
        bgColor = "bg-red-600";
        content = "NJIT";
    }

    return (
        <div className={`flex items-center justify-center font-bold text-white rounded-lg shadow-sm ${bgColor} ${className}`}>
            {content}
        </div>
    );
};

const UpcomingEventTicket: React.FC<{ event: EventItem; index: number }> = ({ event, index }) => {
    return (
        <div 
            className="group relative w-full overflow-hidden rounded-3xl bg-[#1c1c1e] border border-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl flex flex-col md:flex-row animate-fade-in-up"
            style={{ animationDelay: `${index * 150}ms` }}
        >
             {/* Left: Date Visual */}
             <div className="md:w-32 bg-gradient-to-br from-blue-600 to-blue-800 p-6 flex flex-col items-center justify-center text-center relative overflow-hidden shrink-0">
                 {/* Decorative Circles */}
                 <div className="absolute top-0 left-0 w-16 h-16 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                 <div className="absolute bottom-0 right-0 w-16 h-16 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2"></div>
                 
                 <div className="relative z-10">
                     <div className="text-white/80 text-xs font-bold uppercase tracking-widest mb-1">{event.date.split(' ')[0]}</div>
                     <div className="text-white text-3xl font-bold tracking-tighter">{event.date.split(' ')[1] || '2025'}</div>
                 </div>
             </div>

             {/* Right: Info */}
             <div className="p-6 md:p-8 flex-1 flex flex-col justify-center relative">
                 {/* Perforated Line Visual (CSS Pattern) */}
                 <div className="absolute left-0 top-0 bottom-0 w-[1px] hidden md:block border-l-2 border-dashed border-[#1c1c1e] -ml-[1px] z-20"></div>
                 
                 {/* Tag */}
                 <div className="flex items-center justify-between mb-3">
                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-widest border border-blue-500/20">
                        Upcoming
                     </span>
                     <EventLogo type={event.logo} className="w-8 h-8 text-[8px]" />
                 </div>

                 <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                     {event.title}
                 </h3>
                 <div className="flex items-center text-neutral-400 text-sm mb-4">
                     <svg className="w-4 h-4 mr-1.5 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                     {event.location}
                 </div>
                 
                 <p className="text-neutral-300 text-sm leading-relaxed mb-6">
                     {event.description}
                 </p>
                 
                 {/* Objectives Section */}
                 {event.objectives && (
                     <div className="mb-6 bg-black/20 p-4 rounded-xl border border-white/5">
                         <div className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mb-2">Mission Objectives</div>
                         <ul className="space-y-1">
                             {event.objectives.map((obj, i) => (
                                 <li key={i} className="flex items-start text-xs text-neutral-300">
                                     <span className="mr-2 text-blue-500">›</span>
                                     {obj}
                                 </li>
                             ))}
                         </ul>
                     </div>
                 )}

                 {/* Action Bar */}
                 <div className="flex items-center justify-between pt-4 border-t border-white/5">
                     <div className="flex items-center space-x-2 text-[10px] text-neutral-500 font-mono">
                         <span>ID: {Math.random().toString(36).substr(2, 6).toUpperCase()}</span>
                     </div>
                     <a 
                        href={event.link || '#'}
                        target="_blank"
                        rel="noreferrer" 
                        className="flex items-center space-x-2 text-xs font-bold text-white hover:text-blue-400 transition-colors uppercase tracking-widest"
                     >
                         <span>Event Details</span>
                         <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                     </a>
                 </div>
             </div>
        </div>
    );
};

const PastEventCard: React.FC<{ event: EventItem; index: number; onClick: (e: EventItem) => void }> = ({ event, index, onClick }) => {
    return (
        <div 
            onClick={() => onClick(event)}
            className="group bg-[#111] p-6 rounded-3xl border border-white/5 hover:border-white/10 transition-all duration-300 hover:bg-[#151515] animate-fade-in cursor-pointer hover:-translate-y-1 hover:shadow-xl"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            <div className="flex items-start justify-between mb-4">
                <div className="text-[10px] text-neutral-500 uppercase tracking-widest font-mono border border-white/5 px-2 py-1 rounded bg-black">
                    {event.date}
                </div>
                <div className="opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all">
                   <EventLogo type={event.logo} className="w-8 h-8 text-[8px]" />
                </div>
            </div>
            
            <h4 className="text-white font-bold text-lg mb-2 leading-tight group-hover:text-blue-400 transition-colors">
                {event.title}
            </h4>
            <div className="text-xs text-neutral-500 mb-4 flex items-center">
                 <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                 {event.location}
            </div>
            
            <p className="text-neutral-400 text-sm leading-relaxed mb-6 line-clamp-3 group-hover:line-clamp-none transition-all">
                {event.description}
            </p>

            <div className="flex items-center justify-between border-t border-white/5 pt-4">
                 <div className="flex items-center space-x-2">
                     <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                     <span className="text-[10px] text-neutral-400 uppercase tracking-widest">Debrief Available</span>
                 </div>
                 <div className="text-xs text-white font-medium group-hover:translate-x-1 transition-transform">
                     Read Report &rarr;
                 </div>
            </div>
        </div>
    );
};

// --- MODAL COMPONENT ---

const EventModal: React.FC<{ event: EventItem; onClose: () => void }> = ({ event, onClose }) => {
    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-xl animate-fade-in" onClick={onClose}></div>
            
            <div className="relative w-full max-w-4xl bg-[#1c1c1e] rounded-[2rem] border border-white/10 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-fade-in-up">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-900/20 to-transparent p-8 md:p-10 border-b border-white/5 relative">
                    <button 
                        onClick={onClose}
                        className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 rounded-full text-white transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                    
                    <div className="flex items-center space-x-3 mb-4">
                        <EventLogo type={event.logo} className="w-10 h-10 text-[10px]" />
                        <span className="px-2 py-1 rounded border border-white/10 bg-black/20 text-xs font-mono text-neutral-400">{event.date}</span>
                        <span className="px-2 py-1 rounded border border-white/10 bg-black/20 text-xs font-mono text-neutral-400">{event.location}</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">{event.title}</h2>
                    <p className="text-neutral-400 max-w-2xl">{event.description}</p>
                </div>

                {/* Body - Scrollable */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-8 md:p-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {/* Main Content */}
                        <div className="md:col-span-2 space-y-8">
                            {event.extendedDescription && (
                                <div>
                                    <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-4 flex items-center">
                                        <span className="w-1 h-4 bg-blue-500 rounded-full mr-3"></span>
                                        The Debrief
                                    </h4>
                                    <p className="text-neutral-300 leading-relaxed text-base whitespace-pre-wrap">
                                        {event.extendedDescription}
                                    </p>
                                </div>
                            )}

                            {event.keyTakeaways && (
                                <div>
                                    <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-4 flex items-center">
                                        <span className="w-1 h-4 bg-purple-500 rounded-full mr-3"></span>
                                        Key Takeaways
                                    </h4>
                                    <ul className="space-y-3">
                                        {event.keyTakeaways.map((point, i) => (
                                            <li key={i} className="flex items-start bg-white/5 p-4 rounded-xl border border-white/5">
                                                <svg className="w-5 h-5 text-purple-400 mr-3 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                <span className="text-neutral-300 text-sm">{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-8">
                            {/* Stats */}
                            {event.stats && (
                                <div className="bg-black/30 rounded-2xl p-6 border border-white/5">
                                    <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-4">Mission Stats</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        {event.stats.map((stat, i) => (
                                            <div key={i}>
                                                <div className="text-xl font-bold text-white font-mono">{stat.value}</div>
                                                <div className="text-[10px] text-neutral-500 uppercase">{stat.label}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Recommendations */}
                            {event.recommendations && (
                                <div>
                                    <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-4">Tactical Intel</h4>
                                    <div className="space-y-2">
                                        {event.recommendations.map((rec, i) => (
                                            <div key={i} className="flex items-start space-x-3 text-sm text-neutral-400">
                                                <span className="text-yellow-500 mt-1">⚠️</span>
                                                <span>{rec}</span>
                                            </div>
                                        ))}
                                    </div>
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

export const Events: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const upcomingEvents = EVENTS.filter(e => e.status === 'upcoming');
  const pastEvents = EVENTS.filter(e => e.status === 'past');

  const handleEventClick = (event: EventItem) => {
      setSelectedEvent(event);
      document.body.style.overflow = 'hidden';
  };

  const handleClose = () => {
      setSelectedEvent(null);
      document.body.style.overflow = 'auto';
  };

  return (
    <section id="events" className="py-32 bg-black relative border-t border-white/5">
       <div className="max-w-6xl mx-auto px-6">
          
          <div className="mb-20 max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-semibold text-white tracking-tight mb-6">
                  Events & <br/> Conferences.
              </h2>
              <p className="text-xl text-neutral-400 font-light leading-relaxed">
                  Engaging with the engineering community, sharing research, and connecting with future leaders.
              </p>
          </div>

          {/* Upcoming Section */}
          <div className="mb-24">
              <div className="flex items-center space-x-4 mb-8">
                  <div className="h-px w-12 bg-blue-500"></div>
                  <span className="text-blue-500 font-mono text-xs font-bold tracking-[0.2em] uppercase">Upcoming Engagements</span>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {upcomingEvents.map((event, index) => (
                      <UpcomingEventTicket key={event.id} event={event} index={index} />
                  ))}
                  {upcomingEvents.length === 0 && (
                      <div className="col-span-full p-8 text-center text-neutral-500 border border-white/5 rounded-3xl border-dashed">
                          No upcoming public events scheduled at this time.
                      </div>
                  )}
              </div>
          </div>

          {/* Past Section */}
          <div>
              <div className="flex items-center space-x-4 mb-8">
                   <div className="h-px w-12 bg-neutral-700"></div>
                   <span className="text-neutral-500 font-mono text-xs font-bold tracking-[0.2em] uppercase">Archive & Attendance</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pastEvents.map((event, index) => (
                      <PastEventCard 
                        key={event.id} 
                        event={event} 
                        index={index} 
                        onClick={handleEventClick}
                      />
                  ))}
              </div>
          </div>

       </div>

       {/* Interactive Modal */}
       {selectedEvent && (
           <EventModal event={selectedEvent} onClose={handleClose} />
       )}
    </section>
  );
};
