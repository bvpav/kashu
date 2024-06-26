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
