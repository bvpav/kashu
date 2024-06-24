import React, { useEffect, useState } from "react";
import { FlatList, Text, View, StyleSheet } from "react-native";
import categoriesData from "./categories.json"; // replace with the actual path to your JSON file
import productsData from "./products.json"; // replace with the actual path to your JSON file
import Product from "@/components/product";

interface Category {
  id: number;
  name: string;
}

interface Product {
  product_id: string;
  name: string;
  category_id: number;
}

export default function ProductsScreen() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setCategories(categoriesData.categories);
    setProducts(productsData.products);
  }, []);

  const renderProduct = (item: Product) => (
    <Product
      key={item.product_id}
      product={item.name}
      category={`${item.category_id}`}
    />
  );

  const renderCategory = ({ item }: any) => {
    const categoryProducts = products.filter(
      (product) => product.category_id === item.id
    );

    return (
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryName}>{item.name}</Text>
        {categoryProducts.length > 0
          ? categoryProducts.map(renderProduct)
          : null}
      </View>
    );
  };

  return (
    <FlatList
      data={categories}
      renderItem={renderCategory}
      keyExtractor={(category) => category.id.toString()}
    />
  );
}

const styles = StyleSheet.create({
  categoryContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 5,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  productContainer: {
    marginBottom: 5,
  },
  productName: {
    fontSize: 16,
  },
});
