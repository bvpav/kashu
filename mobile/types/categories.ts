import Product from "./products";

export default interface Category {
  id: number;
  name: string;
  description?: string;
}

export default interface CategoryExpanded {
  id: number;
  name: string;
  description?: string;
  products: Product[];
}
