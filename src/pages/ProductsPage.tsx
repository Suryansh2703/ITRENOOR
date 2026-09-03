import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { products } from '../data';
import { ShoppingBag, Check, Heart, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toSlug } from '../utils/slug';
import { SEO } from '../components/SEO';
import LazyImage from '../components/LazyImage';

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('Attars');
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist, setWishlistMessage } = useWishlist();
  const { setCartMessage } = useCart();
  const navigate = useNavigate();
  const { user, openAuthModal } = useAuth();

  const productListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": products.map((product, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `https://www.itrenoor.app/product/${toSlug(product.name)}`,
      "name": product.name,
      "image": `https://www.itrenoor.app${product.image}`,
      "description": product.description
    }))
  };

  const handleAddToCart = (id: string, name: string) => {
    addToCart(id);
    setCartMessage('Added to Cart');
    
    setTimeout(() => {
      setCartMessage(null);
      navigate('/cart');
    }, 1000);
  };

  const handleLike = (id: string, name: string) => {
    if (isInWishlist(id)) {
      removeFromWishlist(id);
      setWishlistMessage(`${name} removed from wishlist.`);
      setTimeout(() => setWishlistMessage(null), 1000);
    } else {
      addToWishlist(id);
      setWishlistMessage('Added to Wishlist');
      
      setTimeout(() => {
        setWishlistMessage(null);
        navigate('/wishlist');
      }, 1000);
    }
  };

  const handleBuyNow = (id: string) => {
    if (!user) {
      openAuthModal();
      return;
    }
    addToCart(id);
    navigate('/checkout');
  };

  return (
    <div className="w-full bg-zinc-950 pb-24">
      <SEO 
        title="Luxury Perfumes & Attar Collection"
        description="Explore our exquisite collection of long lasting attar, premium arabian oud, and luxury perfumes. Shop the best attar brands in India."
        path="/products"
        preloadImage={products.filter(p => p.category === activeCategory)[0]?.image}
        schemaMarkup={JSON.stringify(productListSchema)}
      />
      {/* Page Header */}
      <div className="py-20 bg-zinc-900 border-b border-zinc-800 text-center px-4 mb-16 relative">
        <Link to="/" className="absolute top-8 left-8 text-zinc-300 hover:text-gold-500 flex items-center gap-2 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-display text-white mb-4"
        >
          Our <span className="text-gold-400">luxury attar perfumes</span> Collections
        </motion.h1>
         <motion.div 
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "100px" }}
            className="h-1 bg-gold-600 mx-auto opacity-50 mb-6"
          />
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-zinc-300 font-serif max-w-3xl mx-auto text-lg mb-12"
          >
            Explore our curated selection of masterful creations. Each fragrance is crafted with purity and precision, featuring fine long-lasting attars, authentic arabian oud perfumes, and elegant non-alcoholic blends that reflect centuries of regal perfumery traditions.
          </motion.p>
          
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-4xl mx-auto">
            {['Attars', 'Perfumes', 'Non Alcoholic Perfumes', 'Combos'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                aria-label={cat}
                className={`px-5 py-3 border tracking-widest uppercase text-xs md:text-sm transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-gold-500 text-black border-gold-500 font-semibold'
                    : 'bg-transparent text-zinc-300 border-zinc-800 hover:border-gold-500/50 hover:text-gold-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 md:gap-24">
          {products.filter(p => p.category === activeCategory).length === 0 ? (
            <div className="text-center py-20">
              <p className="text-zinc-300 font-light text-xl">No products available in this category yet.</p>
            </div>
          ) : (
            products
              .filter(p => p.category === activeCategory)
              .map((product, idx) => (
                <motion.div 
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className={`flex flex-col md:flex-row gap-8 md:gap-16 items-center ${
                    idx % 2 === 1 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Product Image */}
                  <div className="w-full md:w-1/2">
                    <div className="relative aspect-[4/5] overflow-hidden bg-zinc-900 border border-zinc-800 group">
                      <Link to={`/product/${toSlug(product.name)}`} className="block w-full h-full">
                        <LazyImage 
                          src={product.image} 
                          alt={`${product.name} - Exquisite Perfume and Long Lasting Attar Collection`}
                          title={`${product.name} - Exquisite Perfume and Long Lasting Attar Collection`}
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 aspect-[4/5]"
                          loading={idx === 0 ? "eager" : "lazy"}
                          isLCP={idx === 0}
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </Link>
                      <div className="absolute inset-0 border-[1px] border-white/10 m-4 pointer-events-none"></div>
                      
                      {/* Like Button */}
                      <button
                        onClick={() => handleLike(product.id, product.name)}
                        aria-label={isInWishlist(product.id) ? "Remove from Wishlist" : "Add to Wishlist"}
                        className={`absolute top-6 right-6 p-3 rounded-full backdrop-blur-sm border transition-colors z-10 ${
                          isInWishlist(product.id)
                            ? 'bg-gold-500/90 text-black border-gold-500'
                            : 'bg-zinc-900/50 text-white border-zinc-500 hover:bg-gold-500/90 hover:text-black hover:border-gold-500'
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="w-full md:w-1/2 flex flex-col justify-center">
                    <Link to={`/product/${toSlug(product.name)}`} className="hover:text-gold-400 transition-colors">
                      <div className="text-3xl md:text-4xl font-display text-white mb-2">{product.name}</div>
                    </Link>
                    <div className="text-2xl text-gold-400 font-serif mb-6">{product.price}</div>
                    
                    <p className="text-zinc-300 font-light mb-8 text-lg leading-relaxed">
                      {product.description}
                    </p>

                    <div className="mb-10">
                      <div className="text-sm uppercase tracking-widest text-zinc-300 font-semibold mb-4 border-b border-zinc-800 pb-2">Fragrance Features & Notes</div>
                      <ul className="space-y-3">
                        {product.features.map((feature, i) => (
                          <li key={i} className="flex items-start text-zinc-300">
                            <Check className="w-5 h-5 text-gold-500 mr-3 shrink-0" />
                            <span className="font-light">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                      <button 
                        onClick={() => handleAddToCart(product.id, product.name)}
                        aria-label={`Add ${product.name} to Cart`}
                        className="flex-1 bg-white text-black hover:bg-gold-400 py-4 font-semibold uppercase tracking-widest text-sm transition-colors flex items-center justify-center"
                      >
                        <ShoppingBag className="w-4 h-4 mr-2" /> Add to Cart
                      </button>
                      <button
                        onClick={() => handleBuyNow(product.id)}
                        aria-label={`Buy ${product.name} now`}
                        className="flex-1 bg-transparent border border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-black py-4 font-semibold uppercase tracking-widest text-sm transition-colors flex items-center justify-center"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
          )}
        </div>
      </div>
    </div>
  );
}
