import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, ArrowUpRight, Send, Sparkles, Zap, ShieldCheck } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useSEO } from '../hooks/useSEO';

// ─── Animation Variants ────────────────────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};
const stagger = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

export default function Contact() {
  useSEO({
    title: "Contact Us | Let's Plan Your Event",
    description: "Get in touch with Ayojon Event Management Service. Fill out our inquiry form or contact us directly to start planning your perfect celebration today."
  });

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    const { name, phone, eventType, date, budget, message } = data;
    
    let text = `Hello, I would like to inquire about an event.\n\n`;
    text += `*Name:* ${name}\n`;
    text += `*Phone:* ${phone}\n`;
    text += `*Event Type:* ${eventType}\n`;
    if (date) text += `*Date:* ${date}\n`;
    if (budget) text += `*Budget:* ${budget}\n`;
    if (message) text += `*Message:* ${message}`;
    
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/917468005090?text=${encodedText}`, '_blank');
  };

  return (
    <div className="w-full font-body bg-bg-main text-text-primary -mt-[73px]">

      {/* ── 1. HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[60vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden pt-28">
        <div className="absolute inset-0 z-0">
          <img
            src="/servicesandgallery/decoration.jpg"
            alt="Contact Us"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bg-dark/90 via-bg-dark/70 to-bg-dark/95"></div>
        </div>

        <motion.div
          className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 flex flex-col items-center text-center mt-8"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
            <div className="h-[1px] w-10 md:w-20 bg-primary-lightest/40"></div>
            <span className="text-primary-lightest tracking-[0.3em] uppercase text-[10px] md:text-xs font-bold">
              Let's Begin
            </span>
            <div className="h-[1px] w-10 md:w-20 bg-primary-lightest/40"></div>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-8xl font-heading font-bold text-text-light mb-8 leading-[1.1] tracking-tight"
          >
            Get In Touch
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-lg md:text-2xl text-text-light/80 max-w-3xl font-light leading-relaxed"
          >
            Ready to plan your perfect event? Reach out to our experts and let's transform your grand vision into reality.
          </motion.p>
        </motion.div>
      </section>

      {/* ── 2. MAIN CONTACT SECTION ──────────────────────────────────────────── */}
      <section className="py-24 lg:py-36 bg-bg-main relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 lg:gap-16">
            
            {/* LEFT: Contact Info */}
            <motion.div 
              className="lg:col-span-5 flex flex-col gap-14 lg:pr-8"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div>
                <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Reach Out</span>
                <h2 className="text-4xl lg:text-6xl font-heading font-bold text-text-primary mb-8 leading-tight">
                  Start the <br />Conversation.
                </h2>
                <p className="text-xl text-text-secondary leading-relaxed font-light">
                  Whether you're planning an intimate gathering or a grand royal wedding, our team is here to listen, guide, and orchestrate perfection.
                </p>
              </div>

              <div className="flex flex-col gap-10">
                {/* Phone Card */}
                <div className="flex items-start gap-6 group">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-all duration-500 group-hover:shadow-[0_10px_30px_rgba(106,13,173,0.3)]">
                    <Phone className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary/60 mb-2">Call Us Directly</p>
                    <a href="tel:+917468005090" className="text-2xl lg:text-3xl font-heading font-bold text-text-primary hover:text-primary transition-colors">
                      +91 74680 05090
                    </a>
                  </div>
                </div>

                {/* Email Card */}
                <div className="flex items-start gap-6 group">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-all duration-500 group-hover:shadow-[0_10px_30px_rgba(106,13,173,0.3)]">
                    <Mail className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary/60 mb-2">Drop an Email</p>
                    <a href="mailto:prabirsinha@ayojoneventmanagermentservice.com" className="text-base sm:text-lg lg:text-2xl font-heading font-bold text-text-primary hover:text-primary transition-colors break-all">
                      prabirsinha@ayojoneventmanagermentservice.com
                    </a>
                  </div>
                </div>

                {/* Location Card */}
                <div className="flex items-start gap-6 group">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-all duration-500 group-hover:shadow-[0_10px_30px_rgba(106,13,173,0.3)]">
                    <MapPin className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary/60 mb-2">Visit Our Office</p>
                    <p className="text-xl text-text-primary leading-relaxed font-bold font-heading">
                      6VFW+JCV Bamchandaipur, West Bengal
                    </p>
                  </div>
                </div>

                {/* Digital Visiting Card Overlay/Display */}
                <div className="mt-4 group relative">
                   <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary/60 mb-4 ml-2">Digital Business Card</p>
                   <div className="relative overflow-hidden rounded-2xl shadow-xl border border-border/40 aspect-[1.75/1] bg-bg-card transition-all duration-500 group-hover:shadow-[0_20px_50px_rgba(106,13,173,0.15)] group-hover:-translate-y-2">
                      <img 
                        src="/aboutus/aboutinfo.jpeg" 
                        alt="Ayojon Business Card" 
                        className="w-full h-full object-contain p-2"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none"></div>
                   </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-4 pt-4 border-t border-border/40">
                 <div className="flex items-center gap-2 px-4 py-2 bg-bg-card rounded-full border border-border/40">
                    <ShieldCheck className="w-4 h-4 text-primary" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Verified Service</span>
                 </div>
                 <div className="flex items-center gap-2 px-4 py-2 bg-bg-card rounded-full border border-border/40">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Premium Quality</span>
                 </div>
              </div>
            </motion.div>

            {/* RIGHT: Contact Form */}
            <motion.div 
              className="lg:col-span-7"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-bg-card rounded-[2.5rem] p-6 md:p-12 lg:p-16 shadow-[0_20px_70px_rgba(106,13,173,0.08)] border border-border/40 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -z-10"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl -z-10"></div>
                
                <h3 className="text-3xl font-heading font-bold text-text-primary mb-10">Send Us an Inquiry</h3>
                
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Name */}
                    <div className="flex flex-col gap-3">
                      <label htmlFor="name" className="text-[10px] font-bold text-text-secondary/60 uppercase tracking-[0.2em] ml-2">Full Name *</label>
                      <input 
                        id="name"
                        type="text" 
                        placeholder="John Doe"
                        {...register("name", { required: true })}
                        className={`w-full px-6 py-4 md:px-8 md:py-5 rounded-[1.2rem] md:rounded-[1.5rem] bg-bg-main border-2 focus:outline-none focus:ring-4 transition-all duration-300 font-medium ${errors.name ? 'border-red-400 focus:ring-red-400/10' : 'border-border/40 focus:border-primary focus:ring-primary/5'}`}
                      />
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col gap-3">
                      <label htmlFor="phone" className="text-[10px] font-bold text-text-secondary/60 uppercase tracking-[0.2em] ml-2">Phone Number *</label>
                      <input 
                        id="phone"
                        type="tel" 
                        placeholder="+91 98765 43210"
                        {...register("phone", { required: true })}
                        className={`w-full px-6 py-4 md:px-8 md:py-5 rounded-[1.2rem] md:rounded-[1.5rem] bg-bg-main border-2 focus:outline-none focus:ring-4 transition-all duration-300 font-medium ${errors.phone ? 'border-red-400 focus:ring-red-400/10' : 'border-border/40 focus:border-primary focus:ring-primary/5'}`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Event Type */}
                    <div className="flex flex-col gap-3">
                      <label htmlFor="eventType" className="text-[10px] font-bold text-text-secondary/60 uppercase tracking-[0.2em] ml-2">Event Type *</label>
                      <div className="relative">
                        <select 
                            id="eventType"
                            {...register("eventType", { required: true })}
                            className={`w-full px-6 py-4 md:px-8 md:py-5 rounded-[1.2rem] md:rounded-[1.5rem] bg-bg-main border-2 appearance-none focus:outline-none focus:ring-4 transition-all duration-300 font-medium cursor-pointer ${errors.eventType ? 'border-red-400 focus:ring-red-400/10' : 'border-border/40 focus:border-primary focus:ring-primary/5'}`}
                        >
                            <option value="">Select Event Type</option>
                            <option value="Wedding">Wedding</option>
                            <option value="Corporate">Corporate</option>
                            <option value="Birthday">Birthday</option>
                            <option value="Engagement/Roka">Engagement/Roka</option>
                            <option value="Other">Other</option>
                        </select>
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary/40">
                             <Zap className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    {/* Event Date */}
                    <div className="flex flex-col gap-3">
                      <label htmlFor="date" className="text-[10px] font-bold text-text-secondary/60 uppercase tracking-[0.2em] ml-2">Event Date</label>
                      <input 
                        id="date"
                        type="date" 
                        {...register("date")}
                        className="w-full px-6 py-4 md:px-8 md:py-5 rounded-[1.2rem] md:rounded-[1.5rem] bg-bg-main border-2 border-border/40 focus:border-primary focus:ring-4 focus:ring-primary/5 focus:outline-none transition-all duration-300 font-medium text-text-primary"
                      />
                    </div>
                  </div>

                  {/* Budget */}
                  <div className="flex flex-col gap-3">
                    <label htmlFor="budget" className="text-[10px] font-bold text-text-secondary/60 uppercase tracking-[0.2em] ml-2">Estimated Budget (Optional)</label>
                    <input 
                      id="budget"
                      type="text" 
                      placeholder="e.g. ₹5,00,000"
                      {...register("budget")}
                      className="w-full px-6 py-4 md:px-8 md:py-5 rounded-[1.2rem] md:rounded-[1.5rem] bg-bg-main border-2 border-border/40 focus:border-primary focus:ring-4 focus:ring-primary/5 focus:outline-none transition-all duration-300 font-medium"
                    />
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-3">
                    <label htmlFor="message" className="text-[10px] font-bold text-text-secondary/60 uppercase tracking-[0.2em] ml-2">Tell Us More</label>
                    <textarea 
                      id="message"
                      rows="5"
                      placeholder="Share your vision, location preferences, or special requests..."
                      {...register("message")}
                      className="w-full px-8 py-6 rounded-[2rem] bg-bg-main border-2 border-border/40 focus:border-primary focus:ring-4 focus:ring-primary/5 focus:outline-none transition-all duration-300 font-medium resize-none"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit"
                    className="mt-6 flex items-center justify-center gap-4 w-full bg-primary text-white py-6 rounded-[1.5rem] font-bold uppercase tracking-[0.2em] text-sm shadow-[0_15px_40px_rgba(106,13,173,0.3)] hover:bg-primary-light hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(157,78,221,0.4)] transition-all duration-500"
                  >
                    <Send className="w-5 h-5" />
                    Submit via WhatsApp
                  </button>

                  <p className="text-center text-[10px] text-text-secondary/50 font-bold uppercase tracking-widest mt-4">
                    Secure & Direct Communication
                  </p>

                </form>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── 3. MAP SECTION ───────────────────────────────────────────────────── */}
<section className="w-full h-[500px] bg-bg-card relative">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3666.521201804733!2d87.89345927531991!3d23.22411347903298!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjPCsDEzJzI2LjgiTiA4N8KwNTMnNDUuNyJF!5e0!3m2!1sen!2sin!4v1778260815560!5m2!1sen!2sin"
    className="w-full h-full border-0"
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  />
  {/* Subtle overlay to blend map into the premium theme */}
  <div className="absolute inset-0 bg-primary/5 pointer-events-none"></div>
</section>


      {/* ── 4. CTA STRIP ─────────────────────────────────────────────────────── */}
      <section className='bg-gradient-to-r from-primary-dark via-primary to-primary-light py-12'>
        <motion.div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-white/60 text-[10px] font-bold uppercase tracking-[0.3em] mb-2">Ready to Plan?</p>
            <h3 className="text-3xl md:text-5xl font-heading font-bold text-white tracking-tight leading-none">
              Let's Plan Your Perfect Event
            </h3>
          </div>
          <a
            href="https://wa.me/917468005090"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 shrink-0 rounded-full bg-white text-primary font-bold text-xs uppercase tracking-widest px-10 py-5 shadow-2xl transition-all duration-500 hover:bg-bg-main hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(0,0,0,0.3)]"
          >
            Connect Now
            <ArrowUpRight className="w-5 h-5" />
          </a>
        </motion.div>
      </section>

    </div>
  );
}
