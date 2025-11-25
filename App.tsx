
import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { F1 } from './components/F1';
import { ChatWidget } from './components/ChatWidget';
import { LinkedInSync } from './components/LinkedInSync';
import { PROFILE } from './constants';
import { SyncedProfileData } from './types';

function App() {
  const [profile, setProfile] = useState<SyncedProfileData>(PROFILE);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      <Navbar />
      
      <main>
        <Hero profile={profile} />
        <About profile={profile} />
        <Experience />
        <Projects />
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
