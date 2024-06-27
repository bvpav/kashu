import { getShoppingListRoute } from "@/services/category";
import { useQuery } from "@tanstack/react-query";
import useCartContext from "./useCartContext";

export default function useStorePath() {
  const cartContext = useCartContext();
  const { data } = useQuery({
    queryKey: ["path", cartContext.cart],
    queryFn: () => getShoppingListRoute(cartContext.cart),
  });
  return data;
}
