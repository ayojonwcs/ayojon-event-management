import { motion } from 'framer-motion';
import { Star, Quote, MessageCircle, Award, Calendar, Users, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';

// ─── Data ──────────────────────────────────────────────────────────────────────
const testimonials = [
  {
    id: 1,
    name: "Anjali & Rahul Mehta",
    role: "Wedding Clients",
    event: "Grand Wedding — Mumbai",
    rating: 5,
    text: "Ayojon transformed our dream wedding into a breathtaking reality. Every detail, from the floral mandap to the royal table settings, was executed with such precision and love.",
  },
  {
    id: 2,
    name: "Vikram Singhania",
    role: "Father of the Bride",
    event: "3-Day Wedding — Pune",
    rating: 5,
    text: "Hosting a grand 3-day wedding seemed daunting, but their team handled everything flawlessly. I could actually enjoy the celebrations instead of stressing about logistics.",
  },
  {
    id: 3,
    name: "Priya & Karan Desai",
    role: "Wedding Clients",
    event: "Destination Wedding — Udaipur",
    rating: 5,
    text: "We chose Ayojon for our Udaipur destination wedding and it was the best decision we made. The decor, the coordination, the catering — everything was absolutely world-class.",
  },
  {
    id: 4,
    name: "Sneha Kapoor",
    role: "Birthday Celebration",
    event: "50th Birthday Gala — Delhi",
    rating: 5,
    text: "My mother's 50th birthday celebration was a night to remember. The theme they created was breathtaking and every single guest was amazed. Truly exceeded every expectation!",
  },
  {
    id: 5,
    name: "Rohan & Meera Joshi",
    role: "Engagement Clients",
    event: "Roka Ceremony — Jaipur",
    rating: 5,
    text: "Our Roka ceremony was intimate yet absolutely gorgeous. The floral decor was exactly what we envisioned — elegant, romantic, and perfectly coordinated with our theme.",
  },
  {
    id: 6,
    name: "Aditi Sharma",
    role: "Corporate Event",
    event: "Annual Gala — Bangalore",
    rating: 5,
    text: "We hired Ayojon for our company's annual gala and they delivered beyond our expectations. The venue styling and the evening flow were handled with incredible professionalism.",
  },
];

const featured = {
  name: "Sunita & Arvind Khanna",
  role: "Wedding Clients",
  event: "Royal Wedding — Rajasthan",
  rating: 5,
  image: "/home/4.jpg",
  text: "We still can't believe how perfectly Ayojon orchestrated our royal Rajasthani wedding. From the grand elephant procession to the midnight fireworks, every single moment was crafted with extraordinary attention to detail. Our wedding was featured in three bridal magazines. They didn't just plan our wedding — they created a legend.",
};

const metrics = [
  { icon: Award,    value: "500+", label: "Events Managed" },
  { icon: Users,    value: "450+", label: "Happy Families" },
  { icon: Calendar, value: "12+",   label: "Years Experience" },
  { icon: Heart,    value: "100%", label: "Satisfaction" },
];

const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};
const stagger = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

