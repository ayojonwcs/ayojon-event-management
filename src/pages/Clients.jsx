import { motion } from 'framer-motion';
import {
  MessageCircle, Heart, Briefcase, Music, Users,
  PartyPopper,
  Gem
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';

// ─── Animation Variants ────────────────────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};
const stagger = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

// ─── Data ──────────────────────────────────────────────────────────────────────

const clientLogos = [
  { name: 'ANDD',                logo: '/ClientLogos/andd.png' },
  { name: 'XOXO',                logo: '/ClientLogos/xoxo.jpeg' },
  { name: 'MP Birla Group',      logo: '/ClientLogos/mpbirla.png' },
  { name: 'Double Bull Cement',  logo: '/ClientLogos/doublebull.jpg' },
  { name: 'Haier',               logo: '/ClientLogos/haier.png' },
  { name: 'Captain',             logo: '/ClientLogos/captiantmt.jpg' },
  { name: 'K.G.F.A',             logo: '/ClientLogos/kgfa.jpg' },
  { name: 'Maithan TMT 600',     logo: '/ClientLogos/maithantmt.avif' },
  { name: 'Motilal Oswal',       logo: '/ClientLogos/motilaloswal.png' },
  { name: 'Godrej Interio',      logo: '/ClientLogos/godrejinterio.png' },
  { name: 'Adhunik TMT Bars',    logo: '/ClientLogos/adhuniktmt.png' },
  { name: 'Dalmia Cement',       logo: '/ClientLogos/dalmiacement.jpg' },
  { name: 'UltraTech Cement',    logo: '/ClientLogos/ultratechcement.png' },
  { name: 'JSW',                 logo: '/ClientLogos/jsw.png' },
  { name: 'Shree Cement',        logo: '/ClientLogos/shreecement.png' },
  { name: 'ELEGANT STEEL',       logo: '/ClientLogos/elegantsteel.png' },
  { name: 'Elephant TMT',        logo: '/ClientLogos/elephanttmt.png' },
  { name: 'MICKY POWER+ TMT',    logo: '/ClientLogos/mickypowertmt.png' },
  { name: 'ACC Cement',          logo: '/ClientLogos/acccement.jpeg' },
  { name: 'GOVVINDA TMT',        logo: '/ClientLogos/govindatmt.png' },
  { name: 'Sintex',              logo: '/ClientLogos/sintex.png' },
  { name: 'Ambuja Cement',       logo: '/ClientLogos/ambujacement.png' },
  { name: 'HEXA',                logo: '/ClientLogos/hexatmt.jpg' },
  { name: 'Birla TMT Steel',     logo: '/ClientLogos/birlatmt.png' },
  { name: 'TUFCON XT',           logo: '/ClientLogos/tufconxt.jpg' },
  { name: 'Gagan',               logo: '/ClientLogos/gagan.jpg' },
  { name: 'UltraMax',            logo: '/ClientLogos/ultramaxtmt.png' },
  { name: 'Shyam Steel',         logo: '/ClientLogos/shyamsteeltmt.jpg' },
  { name: 'Ashirvad Pipes',      logo: '/ClientLogos/ashirbad.jpg' },
  { name: 'SHYAM METALICS',      logo: '/ClientLogos/shyammetalics.png' },
  { name: 'CITKON',              logo: '/ClientLogos/citkon.png' },
  { name: 'Concast Maxx',        logo: '/ClientLogos/concastmaxx.png' },
];

const industries = [
  { Icon: Heart,        label: 'Weddings & Shaadis',   desc: 'Grand, intimate & destination weddings' },
  { Icon: Briefcase,    label: 'Corporate Events',      desc: 'Summits, galas & product launches' },
  { Icon: PartyPopper,  label: 'Private Celebrations',  desc: 'Birthdays, anniversaries & parties' },
  { Icon: Users,        label: 'Social Gatherings',     desc: 'Reunions, felicitations & cultural events' },
  { Icon: Music,        label: 'Entertainment Shows',   desc: 'Sangeet nights & live performances' },
  { Icon: Gem,          label: 'Luxury Experiences',    desc: 'Destination events & elite gatherings' },
];

export default function Clients() {
  useSEO({
    title: "Our Valuable Clients",
    description: "Ayojon Event Management Service is trusted by leading brands across industries, including MP Birla Group, JSW, Ambuja Cement, and more."
  });

  return (
    <div className="w-full font-body bg-bg-main text-text-primary -mt-[73px]">

      {/* ── 1. HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[60vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden pt-28">
        <div className="absolute inset-0 z-0">
          <img
            src="/servicesandgallery/eatingtable.jpg"
            alt="Our Clients"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bg-dark/80 via-bg-dark/60 to-bg-dark/90"></div>
        </div>

        <motion.div
          className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 flex flex-col items-center text-center"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
            <div className="h-[1px] w-10 md:w-20 bg-primary-lightest/50"></div>
            <span className="text-primary-lightest tracking-[0.25em] uppercase text-xs md:text-sm font-medium">
              Our Clientele
            </span>
            <div className="h-[1px] w-10 md:w-20 bg-primary-lightest/50"></div>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-7xl font-heading font-bold text-text-light mb-5 leading-tight"
          >
            Our Valuable Clients
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl text-text-light/75 max-w-xl font-light"
          >
            Trusted by Leading Brands Across Industries
          </motion.p>
        </motion.div>
      </section>

      <section className="py-20 lg:py-28 bg-bg-main">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-heading font-bold text-text-primary mb-4">Trusted By The Best</h2>
            <p className="text-text-secondary text-xl font-light max-w-xl mx-auto">
              From legacy conglomerates to intimate family celebrations — our clientele speaks for itself.
            </p>
          </div>

          <motion.div
            className="bg-bg-card rounded-[2.5rem] px-10 py-16 shadow-soft border border-border/50 relative overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
          >
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none"></div>

            <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-10">
              {clientLogos.map(({ name, logo }) => (
                <motion.div
                  key={name}
                  variants={fadeUp}
                  className="flex items-center justify-center group"
                >
                  <img
                    src={logo}
                    alt={name}
                    className="
                      h-16 w-auto
                      object-fit
                      transition-all duration-500 ease-out group-hover:scale-110
                    "
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 3. TRUST STATEMENT ──────────────────────────────────────────────── */}
      <section className="bg-bg-card border-y border-border/40 py-16 text-center overflow-hidden">
        <div className="max-w-4xl mx-auto px-6">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-heading font-medium text-text-primary leading-relaxed"
          >
            “Proudly serving top brands across India with excellence in event management.”
          </motion.p>
        </div>
      </section>

      {/* ── 5. INDUSTRIES SERVED ─────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-primary-dark via-bg-dark to-[#320059] text-text-light relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/25 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/15 rounded-full blur-[100px]"></div>

        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-white mb-4">Industries We Serve</h2>
            <p className="text-text-light/70 text-xl font-light max-w-xl mx-auto">
              Expertise across every kind of celebration, gathering, and milestone.
            </p>
          </div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {industries.map(({ Icon, label, desc }) => (
              <motion.div
                key={label}
                variants={fadeUp}
                className="group flex flex-col items-center text-center gap-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-primary-light/40 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                  <Icon className="w-7 h-7 text-accent group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <p className="font-heading font-bold text-white text-base leading-snug mb-1">{label}</p>
                  <p className="text-white/45 text-xs leading-snug">{desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 6. CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-bg-main relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[500px] bg-primary/5 rounded-full blur-[120px] -z-0 pointer-events-none"></div>

        <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-bg-card rounded-[2.5rem] p-10 lg:p-16 shadow-[0_10px_50px_rgba(106,13,173,0.08)] border border-primary/10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>

            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-text-primary mb-6">
              Be Our Next Happy Client
            </h2>
            <p className="text-lg text-text-secondary mb-10 max-w-xl mx-auto leading-relaxed">
              Whether you're a business, a family, or a brand — we'd be honoured to craft your next extraordinary event.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-primary px-10 py-5 text-lg font-semibold tracking-wide text-text-light shadow-[0_8px_25px_rgba(106,13,173,0.4)] transition-all duration-300 hover:bg-primary-light hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(157,78,221,0.5)]"
            >
              <MessageCircle className="w-6 h-6" />
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
