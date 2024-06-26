import { Link, Stack } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  Pressable,
  ImageBackground,
  TextInput,
} from "react-native";
import { getColorBasedOnIndex } from "@/constants/Colors";
import { useTabBarHeight } from "@/contexts/tab-bar-height";
import CategoryExpanded from "@/types/categories";
import LoadingPage from "@/components/loading";
import ErrorPage from "@/components/error";
import { searchProductInCategories } from "@/services/category";

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

  const styles = StyleSheet.create({
    categoryContainer: {
      height: screenWidth * 0.35,
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 4,
      borderWidth: 1,
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
          {filteredCategories?.map((item, index) => {
            const { color, borderColor } = getColorBasedOnIndex(index);
            return (
              <Link href={"category/" + item.name} asChild key={item.id}>
                <Pressable
                  style={{
                    ...styles.categoryContainer,
                    borderColor: borderColor,
                    backgroundColor: color,
                  }}
                  className="w-full"
                >
                  <View
                    style={{
                      width: 0.54 * screenWidth,
                    }}
                  >
                    <Text className="text-3xl font-medium">{item.name}</Text>
                    <Text className="text-xl">{item.description}</Text>
                  </View>
                  <Image
                    source={{
                      uri: `${process.env.EXPO_PUBLIC_API_URL}/assets/categories/${item.id}.jpg`,
                    }}
                    style={{
                      height: screenWidth * 0.3,
                      width: screenWidth * 0.3,
                      borderRadius: 8,
                    }}
                  />
                </Pressable>
              </Link>
            );
          })}
        </ScrollView>
      </View>
    </ImageBackground>
  );
}
