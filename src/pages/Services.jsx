import { motion } from 'framer-motion';
import { 
  Heart, Briefcase, Cake, Palette, ClipboardCheck, 
  MessageCircle, CheckCircle, Sparkles,  Gift, Tent, Sun, MapPin, Utensils, Camera, Mic2, Bus, Paintbrush, Star, Zap, ShieldCheck,
  Music
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const eventsOrganized = [
  { 
    title: "Wedding", 
    image: "/servicesandgallery/1.jpg", 
    icon: Heart, 
    tag: "Signature",
    category: "wedding",
    desc: "From grand palatial ceremonies to intimate beach vows, we craft weddings that define luxury."
  },
  { 
    title: "Birthday", 
    image: "/servicesandgallery/HBD.jpg", 
    icon: Cake, 
    tag: "Popular",
    category: "birthday",
    desc: "Themed celebrations with bespoke decor and entertainment for every milestone year."
  },
  { 
    title: "Anniversary", 
    image: "/servicesandgallery/flowers.jpg", 
    icon: Gift, 
    tag: "Elegant",
    category: "anniversary",
    desc: "Commemorate your journey with a regal setting designed for pure romance and joy."
  },
  { 
    title: "Corporate", 
    image: "/servicesandgallery/eatingtable.jpg", 
    icon: Briefcase, 
    tag: "Premium",
    category: "corporate",
    desc: "Flawless execution for high-profile launches, award galas, and professional summits."
  },
  { 
    title: "Entertainment", 
    image: "/home/4.jpg", 
    icon: Star, 
    tag: "Vibrant",
    category: "entertainment",
    desc: "High-octane concert setups, celebrity performances, and immersive talent management."
  },
  { 
    title: "Cultural Show", 
    image: "/servicesandgallery/stage.jpg", 
    icon: Palette, 
    tag: "Artistic",
    category: "cultural",
    desc: "Showcasing heritage and art through meticulously produced stage shows and festivals."
  },
  { 
    title: "Carnival", 
    image: "/home/6.jpg", 
    icon: Tent, 
    tag: "Grand",
    category: "carnival",
    desc: "Breathtaking outdoor events filled with color, energy, and spectacular installations."
  },
  { 
    title: "Winter Picnic", 
    image: "/servicesandgallery/decoration.jpg", 
    icon: Sun, 
    tag: "Seasonal",
    category: "winter-picnic",
    desc: "Charming outdoor escapes with premium hospitality and cozy thematic setups."
  },
];

const servicesProvided = [
  { title: "Venue Booking", icon: MapPin },
  { title: "Wedding Planning", icon: ClipboardCheck },
  { title: "Food & Catering", icon: Utensils },
  { title: "Photography", icon: Camera },
  { title: "Artist & Celebrity", icon: Mic2 },
  { title: "Decoration", icon: Paintbrush },
  { title: "Hospitality", icon: Heart },
  { title: "Transportation", icon: Bus },
  { title: "Bridal Makeup", icon: Sparkles },
  { title: "Music / Dance", icon: Music },
  { title: "Special Entry", icon: Star },
];

export default function Services() {
  useSEO({
    title: "Premium Services",
    description: "Discover the complete range of event management solutions by Ayojon — from grand weddings to corporate galas and one-stop event logistics."
  });

  return (
    <div className="w-full font-body bg-bg-main text-text-primary -mt-[80px]">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[60vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden pt-28">
        <div className="absolute inset-0 z-0">
          <img src="/servicesandgallery/1.jpg" alt="Ayojon Services" loading="eager" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-bg-dark/85 via-bg-dark/60 to-bg-dark/95"></div>
        </div>

        <motion.div 
          className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 flex flex-col items-center text-center mt-8"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
            <div className="h-[1px] w-8 md:w-16 bg-primary-lightest/50"></div>
            <span className="text-primary-lightest tracking-[0.3em] uppercase text-sm md:text-md font-medium">
              World Class Standards
            </span>
            <div className="h-[1px] w-8 md:w-16 bg-primary-lightest/50"></div>
          </motion.div>
          
          <motion.h1 variants={fadeUp} className="text-5xl md:text-8xl font-heading font-bold text-text-light mb-6 leading-tight">
            Our Services
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg md:text-xl text-text-light/80 max-w-2xl font-light">
            Crafting memories, managing details. From grand conceptualization to flawless execution across every category.
          </motion.p>
        </motion.div>
      </section>

      {/* 2. EVENTS WE ORGANIZE — RICH IMAGE GRID */}
      <section className="py-24 lg:py-32 bg-bg-main">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div className="max-w-2xl">
              <span className="text-primary font-semibold tracking-[0.2em] uppercase text-sm mb-4 block">Event Categories</span>
              <h2 className="text-4xl md:text-6xl font-heading font-bold text-text-primary">Events We Organize</h2>
            </div>
            <p className="text-text-secondary text-lg font-light max-w-xs border-l border-primary/30 pl-6">
              Expertly managed celebrations tailored for every scale and sentiment.
            </p>
          </div>

          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6 lg:gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {eventsOrganized.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Link 
                  key={idx}
                  to={`/gallery?filter=${item.category}`}
                  className="block"
                >
                  <motion.div 
                    variants={fadeUp}
                    className="group relative rounded-2xl overflow-hidden shadow-soft hover:shadow-2xl transition-all duration-500 cursor-pointer aspect-[4/5]"
                  >
                    {/* Background Image */}
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Dark Gradients */}
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/90 via-bg-dark/20 to-transparent"></div>
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Tag */}
                    <div className="absolute top-4 left-4">
                      <div className="bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full">
                        <span className="text-white text-[0.6rem] font-bold tracking-widest uppercase">{item.tag}</span>
                      </div>
                    </div>

                    {/* Content Overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-2 md:p-6 sm:transform sm:translate-y-[4.5rem] sm:group-hover:translate-y-0 transition-transform duration-500 ease-out">
                      <div className="flex items-center gap-1 md:gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-primary/80 backdrop-blur-sm flex items-center justify-center border border-white/20">
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="text-lg md:text-2xl font-heading font-bold text-white">{item.title}</h3>
                      </div>
                      <div className="h-[4.5rem]"> {/* Fixed height container for description to ensure consistent slide */}
                        <p className="text-white/70 text-xs leading-relaxed line-clamp-3 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500 delay-100">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 3. SERVICES WE PROVIDE — PREMIUM ICON GRID */}
      <section className="py-24 lg:py-32 bg-bg-card border-y border-border/40 relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[150px] -z-0"></div>

        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-24">
            <span className="text-accent font-semibold tracking-[0.2em] uppercase text-sm mb-4 block">Comprehensive Solutions</span>
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-text-primary mb-8">Services We Provide</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
          </div>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 lg:gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {servicesProvided.map((service, idx) => {
              const Icon = service.icon;
              return (
                <motion.div 
                  key={idx}
                  variants={fadeUp}
                  className="group relative bg-bg-card/40 backdrop-blur-xl p-5 rounded-2xl border border-white/5 flex flex-col items-center text-center transition-all duration-500 hover:border-primary/40 hover:-translate-y-1 overflow-hidden"
                >
                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  
                  <div className="relative z-10 flex flex-col items-center w-full">
                    <div className="w-12 h-12 rounded-xl bg-bg-main border border-white/5 shadow-inner flex items-center justify-center mb-4 group-hover:bg-primary transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(106,13,173,0.3)]">
                      <Icon className="w-6 h-6 text-primary group-hover:text-white transition-all duration-500 group-hover:scale-110" />
                    </div>
                    <h3 className="text-sm font-heading font-bold text-text-primary group-hover:text-primary transition-colors">{service.title}</h3>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 4. ONE STOP SOLUTION FEATURE — FULL WIDTH & CENTERED (70VH) */}
      <section className="py-10 bg-bg-main my-20">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative w-full overflow-hidden bg-bg-dark h-[80vh] flex items-center justify-center shadow-2xl"
        >
            {/* Animated Background Overlay */}
            <div className="absolute inset-0 bg-[url('/servicesandgallery/decoration.jpg')] bg-cover bg-center opacity-20"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/95 via-primary/90 to-primary-light/85"></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-5xl mx-auto">
              <div className="mb-6 w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                <Zap className="w-8 h-8 text-white" />
              </div>
              
              <span className="text-white/70 uppercase tracking-[0.4em] font-bold text-[0.65rem] mb-4">The Ayojon Difference</span>
              <h2 className="text-4xl lg:text-7xl font-heading font-bold text-white mb-6 leading-tight">One Stop <br /> Event Solution</h2>
              <p className="text-base lg:text-xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed mb-10">
                No more coordinating with dozens of vendors. We take full ownership of your event journey — from the initial blueprint to the final farewell.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-10 w-full max-w-3xl">
                {[
                  { icon: ShieldCheck, label: "End-to-End Ownership" },
                  { icon: CheckCircle, label: "Premium Vendor Access" },
                  { icon: Sparkles, label: "Creative Brilliance" }
                ].map((feature, fidx) => (
                  <div key={fidx} className="flex flex-col items-center gap-3">
                    <feature.icon className="w-6 h-6 text-white/60" />
                    <span className="text-white font-semibold uppercase tracking-wider text-[0.7rem]">{feature.label}</span>
                  </div>
                ))}
              </div>
            </div>
        </motion.div>
      </section>

      {/* 5. FINAL CTA */}
      <section className="pb-32 lg:pb-48 bg-bg-main relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-bg-card rounded-3xl p-12 lg:p-20 shadow-soft border border-primary/10 relative overflow-hidden"
          >
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-text-primary mb-8 leading-tight">Ready to Experience <br /> the Extraordinary?</h2>
            <p className="text-lg text-text-secondary mb-12 max-w-lg mx-auto font-light">
              Connect with our master planners to discuss how we can turn your vision into a landmark event.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link 
                to="/contact" 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-full bg-primary px-12 py-5 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:bg-primary-light hover:-translate-y-1 hover:shadow-xl"
              >
                <MessageCircle className="w-6 h-6" />
                Contact Us
              </Link>
              <Link 
                to="/gallery" 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-full bg-bg-main border border-border px-12 py-5 text-lg font-bold text-text-primary transition-all duration-300 hover:border-primary hover:text-primary"
              >
                View Our Work
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
