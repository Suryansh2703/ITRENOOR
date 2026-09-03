import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingBag, Heart, User as UserIcon } from 'lucide-react';
import { useState, useEffect, lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'motion/react';

// Pages - Lazy loaded for better performance
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const WishlistPage = lazy(() => import('./pages/WishlistPage'));
const ContactSuccessPage = lazy(() => import('./pages/ContactSuccessPage'));
const BestSellersPage = lazy(() => import('./pages/BestSellersPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Context
import { CartProvider, useCart } from './context/CartContext';
import { WishlistProvider, useWishlist } from './context/WishlistContext';
import { AuthProvider, useAuth } from './context/AuthContext';

// Components
import WishlistNotification from './components/WishlistNotification';
import CartNotification from './components/CartNotification';
import AuthModal from './components/AuthModal';

const logoOptimized = '/logo-optimized.jpg';

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <BrowserRouter>
            <div className="flex flex-col min-h-screen">
              <WishlistNotification />
              <CartNotification />
              <Navigation />
              <AuthModal />
              <main className="flex-grow pt-20">
                <AnimatePresence mode="wait">
                  <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-zinc-950 text-gold-400 font-display">Loading...</div>}>
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/about" element={<AboutPage />} />
                      <Route path="/products" element={<ProductsPage />} />
                      <Route path="/product/:id" element={<ProductDetailPage />} />
                      <Route path="/best-sellers" element={<BestSellersPage />} />
                      <Route path="/blog" element={<BlogPage />} />
                      <Route path="/blog/:id" element={<BlogPostPage />} />
                      <Route path="/contact" element={<ContactPage />} />
                      <Route path="/contact-success" element={<ContactSuccessPage />} />
                      <Route path="/cart" element={<CartPage />} />
                      <Route path="/checkout" element={<CheckoutPage />} />
                      <Route path="/wishlist" element={<WishlistPage />} />
                      <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                  </Suspense>
                </AnimatePresence>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogoExpanded, setIsLogoExpanded] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { itemCount } = useCart();
  const { wishlistCount, wishlistMessage } = useWishlist();
  const { user, openAuthModal, logout } = useAuth();

  useEffect(() => {
    setIsOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
    {name: 'Wishlist', path: '/wishlist' },
    {name: 'Cart', path: '/cart' }
  ];

  return (
    <>
      {/* Full Screen Logo Overlay */}
      <AnimatePresence>
        {isLogoExpanded && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsLogoExpanded(false)}
            className="fixed inset-0 z-[100] backdrop-blur-xl bg-zinc-950/60 flex items-center justify-center cursor-pointer"
          >
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              className="w-64 h-64 md:w-96 md:h-96 rounded-full bg-zinc-900 border-4 border-gold-500 shadow-[0_0_50px_rgba(212,175,55,0.3)] flex flex-col items-center justify-center overflow-hidden"
            >
              <img src={logoOptimized} alt="ITR-E-NOOR Logo Expanded" title="ITR-E-NOOR Logo" fetchPriority="high" loading="eager" width={400} height={400} sizes="400px" className="w-full h-full object-cover rounded-full" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="fixed w-full z-50 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div 
              onClick={() => {
                navigate('/');
                setIsLogoExpanded(true);
              }}
              className="flex items-center space-x-3 cursor-pointer"
            >
              <img src={logoOptimized} alt="ITR-E-NOOR Logo" title="ITR-E-NOOR Logo" fetchPriority="high" loading="eager" width={48} height={48} sizes="48px" className="w-10 h-10 md:w-12 md:h-12 object-cover rounded-full" />
              <span className="font-display text-xl sm:text-2xl md:text-3xl tracking-widest text-gold-400">ITR-E-NOOR</span>
            </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm uppercase tracking-wider transition-colors hover:text-gold-400 ${
                  location.pathname === link.path ? 'text-gold-400' : 'text-zinc-200'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {user ? (
              <button onClick={logout} aria-label="Log Out" className="text-zinc-200 hover:text-gold-400 transition-colors uppercase text-sm tracking-wider flex items-center gap-2">
                 <UserIcon className="w-5 h-5" />
                 <span className="hidden lg:inline">{user.name}</span>
              </button>
            ) : (
              <button 
                onClick={openAuthModal}
                aria-label="Sign In"
                className="text-zinc-200 hover:text-gold-400 transition-colors uppercase text-sm tracking-wider flex items-center gap-2"
              >
                <UserIcon className="w-5 h-5" />
                <span className="hidden lg:inline">Sign In</span>
              </button>
            )}

            <Link to="/wishlist" aria-label="View Wishlist" title="Wishlist"className="relative text-zinc-200 hover:text-gold-400 transition-colors hidden lg:block">
              <Heart className="w-5 h-5" />
              <span className="sr-only">Wishlist</span>
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold-500 text-black text-[10px] sm:text-xs font-bold w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link to="/cart" aria-label="View Cart" title="Shopping Cart" className="relative text-zinc-200 hover:text-gold-400 transition-colors hidden lg:block">
              <ShoppingBag className="w-5 h-5" />
               <span className="sr-only">Cart</span>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold-500 text-black text-[10px] sm:text-xs font-bold w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
             {user ? (
               <button onClick={logout} aria-label="Log Out" className="text-zinc-200 hover:text-gold-400 transition-colors">
                  <UserIcon className="w-5 h-5" />
               </button>
             ) : (
                <button onClick={openAuthModal} aria-label="Sign In" className="text-zinc-200 hover:text-gold-400 transition-colors">
                  <UserIcon className="w-5 h-5" />
                </button>
             )}
             <Link to="/wishlist" aria-label="View Wishlist" title="Wishlist" className="relative text-zinc-200 hover:text-gold-400 transition-colors">
              <Heart className="w-5 h-5" />
              <span className="sr-only">Wishlist</span>
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold-500 text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
             <Link to="/cart" aria-label="View Cart" title="Shopping Cart" className="relative text-zinc-200 hover:text-gold-400 transition-colors">
              <ShoppingBag className="w-5 h-5" />
               <span className="sr-only">Cart</span>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold-500 text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              className="text-zinc-200 hover:text-gold-400 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-zinc-900 border-b border-zinc-800"
          >
            <div className="px-4 pt-2 pb-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`block px-3 py-3 text-base uppercase tracking-wider font-medium tracking-wide ${
                    location.pathname === link.path ? 'text-gold-400 bg-black/20' : 'text-zinc-300 hover:text-gold-400'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              {user ? (
                 <button 
                  onClick={logout}
                  className="block w-full text-left px-3 py-3 text-base uppercase tracking-wider font-medium tracking-wide text-zinc-300 hover:text-gold-400"
                 >
                   Log Out
                 </button>
              ) : (
                <button 
                  onClick={() => {
                    setIsOpen(false);
                    openAuthModal();
                  }}
                  className="block w-full text-left px-3 py-3 text-base uppercase tracking-wider font-medium tracking-wide text-zinc-300 hover:text-gold-400"
                 >
                   Sign In
                 </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
    </>
  );
}

function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <span className="font-display text-2xl sm:text-4xl md:text-5xl tracking-widest text-gold-400 mb-4 whitespace-nowrap">ITR-E-NOOR</span>
            <p className="text-zinc-300 italic font-serif mb-4 text-lg sm:text-xl md:text-2xl whitespace-nowrap text-center md:text-left">A Fragrance That Becomes A Memory</p>
            <img src={logoOptimized} alt="ITR-E-NOOR Logo" title="ITR-E-NOOR Logo" loading="lazy" decoding="async" width={256} height={256} sizes="256px" className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 object-cover rounded-full mt-4" />
          </div>
          
          <div className="flex flex-col items-center md:items-start">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-widest text-gold-400 mb-8 whitespace-nowrap">Quick Links</h2>
            <ul className="space-y-4">
              {[
                { name: 'Home', path: '/home' },
                { name: 'About Us', path: '/about' },
                { name: 'Products', path: '/products' },
                { name: 'Blog', path: '/blog' },
                { name: 'Contact', path: '/contact' },
                {name: 'Wishlist', path: '/wishlist' },
                {name: 'Cart', path: '/cart' }
                
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-zinc-300 hover:text-gold-400 transition-colors text-lg sm:text-xl md:text-2xl">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-widest text-gold-400 mb-8 whitespace-nowrap">Follow Us</h2>
            <ul className="space-y-4">
              {[
                { name: 'Instagram', url: 'https://www.instagram.com/itr.e.noor12/' },
                { name: 'Facebook', url: 'https://www.facebook.com/itrenoor/' },
              ].map((social) => (
                <li key={social.name}>
                  <a href={social.url} target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-gold-400 transition-colors text-lg sm:text-xl md:text-2xl">
                    {social.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-zinc-900 text-center text-sm text-zinc-300">
          <p>Copyright &copy; 2026 ITR-E-NOOR. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
