import { motion } from 'motion/react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { products } from '../data';
import { SEO } from '../components/SEO';
import LazyImage from '../components/LazyImage';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, cartTotal, itemCount } = useCart();
  const { user, openAuthModal } = useAuth();
  const navigate = useNavigate();

  const cartProducts = items.map(item => ({
    ...item,
    product: products.find(p => p.id === item.productId)!
  })).filter(item => item.product !== undefined);

  const handleCheckout = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      openAuthModal();
    } else {
      navigate('/checkout');
    }
  };

  return (
    <div className="w-full bg-zinc-950 min-h-screen pb-24">
      <SEO 
        title="Your Shopping Cart"
        description="Review your selected luxury attar perfumes and arabian oud products before checkout."
        path="/cart"
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
          Your Shopping Cart
        </motion.h1>
         <motion.div 
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "100px" }}
            className="h-1 bg-gold-600 mx-auto opacity-50"
          />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {itemCount === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 bg-zinc-900/50 border border-zinc-800"
          >
            <ShoppingBag className="w-16 h-16 text-zinc-700 mx-auto mb-6" />
            <h2 className="text-2xl font-display text-white mb-4">Your cart is empty</h2>
            <p className="text-zinc-300 mb-8 max-w-md mx-auto">
              Looks like you haven't made your choice yet. Explore our exquisite collection of luxury attar perfumes and premium arabian oud.
            </p>
            <Link to="/products" className="inline-block px-8 py-4 bg-gold-400 text-black font-semibold tracking-widest uppercase text-sm hover:bg-gold-500 transition-colors">
              Continue Shopping
            </Link>
          </motion.div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-2/3">
              <div className="flex justify-between border-b border-zinc-800 pb-4 mb-6 text-sm uppercase tracking-wider text-zinc-300 font-semibold">
                <span>Product</span>
                <span className="hidden sm:inline-block">Total</span>
              </div>
              
              <div className="space-y-6">
                {cartProducts.map((item, idx) => (
                  <motion.div 
                    key={item.productId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-6 bg-zinc-900 border border-zinc-800 p-4"
                  >
                    <LazyImage 
                      src={item.product.image} 
                      alt={`${item.product.name} - Luxury Fragrance Product`}
                      title={`${item.product.name} - Luxury Fragrance Product`} 
                      loading="lazy"
                      sizes="128px"
                      className="w-24 h-24 sm:w-32 sm:h-32 object-cover border border-zinc-800 aspect-square"
                    />
                    
                    <div className="flex-grow flex flex-col justify-between">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="text-lg sm:text-xl font-display text-white mb-1">{item.product.name}</div>
                          <p className="text-gold-400 font-serif">{item.product.price}</p>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.productId)}
                          className="text-zinc-300 hover:text-red-400 transition-colors p-2"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-4 mt-auto">
                        <div className="flex items-center border border-zinc-700 bg-zinc-950">
                          <button 
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            className="p-2 text-zinc-300 hover:text-white transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center text-white">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className="p-2 text-zinc-300 hover:text-white transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="lg:w-1/3">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-zinc-900 border border-zinc-800 p-8 sticky top-24"
              >
                <h2 className="text-2xl font-display text-white mb-6 border-b border-zinc-800 pb-4">Order Summary</h2>
                
                <div className="space-y-4 mb-6 text-zinc-300 font-light">
                  <div className="flex justify-between">
                    <span>Subtotal ({itemCount} items)</span>
                    <span className="text-white">₹{cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-white">Free</span>
                  </div>
                </div>
                
                <div className="border-t border-zinc-800 pt-6 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="text-lg uppercase tracking-wider font-semibold text-white">Total</span>
                    <span className="text-2xl font-serif text-gold-400">₹{cartTotal.toLocaleString()}</span>
                  </div>
                </div>
                
                <button 
                  onClick={handleCheckout} 
                  className="w-full bg-gold-400 text-black py-4 font-semibold uppercase tracking-widest text-sm hover:bg-gold-500 transition-colors flex items-center justify-center"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
