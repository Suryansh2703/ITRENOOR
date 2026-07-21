import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, ArrowLeft } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

export default function ContactPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact ITR-E-NOOR",
    "url": "https://www.itrenoor.app/contact",
    "description": "Contact ITR-E-NOOR, the best attar shop near you. Reach out for inquiries about our luxury perfumes, arabian oud, and long lasting attar.",
    "mainEntity": {
      "@type": "Organization",
      "name": "ITR-E-NOOR",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91 80096 84524",
        "contactType": "Customer Service",
        "email": "contact@www.itrenoor.app",
        "areaServed": "IN"
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      navigate('/contact-success');
    }, 800); // Simulate brief network delay
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  return (
    <div className="w-full bg-zinc-950 pb-24">
      <SEO 
        title="Contact Us"
        description="Get in touch with ITR-E-NOOR for inquiries about our luxury attar perfumes and arabian oud. Find our store locations and contact details."
        path="/contact"
        schemaMarkup={JSON.stringify(contactSchema)}
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
          Contact Us
        </motion.h1>
         <motion.div 
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "100px" }}
            className="h-1 bg-gold-600 mx-auto opacity-50 mb-6"
          />
          <p className="text-zinc-300 max-w-2xl mx-auto font-light leading-relaxed">
            We would love to hear from you. For inquiries about our luxury attar perfumes and arabian oud collections, styling advice, or assistance with your order, please do not hesitate to reach out. Our experts are always ready to guide you on your journey through the world of royal perfumery and help you find your signature long-lasting attar.
          </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Information */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-12"
          >
            <div>
              <h2 className="text-2xl font-serif text-gold-400 mb-8 border-b border-zinc-800 pb-4">Get in Touch with ITR-E-NOOR</h2>
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-zinc-900 flex items-center justify-center shrink-0 border border-zinc-800">
                    <MapPin className="w-5 h-5 text-gold-400" />
                  </div>
                  <div className="ml-6">
                    <div className="text-sm uppercase tracking-widest text-zinc-300 font-semibold mb-1">Address</div>
                    <p className="text-zinc-300 font-light">123 Fragrance Street, <br/>Perfume Market, <br/>New Delhi, India</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-zinc-900 flex items-center justify-center shrink-0 border border-zinc-800">
                    <Phone className="w-5 h-5 text-gold-400" />
                  </div>
                  <div className="ml-6">
                    <div className="text-sm uppercase tracking-widest text-zinc-300 font-semibold mb-1">Phone</div>
                    <p className="text-zinc-300 font-light">+91 98765 43210</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-zinc-900 flex items-center justify-center shrink-0 border border-zinc-800">
                    <Mail className="w-5 h-5 text-gold-400" />
                  </div>
                  <div className="ml-6">
                    <div className="text-sm uppercase tracking-widest text-zinc-300 font-semibold mb-1">Email</div>
                    <a href="mailto:info@www.itrenoor.app" className="text-zinc-300 font-light hover:text-gold-400 transition-colors">info@www.itrenoor.app</a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-zinc-900 flex items-center justify-center shrink-0 border border-zinc-800">
                    <Clock className="w-5 h-5 text-gold-400" />
                  </div>
                  <div className="ml-6">
                    <div className="text-sm uppercase tracking-widest text-zinc-300 font-semibold mb-1">Working Hours</div>
                    <p className="text-zinc-300 font-light">Monday - Saturday:<br/>10:00 AM – 7:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
             initial={{ opacity: 0, x: 30 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.6, delay: 0.2 }}
             className="bg-zinc-900/50 border border-zinc-800 p-8 md:p-12"
          >
            <h2 className="text-2xl font-serif text-gold-400 mb-8 border-b border-zinc-800 pb-4">Send us a Message</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-xs uppercase tracking-widest text-zinc-300 font-semibold mb-2">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    value={formData.name}
                    onChange={handleChange}
                    required
                    minLength={2}
                    className="w-full bg-zinc-950 border border-zinc-800 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 px-4 py-3 text-white outline-none transition-all font-light"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs uppercase tracking-widest text-zinc-300 font-semibold mb-2">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-zinc-950 border border-zinc-800 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 px-4 py-3 text-white outline-none transition-all font-light"
                    placeholder="you@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-xs uppercase tracking-widest text-zinc-300 font-semibold mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  pattern="^\+?[1-9]\d{1,14}$|^[0-9]{10}$"
                  title="Please enter a valid phone number"
                  className="w-full bg-zinc-950 border border-zinc-800 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 px-4 py-3 text-white outline-none transition-all font-light"
                  placeholder="+91 or 10-digit number"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs uppercase tracking-widest text-zinc-300 font-semibold mb-2">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  minLength={3}
                  className="w-full bg-zinc-950 border border-zinc-800 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 px-4 py-3 text-white outline-none transition-all font-light"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs uppercase tracking-widest text-zinc-300 font-semibold mb-2">Message</label>
                <textarea 
                  id="message" 
                  value={formData.message}
                  onChange={handleChange}
                  required
                  minLength={10}
                  rows={5}
                  className="w-full bg-zinc-950 border border-zinc-800 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 px-4 py-3 text-white outline-none transition-all font-light resize-none"
                  placeholder="Write your message here..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-gold-500 hover:bg-gold-400 text-black font-semibold tracking-widest uppercase text-sm py-4 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
