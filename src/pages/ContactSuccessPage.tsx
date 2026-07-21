import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { SEO } from '../components/SEO';

export default function ContactSuccessPage() {
  return (
    <div className="w-full min-h-[70vh] bg-zinc-950 flex flex-col items-center justify-center px-4">
      <SEO 
        title="Message Sent Successfully"
        description="Thank you for reaching out to ITR-E-NOOR. Your message has been sent successfully and we will respond to your inquiry soon."
        path="/contact-success"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl mt-12 mb-12"
      >
        <motion.div
           initial={{ scale: 0 }}
           animate={{ scale: 1 }}
           transition={{ type: "spring", damping: 15, delay: 0.2 }}
           className="w-24 h-24 bg-gold-500/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-gold-500/30"
        >
          <CheckCircle className="w-12 h-12 text-gold-400" />
        </motion.div>
        
        <h1 className="text-4xl md:text-5xl font-display text-white mb-6">Message Sent Successfully</h1>
        <div className="w-24 h-px bg-gold-500/50 mx-auto mb-8"></div>
        
        <p className="text-xl md:text-2xl font-serif text-gold-400 italic mb-8 mx-auto leading-relaxed">
          "Fragrance is the invisible, unforgettable, ultimate accessory of fashion... that heralds your arrival and prolongs your departure."
        </p>
        
        <div className="text-zinc-300 font-light mb-12 space-y-4">
          <p>
            Thank you for reaching out to ITR-E-NOOR. We have received your message and our dedicated team will review your inquiry.
          </p>
          <p>
            At ITR-E-NOOR, we are committed to providing the highest level of customer service. Whether you have questions about our luxury attar perfumes, need assistance with your royal perfume order, or simply want to learn more about our traditional fragrance crafting process, our fragrance experts are here to help.
          </p>
          <p>
            Please allow up to 24-48 business hours for a detailed response from our customer care team. In the meantime, we invite you to explore our latest collections and newly launched rare majestic perfumes.
          </p>
        </div>
        
        <Link 
          to="/"
          className="inline-block bg-transparent border border-gold-500 text-gold-400 hover:bg-gold-500 hover:text-black font-semibold tracking-widest uppercase text-sm px-8 py-4 transition-colors duration-300"
        >
          Return to Home
        </Link>
      </motion.div>
    </div>
  );
}
