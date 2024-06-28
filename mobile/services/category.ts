import CategoryExpanded from "@/types/categories";
import Product from "@/types/products";
import { StorePath } from "@/types/shopping-list";
export const searchProductInCategories = ({
  categories,
  searchQuery,
}: {
  categories: CategoryExpanded[];
  searchQuery: string;
}) => {
  return categories.filter((category) => {
    const isCategoryMatch = category.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const isProductMatch = category.products.some((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return isCategoryMatch || isProductMatch;
  });
};

export const prefetchCategories = () => ({
  queryKey: ["categories"],
  queryFn: () =>
    fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/categories`).then(
      (res) => res.json() as Promise<CategoryExpanded[]>,
    ),
  staleTime: 60000,
  retry: 5,
});

export const getShoppingListRoute = async (card: Product[]) => {
  const ids = card.map((product) => product.id);
  const res = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/api/shopping-list`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ids }),
    },
  );
  return (await res.json()) as Promise<StorePath>;
};

export const prefetchShoppingListRoute = (card: Product[]) => ({
  queryKey: ["path", card],
  queryFn: () => getShoppingListRoute(card),
  staleTime: 60000,
  retry: 5,
});
