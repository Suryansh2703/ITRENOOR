import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShoppingBag, ArrowLeft, Check } from 'lucide-react';
import { products } from '../data';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toSlug } from '../utils/slug';
import { SEO } from '../components/SEO';
import LazyImage from '../components/LazyImage';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, setCartMessage } = useCart();
  const { user, openAuthModal } = useAuth();
  
  const product = products.find(p => p.id === id || toSlug(p.name) === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="text-center">
          <h2 className="text-2xl font-serif mb-4">Fragrance Not Found</h2>
          <button 
            onClick={() => navigate('/')}
            className="text-gold-400 hover:text-gold-300 font-display uppercase tracking-widest text-sm"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product.id);
    setCartMessage('Added to Cart');                
    setTimeout(() => {
      setCartMessage(null);
      navigate('/cart');
    }, 1000);
  };

  const handleBuyNow = () => {
    if (!user) {
      openAuthModal();
      return;
    }
    addToCart(product.id);
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-black text-white py-24 px-4 sm:px-6 lg:px-8">
      <SEO 
        title={product.name}
        description={product.description}
        path={`/product/${toSlug(product.name)}`}
        image={product.image}
        preloadImage={product.image}
        type="product"
        schemaMarkup={`{
          "@context": "https://schema.org/",
          "@type": "Product",
          "name": "${product.name}",
          "image": "https://www.itrenoor.app${product.image}",
          "description": "${product.description}",
          "brand": {
            "@type": "Brand",
            "name": "ITR-E-NOOR"
          },
          "offers": {
            "@type": "Offer",
            "url": "https://www.itrenoor.app/product/${toSlug(product.name)}",
            "priceCurrency": "INR",
            "price": "${product.price.replace(/[^0-9.]/g, '')}",
            "availability": "https://schema.org/InStock"
          }
        }`}
      />
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-zinc-300 hover:text-gold-400 mb-12 uppercase tracking-widest text-xs font-bold transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="aspect-[4/5] bg-zinc-900 border border-zinc-800 relative overflow-hidden"
          >
            <LazyImage 
              src={product.image} 
              alt={`${product.name} - Buy Premium Luxury Attar Perfume and Arabian Oud Online`}
              title={`${product.name} - Buy Premium Luxury Attar Perfume and Arabian Oud Online`}
              fetchPriority="high"
              loading="eager"
              isLCP={true}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="w-full h-full object-cover object-center"
            />
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-center"
          >
            <span className="text-gold-500 text-xs font-bold uppercase tracking-widest mb-4">
              {product.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-display mb-6">
              {product.name}
            </h1>
            <p className="text-2xl font-serif text-white/90 mb-8">
              {product.price}
            </p>
            <p className="text-zinc-300 text-lg font-light mb-10 leading-relaxed">
              {product.description}
            </p>

            {product.features && product.features.length > 0 && (
              <div className="mb-12">
                <h3 className="text-sm uppercase tracking-widest font-bold text-white mb-6">Key Accords</h3>
                <ul className="space-y-4">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-zinc-300">
                      <Check className="w-5 h-5 text-gold-500 mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <button 
                onClick={handleAddToCart}
                className="flex-1 py-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white uppercase tracking-widest text-sm font-bold transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" /> Add to Cart
              </button>
              <button 
                onClick={handleBuyNow}
                className="flex-1 py-4 bg-gold-600 hover:bg-gold-500 text-black uppercase tracking-widest text-sm font-bold transition-colors"
              >
                Buy Now
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
