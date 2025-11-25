
import React from 'react';
import { CERTIFICATES } from '../constants';

export const Certificates: React.FC = () => {
  return (
    <section id="certificates" className="py-32 bg-black relative border-t border-neutral-900">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-semibold text-white mb-16 tracking-tight">Certifications.</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CERTIFICATES.map((cert) => (
            <a 
              key={cert.id}
              href={cert.credentialUrl || "#"}
              target={cert.credentialUrl ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className="group flex items-center p-6 rounded-3xl bg-[#1d1d1f] border border-white/5 hover:border-white/20 transition-all duration-300 hover:bg-white/5 hover:scale-[1.02] cursor-pointer"
            >
               {/* Icon */}
               <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mr-6 group-hover:bg-white/10 transition-colors shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-400 group-hover:text-white transition-colors">
                    <path d="M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z"/>
                    <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12"/>
                  </svg>
               </div>
               
               <div className="flex-1 min-w-0">
                 <h3 className="text-lg font-medium text-white group-hover:text-blue-400 transition-colors mb-1 truncate">{cert.title}</h3>
                 <p className="text-neutral-400 text-sm mb-1 truncate">{cert.issuer}</p>
                 <p className="text-neutral-600 text-xs font-mono uppercase tracking-wide">{cert.date}</p>
               </div>

               <div className="ml-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-500">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
               </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
