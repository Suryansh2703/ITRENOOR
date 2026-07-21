import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useCart } from '../context/CartContext';
import { CreditCard, Truck, ShieldCheck, Check, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { SEO } from '../components/SEO';

export default function CheckoutPage() {
  const { cartTotal, itemCount, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
    }, 2000);
  };

  if (itemCount === 0 && !isSuccess) {
    return (
      <div className="w-full bg-zinc-950 min-h-screen pt-32 pb-24 px-4 flex flex-col items-center">
        <h2 className="text-2xl font-display text-white mb-4">Your <span className="text-gold-400">luxury attar perfumes</span> Cart is Empty</h2>
        <Link to="/products" className="inline-block px-8 py-4 bg-gold-400 text-black font-semibold tracking-widest uppercase text-sm hover:bg-gold-500 transition-colors">
          Return to Shop
        </Link>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="w-full bg-zinc-950 min-h-screen pt-32 pb-24 px-4 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-zinc-900 border border-zinc-800 p-12 text-center max-w-lg w-full"
        >
          <div className="w-20 h-20 bg-gold-400/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-gold-400" />
          </div>
          <h2 className="text-3xl font-display text-white mb-4">Order Payment Successful!</h2>
          <p className="text-zinc-400 mb-8 font-light">
            Thank you for your majestic purchase. Your luxurious attar will be shipped to you shortly.
          </p>
          <button 
            onClick={() => navigate('/')}
            className="w-full px-8 py-4 bg-gold-400 text-black font-semibold tracking-widest uppercase text-sm hover:bg-gold-500 transition-colors"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full bg-zinc-950 min-h-screen pb-24">
      <SEO 
        title="Secure Checkout"
        description="Securely checkout your luxury attar perfumes and arabian oud order."
        path="/checkout"
      />
      <div className="py-20 bg-zinc-900 border-b border-zinc-800 text-center px-4 mb-12 relative">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-display text-white mb-4"
        >
          Secure Checkout
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
            className="text-zinc-300 font-serif max-w-2xl mx-auto text-lg leading-relaxed"
          >
            Complete your royal purchase securely. Please provide your shipping details and payment information to finalize your order for our exquisite luxury attar perfumes and arabian oud. Our team will carefully handpack your fragrances and ensure they are delivered safely to your doorstep.
          </motion.p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-zinc-300 hover:text-gold-400 transition-colors uppercase tracking-widest text-xs font-semibold bg-zinc-900/50 px-5 py-3 rounded-full border border-zinc-800/80 hover:border-gold-500/30 font-sans cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-gold-400" />
            <span>Go Back</span>
          </button>
        </div>
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Payment Form */}
          <div className="lg:w-2/3">
            <form onSubmit={handlePayment} className="space-y-8">
              {/* Shipping Details */}
              <div className="bg-zinc-900 border border-zinc-800 p-8">
                <h2 className="text-2xl font-display text-white mb-6 flex items-center">
                  <Truck className="w-6 h-6 mr-3 text-gold-400" /> Shipping Address
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-zinc-300 text-sm mb-2 font-light">First Name</label>
                    <input required type="text" className="w-full bg-zinc-950 border border-zinc-800 p-3 text-white focus:outline-none focus:border-gold-400 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-zinc-300 text-sm mb-2 font-light">Last Name</label>
                    <input required type="text" className="w-full bg-zinc-950 border border-zinc-800 p-3 text-white focus:outline-none focus:border-gold-400 transition-colors" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-zinc-300 text-sm mb-2 font-light">Address</label>
                    <input required type="text" className="w-full bg-zinc-950 border border-zinc-800 p-3 text-white focus:outline-none focus:border-gold-400 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-zinc-300 text-sm mb-2 font-light">City</label>
                    <input required type="text" className="w-full bg-zinc-950 border border-zinc-800 p-3 text-white focus:outline-none focus:border-gold-400 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-zinc-300 text-sm mb-2 font-light">Postal Code</label>
                    <input required type="text" className="w-full bg-zinc-950 border border-zinc-800 p-3 text-white focus:outline-none focus:border-gold-400 transition-colors" />
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div className="bg-zinc-900 border border-zinc-800 p-8">
                <h2 className="text-2xl font-display text-white mb-6 flex items-center">
                  <CreditCard className="w-6 h-6 mr-3 text-gold-400" /> Secure Payment Details
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-zinc-300 text-sm mb-2 font-light">Card Number</label>
                    <input required type="text" placeholder="0000 0000 0000 0000" className="w-full bg-zinc-950 border border-zinc-800 p-3 text-white focus:outline-none focus:border-gold-400 transition-colors" />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-zinc-300 text-sm mb-2 font-light">Expiry Date</label>
                      <input required type="text" placeholder="MM/YY" className="w-full bg-zinc-950 border border-zinc-800 p-3 text-white focus:outline-none focus:border-gold-400 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-zinc-300 text-sm mb-2 font-light">CVV</label>
                      <input required type="text" placeholder="123" className="w-full bg-zinc-950 border border-zinc-800 p-3 text-white focus:outline-none focus:border-gold-400 transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-zinc-300 text-sm mb-2 font-light">Name on Card</label>
                    <input required type="text" className="w-full bg-zinc-950 border border-zinc-800 p-3 text-white focus:outline-none focus:border-gold-400 transition-colors" />
                  </div>
                </div>
              </div>
              
              <button 
                type="submit"
                disabled={isProcessing}
                className="w-full bg-gold-400 text-black py-4 font-semibold uppercase tracking-widest text-sm hover:bg-gold-500 transition-colors flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Processing Payment...' : `Pay ₹${cartTotal.toLocaleString()}`}
              </button>
            </form>
          </div>

          {/* Order Summary */}
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
              
              <div className="border-t border-zinc-800 pt-6 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg uppercase tracking-wider font-semibold text-white">Total</span>
                  <span className="text-2xl font-serif text-gold-400">₹{cartTotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex items-center text-zinc-300 text-xs gap-2">
                <ShieldCheck className="w-4 h-4 text-gold-400 shrink-0" />
                <span>Your payment information is encrypted and secure.</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
