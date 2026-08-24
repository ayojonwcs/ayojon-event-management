import { useEffect, useRef, useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Music, Star, CheckCircle, ArrowRight, MessageCircle, ArrowUpRight, Sparkles, Zap, Camera, Utensils, Handshake, Shield, ShieldCheck, Phone, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BrandingAnimation from '../components/BrandingAnimation';
gsap.registerPlugin(ScrollTrigger);

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

const services = [
  { icon: Heart, title: "Grand Weddings", desc: "Regal and magnificent celebrations crafted with royal elegance and meticulous care." },
  { icon: Music, title: "Sangeet Nights", desc: "Vibrant, high-energy musical evenings filled with breathtaking dance, lights, and joy." },
  { icon: Sparkles, title: "Theme Decor", desc: "Immersive environments designed to transport your guests into a world of pure imagination." },
  { icon: Star, title: "Private Galas", desc: "Exclusive, luxurious gatherings designed to leave a lasting impression on your elite guests." },
];

const galleryImages = [
  "/heroimages/entrancegate.jpeg", "/heroimages/catering.jpeg", "/heroimages/stagedcoration.jpeg",
  "/heroimages/decorationhall.jpeg", "/heroimages/beddecoration.jpeg", "/heroimages/seminar.jpeg"
];

const testimonials = [
  { name: "Anjali & Rahul", role: "Bride & Groom", text: "Ayojon made our dream destination wedding a breathtaking reality. The decor, the hospitality, and the attention to detail were simply flawless." },
  { name: "Vikram Singhania", role: "Father of the Bride", text: "Hosting a grand 3-day wedding seemed daunting, but their team handled everything from the Sangeet to the Phera flawlessly. Highly recommended!" },
  { name: "Priya Desai", role: "Event Host", text: "The grand anniversary reception exceeded all our expectations. The regal themes and flawless execution generated massive praise from all our guests." },
];

const desktopHeroSlides = [
  // Videos from /herovideos
  "/herovideos/1.mp4",
  "/herovideos/2.mp4",
  "/herovideos/celebrityentry.mp4",
  "/herovideos/weddingentry.mp4",
  "/herovideos/singingperformance.mp4",
  "/herovideos/weddingdecor2.mp4",
  "/herovideos/weddingdecoration.mp4",
  // Images from /heroimages
  "/heroimages/beddecoration.jpeg",
  "/heroimages/team.jpeg",
  "/heroimages/catering.jpeg",
  "/heroimages/decoration2.jpeg",
  "/heroimages/decorationhall.jpeg",
  "/heroimages/entrancegate.jpeg",
  "/heroimages/seminar.jpeg",
  "/heroimages/stagedcoration.jpeg"
];

const mobileHeroSlides = [
  // Define mobile-specific vertical videos or portrait images here.
  // For now, this is a subset, but you can swap these out for mobile assets!
  // "home/4.jpg",
  "heroimages/mobileresponsive.jpeg",
  "heroimages/mobile2.jpeg",
  "heroimages/meet.jpeg",
  "heroimages/mobile3.jpeg",
  // "home/6.jpg",
  // "home/7.jpg",
  // "home/8.jpg"
];

const HeroMedia = ({ src, isActive, idx, isHeroVisible = true }) => {
  const videoRef = useRef(null);
  const isVideo = src.match(/\.(mp4|webm|ogg)$/i);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive && isHeroVisible) {
        videoRef.current.play().catch(() => {
          // Fallback if browser blocks unmuted autoplay
          console.log("Unmuted autoplay blocked by browser");
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isActive, isHeroVisible]);

  return (
    <div className="flex-[0_0_100%] min-w-0 h-full">
      {isVideo ? (
        <video
          ref={videoRef}
          src={src}
          muted
          loop
          playsInline
          preload={isActive ? "auto" : "metadata"}
          className="w-full h-full object-cover object-center"
        />
      ) : (
        <img
          src={src}
          alt={`Hero slide ${idx + 1}`}
          loading={idx === 0 ? "eager" : "lazy"}
          className="w-full h-full object-fit object-center"
        />
      )}
    </div>
  );
};

export default function Home() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const activeHeroSlides = isMobile ? mobileHeroSlides : desktopHeroSlides;

  // ── Embla Carousel setup ──────────────────────────────────────────────
  const [heroEmblaRef, heroEmblaApi] = useEmblaCarousel({ loop: true, duration: 50 });
  const [testimonialsEmblaRef] = useEmblaCarousel({ loop: true, duration: 30 });
  const [currentSlide, setCurrentSlide] = useState(0);
  // const [isHeroVisible, setIsHeroVisible] = useState(true);

  // Track visibility to pause video when scrolled away
  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     ([entry]) => setIsHeroVisible(entry.isIntersecting),
  //     { threshold: 0.1 }
  //   );
  //   if (heroWrapRef.current) observer.observe(heroWrapRef.current);
  //   return () => observer.disconnect();
  // }, []);

  // Track slide index for re-triggering animation
  useEffect(() => {
    if (!heroEmblaApi) return;
    const onSelect = () => setCurrentSlide(heroEmblaApi.selectedScrollSnap());
    heroEmblaApi.on('select', onSelect);
    // Initial set
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentSlide(heroEmblaApi.selectedScrollSnap());
    return () => heroEmblaApi.off('select', onSelect);
  }, [heroEmblaApi]);

  // Autoplay — stored in a ref so we can reset it from arrow buttons
  const autoplayRef = useRef(null);

  const startAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      heroEmblaApi?.scrollNext();
    }, 6000);
  }, [heroEmblaApi]);

  useEffect(() => {
    if (!heroEmblaApi) return;
    startAutoplay();
    return () => clearInterval(autoplayRef.current);
  }, [heroEmblaApi, startAutoplay]);

  const heroPrev = useCallback(() => {
    heroEmblaApi?.scrollPrev();
    startAutoplay(); // reset timer on manual nav
  }, [heroEmblaApi, startAutoplay]);

  const heroNext = useCallback(() => {
    heroEmblaApi?.scrollNext();
    startAutoplay(); // reset timer on manual nav
  }, [heroEmblaApi, startAutoplay]);

  // ── GSAP refs ─────────────────────────────────────────────────────────
  // const heroWrapRef   = useRef(null);
  // const heroStickyRef = useRef(null);
  // const textLayerRef  = useRef(null);
  // const overlayRef    = useRef(null);
  // const scrollHintRef = useRef(null);

  // useEffect(() => {
  //   // Ensure initial state is set BEFORE ScrollTrigger evaluates anything
  //   gsap.set(textLayerRef.current, { opacity: 0, y: 40 });
  //   gsap.set(overlayRef.current,   { opacity: 0.25 });

  //   const ctx = gsap.context(() => {
  //     // ── 1. Pin the hero pane for 100vh of scroll travel ─────────────
  //     ScrollTrigger.create({
  //       trigger: heroWrapRef.current,
  //       start: 'top top',
  //       end: '+=100%',                // 200vh total: 100vh visible + 100vh travel
  //       pin: heroStickyRef.current,
  //       pinSpacing: true,
  //       snap: {
  //         snapTo: [0, 1],             // snap to: images-only | text-visible
  //         duration: { min: 0.3, max: 0.5 },
  //         ease: 'power2.inOut',
  //       },
  //     });

  //     // ── 2. Reveal text at the midpoint of scroll travel ─────────────
  //     //    Fires once user scrolls ~50vh into the pinned section
  //     ScrollTrigger.create({
  //       trigger: heroWrapRef.current,
  //       start: `top+=${window.innerHeight * 0.6}px top`,
  //       onEnter: () => {
  //         gsap.to(overlayRef.current,   { opacity: 0.55, duration: 0.5, ease: 'power2.out' });
  //         gsap.to(textLayerRef.current, { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' });
  //         gsap.to(scrollHintRef.current, { opacity: 0, duration: 0.3 });
  //       },
  //       onLeaveBack: () => {
  //         gsap.to(overlayRef.current,   { opacity: 0.25, duration: 0.4 });
  //         gsap.to(textLayerRef.current, { opacity: 0, y: 40, duration: 0.4 });
  //         gsap.to(scrollHintRef.current, { opacity: 1, duration: 0.3 });
  //       },
  //     });
  //   }, heroWrapRef);

  //   return () => ctx.revert();
  // }, []);

  useSEO({
    title: "Luxury Event Management & Wedding Planners",
    description: "Ayojon Event Management Service specializes in crafting unforgettable premium experiences, from grand royal weddings to exclusive corporate galas across India."
  });

  return (
    <div className="w-full font-body bg-bg-main text-text-primary">

      {/* ─── 1. GSAP HERO ─────────────────────────────────────────────────── */}
      {/* <section className="relative bg-bg-dark" style={{ height: '200vh' }}> */}
      <section className="relative bg-bg-dark h-[100vh]">

        {/* <div className="h-[100dvh] w-full overflow-hidden relative"> */}
        <div className="h-full w-full overflow-hidden relative">

          {/* ── Embla infinite carousel (background) ── */}
          <div className="absolute inset-0 z-0" ref={heroEmblaRef}>
            <div className="flex h-full">
              {/* Slide 0: Branding Animation */}
              <div className="flex-[0_0_100%] min-w-0 h-full relative overflow-hidden">
                 <BrandingAnimation isActive={currentSlide === 0} />
              </div>
              
              {/* Media Slides (Images & Videos) */}
              {activeHeroSlides.map((src, idx) => (
                <HeroMedia 
                  key={idx} 
                  src={src} 
                  idx={idx} 
                  isActive={(currentSlide - 1) === idx} 
                  // isHeroVisible={isHeroVisible}
                />
              ))}
            </div>
          </div>

          {/* ── Overlay ── */}
          {/* <div
            ref={overlayRef}
            className="absolute inset-0 z-10 bg-bg-dark"
          /> */}

          {/* ── Left / Right arrows ── */}
          <button
            onClick={heroPrev}
            aria-label="Previous slide"
            className="absolute left-1 md:left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all duration-300 flex cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <button
            onClick={heroNext}
            aria-label="Next slide"
            className="absolute right-1 md:right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all duration-300 flex cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          {/* ── Text layer — hidden until scroll phase 2 ── */}
          {/* <div
            ref={textLayerRef}
            className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
          >
            <div className="max-w-6xl mx-auto px-6 lg:px-8 flex flex-col items-center text-center">

              <div className="flex items-center gap-4 mb-8">
                <div className="h-[1px] w-8 md:w-20 bg-primary-lightest/50" />
                <span className="text-primary-lightest tracking-[0.3em] uppercase text-[10px] md:text-xs font-bold">
                  The Creations of Colorful Memories
                </span>
                <div className="h-[1px] w-8 md:w-20 bg-primary-lightest/50" />
              </div>

              <h1 className="text-4xl md:text-7xl lg:text-8xl font-heading font-bold text-text-light leading-[1.1] mb-6 md:mb-8 tracking-tighter">
                One Stop <span className="text-primary-lightest italic font-light">Event</span> <br /> Solution
              </h1>

              <div className="w-16 h-1 bg-primary mt-4" />

            </div>
          </div> */}

          {/* ── Scroll hint ── */}
          {/* <div
            ref={scrollHintRef}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-30"
          >
            <span className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-bold">Scroll to Discover</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-primary/50 to-transparent" />
          </div> */}

        </div>
      </section>

      {/* ─── TAGLINE STRIP ───────────────────────────────────────────────── */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-[#0d0017] via-[#1a0030] to-[#0a0010] overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-primary/25 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[250px] bg-accent/15 rounded-full blur-[100px] pointer-events-none" />
        {/* Subtle grid texture */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        <motion.div
          className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          {/* Tagline */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[1px] w-8 md:w-16 bg-primary-lightest/30" />
            <span className="text-primary-lightest/80 tracking-[0.35em] uppercase text-[10px] md:text-xs font-bold">
              The Creations of Colorful Memories
            </span>
            <div className="h-[1px] w-8 md:w-16 bg-primary-lightest/30" />
          </div>

          {/* USP Headline */}
          <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white leading-[1.05] tracking-tight mb-8">
            One Stop{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-lightest via-accent to-primary-light">
              Event
            </span>
            {' '}Solution
          </h2>

          {/* Divider accent */}
          <div className="flex items-center justify-center gap-3">
            <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-primary rounded-full" />
            <div className="w-2 h-2 rounded-full bg-primary" />
            <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-primary rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* ─── ABOUT US ────────────────────────────────────────────────────── */}

      <section className="py-24 lg:py-36 bg-bg-card border-y border-border/40 relative overflow-hidden">

        {/* Soft ambient glows */}
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-primary/6 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] bg-accent/8 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">


          {/* ── Two-column story ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-24">

            {/* Left — decorative image stack */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, x: -30 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="relative order-2 lg:order-1"
            >
              <img src="/ISO.png" alt="Ayojon Event Management — colorful memories" loading="lazy" className="w-full h-[350px] md:h-[600px] object-contain rounded-xl" />
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 lg:-right-10 flex items-center gap-2 md:gap-3 px-4 py-2.5 md:px-6 md:py-4 rounded-full border bg-gradient-to-r from-blue-50 to-blue-100/50 border-blue-200 text-blue-800 shadow-[0_12px_32px_rgba(59,130,246,0.3)] backdrop-blur-md">
                <div className="p-1.5 md:p-2 rounded-full bg-blue-200/60 shrink-0">
                  <ShieldCheck className="w-5 h-5 md:w-7 md:h-7 text-blue-700" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] md:text-[13px] font-black leading-none tracking-wider text-blue-900">ISO CERTIFIED EVENT BRAND</span>
                  <span className="text-[11px] md:text-[15px] font-bold tracking-[0.2em] opacity-90 mt-0.5 md:mt-1 text-blue-800">ISO 9001:2015</span>
                </div>
              </div>
              {/* Accent blob */}
              <div className="absolute -top-10 -left-10 w-44 h-44 bg-accent/15 rounded-full blur-3xl -z-10" />
            </motion.div>

            {/* Right — copy */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="order-1 lg:order-2"
            >
              <span className="text-primary font-bold tracking-[0.25em] uppercase text-xs mb-5 block">About Us</span>
              <h2 className="text-3xl lg:text-5xl font-heading font-bold text-text-primary leading-tight mb-4">
                A name of trust - <span className="text-primary">Ayojon Event Management Service</span>
              </h2>
              <p className="text-text-secondary text-base font-light mb-7 tracking-wide">
                Eastern India's Most Trusted Event Partner since 2001
              </p>
              <p className="text-text-secondary text-base md:text-lg leading-relaxed font-light mb-6">
                Established in <strong className="text-text-primary font-semibold">2001 in Burdwan, West Bengal</strong>, Ayojon Event Management Service has been crafting unforgettable experiences for over two decades. We are a one-stop solution for all your event requirements — delivered at a reasonable cost without compromising on grandeur.
              </p>
              <p className="text-text-secondary text-base md:text-lg leading-relaxed font-light mb-10">
                From Intimate Birthday Celebrations to Grand Wedding Ceremonies, Dealer Meets, Award Functions, Large-Scale Cultural Shows and Corporate Events — our team of dedicated professionals brings your vision to life with passion and precision.
              </p>

              {/* Tagline */}
              <div className="inline-flex items-center gap-3 bg-primary/8 border border-primary/20 rounded-full px-6 py-3 mb-10">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-primary font-bold tracking-wide text-sm">7468005090 &nbsp;|&nbsp; 9332151059</span>
              </div>

              {/* Badges (Desktop View) */}
              <div className="hidden lg:block mt-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px bg-border/60 flex-1"></div>
                  <h4 className="text-sm md:text-base font-extrabold tracking-[0.2em] text-primary uppercase">Our 10 Badges</h4>
                  <div className="h-px bg-border/60 flex-1"></div>
                </div>
                <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
                  {[
                    { text: "25 Years Experience", Icon: Star },
                    { text: "MSME Registered", Icon: Shield },
                    { text: "1 Point Contact", Icon: Phone },
                    { text: "Backup Guarantee", Icon: Shield },
                    { text: "GST Compliant", Icon: CheckCircle },
                    { text: "1100+ Corporate Events", Icon: Handshake },
                    { text: "200+ Weddings", Icon: Heart },
                    { text: "4.9 ★ Google Ratings", Icon: Star },
                    { text: "No Compromise on Quality & Quantity", Icon: CheckCircle },
                    { text: "Smooth Operation & Service", Icon: Zap },
                  ].map((badge, i) => (
                    <span 
                      key={i} 
                      className="group flex items-center gap-2 bg-bg-main border border-border/60 hover:border-primary/50 hover:bg-primary/5 rounded-full px-4 py-2 md:px-5 md:py-2.5 text-[10px] md:text-xs font-bold text-text-primary uppercase tracking-wider md:tracking-widest transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(232,16,24,0.15)] cursor-default"
                    >
                      <badge.Icon className="w-3 h-3 md:w-3.5 md:h-3.5 text-primary group-hover:scale-125 transition-transform duration-300" />
                      {badge.text}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Badges (Mobile View - placed after the image) */}
          <div className="lg:hidden w-full mb-16">
            <div className="flex items-center gap-4 mb-6 px-4">
              <div className="h-px bg-border/60 flex-1"></div>
              <h4 className="text-sm font-extrabold tracking-[0.2em] text-primary uppercase text-center">Our 10 Badges</h4>
              <div className="h-px bg-border/60 flex-1"></div>
            </div>
            <div className="flex flex-wrap gap-2 justify-center px-2">
              {[
                { text: "25 Years Experience", Icon: Star },
                { text: "MSME Registered", Icon: Shield },
                { text: "1 Point Contact", Icon: Phone },
                { text: "Backup Guarantee", Icon: Shield },
                { text: "GST Compliant", Icon: CheckCircle },
                { text: "1100+ Corporate Events", Icon: Handshake },
                { text: "200+ Weddings", Icon: Heart },
                { text: "4.9 ★ Google Ratings", Icon: Star },
                { text: "No Compromise on Quality & Quantity", Icon: CheckCircle },
                { text: "Smooth Operation & Service", Icon: Zap },
              ].map((badge, i) => (
                <span 
                  key={i} 
                  className="group flex items-center gap-1.5 bg-bg-main border border-border/60 hover:border-primary/50 hover:bg-primary/5 rounded-full px-3 py-2 text-[10px] font-bold text-text-primary uppercase tracking-wider transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(232,16,24,0.15)] cursor-default"
                >
                  <badge.Icon className="w-3 h-3 text-primary group-hover:scale-125 transition-transform duration-300" />
                  {badge.text}
                </span>
              ))}
            </div>
          </div>

          {/* ── 5 Core Services strip ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="text-center mb-14"
          >
            <span className="text-primary font-bold tracking-[0.25em] uppercase text-[10px] md:text-xs mb-4 block">Our Core Services</span>
            <h3 className="text-2xl md:text-3xl lg:text-5xl font-heading font-bold text-text-primary mb-10 md:mb-16">
              Everything Under One Roof
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {[
                { icon: Sparkles,    label: "Decoration",     color: "from-purple-500/20 to-primary/10", link: "/gallery?filter=birthday" },
                { icon: Utensils,    label: "Catering",       color: "from-amber-400/20 to-orange-400/10", link: "/gallery?filter=wedding" },
                { icon: Camera,      label: "Photography",    color: "from-sky-500/20 to-blue-400/10",   link: "/gallery?filter=anniversary" },
                { icon: Music,       label: "Entertainment",  color: "from-rose-500/20 to-pink-400/10",  link: "/gallery?filter=entertainment" },
                { icon: Handshake,   label: "Hospitality",   color: "from-emerald-500/20 to-green-400/10", link: "/gallery?filter=corporate" },
              ].map((svc, i) => {
                const Icon = svc.icon;
                return (
                  <Link key={i} to={svc.link} className="block">
                    <motion.div
                      variants={fadeUp}
                      className={`group relative rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 bg-gradient-to-br ${svc.color} border border-border/40 flex flex-col items-center gap-4 md:gap-5 hover:-translate-y-3 hover:shadow-[0_16px_40px_rgba(106,13,173,0.12)] hover:border-primary/30 transition-all duration-500 cursor-pointer`}
                    >
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white/70 backdrop-blur-sm border border-white/60 flex items-center justify-center shadow-soft group-hover:bg-primary transition-colors duration-400">
                        <Icon className="w-6 h-6 md:w-8 md:h-8 text-primary group-hover:text-white transition-colors duration-400" />
                      </div>
                      <span className="font-heading font-bold text-base md:text-lg text-text-primary group-hover:text-primary transition-colors">{svc.label}</span>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </motion.div>

          {/* ── Motto ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <p className="text-2xl md:text-3xl lg:text-5xl font-heading font-bold text-text-primary mb-4">
              The Creations of{' '}
              <span className="italic font-light text-primary">Colorful Memories</span>
            </p>
            <p className="text-lg md:text-xl lg:text-2xl font-heading font-light text-text-secondary italic">
              "Your Event, <span className="font-bold text-primary not-italic">Our Responsibility.</span>"
            </p>
          </motion.div>

        </div>
      </section>

      {/* ─── 3. SERVICES ─────────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-bg-main relative z-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4 block">What We Do</span>
              <h2 className="text-4xl lg:text-6xl font-heading font-bold text-text-primary leading-tight">
                Elite Services for <br /> Distinctive Occasions
              </h2>
            </div>
            <Link to="/services" className="group flex items-center gap-3 text-primary font-bold uppercase tracking-widest text-sm hover:text-primary-dark transition-colors">
              View All Services
              <div className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                <ArrowRight className="w-5 h-5" />
              </div>
            </Link>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {[
              { ...services[0], link: "/gallery?filter=wedding" },
              { ...services[1], link: "/gallery?filter=wedding" },
              { ...services[2], link: "/gallery?filter=wedding" },
              { ...services[3], link: "/gallery?filter=corporate" },
            ].map((srv, i) => {
              const Icon = srv.icon;
              return (
                <Link key={i} to={srv.link} className="block">
                  <motion.div
                    variants={fadeUp}
                    className="group relative bg-bg-card rounded-[2rem] p-8 md:p-10 border border-border/40 h-full transition-all duration-500 hover:border-primary/40 hover:-translate-y-3 hover:shadow-[0_20px_50px_rgba(106,13,173,0.1)] cursor-pointer"
                  >
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-bg-main border border-border/40 flex items-center justify-center mb-6 md:mb-8 group-hover:bg-primary transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(106,13,173,0.3)]">
                      <Icon className="w-7 h-7 md:w-8 md:h-8 text-primary group-hover:text-white transition-all duration-500" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-heading font-bold text-text-primary mb-4 group-hover:text-primary transition-colors">{srv.title}</h3>
                    <p className="text-text-secondary text-sm md:text-base leading-relaxed font-light">{srv.desc}</p>
                  </motion.div>
                </Link>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ─── 4. WHY CHOOSE US ────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-bg-card border-y border-border/50 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 border border-primary/10 aspect-[4/5] lg:aspect-[4/4]">
                <img src="/heroimages/entrancegate.jpeg" alt="Our Team at Work" loading="lazy" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/40 to-transparent" />
              </div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl -z-10" />
              <div className="absolute top-1/2 -left-20 w-32 h-32 bg-accent/15 rounded-full blur-3xl -z-10" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4 block">The Ayojon Standard</span>
              <h2 className="text-3xl md:text-4xl lg:text-6xl font-heading font-bold text-text-primary mb-6 md:mb-8 leading-tight">
                Elevating Every <br /> Detail to Perfection
              </h2>
              <p className="text-text-secondary text-base md:text-lg mb-8 md:mb-12 leading-relaxed font-light">
                With years of expertise handling high-profile events, we bring unparalleled creativity and precision to everything we do.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                {[
                  { label: "Elite Expertise", icon: Sparkles },
                  { label: "Bespoke Design", icon: Zap },
                  { label: "Flawless Execution", icon: CheckCircle },
                  { label: "Global Reach", icon: Star }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 group">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-300">
                      <item.icon className="w-5 h-5 md:w-6 md:h-6 text-primary group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-text-primary font-bold text-base md:text-lg tracking-tight">{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 5. GALLERY ──────────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-bg-main">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div>
              <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Visual Stories</span>
              <h2 className="text-4xl lg:text-6xl font-heading font-bold text-text-primary mb-4">A Glimpse of Magic</h2>
              <p className="text-text-secondary text-lg max-w-xl font-light">Explore highlights from our recently orchestrated premium experiences.</p>
            </div>
            <Link to="/gallery" className="inline-flex items-center gap-3 bg-bg-card border border-border/50 rounded-full px-8 py-4 text-primary font-bold uppercase tracking-widest text-[10px] hover:bg-primary hover:text-white transition-all">
              View Full Gallery
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((src, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative rounded-[2rem] overflow-hidden aspect-[4/3] cursor-pointer shadow-soft hover:shadow-2xl transition-all duration-500"
              >
                <img src={src} alt={`Gallery ${idx + 1}`} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. TESTIMONIALS ─────────────────────────────────────────────── */}
      <section className="py-24 lg:py-36 bg-gradient-to-br from-primary-dark via-bg-dark to-[#320059] text-text-light relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] -z-0" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[150px] -z-0" />

        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-20">
            <span className="text-accent font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Client Love</span>
            <h2 className="text-4xl lg:text-7xl font-heading font-bold mb-6 text-white tracking-tight">
              Real Stories, <br /> Timeless Memories
            </h2>
          </div>

          <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={testimonialsEmblaRef}>
            <div className="flex">
              {testimonials.map((test, idx) => (
                <div key={idx} className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-8 first:pl-0">
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 lg:p-12 rounded-[2rem] md:rounded-[2.5rem] h-full flex flex-col transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_20px_60px_rgba(157,78,221,0.2)]">
                    <div className="flex gap-1 mb-6 md:mb-10 text-accent">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-current" />)}
                    </div>
                    <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-text-light/90 mb-8 md:mb-12 flex-grow font-light italic">
                      "{test.text}"
                    </p>
                    <div className="pt-6 md:pt-8 border-t border-white/10">
                      <h4 className="font-heading font-bold text-xl md:text-2xl mb-1 text-white">{test.name}</h4>
                      <span className="text-[10px] text-accent uppercase tracking-[0.2em] font-bold">{test.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. FOOTER CTA ───────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-bg-main relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[600px] bg-primary/5 rounded-full blur-[150px] -z-0 pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 lg:px-12 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-bg-card rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 lg:p-24 shadow-[0_20px_70px_rgba(106,13,173,0.1)] border border-primary/10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -z-10" />

            <span className="text-primary font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs mb-6 block">Ready to Begin?</span>
            <h2 className="text-3xl md:text-4xl lg:text-7xl font-heading font-bold text-text-primary mb-6 md:mb-8 tracking-tight">
              Let's Create Your <br /> Next Grand Vision
            </h2>
            <p className="text-base md:text-xl text-text-secondary mb-10 md:mb-14 max-w-2xl mx-auto leading-relaxed font-light">
              Ready to create something extraordinarily magical? Connect with our expert team today and let's bring your grand vision to life.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-full bg-primary px-8 md:px-12 py-4 md:py-5 text-base md:text-lg font-bold text-text-light shadow-[0_10px_30px_rgba(106,13,173,0.4)] transition-all duration-300 hover:bg-primary-light hover:-translate-y-1"
              >
                <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
                Chat on WhatsApp
              </Link>
              <Link
                to="/gallery"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-full border border-primary/20 bg-transparent px-8 md:px-12 py-4 md:py-5 text-base md:text-lg font-bold text-primary transition-all duration-300 hover:bg-primary/5"
              >
                Browse Portfolio
                <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}