import { useState, useEffect } from 'react';
import { Menu, X, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../clsx.js';

const navLinks = [
  { name: 'Home', href: "/" },
  { name: 'Services', href: '/services' },
  { name: 'Gallery', href: '/gallery' },
  // { name: 'Testimonials', href: '/testimonials' },
  { name: 'Clients', href: '/clients' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  // Make navbar transparent ONLY on the home page when at the top
  const isHome = currentPath === '/';
  const isTransparent = isHome && !isScrolled;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full transition-all duration-300 py-2',
        isTransparent
          ? 'bg-black/20 backdrop-blur-md border-b border-white/15 shadow-[0_4px_30px_rgba(0,0,0,0.15)]'
          : 'bg-bg-card/95 backdrop-blur-lg border-b border-border/40 shadow-[0_4px_30px_rgba(0,0,0,0.03)]'
      )}
    >
      <div className="mx-auto w-full px-1 sm:px-6 flex items-center justify-between">
        {/* Left: Brand / Logo */}
        <Link to="/" className="flex items-center gap-1.5 min-[375px]:gap-2 md:gap-3 group relative">
          <div className="relative shrink-0">
            <img 
              src="/logo_withoutbg.png" 
              alt="Ayojon Event Logo" 
              className="h-9 w-9 min-[375px]:h-11 min-[375px]:w-11 md:h-16 md:w-16 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" 
            />
            {/* Subtle glow behind logo on hover */}
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
          
          <div className={cn(
            "flex flex-col border-r border-border/40 pr-1.5 min-[375px]:pr-2 md:pr-5 shrink-0",
            // isTransparent && "drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
          )}>
            <span className={cn(
              "text-lg min-[375px]:text-xl md:text-3xl font-heading font-bold tracking-tight transition-colors leading-none",
              isTransparent ? "text-text-light" : "text-text-primary"
            )}>Ayojon</span>
            <span className={cn(
              "text-[0.4rem] min-[375px]:text-[0.65rem] md:text-[14px] uppercase tracking-[0.1em] md:tracking-[0.2em] font-bold mt-0.5 md:mt-1 whitespace-nowrap", 
              isTransparent ? "text-white/80" : "text-primary"
            )}>Event Management Service</span>
          </div>

          {/* Attractive ISO Badge (Always visible) */}
          <div className={cn(
            "flex items-center gap-1 px-1.5 min-[375px]:px-2 md:px-3 py-1 md:py-1.5 rounded-full border transition-all duration-300 shadow-sm shrink-0",
            isTransparent 
              ? "bg-blue-900/40 border-blue-400/30 text-blue-50 backdrop-blur-md" 
              : "bg-gradient-to-r from-blue-50 to-blue-100/50 border-blue-200 text-blue-800 shadow-blue-500/10"
          )}>
            <div className={cn(
              "rounded-full",
              isTransparent ? "bg-blue-400/30" : "bg-blue-200/60"
            )}>
              <ShieldCheck className="w-3 h-3 min-[375px]:w-3.5 min-[375px]:h-3.5 md:w-4 md:h-4" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="hidden min-[400px]:block xl:hidden text-[10px] font-black leading-none tracking-wider">ISO CERTIFIED</span>
              <span className="hidden xl:block text-[12px] font-black leading-none tracking-[0.1em]">ISO CERTIFIED EVENT BRAND</span>
              <span className="text-[6.5px] min-[375px]:text-[9px] md:text-[13px] font-bold tracking-[0.1em] opacity-90 md:mt-1 leading-none">ISO 9001:2015</span>
            </div>
          </div>
        </Link>

        {/* Center: Desktop Nav Links */}
        <nav className="hidden xl:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => {
            const isActive = currentPath === link.href;
            return (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  'relative text-sm font-semibold uppercase tracking-[0.2em] transition-all duration-300 py-2 group',
                  isTransparent
                    ? isActive 
                      ? 'text-primary-light ' 
                      : 'text-text-light/90 hover:text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]'
                    : isActive 
                      ? 'text-primary' 
                      : 'text-text-primary/70 hover:text-primary'
                )}
              >
                {link.name}
                {/* Premium underline animation */}
                <span className={cn(
                  "absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-300",
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                )} />
              </Link>
            );
          })}
        </nav>

        {/* Right: CTA & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Link
            to="/contact"
            className="hidden xl:inline-flex items-center justify-center rounded-full bg-primary px-7 py-2.5 text-[13px] tracking-wide uppercase font-semibold text-text-light shadow-[0_4px_14px_rgba(106,13,173,0.3)] transition-all duration-300 hover:bg-primary-light hover:-translate-y-0.5"
          >
            Book Now
          </Link>
          
          <button
            className={cn(
              "xl:hidden p-2 transition-colors active:scale-95",
              isTransparent ? "text-text-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" : "text-text-primary"
            )}
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] flex flex-col bg-bg-main px-2 py-2 xl:hidden h-[100dvh]"
          >
            <div className="flex items-start justify-between mb-12 gap-2">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-1.5 min-[375px]:gap-2 mt-2">
                <img src="/logo_withoutbg.png" alt="Ayojon Events Logo" className="h-9 w-9 min-[375px]:h-11 min-[375px]:w-11 shrink-0" />
                <div className="flex flex-col border-r border-border/40 pr-1.5 min-[375px]:pr-2 shrink-0">
                  <span className="text-lg min-[375px]:text-xl font-heading font-bold tracking-tight text-text-primary leading-none">Ayojon</span>
                  <span className="text-[0.4rem] min-[375px]:text-[0.65rem] uppercase tracking-[0.1em] text-primary font-bold mt-0.5 whitespace-nowrap">Event Management Service</span>
                </div>
                {/* Attractive ISO Badge for Mobile Menu */}
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 px-1.5 min-[375px]:px-2 py-1 rounded-full text-blue-800 flex items-center gap-1 w-fit shadow-sm shrink-0">
                  <ShieldCheck className="w-3 h-3 min-[375px]:w-3.5 min-[375px]:h-3.5 shrink-0" />
                  <div className="flex flex-col justify-center">
                    <span className="hidden min-[400px]:block text-[10px] font-black leading-none tracking-wider">ISO CERTIFIED</span>
                    <span className="text-[6.5px] min-[375px]:text-[9px] font-bold tracking-widest mt-[1px] leading-none">ISO 9001:2015</span>
                  </div>
                </div>
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-1 text-text-primary hover:text-primary transition-colors shrink-0"
                aria-label="Close menu"
              >
                <X className="w-7 h-7 min-[375px]:w-8 min-[375px]:h-8" />
              </button>
            </div>
            
            <nav className="flex flex-col gap-6 relative h-screen">
              {navLinks.map((link) => {
                const isActive = currentPath === link.href;
                return (
                  <motion.div
                    key={link.name}
                    whileHover={{ x: 10 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Link
                      to={link.href}
                      className={cn(
                        "text-2xl font-heading font-semibold transition-colors block",
                        isActive ? "text-primary" : "text-text-secondary hover:text-primary"
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
              <div className="mt-8 w-full absolute bottom-10">
                <Link
                  to="/contact"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-6 py-4 text-lg font-medium text-text-light shadow-soft transition-all hover:bg-primary-light active:scale-95"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Book Now
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
