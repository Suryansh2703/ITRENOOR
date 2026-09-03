import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, Heart, ArrowLeft } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { products } from '../data';
import { useAuth } from '../context/AuthContext';
import { SEO } from '../components/SEO';
import LazyImage from '../components/LazyImage';

export default function WishlistPage() {
  const { items, removeFromWishlist, wishlistCount } = useWishlist();
  const { addToCart, setCartMessage } = useCart();
  const navigate = useNavigate();
  const { user, openAuthModal } = useAuth();

  const handleAddToCart = (id: string) => {
    addToCart(id);
    setCartMessage('Added to Cart');
    
    setTimeout(() => {
      setCartMessage(null);
      navigate('/cart');
    }, 1000);
  };

  const handleBuyNow = (id: string) => {
    if (!user) {
      openAuthModal();
      return;
    }
    addToCart(id);
    navigate('/checkout');
  };

  const wishlistProducts = items.map(id => products.find(p => p.id === id)).filter(p => p !== undefined);

  return (
    <div className="w-full bg-zinc-950 min-h-screen pb-24">
      <SEO 
        title="Your Wishlist"
        description="View your saved luxury attar perfumes and arabian oud products. Keep track of your favorite fragrances for later."
        path="/wishlist"
      />
      <div className="py-20 bg-zinc-900 border-b border-zinc-800 text-center px-4 mb-12 relative">
        <Link to="/" className="absolute top-8 left-8 text-zinc-300 hover:text-gold-500 flex items-center gap-2 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-display text-white mb-4"
        >
          Your Wishlist
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
            className="text-zinc-300 font-serif max-w-2xl mx-auto text-lg"
          >
            Review all the beautiful luxury attar perfumes and arabian oud fragrances you have saved. Prepare to make these exquisite creations your own signature scent.
          </motion.p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {wishlistCount === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 bg-zinc-900/50 border border-zinc-800"
          >
            <Heart className="w-16 h-16 text-zinc-700 mx-auto mb-6" />
            <h2 className="text-2xl font-display text-white mb-4">Your wishlist is empty</h2>
            <p className="text-zinc-300 mb-8 max-w-md mx-auto">
              You haven't liked any products yet. Discover your signature long-lasting attar scent from our collection.
            </p>
            <Link to="/products" className="inline-block px-8 py-4 bg-gold-400 text-black font-semibold tracking-widest uppercase text-sm hover:bg-gold-500 transition-colors">
              Explore Collection
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlistProducts.map((product, idx) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-zinc-900 border border-zinc-800 group relative"
              >
                <div className="relative overflow-hidden aspect-square">
                  <LazyImage 
                    src={product.image} 
                    alt={`${product.name} - Saved Luxury Attar`}
                    title={`${product.name} - Saved Luxury Attar`} 
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 aspect-square"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <button 
                    onClick={() => removeFromWishlist(product.id)}
                    className="absolute top-4 right-4 p-3 bg-zinc-900/80 backdrop-blur-sm text-red-500 border border-zinc-700 hover:bg-red-500 hover:text-white transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  
                  <div className="absolute bottom-4 left-4 right-4 bg-zinc-900/90 backdrop-blur-md border border-zinc-800 p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-xl font-display text-white">{product.name}</div>
                      <span className="text-gold-400 font-serif">{product.price}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border-t border-zinc-800 space-y-3">
                  <button 
                    onClick={() => handleAddToCart(product.id)}
                    className="w-full bg-zinc-950 border border-zinc-700 text-white py-4 font-semibold uppercase tracking-widest text-sm hover:border-gold-400 hover:text-gold-400 transition-colors flex items-center justify-center"
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" /> Add to Cart
                  </button>
                  <button 
                    onClick={() => handleBuyNow(product.id)}
                    className="w-full bg-transparent border border-gold-400 text-gold-400 py-4 font-semibold uppercase tracking-widest text-sm hover:bg-gold-400 hover:text-black transition-colors flex items-center justify-center"
                  >
                    Buy Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
