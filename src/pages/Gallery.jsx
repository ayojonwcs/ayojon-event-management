import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { MessageCircle, ZoomIn, ArrowRight, Play } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import Video from 'yet-another-react-lightbox/plugins/video';
import { useSEO } from '../hooks/useSEO';

// ─── Image Data ────────────────────────────────────────────────────────────────
const allImages = [
  // WEDDINGS
  { id: 1,  category: 'wedding',       src: '/servicesandgallery/1.jpg',          label: 'Grand Wedding Venue', type: 'image' },
  { id: 2,  category: 'wedding',       src: '/gallery/weddingcharriot.jpeg',       label: 'Royal Wedding Chariot', type: 'image' },
  { id: 3,  category: 'wedding',       src: '/gallery/weddingfireworks.mp4',       label: 'Wedding Fireworks Display', type: 'video' },
  { id: 4,  category: 'wedding',       src: '/gallery/weddingfireworks2.mp4',      label: 'Breathtaking Celebrations', type: 'video' },
  { id: 5,  category: 'wedding',       src: '/gallery/weddingstagecouples.mp4',    label: 'Couples Grand Entry', type: 'video' },
  { id: 6,  category: 'wedding',       src: '/herovideos/1.mp4',                   label: 'Regal Wedding Theme', type: 'video' },
  { id: 7,  category: 'wedding',       src: '/herovideos/2.mp4',                   label: 'Grand Celebration', type: 'video' },
  { id: 8,  category: 'wedding',       src: '/herovideos/weddingdecor2.mp4',       label: 'Palatial Decor', type: 'video' },
  { id: 9,  category: 'wedding',       src: '/herovideos/weddingdecoration.mp4',   label: 'Elegant Venue Decor', type: 'video' },
  { id: 10, category: 'wedding',       src: '/heroimages/beddecoration.jpeg',      label: 'Traditional Decor', type: 'image' },
  { id: 11, category: 'wedding',       src: '/heroimages/decorationhall.jpeg',     label: 'Grand Banquet Hall', type: 'image' },
  { id: 12, category: 'wedding',       src: '/heroimages/entrancegate.jpeg',       label: 'Floral Entrance', type: 'image' },
  { id: 13, category: 'wedding',       src: '/heroimages/stagedcoration.jpeg',     label: 'Exquisite Wedding Stage', type: 'image' },
  { id: 14, category: 'wedding',       src: '/servicesandgallery/2.jpg',           label: 'Intimate Ceremony', type: 'image' },
  { id: 15, category: 'wedding',       src: '/home/1.jpg',                         label: 'Traditional Pheras', type: 'image' },
  { id: 16, category: 'wedding',       src: '/home/2.jpg',                         label: 'Reception Gala', type: 'image' },

  // CORPORATE
  { id: 17, category: 'corporate',     src: '/gallery/corporate.jpeg',             label: 'Corporate Gala Night', type: 'image' },
  { id: 18, category: 'corporate',     src: '/gallery/corporateLGeventvideo.mp4',  label: 'LG Corporate Event', type: 'video' },
  { id: 19, category: 'corporate',     src: '/gallery/corporateeventvideo.mp4',    label: 'Grand Annual Summit', type: 'video' },
  { id: 20, category: 'corporate',     src: '/gallery/corporatemeet.jpeg',         label: 'Leadership Meeting', type: 'image' },
  { id: 21, category: 'corporate',     src: '/gallery/haiercorporate.jpeg',        label: 'Haier Product Launch', type: 'image' },
  { id: 22, category: 'corporate',     src: '/heroimages/seminar.jpeg',            label: 'Tech Seminar Setup', type: 'image' },
  { id: 23, category: 'corporate',     src: '/servicesandgallery/eatingtable.jpg', label: 'VIP Dining Area', type: 'image' },
  // BIRTHDAYS
  { id: 25, category: 'birthday',      src: '/servicesandgallery/HBD.jpg',         label: 'Grand Birthday Bash', type: 'image' },
  { id: 26, category: 'birthday',      src: '/home/6.jpg',                         label: 'Kids Theme Party', type: 'image' },
  { id: 27, category: 'birthday',      src: '/gallery/dancinggroup.jpeg',          label: 'Birthday Performance', type: 'image' },

  // ANNIVERSARY
  { id: 28, category: 'anniversary',   src: '/servicesandgallery/flowers.jpg',     label: 'Floral Celebration', type: 'image' },
  { id: 29, category: 'anniversary',   src: '/servicesandgallery/tabledecor2.jpg', label: 'Candle Light Dinner', type: 'image' },
  { id: 30, category: 'anniversary',   src: '/servicesandgallery/decoration.jpg',  label: 'Milestone Anniversary', type: 'image' },

  // CULTURAL SHOW
  { id: 31, category: 'cultural',      src: '/gallery/culturaldance.mp4',          label: 'Traditional Dance Show', type: 'video' },
  { id: 32, category: 'cultural',      src: '/gallery/culturalsinging.jpeg',       label: 'Musical Evening', type: 'image' },
  { id: 33, category: 'cultural',      src: '/gallery/videoplayback.mp4',       label: 'Musician\'s Night', type: 'video' },

  // ENTERTAINMENT
  { id: 34, category: 'entertainment', src: '/gallery/dancing.jpeg',               label: 'Dance Troupe Show', type: 'image' },
  { id: 35, category: 'entertainment', src: '/herovideos/celebrityentry.mp4',      label: 'Celebrity Grand Entry', type: 'video' },
  { id: 36, category: 'entertainment', src: '/herovideos/singingperformance.mp4',   label: 'Live Singing Concert', type: 'video' },

  // PICNICS & CARNIVALS
  { id: 37, category: 'winter-picnic', src: '/home/7.jpg',                         label: 'Outdoor Winter Picnic', type: 'image' },
  { id: 38, category: 'carnival',      src: '/home/5.jpg',                         label: 'Grand Street Carnival', type: 'image' },
];

