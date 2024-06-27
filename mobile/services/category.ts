import CategoryExpanded from "@/types/categories";
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