function Stars({ count = 5 }) {
  return (
    <div className="flex gap-1 text-accent">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-5 h-5 fill-current" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  useSEO({
    title: "Client Testimonials & Reviews",
    description: "Read real stories and reviews from our happy clients whose precious moments we were trusted to craft."
  });


  return (
    <div className="w-full font-body bg-bg-main text-text-primary -mt-[73px]">

      {/* ── 1. HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden pt-28">
        <div className="absolute inset-0 z-0">
          <img src="/home/2.jpg" alt="Testimonials" className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-b from-bg-dark/90 via-bg-dark/65 to-bg-dark/95"></div>
        </div>

        <motion.div
          className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 flex flex-col items-center text-center"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
            <div className="h-[1px] w-10 md:w-20 bg-primary-lightest/40"></div>
            <span className="text-primary-lightest tracking-[0.3em] uppercase text-[10px] md:text-xs font-bold">
              Voices of Joy
            </span>
            <div className="h-[1px] w-10 md:w-20 bg-primary-lightest/40"></div>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-8xl font-heading font-bold text-text-light mb-8 leading-[1.1] tracking-tight"
          >
            Real Stories, <br /> <span className="text-primary-lightest italic font-light">Timeless</span> Memories
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-lg md:text-2xl text-text-light/80 max-w-2xl font-light leading-relaxed"
          >
            Hear from the families and brands who trusted us to bring their most ambitious visions to life.
          </motion.p>
        </motion.div>
      </section>

      {/* ── 2. FEATURED TESTIMONIAL ──────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-bg-main relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-0"></div>
        
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Image Block */}
            <div className="relative group">
              <div className="rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 aspect-[4/5] lg:aspect-square relative z-10">
                <img
                  src={featured.image}
                  alt={featured.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/60 to-transparent"></div>
              </div>
              
            </div>

            {/* Content Block */}
            <div className="flex flex-col items-start">
              <Quote className="w-16 h-16 text-primary/20 mb-8" />
              <div className="mb-6"><Stars count={5} /></div>
              <p className="text-2xl lg:text-4xl font-heading font-light text-text-primary mb-10 leading-relaxed italic">
                "{featured.text}"
              </p>
              <div className="pt-10 border-t border-border/50 w-full">
                <h3 className="text-2xl font-heading font-bold text-text-primary mb-1">{featured.name}</h3>
                <p className="text-primary font-bold uppercase tracking-[0.15em] text-xs">{featured.event} • {featured.role}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 3. TESTIMONIALS GRID ─────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-bg-card border-y border-border/40">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-20">
             <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Our Family</span>
            <h2 className="text-4xl lg:text-6xl font-heading font-bold text-text-primary">More Happy Clients</h2>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.id}
                variants={fadeUp}
                className="group bg-bg-main rounded-[2.5rem] p-10 border border-border/40 transition-all duration-500 hover:border-primary/40 hover:-translate-y-3 hover:shadow-[0_20px_50px_rgba(106,13,173,0.1)] flex flex-col relative overflow-hidden"
              >
                <div className="mb-8"><Stars count={t.rating} /></div>
                
                <p className="text-text-secondary text-lg leading-relaxed mb-12 flex-grow font-light italic">
                  "{t.text}"
                </p>

                <div className="flex items-center gap-5 pt-8 border-t border-border/40">
                  <div>
                    <h4 className="font-heading font-bold text-lg text-text-primary mb-1">{t.name}</h4>
                    <p className="text-[10px] text-primary font-bold uppercase tracking-widest">{t.event}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 5. TRUST METRICS ─────────────────────────────────────────────────── */}
      <section className="py-24 lg:py-36 bg-gradient-to-br from-primary-dark via-bg-dark to-[#320059] text-text-light relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] -z-0"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[150px] -z-0"></div>

        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {metrics.map((m, idx) => {
              const Icon = m.icon;
              return (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="w-20 h-20 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:bg-primary/30 group-hover:border-primary/50 transition-all duration-500">
                    <Icon className="w-8 h-8 text-accent" />
                  </div>
                  <p className="text-5xl lg:text-8xl font-heading font-bold text-white mb-4 tracking-tighter">{m.value}</p>
                  <p className="text-text-light/60 text-xs font-bold uppercase tracking-[0.3em]">{m.label}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── 6. CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-24 lg:py-36 bg-bg-main relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[600px] bg-primary/5 rounded-full blur-[150px] -z-0 pointer-events-none"></div>

        <div className="max-w-6xl mx-auto px-6 lg:px-12 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-bg-card rounded-[3rem] p-12 lg:p-24 shadow-[0_20px_70px_rgba(106,13,173,0.1)] border border-primary/10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -z-10"></div>

            <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-6 block">Ready to Plan?</span>
            <h2 className="text-4xl lg:text-7xl font-heading font-bold text-text-primary mb-8 tracking-tight">Let's Create Your <br /> Story Next</h2>
            <p className="text-xl text-text-secondary mb-14 max-w-2xl mx-auto leading-relaxed font-light">
               Join our growing family of delighted clients. Reach out and let us begin crafting your unforgettable experience.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-4 rounded-full bg-primary px-12 py-6 text-xl font-bold text-text-light shadow-[0_15px_40px_rgba(106,13,173,0.4)] transition-all duration-300 hover:bg-primary-light hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(157,78,221,0.5)]"
            >
              <MessageCircle className="w-7 h-7" />
              Chat on WhatsApp
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
