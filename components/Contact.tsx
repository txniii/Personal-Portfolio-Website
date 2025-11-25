
import React, { useState, useEffect } from 'react';
import { LINKEDIN_PROFILE_URL } from '../constants';

export const Contact: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isFormOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isFormOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setStatus('submitting');

    try {
        // Using FormSubmit.co for serverless email handling
        // Note: The first time you submit to a new email address, you must confirm it in your inbox!
        const response = await fetch("https://formsubmit.co/ajax/mabautista358@gmail.com", {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: formState.name,
                email: formState.email,
                message: formState.message,
                _subject: `Portfolio Contact: ${formState.name} [${new Date().toLocaleTimeString()}]`,
                _template: 'table',
                // Removing _captcha: 'false' to ensure better deliverability for unverified forms
            })
        });

        if (response.ok) {
            setStatus('success');
            // Reset and close after success animation
            setTimeout(() => {
                setIsFormOpen(false);
                setStatus('idle');
                setFormState({ name: '', email: '', message: '' });
            }, 3000);
        } else {
            console.error("Submission failed");
            setStatus('error');
        }
    } catch (error) {
        console.error("Submission error", error);
        setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-32 bg-black relative overflow-hidden">
      {/* Background Ambience - Animated Blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-800/20 rounded-full blur-[80px] mix-blend-screen animate-blob opacity-40 filter"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-purple-800/20 rounded-full blur-[80px] mix-blend-screen animate-blob opacity-40 filter" style={{ animationDelay: '2s' }}></div>
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-900/20 rounded-full blur-[100px] mix-blend-screen animate-blob opacity-40 filter" style={{ animationDelay: '4s' }}></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 h-full">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-semibold text-white mb-8 tracking-tight">
            Let's talk.
          </h2>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto font-light leading-relaxed">
            Whether you have a groundbreaking idea or just want to chat about embedded systems, 
            I'm always open to new conversations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
           {/* Email Card */}
           <div 
             className="group p-8 rounded-3xl bg-[#1d1d1f] border border-white/5 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between min-h-[200px] cursor-default"
           >
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-1">Email</h3>
                <span className="text-neutral-400">mb963@njit.edu</span>
              </div>
           </div>

           {/* LinkedIn Card */}
           <a 
             href={LINKEDIN_PROFILE_URL}
             target="_blank"
             rel="noreferrer"
             className="group p-8 rounded-3xl bg-[#1d1d1f] border border-white/5 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between min-h-[200px]"
           >
              <div className="w-12 h-12 rounded-full bg-[#0077b5]/10 flex items-center justify-center text-[#0077b5] mb-6 group-hover:scale-110 transition-transform duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-1">LinkedIn</h3>
                <span className="text-neutral-400 group-hover:text-white transition-colors">Connect professionally</span>
              </div>
           </a>
        </div>

        <div className="sticky bottom-10 z-50 text-center pointer-events-none pb-8">
            <button 
              onClick={() => setIsFormOpen(true)}
              className="pointer-events-auto inline-block bg-white text-black px-10 py-4 rounded-full font-semibold text-lg hover:bg-neutral-200 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              Get In Touch
            </button>
        </div>
      </div>

      {/* Contact Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/80 backdrop-blur-xl animate-fade-in"
                onClick={() => setIsFormOpen(false)}
            ></div>

            {/* Modal Content */}
            <div className="relative w-full max-w-lg bg-[#1c1c1e] rounded-3xl overflow-hidden shadow-2xl border border-white/10 animate-fade-in-up flex flex-col">
                
                {/* Close Button */}
                <button 
                    onClick={() => setIsFormOpen(false)}
                    className="absolute top-5 right-5 z-20 p-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>

                <div className="p-8 md:p-10">
                    <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">Contact.</h3>
                    <p className="text-neutral-400 text-sm mb-8">Fill out the form below and I'll get back to you shortly.</p>

                    {status === 'success' ? (
                        <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
                            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            </div>
                            <h4 className="text-xl font-semibold text-white mb-2">Message Sent</h4>
                            <p className="text-neutral-400 text-center max-w-[80%] mx-auto">
                                Thank you for reaching out. Please also check your email for a confirmation if this is your first time messaging.
                            </p>
                        </div>
                    ) : status === 'error' ? (
                        <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
                             <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
                                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <h4 className="text-xl font-semibold text-white mb-2">Connection Issue</h4>
                            <p className="text-neutral-400 text-center mb-6">
                                The secure relay encountered an error. Please email me directly instead.
                            </p>
                            <a href="mailto:mabautista358@gmail.com" className="bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-neutral-200 transition-colors">
                                Email mabautista358@gmail.com
                            </a>
                            <button onClick={() => setStatus('idle')} className="mt-4 text-sm text-neutral-500 hover:text-white underline">
                                Try Again
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label htmlFor="name" className="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2 ml-1">Name</label>
                                <input 
                                    type="text" 
                                    id="name"
                                    required
                                    value={formState.name}
                                    onChange={(e) => setFormState({...formState, name: e.target.value})}
                                    className="w-full bg-[#2c2c2e] border border-white/5 rounded-xl px-4 py-3.5 text-white placeholder-neutral-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                                    placeholder="Your Name"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2 ml-1">Email</label>
                                <input 
                                    type="email" 
                                    id="email"
                                    required
                                    value={formState.email}
                                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                                    className="w-full bg-[#2c2c2e] border border-white/5 rounded-xl px-4 py-3.5 text-white placeholder-neutral-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                                    placeholder="name@example.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2 ml-1">Message</label>
                                <textarea 
                                    id="message"
                                    required
                                    rows={4}
                                    value={formState.message}
                                    onChange={(e) => setFormState({...formState, message: e.target.value})}
                                    className="w-full bg-[#2c2c2e] border border-white/5 rounded-xl px-4 py-3.5 text-white placeholder-neutral-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all resize-none"
                                    placeholder="How can I help you?"
                                />
                            </div>

                            <button 
                                type="submit" 
                                disabled={status === 'submitting'}
                                className="w-full bg-white text-black font-bold py-4 rounded-xl mt-4 hover:bg-neutral-200 transition-colors disabled:opacity-50 flex items-center justify-center"
                            >
                                {status === 'submitting' ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending...
                                    </>
                                ) : (
                                    "Send Message"
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
      )}
    </section>
  );
};
