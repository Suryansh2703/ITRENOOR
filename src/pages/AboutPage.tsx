import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { SEO } from '../components/SEO';
import LazyImage from '../components/LazyImage';
const founderImage = '/founder.jpg';

export default function AboutPage() {
  const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.itrenoor.app/#organization",
      "name": "ITR-E-NOOR",
      "url": "https://www.itrenoor.app/",
      "description": "Premium luxury attar perfumes and Arabian oud store in India.",
      "founder": {
        "@type": "Person",
        "name": "Suryansh Anand"
      }
    },
    {
      "@type": "AboutPage",
      "@id": "https://www.itrenoor.app/about/#webpage",
      "url": "https://www.itrenoor.app/about/",
      "name": "About Us | ITR-E-NOOR",
      "description": "Learn about ITR-E-NOOR, a premium fragrance brand offering luxury attar perfumes, Arabian oud, and non-alcoholic fragrances.",
      "mainEntity": {
        "@id": "https://www.itrenoor.app/#organization"
      }
    }
  ]
};

  return (
    <div className="w-full bg-zinc-950">
      <SEO 
        title="About Us"
        description="Learn about ITR-E-NOOR, the best perfume store in India offering authentic arabian oud perfumes, long lasting luxury attar, and exquisite non-alcoholic fragrances."
        path="/about"
        preloadImage={founderImage}
        schemaMarkup={JSON.stringify(organizationSchema)}
      />
      {/* Page Header */}
      <div className="py-20 bg-zinc-900 border-b border-zinc-800 text-center px-4 relative">
        <Link to="/" className="absolute top-8 left-8 text-zinc-300 hover:text-gold-500 flex items-center gap-2 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
          <h1 className="text-4xl md:text-6xl font-display text-white mb-4">
            The Story of ITR-E-NOOR
          </h1>
         <motion.div 
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "100px" }}
            className="h-1 bg-gold-600 mx-auto opacity-50"
          />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-24">
        
        <section>
          <h2 className="text-3xl font-display text-gold-400 mb-6 whitespace-pre-wrap">About ITR-E-NOOR</h2>
          <div className="prose prose-invert prose-zinc max-w-none">
            <p className="text-lg text-zinc-300 font-light leading-relaxed">
              ITR-E-NOOR is a premium fragrance brand dedicated to bringing the timeless tradition of luxury attar perfumes into the modern world. We are proudly recognized among the top perfume brands, ensuring every fragrance tells a story and leaves a lasting memory.
            </p>
            <p className="text-lg text-zinc-300 font-light leading-relaxed mt-4">
              Our masterfully curated collection offers long lasting attar, the finest arabian oud perfumes, and elegant non-alcoholic scents suitable for men and women on every occasion.
            </p>
          </div>
        </section>

        {/* Meet the Founder Section */}
        <section className="bg-zinc-900/40 border border-zinc-800 p-8 md:p-12 flex flex-col md:flex-row gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full md:w-2/5 relative"
          >
            <div className="relative overflow-hidden bg-zinc-900 rounded-sm flex flex-col group shadow-2xl">
               <LazyImage 
                 src={founderImage} 
                 alt="Suryansh Anand, Founder of ITR-E-NOOR - Best Perfume Store in India"
                 className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-[1.02] aspect-[3/4]"
                 loading="eager"
                 isLCP={true}
                 sizes="(max-width: 768px) 100vw, 40vw"
               />
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full md:w-3/5 space-y-6"
          >
            <h2 className="text-gold-500 uppercase tracking-[0.2em] text-sm font-bold">The Visionary Behind the Brand</h2>
            <div>
              <h3 className="text-3xl md:text-5xl font-display text-white mb-4">Meet the Founder</h3>
              <div className="w-16 h-1 bg-gold-600 opacity-50"></div>
            </div>
            
            <p className="text-zinc-300 font-light leading-relaxed text-lg italic border-l-2 border-gold-500/50 pl-4 py-2 my-6">
              "Fragrance is not just a scent; it is the silent language of the soul, capturing memories and speaking before words are even uttered."
            </p>
            
            <p className="text-zinc-300 font-light leading-relaxed">
              With a deep-rooted passion for oriental perfumery and a relentless pursuit of excellence, our founder embarked on a journey to redefine the world of luxury attars. Drawing inspiration from ancient traditions and blending them with modern sophistication, ITR-E-NOOR was born—a testament to unparalleled craftsmanship, allowing us to rank among perfume brands in India with a royal heritage.
            </p>
            
            <p className="text-zinc-300 font-light leading-relaxed">
              Every drop of ITR-E-NOOR is a personal promise of purity, elegance, and an unforgettable olfactory experience. We invite you to be a part of this fragrant journey.
            </p>
            
            <div className="pt-6">
              <p className="text-white font-serif text-xl tracking-wider">Suryansh</p>
              <p className="text-gold-500/80 text-sm tracking-widest uppercase mt-1">Founder & Managing Director</p>
            </div>
          </motion.div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="group bg-zinc-900/50 border border-zinc-800 p-8 hover:bg-zinc-900/70 hover:border-gold-500/30 transition-all cursor-default"
          >
            <h2 className="text-2xl font-serif text-gold-400 mb-4 uppercase tracking-widest">Our Mission</h2>
            <p className="text-zinc-300 font-light leading-relaxed">
              To provide high-quality, luxury attar perfumes and premium arabian oud that combine tradition, elegance, and modern craftsmanship, establishing us as a top perfume brand.
            </p>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="group bg-zinc-900/50 border border-zinc-800 p-8 hover:bg-zinc-900/70 hover:border-gold-500/30 transition-all cursor-default"
          >
            <h2 className="text-2xl font-serif text-gold-400 mb-4 uppercase tracking-widest">Our Vision</h2>
            <p className="text-zinc-300 font-light leading-relaxed">
              To become a trusted destination for fragrance lovers seeking authentic, long-lasting attars and premium scents, preserving the royal heritage of oriental perfumery.
            </p>
          </motion.div>
        </section>

        <section>
          <div className="text-center mb-12">
             <h2 className="text-3xl font-display text-gold-400 mb-6">Core Values</h2>
             <div className="w-16 h-px bg-white mx-auto"></div>
          </div>
         
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              "Quality First",
              "Customer Satisfaction",
              "Authentic Fragrances",
              "Sustainable Practices",
              "Timeless Elegance"
            ].map((value, idx) => (
              <li key={idx} className="flex items-center space-x-3 text-lg text-zinc-300">
                <span className="w-2 h-2 rounded-full bg-gold-500"></span>
                <span className="font-serif tracking-wide">{value}</span>
              </li>
            ))}
          </ul>
        </section>

      </div>
    </div>
  );
}
