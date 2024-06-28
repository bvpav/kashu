import { CartContext, CartContextType } from "@/contexts/cart-context";
import { prefetchShoppingListRoute } from "@/services/category";
import { useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect } from "react";

export default function useCartContext() {
  const cartContext = useContext(CartContext) as CartContextType;
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.prefetchQuery(prefetchShoppingListRoute(cartContext.cart));
  }, [cartContext.cart, queryClient]);

  return cartContext;
}
