import React, { createContext, useState, ReactNode, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Product from "@/types/products";

export interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (product_id: string) => void;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const storedCart = await AsyncStorage.getItem(
          "grocery-pathfinder-shopping-cart",
        );
        if (storedCart) {
          setCart(JSON.parse(storedCart));
        }
      } catch (error) {
        console.error("Failed to load cart from storage", error);
      }
    };

    loadCart();
  }, []);

  useEffect(() => {
    const saveCart = async () => {
      try {
        await AsyncStorage.setItem(
          "grocery-pathfinder-shopping-cart",
          JSON.stringify(cart),
        );
      } catch (error) {
        console.error("Failed to save cart to storage", error);
      }
    };

    saveCart();
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = (product_id: string) => {
    setCart((prevCart) => prevCart.filter((p) => p.product_id !== product_id));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
