import { CartContext, CartContextType } from "@/contexts/cart-context";
import { useContext } from "react";

export default function useCartContext() {
  return useContext(CartContext) as CartContextType;
}
