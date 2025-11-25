
import React, { useEffect, useState } from 'react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open to prevent background scrolling
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Research', href: '#research' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'Events', href: '#events' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
        // Account for fixed navbar height roughly
        const offsetTop = element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    } else if (href === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ease-in-out ${
          scrolled || isMobileMenuOpen ? 'glass py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <div 
              className="flex-shrink-0 flex items-center cursor-pointer" 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <img 
                src="/M(1).png"         
                alt="Logo" 
                className="h-12 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex space-x-6 text-sm font-medium text-neutral-400">
                  {navLinks.map((link) => (
                      <a 
                          key={link.name}
                          href={link.href} 
                          onClick={(e) => handleLinkClick(e, link.href)}
                          className="hover:text-white transition-colors relative group"
                      >
                          {link.name}
                          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                      </a>
                  ))}
              </div>
              
              <div className="h-4 w-px bg-white/10 mx-2"></div>

              {/* Prominent Portfolio Button */}
              <a 
                  href="#work"
                  onClick={(e) => handleLinkClick(e, '#work')}
                  className="group relative bg-white text-black px-5 py-2.5 rounded-full text-xs font-bold tracking-wide hover:bg-neutral-200 transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_25px_rgba(255,255,255,0.25)] flex items-center gap-2 overflow-hidden"
              >
                  <span className="relative z-10">Portfolio</span>
                  <svg className="w-3 h-3 relative z-10 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </a>
            </div>

            {/* Mobile Hamburger Button */}
            <button 
                className="md:hidden text-white z-[70] p-2 focus:outline-none relative"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
            >
                <div className="w-6 h-5 flex flex-col justify-between items-end">
                    <span className={`h-0.5 bg-white rounded-full transition-all duration-300 ease-in-out origin-right ${isMobileMenuOpen ? 'w-6 -rotate-45 translate-y-[1px]' : 'w-6'}`}></span>
                    <span className={`h-0.5 bg-white rounded-full transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-0 scale-0' : 'w-4'}`}></span>
                    <span className={`h-0.5 bg-white rounded-full transition-all duration-300 ease-in-out origin-right ${isMobileMenuOpen ? 'w-6 rotate-45 -translate-y-[1px]' : 'w-5'}`}></span>
                </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl transition-all duration-500 md:hidden flex flex-col justify-center items-center space-y-8 ${
            isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
          {/* Prominent Mobile Portfolio Link */}
          <a 
              href="#work" 
              onClick={(e) => handleLinkClick(e, '#work')}
              className={`text-5xl font-bold text-white tracking-tighter transition-all duration-700 transform hover:text-blue-500 relative group ${
                  isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `100ms` }}
          >
              Portfolio
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
          </a>

          {navLinks.map((link, index) => (
              <a 
                  key={link.name}
                  href={link.href} 
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`text-2xl font-medium text-neutral-400 tracking-tight transition-all duration-700 transform hover:text-white ${
                      isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: `${200 + (index * 50)}ms` }}
              >
                  {link.name}
              </a>
          ))}
      </div>
    </>
  );
};