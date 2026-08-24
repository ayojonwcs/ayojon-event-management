import { MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

// ── Custom Social SVG Icons ────────────────────────────────────────────────────
// const Facebook = ({ className }) => (
//   <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
//   </svg>
// );
// const Instagram = ({ className }) => (
//   <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
//     <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
//     <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
//   </svg>
// );
// const Youtube = ({ className }) => (
//   <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
//     <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
//   </svg>
// );
// const Whatsapp = ({ className }) => (
//   <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
//   </svg>
// );

// ── Data ───────────────────────────────────────────────────────────────────────
const navLinks = [
  { name: 'Home',         href: '/' },
  { name: 'Services',     href: '/services' },
  { name: 'Gallery',      href: '/gallery' },
  // { name: 'Testimonials', href: '/testimonials' },
  { name: 'Clients',      href: '/clients' },
  { name: 'Contact',      href: '/contact' },
];

const eventsOrganized = [
  'Grand Weddings',
  'Birthday Parties',
  'Anniversaries',
  'Corporate Events',
  'Entertainment Shows',
  'Cultural Shows',
  'Carnivals',
  'Winter Picnics',
];

const servicesProvided = [
  'Venue Booking',
  'Wedding Planning',
  'Food & Catering',
  'Photography',
  'Artist & Celebrity',
  'Decoration',
  'Music / Dance',
  'Special Entry',
];

// const socials = [
//   { Icon: Instagram, label: 'Instagram', href: '#' },
//   { Icon: Facebook,  label: 'Facebook',  href: '#' },
//   { Icon: Youtube,   label: 'YouTube',   href: '#' },
//   { Icon: Whatsapp,  label: 'WhatsApp',  href: '/contact' },
// ];

export default function Footer() {
  return (
    <footer className="w-full font-body overflow-hidden">
      {/* ── Main Footer Body ─────────────────────────────────────────────────── */}
      <div className="bg-[#0f0f0f] py-10 relative">
        {/* Ambient purple glow top-left */}
        <div className="absolute top-0 left-0 w-[500px] h-[300px] bg-primary/10 blur-[120px] rounded-full -z-0 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[250px] bg-accent/8 blur-[100px] rounded-full -z-0 pointer-events-none"></div>

        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">

          {/* ── Grid ─────────────────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-13 gap-12 lg:gap-6 mb-16">

            {/* Brand Column */}
            <div className="lg:col-span-3 flex flex-col gap-8">
              <Link to="/" className="inline-flex items-center gap-4 group">
                <img src="/logo.jpg" alt="Ayojon Event Logo" className="h-20 md:h-24 w-auto rounded-lg shadow-[0_0_20px_rgba(106,13,173,0.3)] transition-transform duration-500 group-hover:scale-105" />
                <div className="flex flex-col">
                  <span className="text-3xl md:text-4xl font-heading font-bold tracking-wide text-white">Ayojon</span>
                  <span className="text-[0.65rem] md:text-xs uppercase tracking-[0.3em] text-primary-light font-bold mt-1">Event Management Service</span>
                </div>
              </Link>
              <p className="text-white/50 leading-relaxed text-sm max-w-xs">
                Crafting unforgettable Indian celebrations with royal elegance and meticulous precision. From the first hello to the final goodbye.
              </p>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <h4 className="text-white text-sm font-bold uppercase tracking-widest">
                Quick Links
              </h4>
              <ul className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="group flex items-center gap-2 text-white/45 hover:text-white text-sm transition-colors duration-300"
                    >
                      <span className="w-0 group-hover:w-4 h-[1px] bg-primary transition-all duration-300 rounded-full"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Events We Organize */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <h4 className="text-white text-sm font-bold uppercase tracking-widest">
                Events We Organize
              </h4>
              <ul className="flex flex-col gap-3">
                {eventsOrganized.map((item) => (
                  <li key={item}>
                    <a
                      href="/services"
                      className="group flex items-center gap-2 text-white/45 hover:text-white text-sm transition-colors duration-300"
                    >
                      <span className="w-0 group-hover:w-4 h-[1px] bg-primary transition-all duration-300 rounded-full"></span>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services We Provide */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <h4 className="text-white text-sm font-bold uppercase tracking-widest">
                Services We Provide
              </h4>
              <ul className="flex flex-col gap-3">
                {servicesProvided.map((item) => (
                  <li key={item}>
                    <a
                      href="/services"
                      className="group flex items-center gap-2 text-white/45 hover:text-white text-sm transition-colors duration-300"
                    >
                      <span className="w-0 group-hover:w-4 h-[1px] bg-primary transition-all duration-300 rounded-full"></span>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <h4 className="text-white text-sm font-bold uppercase tracking-widest">
                Get In Touch
              </h4>
              <ul className="flex flex-col gap-5">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-primary-light" />
                  </div>
                  <span className="text-white/45 text-sm leading-relaxed">
                    6VFW+JCV Bamchandaipur, West Bengal
                  </span>
                </li>
                <li className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-300">
                    <Phone className="w-4 h-4 text-primary-light group-hover:text-white transition-colors" />
                  </div>
                  <a
                    href="tel:+917468005090"
                    className="text-white/45 hover:text-white text-sm transition-colors"
                  >
                    +91 74680 05090
                  </a>
                </li>
                <li className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-300">
                    <Mail className="w-4 h-4 text-primary-light group-hover:text-white transition-colors" />
                  </div>
                  <a
                    href="mailto:prabirsinha@ayojoneventmanagermentservice.com"
                    className="text-white/45 hover:text-white text-sm transition-colors"
                  >
                    prabirsinha@ayojoneventmanagermentservice.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* ── Divider ───────────────────────────────────────────────────────── */}
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8"></div>

          {/* ── Bottom Bar ───────────────────────────────────────────────────── */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <p className="text-white/25 text-xs tracking-wide">
              © {new Date().getFullYear()} <span className="text-white/40 font-semibold">Ayojon Event Management Service</span>. All rights reserved. Crafted with ♥ in India.
            </p>
            {/* <div className="flex items-center gap-6">
              {['Privacy Policy', 'Terms of Service'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-white/25 hover:text-white/60 text-xs tracking-wide transition-colors"
                >
                  {item}
                </a>
              ))}
            </div> */}
          </div>

        </div>
      </div>
    </footer>
  );
}
