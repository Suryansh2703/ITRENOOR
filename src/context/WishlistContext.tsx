import { createContext, useContext, useState, ReactNode } from 'react';

export type WishlistContextType = {
  items: string[];
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  wishlistCount: number;
  wishlistMessage: string | null;
  setWishlistMessage: (message: string | null) => void;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<string[]>([]);
  const [wishlistMessage, setWishlistMessage] = useState<string | null>(null);

  const addToWishlist = (productId: string) => {
    setItems((prevItems) => {
      if (!prevItems.includes(productId)) {
        return [...prevItems, productId];
      }
      return prevItems;
    });
  };

  const removeFromWishlist = (productId: string) => {
    setItems((prevItems) => prevItems.filter((id) => id !== productId));
  };

  const isInWishlist = (productId: string) => {
    return items.includes(productId);
  };

  const wishlistCount = items.length;

  return (
    <WishlistContext.Provider
      value={{ items, addToWishlist, removeFromWishlist, isInWishlist, wishlistCount, wishlistMessage, setWishlistMessage }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
