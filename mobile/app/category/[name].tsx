import BackgroundImage from "@/components/background-image";
import ErrorPage from "@/components/error";
import Header from "@/components/header";
import LoadingPage from "@/components/loading";
import { getColorBasedOnIndex } from "@/constants/Colors";
import { useTabBarHeight } from "@/contexts/tab-bar-height";
import useCartContext from "@/hooks/useCartContext";
import Product from "@/types/products";
import { useQuery } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import React, { useMemo } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const CategoryDetails = () => {
  const cartContext = useCartContext();
  const { tabBarHeight } = useTabBarHeight();
  const categoryNameParam = useLocalSearchParams().name;
  const [searchQuery, setSearchQuery] = React.useState("");

  const categoryName = Array.isArray(categoryNameParam)
    ? categoryNameParam[0]
    : categoryNameParam;

  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  // const {
  //   isPending,
  //   error,
  //   data: products,
  // } = useQuery({
  //   queryKey: ["products-", categoryName],
  //   queryFn: () =>
  //     fetch(
  //       `${process.env.EXPO_PUBLIC_API_URL}/api/products?category=${categoryName}`,
  //     ).then((res) => res.json()) as Promise<Product[]>,
  // });

  const products = [];
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

  // if (error)
  //   return (
  //     <ErrorPage
  //       error={error}
  //       screenWidth={screenWidth}
  //       screenHeight={screenHeight}
  //       tabBarHeight={tabBarHeight}
  //     />
  //   );

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
                <Text
                  style={{
                    fontSize: 20,
                    lineHeight: 28,
                  }}
                >
                  {item.name}
                </Text>
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
    width: "40%",
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
