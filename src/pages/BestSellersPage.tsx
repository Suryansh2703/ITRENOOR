import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Search, Filter, ShoppingBag, Heart, ArrowLeft } from 'lucide-react';
import { products } from '../data';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { toSlug } from '../utils/slug';
import { SEO } from '../components/SEO';
import LazyImage from '../components/LazyImage';

export default function BestSellersPage() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist, setWishlistMessage } = useWishlist();
  const { user, openAuthModal } = useAuth();

  // The 16 best-seller products: 4 from each category
  const categories = ['Attars', 'Perfumes', 'Non Alcoholic Perfumes', 'Combos'] as const;
  
  const getProductsByCategory = (category: string) => {
    return products.filter(p => p.category === category).slice(0, 4);
  };

  const allBestSellers = categories.flatMap(cat => getProductsByCategory(cat));

  const bestSellersSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": allBestSellers.map((product, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `https://www.itrenoor.app/product/${toSlug(product.name)}`,
      "name": product.name,
      "image": `https://www.itrenoor.app${product.image}`,
      "description": product.description
    }))
  };

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
  
  return (
    <div className="bg-black text-white min-h-screen">
      <SEO 
        title="Best Sellers - Perfumes & Attar"
        description="Discover the most loved and highly requested selections from our royal collection. Shop the best attar for men and women."
        path="/best-sellers"
        preloadImage={allBestSellers[0].image}
        schemaMarkup={JSON.stringify(bestSellersSchema)}
      />
      {/* Page Header */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 border-b border-zinc-900 bg-zinc-950 relative">
        <Link to="/" className="absolute top-8 left-8 text-zinc-300 hover:text-gold-500 flex items-center gap-2 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-7xl font-display mb-6"
          >
            Our Best Sellers
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-zinc-300 font-serif max-w-3xl mx-auto text-lg leading-relaxed"
          >
            Discover the most loved and highly requested selections from our royal collection. Our best sellers showcase the pinnacle of luxury attar perfumes and arabian oud, blending rare and precious ingredients like pure agarwood, vibrant Taif rose, and rich Indian sandalwood. Find your next signature long-lasting attar scent among the masterpieces chosen by fragrance connoisseurs around the world.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {categories.map((category, catIndex) => {
            const categoryProducts = getProductsByCategory(category);
            if (categoryProducts.length === 0) return null;
            
            return (
              <div key={category} className="mb-16 last:mb-0">
                <div className="flex items-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-display text-gold-400 mr-6">
                    {category}
                  </h2>
                  <div className="flex-grow h-px bg-zinc-800"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {categoryProducts.map((product, i) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="group flex flex-col h-full"
                    >
                      <div className="relative aspect-[4/5] bg-zinc-900 overflow-hidden border border-zinc-800">
                        <LazyImage
                          src={product.image}
                          alt={`${product.name} - Best Selling Perfume and Natural Attar in India`}
                          title={`${product.name} - Best Selling Perfume and Natural Attar in India`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                          loading={catIndex === 0 && i < 2 ? "eager" : "lazy"}
                          isLCP={catIndex === 0 && i < 2}
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                        
                        {/* Hover Actions */}
                        <button
                          onClick={(e) => handleWishlistClick(e, product)}
                          className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-sm border transition-colors z-20 opacity-0 group-hover:opacity-100 pointer-events-auto ${
                            isInWishlist(product.id)
                              ? 'bg-gold-500/90 text-black border-gold-500 opacity-100'
                              : 'bg-zinc-900/50 text-white border-zinc-500 hover:bg-gold-500/90 hover:text-black hover:border-gold-500'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                        </button>

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 pointer-events-none"></div>
                        <div className="absolute inset-x-4 bottom-4 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 z-10">
                          <Link to={`/product/${toSlug(product.name)}`} className="block text-center w-full py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white uppercase tracking-widest text-xs font-semibold hover:bg-gold-500 hover:text-black hover:border-gold-500 transition-colors">
                            Quick View
                          </Link>
                        </div>
                      </div>
                      
                      <div className="mt-6 text-center flex-grow flex flex-col justify-between">
                        <div>
                          <div className="text-xl font-serif text-white mb-2">{product.name}</div>
                          <p className="text-zinc-300 font-light text-sm mb-4 line-clamp-2">{product.description}</p>
                        </div>
                        <div className="flex items-center justify-center gap-4 mt-2">
                          <p className="text-gold-400 font-display tracking-wider">{product.price}</p>
                          <button
                            onClick={() => {
                              if (!user) {
                                openAuthModal();
                                return;
                              }
                              addToCart(product.id);
                              navigate('/checkout');
                            }}
                            className="bg-gold-600 hover:bg-gold-500 text-black px-4 py-2 uppercase tracking-widest text-[10px] font-bold transition-colors"
                          >
                            Buy Now
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
