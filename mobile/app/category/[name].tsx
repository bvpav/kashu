import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";

interface Product {
  id: number;
  product_id: string;
  name: string;
  category_id: number;
}

const CategoryDetails = () => {
  const categoryName = useLocalSearchParams().name;
  const screenWidth = Dimensions.get("window").width;
  const {
    isPending,
    error,
    data: products,
  } = useQuery({
    queryKey: ["products-", categoryName],
    queryFn: () =>
      fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/api/products?category=${categoryName}`
      ).then((res) => res.json()) as Promise<Product[]>,
  });

  if (isPending)
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <Stack.Screen
          options={{
            title: `${categoryName}`,
          }}
        />
        <Text className="text-3xl my-auto text-center">Loading...</Text>
      </View>
    );
  if (error)
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <Stack.Screen
          options={{
            title: `${categoryName}`,
          }}
        />
        <Text className="text-3xl my-auto text-center">
          Error: {error.message}
        </Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: `${categoryName}`,
        }}
      />
      <ScrollView
        contentContainerStyle={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          width: "100%",
        }}
      >
        {products.map((item: any) => (
          <Pressable
            key={item.product_id}
            style={styles.categoryContainer}
            className="w-[40%]"
          >
            <Image
              source={require(`@/assets/category/4.jpg`)}
              style={{
                height: screenWidth * 0.35,
                width: screenWidth * 0.35,
                borderRadius: 8,
              }}
            />
            <Text className="text-xl text-center">{item.name}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  categoryContainer: {
    alignItems: "center",
    margin: 5,
    borderWidth: 1,
    maxWidth: "40%",
    textAlign: "center",
    borderColor: "grey",
    // iOS Shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Android Shadow
    elevation: 5,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#f8f8f8",
  },
});

export default CategoryDetails;
