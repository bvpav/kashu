import categoryData from "@/app/categories.json";
import productsData from "@/app/products.json";
export function getCategoryProducts(id: number) {
  return productsData.products.filter((product) => product.category_id === id);
}

export function getCategoryNameById(id: number) {
  return categoryData.categories.filter((category) => category.id === id)[0]
    .name;
}
