import React, { useContext } from "react";
import {
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Dimensions,
  Image,
  ImageBackground,
  View,
} from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { CartContext, CartContextType } from "@/contexts/cart-context";
import { router } from "expo-router";
import { getColorBasedOnIndex } from "@/constants/Colors";
import Header from "@/components/header";
import { useTabBarHeight } from "@/contexts/tab-bar-height";
import Product from "@/types/products";

const CategoryDetails = () => {
  const cartContext = useContext(CartContext) as CartContextType;
  const { tabBarHeight } = useTabBarHeight();
  const categoryNameParam = useLocalSearchParams().name;
  const categoryName = Array.isArray(categoryNameParam)
    ? categoryNameParam[0]
    : categoryNameParam;

  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const {
    isPending,
    error,
    data: products,
  } = useQuery({
    queryKey: ["products-", categoryName],
    queryFn: () =>
      fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/api/products?category=${categoryName}`,
      ).then((res) => res.json()) as Promise<Product[]>,
  });

  if (isPending || !cartContext)
    return (
      <ImageBackground
        source={require("@/assets/images/background.jpg")}
        resizeMode="cover"
        style={{
          position: "absolute",
          zIndex: -1,
          width: screenWidth,
          height: screenHeight + tabBarHeight,
        }}
      >
        <Stack.Screen
          options={{
            title: `${categoryName}`,
          }}
        />
        <Text className="text-3xl my-auto text-center">Loading...</Text>
      </ImageBackground>
    );

  const { addToCart, cart } = cartContext;

  const filteredProducts = products?.filter((product) => {
    return !cart.some(
      (cartProduct) => cartProduct.product_id === product.product_id,
    );
  });

  if (error)
    return (
      <ImageBackground
        source={require("@/assets/images/background.jpg")}
        resizeMode="cover"
        style={{
          position: "absolute",
          zIndex: -1,
          width: screenWidth,
          height: screenHeight + tabBarHeight,
        }}
      >
        <Stack.Screen
          options={{
            title: `${categoryName}`,
          }}
        />
        <Text className="text-3xl my-auto text-center">
          Error: {error.message}
        </Text>
      </ImageBackground>
    );

  return (
    <ImageBackground
      source={require("@/assets/images/background.jpg")}
      resizeMode="cover"
      style={{
        position: "absolute",
        zIndex: -1,
        width: screenWidth,
        height: screenHeight + tabBarHeight,
      }}
    >
      <Header title={categoryName ?? ""} />
      <View
        style={{
          height: screenHeight * 0.98 - 90 + tabBarHeight,
          marginTop: screenHeight * 0.02,
        }}
      >
        <ScrollView
          contentContainerStyle={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
            width: "100%",
          }}
        >
          {filteredProducts?.map((item: any, index: number) => {
            const { color, borderColor } = getColorBasedOnIndex(index);

            return (
              <Pressable
                key={item.product_id}
                style={{
                  ...styles.categoryContainer,
                  borderColor: borderColor,
                  backgroundColor: color,
                }}
                className="w-[40%]"
                onPress={() => {
                  addToCart(item);
                  router.replace("(tabs)/shopping-cart");
                }}
              >
                <Image
                  source={{
                    uri: `${process.env.EXPO_PUBLIC_API_URL}/assets/products/${item.id}.png`,
                  }}
                  style={{
                    height: screenWidth * 0.35,
                    width: screenWidth * 0.35,
                    borderRadius: 8,
                  }}
                />
                <Text className="text-xl text-center">{item.name}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
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