const filters = [
  { key: 'all',           label: 'All Masterpieces' },
  { key: 'wedding',       label: 'Wedding' },
  { key: 'birthday',      label: 'Birthday' },
  { key: 'anniversary',   label: 'Anniversary' },
  { key: 'corporate',     label: 'Corporate' },
  { key: 'entertainment', label: 'Entertainment' },
  { key: 'cultural',      label: 'Cultural Show' },
  { key: 'carnival',      label: 'Carnival' },
  { key: 'winter-picnic', label: 'Winter Picnic' },
];

const PAGE_SIZE = 12;

const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  exit:    { opacity: 0, scale: 0.95, transition: { duration: 0.3 } },
};

const stagger = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export default function Gallery() {
  useSEO({
    title: "Portfolio & Event Gallery",
    description: "Browse our curated gallery of breathtaking events, grand weddings, and stunning decorations crafted by Ayojon Event Management Service."
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const activeFilter = searchParams.get('filter') || 'all';

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const filtered = activeFilter === 'all'
    ? allImages
    : allImages.filter(img => img.category === activeFilter);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const slides = filtered.map(item => ({
    type: item.type === 'video' ? 'video' : 'image',
    src: item.src,
    ...(item.type === 'video' && {
      sources: [
        {
          src: item.src,
          type: "video/mp4",
        },
      ],
    })
  }));

  const handleFilterChange = (key) => {
    setSearchParams({ filter: key });
    setVisibleCount(PAGE_SIZE);
  };

  const openLightbox = (id) => {
    const idx = filtered.findIndex(img => img.id === id);
    setLightboxIndex(idx);
  };

  return (
    <div className="w-full font-body bg-bg-main text-text-primary -mt-[73px]">

      {/* ── 1. HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[60vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden pt-28">
        <div className="absolute inset-0 z-0">
          <img
            src="/servicesandgallery/flowers.jpg"
            alt="Gallery"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bg-dark/90 via-bg-dark/60 to-bg-dark/95"></div>
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
              Our Legacy of Magic
            </span>
            <div className="h-[1px] w-10 md:w-20 bg-primary-lightest/40"></div>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-8xl font-heading font-bold text-text-light mb-8 leading-[1.1] tracking-tight"
          >
             <span className="text-primary-lightest italic font-light"> Our Gallery</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-lg md:text-2xl text-text-light/80 max-w-2xl font-light leading-relaxed"
          >
            A curated showcase of breathtaking moments we've crafted for our esteemed clients across India.
          </motion.p>
        </motion.div>
      </section>

      {/* ── 2. FILTER BAR ────────────────────────────────────────────────────── */}
      <section className="py-8 md:py-16 bg-bg-main relative z-20 -mt-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-nowrap overflow-x-auto lg:flex-wrap lg:justify-center gap-3 lg:gap-4 pb-4 no-scrollbar">
          {filters.map(f => (
            <button
              key={f.key}
              onClick={() => handleFilterChange(f.key)}
              className={`
                px-6 py-2.5 md:px-8 md:py-3.5 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em]
                border-2 transition-all duration-500 shrink-0
                ${activeFilter === f.key
                  ? 'bg-primary text-white border-primary shadow-[0_10px_30px_rgba(106,13,173,0.4)] scale-105'
                  : 'bg-white/5 text-text-secondary border-border/40 backdrop-blur-sm hover:border-primary/40 hover:text-primary hover:bg-white'
                }
              `}
            >
              {f.label}
            </button>
          ))}
        </div>
      </section>

      {/* ── 3. GALLERY GRID ─────────────────────────────────────────────────── */}
      <section className="pb-24 lg:pb-32 bg-bg-main px-4 lg:px-12">
        <div className="max-w-[1600px] mx-auto">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeFilter}
              className="columns-2 lg:columns-3 xl:columns-4 gap-3 lg:gap-6 space-y-3 lg:space-y-6"
              initial="hidden"
              animate="visible"
              variants={stagger}
            >
              {visible.map((img) => (
                <motion.div
                  key={img.id}
                  variants={fadeUp}
                  layout
                  className="group relative overflow-hidden rounded-2xl lg:rounded-[2rem] break-inside-avoid cursor-pointer shadow-soft hover:shadow-2xl transition-all duration-700 border border-border/30 bg-bg-card"
                  onClick={() => openLightbox(img.id)}
                >
                  {img.type === 'video' ? (
                    <div className="relative aspect-video lg:aspect-square overflow-hidden bg-bg-dark flex items-center justify-center">
                       <video 
                        src={img.src} 
                        className="w-full h-full object-cover opacity-60"
                        muted
                        playsInline
                        onMouseEnter={(e) => e.target.play()}
                        onMouseLeave={(e) => { e.target.pause(); e.target.currentTime = 0; }}
                       />
                       <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-primary/80 backdrop-blur-md flex items-center justify-center border border-white/20 text-white group-hover:scale-110 transition-transform duration-500">
                             <Play className="w-6 h-6 lg:w-8 lg:h-8 fill-current" />
                          </div>
                       </div>
                    </div>
                  ) : (
                    <img
                      src={img.src}
                      alt={img.label}
                      className="w-full h-auto object-cover block transition-transform duration-1000 group-hover:scale-110"
                      loading="lazy"
                    />
                  )}

                  {/* High-fidelity hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-4 lg:p-8">
                    <div className="flex flex-col gap-1 lg:gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <span className="text-white font-bold text-sm lg:text-xl tracking-tight font-heading">
                        {img.label}
                      </span>
                      <div className="flex items-center gap-2 lg:gap-3">
                         <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                            {img.type === 'video' ? <Play className="w-3 h-3 lg:w-4 lg:h-4 text-white fill-current" /> : <ZoomIn className="w-3 h-3 lg:w-4 lg:h-4 text-white" />}
                         </div>
                         <span className="text-white/60 text-[8px] lg:text-[10px] font-bold uppercase tracking-[0.2em]">{img.type === 'video' ? 'Play' : 'View'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Glassmorphic Category pill - Smaller on mobile */}
                  <div className="absolute top-3 left-3 lg:top-6 lg:left-6 bg-white/10 backdrop-blur-xl border border-white/20 px-2 py-1 lg:px-4 lg:py-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="text-white text-[7px] lg:text-[9px] font-bold tracking-[0.2em] uppercase">
                      {filters.find(f => f.key === img.category)?.label || 'Collection'}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* ── LOAD MORE ─────────────────────────────────────────────────── */}
          {hasMore && (
            <div className="flex justify-center mt-24">
              <button
                onClick={() => setVisibleCount(c => c + PAGE_SIZE)}
                className="group flex items-center gap-4 px-12 py-5 rounded-full border-2 border-primary text-primary font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-primary hover:text-white transition-all duration-500 hover:shadow-[0_10px_30px_rgba(106,13,173,0.3)]"
              >
                Discover More Magic
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          )}

          {!hasMore && visible.length > 0 && (
            <div className="mt-20 text-center">
                <div className="h-[1px] w-20 bg-border/40 mx-auto mb-6"></div>
                <p className="text-text-secondary text-xs font-bold uppercase tracking-[0.3em]">
                Finish — {filtered.length} Masterpieces Displayed
                </p>
            </div>
          )}
        </div>
      </section>

      {/* ── 4. LIGHTBOX ──────────────────────────────────────────────────────── */}
      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        slides={slides}
        plugins={[Video]}
        on={{ view: ({ index }) => setLightboxIndex(index) }}
        styles={{
          container: { backgroundColor: 'rgba(15, 15, 15, 0.98)' },
        }}
        video={{
          autoPlay: true,
          controls: true,
          playsInline: true,
        }}
      />

      {/* ── 5. CTA ───────────────────────────────────────────────────────────── */}
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

            <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-6 block">Inspired?</span>
            <h2 className="text-4xl lg:text-7xl font-heading font-bold text-text-primary mb-8 tracking-tight">Let's Create Your <br /> Masterpiece</h2>
            <p className="text-xl text-text-secondary mb-14 max-w-2xl mx-auto leading-relaxed font-light">
               Inspired by what you see? Let's build something extraordinary together. Reach out and let the magic begin.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-4 rounded-full bg-primary px-4 md:px-12 py-6 text-xl font-bold text-text-light shadow-[0_15px_40px_rgba(106,13,173,0.4)] transition-all duration-300 hover:bg-primary-light hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(157,78,221,0.5)]"
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
