import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { products } from '../data';
import { ArrowRight, Star, Droplets, Clock, ShieldCheck, Gift, Heart } from 'lucide-react';
import { toSlug } from '../utils/slug';
import { useWishlist } from '../context/WishlistContext';
import { SEO } from '../components/SEO';
import LazyImage from '../components/LazyImage';
const heroImages = ['/hero-lcp.jpg', '/hero-2.jpg', '/hero-3.jpg'];

const heroTextColors = [
  "text-gold-400 drop-shadow-md", // dark background
  "text-zinc-950 drop-shadow-md", // light background
  "text-gold-400 drop-shadow-md", // dark background
  "text-gold-400 drop-shadow-md", // dark background
  "text-white drop-shadow-md",    // sunset background
];

export default function HomePage() {
  const { addToWishlist, removeFromWishlist, isInWishlist, setWishlistMessage } = useWishlist();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();
  const featuredProducts = products.slice(0, 4);
  const bestSellers = [
    ...products.filter(p => p.category === 'Attars').slice(0, 1),
    ...products.filter(p => p.category === 'Perfumes').slice(0, 1),
    ...products.filter(p => p.category === 'Non Alcoholic Perfumes').slice(0, 1),
    ...products.filter(p => p.category === 'Combos').slice(0, 1),
  ];

  const handleWishlistClick = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
      setWishlistMessage('Added to Wishlist');
      setTimeout(() => {
        setWishlistMessage(null);
        navigate('/wishlist');
      }, 1000);
    }
  };
  const newlyLaunched = products.filter(p => p.category === 'Newly Launched').slice(0, 4);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    // Preload next image in the background
    const nextIndex = (currentImageIndex + 1) % heroImages.length;
    const img = new Image();
    img.src = heroImages[nextIndex];

    return () => clearInterval(timer);
  }, [currentImageIndex]);

  return (
    <div className="flex flex-col w-full">
      <SEO 
        title="Luxury Attar Perfumes & Arabian Oud"
        description="Shop the best long lasting attar and luxury oud perfumes. Experience ITR-E-NOOR's exclusive authentic non-alcoholic oriental fragrances."
        preloadImage={heroImages[0]}
        schemaMarkup={`{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Home - Luxury Attar Perfumes & Arabian Oud",
          "description": "Shop the best long lasting attar and luxury oud perfumes. Experience ITR-E-NOOR's exclusive authentic non-alcoholic oriental fragrances."
        }`}
      />
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background Image / Overlay Slideshow */}
        <div className="absolute inset-0 z-0 bg-zinc-950 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img 
              key={currentImageIndex}
              src={heroImages[currentImageIndex]}
              alt="Luxury Perfumes Background" 
              fetchPriority={currentImageIndex === 0 ? "high" : "auto"}
              loading={currentImageIndex === 0 ? "eager" : "lazy"}
              decoding={currentImageIndex === 0 ? "sync" : "async"}
              width={1920}
              height={1080}
              sizes="100vw"
              initial={currentImageIndex === 0 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover object-center aspect-video"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-0 bg-black/10 z-10 pointer-events-none" />
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-12">
          <motion.h4 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`${heroTextColors[currentImageIndex]} font-sans tracking-[0.2em] uppercase text-lg md:text-xl font-semibold mb-6 transition-colors duration-1000`}
          >
            Welcome to ITR-E-NOOR Luxury Perfumery
          </motion.h4>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display text-white drop-shadow-md mb-6 leading-tight"
          >
            Luxury Attar Perfumes <br /> <span className="text-gold-400 font-sans font-light italic my-2 inline-block">&</span> <br /> Arabian <span className="gold-gradient-text drop-shadow-sm italic">Oud</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-zinc-300 drop-shadow-md max-w-2xl mx-auto mb-10 font-sans font-medium"
          >
            Experience ITR-E-NOOR, recognized among the best attar brands in India. Discover our long-lasting attar for men and women, premium arabian oud perfumes, and elegant scent blends. From the best oud perfume for men to the timeless oud and roses perfume, uncover fragrances that leave a lasting memory.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/products" className="w-full sm:w-auto px-8 py-4 bg-gold-500 hover:bg-gold-400 text-black font-semibold tracking-wider uppercase text-sm transition-colors duration-300">
              Shop Now
            </Link>
            <Link to="/about" className="w-full sm:w-auto px-8 py-4 bg-transparent border border-gold-500/50 hover:border-gold-400 text-gold-400 font-semibold tracking-wider uppercase text-sm transition-colors duration-300">
              Discover Our Story
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-24 bg-zinc-950 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display text-white mb-4">Why Choose <span className="text-gold-400">ITR-E-NOOR</span>?</h2>
            <div className="w-24 h-1 bg-gold-600 mx-auto opacity-50"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { title: 'Premium Quality', desc: 'Crafted with fine ingredients, establishing us among the best attar brands in India.', icon: ShieldCheck },
              { title: 'Long Lasting Aroma', desc: 'Experience authentic, long-lasting attar that stays fresh throughout your day.', icon: Clock },
              { title: 'Ideal For Everyone', desc: 'Discover the best attar for men and women, curated for elegance.', icon: Droplets },
              { title: 'Elegant Gifting', desc: 'Beautifully designed bottles making us a preferred choice amongst top perfume brands.', icon: Gift },
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group flex flex-col items-center text-center p-6 border border-zinc-900 bg-zinc-900/20 hover:border-gold-500/30 hover:bg-zinc-900/40 transition-all cursor-default"
              >
                <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center mb-6 text-gold-400 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-8 h-8" strokeWidth={1.5} />
                </div>
                <div className="text-xl font-serif text-white mb-3">{feature.title}</div>
                <p className="text-zinc-300 font-light">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-zinc-900 px-4 sm:px-6 lg:px-8 border-y border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-display text-white mb-4">Featured <span className="text-gold-400">Collection</span></h2>
              <div className="w-24 h-1 bg-gold-600 opacity-50"></div>
            </div>
            <Link to="/products" className="hidden md:flex items-center text-gold-400 hover:text-gold-300 uppercase tracking-widest text-sm font-semibold group">
              View All <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             {featuredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-zinc-800 mb-6 border border-zinc-800 group/image">
                  <LazyImage 
                    src={product.image} 
                    alt={`${product.name} - Luxury Attar Perfumes & Arabian Oud`}
                    className="w-full h-full object-cover object-center group-hover/image:scale-105 transition-transform duration-700 opacity-80 group-hover/image:opacity-100 aspect-[4/5]"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 border-[1px] border-white/10 m-4 pointer-events-none"></div>

                  <button
                    onClick={(e) => handleWishlistClick(e, product)}
                    aria-label={isInWishlist(product.id) ? "Remove from Wishlist" : "Add to Wishlist"}
                    className={`absolute top-6 right-6 p-3 rounded-full backdrop-blur-sm border transition-colors z-20 opacity-0 group-hover/image:opacity-100 pointer-events-auto ${
                      isInWishlist(product.id)
                        ? 'bg-gold-500/90 text-black border-gold-500 opacity-100'
                        : 'bg-zinc-900/50 text-white border-zinc-500 hover:bg-gold-500/90 hover:text-black hover:border-gold-500'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                  </button>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 pointer-events-none"></div>
                  <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover/image:translate-y-0 group-hover/image:opacity-100 transition-all duration-300 z-10">
                    <Link to={`/product/${toSlug(product.name)}`} className="block text-center w-full py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white uppercase tracking-widest text-xs font-semibold hover:bg-gold-500 hover:text-black hover:border-gold-500 transition-colors">
                      Quick View
                    </Link>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-serif text-white mb-2">{product.name}</div>
                  <p className="text-zinc-300 font-light text-sm mb-3">{product.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 text-center md:hidden">
            <Link to="/products" className="inline-flex items-center text-gold-400 hover:text-gold-300 uppercase tracking-widest text-sm font-semibold">
              View All Collection <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-24 bg-black px-4 sm:px-6 lg:px-8 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-display text-white mb-4">Our Best Sellers</h2>
              <div className="w-24 h-1 bg-gold-600 opacity-50"></div>
            </div>
            <Link to="/best-sellers" className="hidden md:flex items-center text-gold-400 hover:text-gold-300 uppercase tracking-widest text-sm font-semibold group">
              View All <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestSellers.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-zinc-800 mb-6 border border-zinc-800 group/image">
                  <LazyImage 
                    src={product.image} 
                    alt={`${product.name} - Premium Attar for Men & Women`}
                    className="w-full h-full object-cover object-center group-hover/image:scale-105 transition-transform duration-700 opacity-80 group-hover/image:opacity-100 aspect-[4/5]"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 border-[1px] border-white/10 m-4 pointer-events-none"></div>

                  <button
                    onClick={(e) => handleWishlistClick(e, product)}
                    aria-label={isInWishlist(product.id) ? "Remove from Wishlist" : "Add to Wishlist"}
                    className={`absolute top-6 right-6 p-3 rounded-full backdrop-blur-sm border transition-colors z-20 opacity-0 group-hover/image:opacity-100 pointer-events-auto ${
                      isInWishlist(product.id)
                        ? 'bg-gold-500/90 text-black border-gold-500 opacity-100'
                        : 'bg-zinc-900/50 text-white border-zinc-500 hover:bg-gold-500/90 hover:text-black hover:border-gold-500'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                  </button>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 pointer-events-none"></div>
                  <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover/image:translate-y-0 group-hover/image:opacity-100 transition-all duration-300 z-10">
                    <Link to={`/product/${toSlug(product.name)}`} className="block text-center w-full py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white uppercase tracking-widest text-xs font-semibold hover:bg-gold-500 hover:text-black hover:border-gold-500 transition-colors">
                      Quick View
                    </Link>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-serif text-white mb-2">{product.name}</div>
                  <p className="text-zinc-300 font-light text-sm mb-3">{product.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 text-center md:hidden">
            <Link to="/best-sellers" className="inline-flex items-center text-gold-400 hover:text-gold-300 uppercase tracking-widest text-sm font-semibold">
              View All Collection <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Newly Launched */}
      <section className="py-24 bg-zinc-900 px-4 sm:px-6 lg:px-8 border-y border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-display text-white mb-4">Newly Launched <span className="text-gold-400">luxury attar perfumes</span></h2>
              <div className="w-24 h-1 bg-gold-600 opacity-50"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {newlyLaunched.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-zinc-800 mb-6 border border-zinc-800 group/image">
                  <LazyImage 
                    src={product.image} 
                    alt={`${product.name} - Long Lasting Attar Fragrance`}
                    className="w-full h-full object-cover object-center group-hover/image:scale-105 transition-transform duration-700 opacity-80 group-hover/image:opacity-100 aspect-[4/5]"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 border-[1px] border-white/10 m-4 pointer-events-none"></div>

                  <button
                    onClick={(e) => handleWishlistClick(e, product)}
                    aria-label={isInWishlist(product.id) ? "Remove from Wishlist" : "Add to Wishlist"}
                    className={`absolute top-6 right-6 p-3 rounded-full backdrop-blur-sm border transition-colors z-20 opacity-0 group-hover/image:opacity-100 pointer-events-auto ${
                      isInWishlist(product.id)
                        ? 'bg-gold-500/90 text-black border-gold-500 opacity-100'
                        : 'bg-zinc-900/50 text-white border-zinc-500 hover:bg-gold-500/90 hover:text-black hover:border-gold-500'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                  </button>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 pointer-events-none"></div>
                  <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover/image:translate-y-0 group-hover/image:opacity-100 transition-all duration-300 z-10">
                    <Link to={`/product/${toSlug(product.name)}`} className="block text-center w-full py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white uppercase tracking-widest text-xs font-semibold hover:bg-gold-500 hover:text-black hover:border-gold-500 transition-colors">
                      Quick View
                    </Link>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-serif text-white mb-2">{product.name}</div>
                  <p className="text-zinc-300 font-light text-sm mb-3">{product.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-zinc-950 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-display text-white mb-16">Customer Reviews for Our <span className="text-gold-400">luxury attar perfumes</span></h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { name: 'Ahmed Khan', text: 'The long lasting attar stays all day and smells amazing! Highly recommended for daily wear.' },
              { name: 'Sarah Ali', text: 'Beautiful packaging and premium quality arabian oud perfumes. Made a perfect gift for my husband from the perfume store.' }
            ].map((testimonial, i) => (
               <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="group p-8 border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/50 hover:border-gold-500/30 transition-all cursor-default relative"
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex space-x-1 bg-zinc-950 px-2">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-gold-500 text-gold-500" />
                  ))}
                </div>
                <p className="text-lg text-zinc-300 italic font-serif mt-6 mb-6">"{testimonial.text}"</p>
                <div className="h-px w-12 bg-gold-600/50 mx-auto mb-4"></div>
                <span className="text-gold-400 uppercase tracking-widest text-sm font-semibold">— {testimonial.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden bg-zinc-900">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1629828456645-8120fa2c40c3?auto=format&fit=crop&q=80&w=2000&fm=webp" alt="Luxury attar and arabian oud collection background" loading="lazy" sizes="100vw" className="w-full h-full object-cover opacity-20 filter grayscale blur-sm aspect-video" />
          <div className="absolute inset-0 bg-zinc-900/80"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-display text-white mb-6">Discover Your Signature Scent Today</h2>
          <p className="text-zinc-300 font-light mb-10 max-w-2xl mx-auto text-lg">
            Browse our exclusive collection and find the scent that reflects your personality. Whether you seek regal fragrances or a delightful essence, we have you covered.
          </p>
          <Link to="/products" className="inline-block px-10 py-4 bg-gold-400 text-black font-semibold tracking-widest uppercase text-sm hover:bg-gold-500 hover:text-white transition-colors duration-300">
            Shop Collection
          </Link>
        </div>
      </section>
    </div>
  );
}
