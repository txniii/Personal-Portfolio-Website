
import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { About } from './About';
import { Experience } from './Experience';
import { Projects } from './Projects';
import { Contact } from './Contact';
import { F1 } from './F1';
import { ChatWidget } from './ChatWidget';
import { LinkedInSync } from './LinkedInSync';
import { Certificates } from './Certificates';
import { Research } from './Research';
import { Events } from './Events';
import { PROFILE } from '../constants';
import { SyncedProfileData } from '../types';

// Subtle, minimalist section separator
const SectionSeparator = () => (
  <div className="flex justify-center w-full bg-black relative z-20 pointer-events-none">
    <div className="h-px w-3/4 md:w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
  </div>
);

function App() {
  const [profile, setProfile] = useState<SyncedProfileData>(PROFILE);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      <Navbar />
      
      <main>
        <Hero profile={profile} />
        
        <SectionSeparator />
        <About profile={profile} />
        
        <SectionSeparator />
        <Experience />
        
        <SectionSeparator />
        <Projects />

        <SectionSeparator />
        <Research />
        
        <SectionSeparator />
        <Certificates />

        <SectionSeparator />
        <Events />

        <SectionSeparator />
        <Contact />
      </main>

      <footer className="py-12 border-t border-neutral-900 mt-0">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-neutral-600">
          <p>&copy; {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
             <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
             <a href="#" className="hover:text-white transition-colors">GitHub</a>
             <a href="#" className="hover:text-white transition-colors">Twitter</a>
          </div>
        </div>
      </footer>

      <ChatWidget />
      
      {/* Automation Component - runs in background */}
      <LinkedInSync 
        currentProfile={profile} 
        onUpdate={(newData) => setProfile(newData)} 
      />
    </div>
  );
}

export default App;