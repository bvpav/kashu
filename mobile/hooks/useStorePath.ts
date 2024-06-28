import {
  getShoppingListRoute,
  prefetchShoppingListRoute,
} from "@/services/category";
import { useQuery } from "@tanstack/react-query";
import useCartContext from "./useCartContext";

export default function useStorePath() {
  const cartContext = useCartContext();
  const { data } = useQuery(prefetchShoppingListRoute(cartContext.cart));
  return data;
}
