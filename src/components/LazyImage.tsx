import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LazyImageProps {
  src: string;
  alt: string;
  title?: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  fetchPriority?: 'high' | 'low' | 'auto';
  loading?: 'lazy' | 'eager';
  sizes?: string;
  srcSet?: string;
  isLCP?: boolean;
}

export default function LazyImage({ 
  src, 
  alt, 
  title,
  className = '', 
  width, 
  height, 
  fetchPriority = 'auto',
  loading = 'lazy',
  sizes,
  srcSet,
  isLCP = false
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(isLCP);

  return (
    <div 
      className={`relative overflow-hidden bg-zinc-900/50 ${className}`} 
      style={{ width, height }}
    >
      <AnimatePresence>
        {!isLoaded && !isLCP && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-zinc-900 animate-pulse z-10"
          />
        )}
      </AnimatePresence>
      
      <motion.img
        initial={isLCP ? { opacity: 1 } : { opacity: 0 }}
        animate={isLCP ? { opacity: 1 } : { opacity: isLoaded ? 1 : 0 }}
        transition={isLCP ? { duration: 0 } : { duration: 0.5 }}
        src={src}
        srcSet={srcSet}
        alt={alt}
        title={title}
        className={`w-full h-full object-cover ${className}`}
        loading={isLCP ? 'eager' : loading}
        decoding={isLCP ? 'sync' : 'async'}
        fetchPriority={isLCP ? 'high' : fetchPriority}
        sizes={sizes}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
}