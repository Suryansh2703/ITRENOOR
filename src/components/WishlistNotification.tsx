import { motion, AnimatePresence } from 'motion/react';
import { useWishlist } from '../context/WishlistContext';

export default function WishlistNotification() {
  const { wishlistMessage } = useWishlist();

  return (
    <AnimatePresence>
      {wishlistMessage && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-24 left-1/2 transform -translate-x-1/2 z-[100] bg-zinc-900 border border-gold-500 text-gold-400 px-6 py-3 rounded-full shadow-lg"
        >
          {wishlistMessage}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
