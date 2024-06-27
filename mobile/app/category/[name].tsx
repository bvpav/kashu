import React, { useContext, useMemo } from "react";
import {
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Dimensions,
  Image,
  View,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { CartContext, CartContextType } from "@/contexts/cart-context";
import { router } from "expo-router";
import { getColorBasedOnIndex } from "@/constants/Colors";
import Header from "@/components/header";
import { useTabBarHeight } from "@/contexts/tab-bar-height";
import Product from "@/types/products";
import LoadingPage from "@/components/loading";
import ErrorPage from "@/components/error";
import { TextInput } from "react-native";
import BackgroundImage from "@/components/background-image";

const CategoryDetails = () => {
  const cartContext = useContext(CartContext) as CartContextType;
  const { tabBarHeight } = useTabBarHeight();
  const categoryNameParam = useLocalSearchParams().name;
  const [searchQuery, setSearchQuery] = React.useState("");

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
  const { addToCart, cart } = cartContext;

  if (!cartContext) {
    return (
      <LoadingPage
        screenWidth={screenWidth}
        screenHeight={screenHeight}
        tabBarHeight={0}
      />
    );
  }
  const filteredProducts = products?.filter((product) => {
    return !cart.some(
      (cartProduct) => cartProduct.product_id === product.product_id,
    );
  });

  const filteredSelectProducts = useMemo(() => {
    return filteredProducts?.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [filteredProducts, searchQuery]);

  if (products === undefined)
    return (
      <LoadingPage
        screenWidth={screenWidth}
        screenHeight={screenHeight}
        tabBarHeight={tabBarHeight}
      />
    );

  if (error)
    return (
      <ErrorPage
        error={error}
        screenWidth={screenWidth}
        screenHeight={screenHeight}
        tabBarHeight={tabBarHeight}
      />
    );

  return (
    <BackgroundImage
      screenWidth={screenWidth}
      screenHeight={screenHeight}
      tabBarHeight={tabBarHeight}
    >
      <Header title={categoryName ?? ""} backArrow={true} />
      <View
        style={{
          height: screenHeight * 0.98 - 90 + tabBarHeight,
          marginTop: screenHeight * 0.02,
        }}
      >
        <TextInput
          style={{
            height: 40,
            fontSize: 20,
            borderColor: "#A5366F",
            borderWidth: 2,
            margin: 10,
            borderRadius: 10,
            paddingHorizontal: 10,
            backgroundColor: "#ffffff",
          }}
          onChangeText={setSearchQuery}
          value={searchQuery}
          placeholder="Потърси продукт"
        />
        <ScrollView
          contentContainerStyle={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
            width: "100%",
          }}
        >
          {filteredSelectProducts?.map((item: any, index: number) => {
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
    </BackgroundImage>
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
