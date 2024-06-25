import { Link, Stack } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  Pressable,
} from "react-native";

interface Category {
  id: number;
  name: string;
}

export default function ProductsScreen() {
  const screenWidth = Dimensions.get("window").width;
  const {
    isPending,
    error,
    data: categories,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/categories`).then(
        (res) => res.json() as Promise<Category[]>,
      ),
  });

  if (isPending)
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <Stack.Screen options={{ title: "Продукти" }} />
        <Text className="text-3xl my-auto text-center">Loading...</Text>
      </View>
    );
  if (error)
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <Stack.Screen options={{ title: "Количка" }} />

        <Text className="text-3xl my-auto text-center">
          Error: {error.message}
        </Text>
      </View>
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
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Stack.Screen options={{ title: "Продукти" }} />

      <Text className="text-center text-3xl m-5">Категории на продукти</Text>
      <ScrollView
        contentContainerStyle={{
          flexDirection: "column",
          flexWrap: "wrap",
          marginHorizontal: "auto",
          width: "90%",
        }}
      >
        {categories.map((item) => (
          <Link href={"category/" + item.name} asChild key={item.id}>
            <Pressable style={styles.categoryContainer} className="w-full">
              <View
                style={{
                  width: 0.54 * screenWidth,
                }}
              >
                <Text className="text-3xl font-medium">{item.name}</Text>
                <Text className="text-xl">
                  This is an example descri ptiosdn asdj aowijdeawoij whe
                </Text>
              </View>
              <Image
                source={require(`../../assets/category/4.jpg`)}
                style={{
                  height: screenWidth * 0.3,
                  width: screenWidth * 0.3,
                  borderRadius: 8,
                }}
              />
            </Pressable>
          </Link>
        ))}
      </ScrollView>
    </View>
  );
}
