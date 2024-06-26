import { Link, Stack } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";
import { View, ScrollView, Dimensions, TextInput } from "react-native";
import { useTabBarHeight } from "@/contexts/tab-bar-height";
import CategoryExpanded from "@/types/categories";
import LoadingPage from "@/components/loading";
import ErrorPage from "@/components/error";
import { searchProductInCategories } from "@/services/category";
import CategoryRender from "@/components/category";
import BackgroundImage from "@/components/background-image";

export default function ProductsScreen() {
  const { tabBarHeight } = useTabBarHeight();
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const [searchQuery, setSearchQuery] = useState("");
  const {
    isPending,
    error,
    data: categories,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/categories`).then(
        (res) => res.json() as Promise<CategoryExpanded[]>,
      ),
  });

  const filteredCategories = useMemo(() => {
    if (searchQuery === "" || categories === undefined) return categories;
    return searchProductInCategories({ categories, searchQuery });
  }, [categories, searchQuery]);

  if (isPending)
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
      screenHeight={screenHeight}
      screenWidth={screenWidth}
      tabBarHeight={tabBarHeight}
    >
      <View
        style={{
          height: screenHeight * 0.88 + tabBarHeight,
          marginTop: screenHeight * 0.12,
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
          placeholder="Потърси продукт или категория"
        />
        <ScrollView
          contentContainerStyle={{
            flexDirection: "column",
            flexWrap: "wrap",
            marginHorizontal: "auto",
            width: "90%",
          }}
        >
          {filteredCategories?.map((item, index) => (
            <CategoryRender
              item={item}
              index={index}
              screenWidth={screenWidth}
              key={item.id}
            />
          ))}
        </ScrollView>
      </View>
    </BackgroundImage>
  );
}
