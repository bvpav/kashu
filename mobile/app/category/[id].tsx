// app/category/[id].tsx
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
import {
  getCategoryNameById,
  getCategoryProducts,
} from "@/services/categories";

const CategoryDetails = () => {
  const local = useLocalSearchParams();
  const id = Array.isArray(local.id)
    ? parseInt(local.id[0])
    : parseInt(local.id ?? "");

  const screenWidth = Dimensions.get("window").width;

  const products = getCategoryProducts(id);
  const category_name = getCategoryNameById(id);
  console.log(category_name);
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: `${category_name}`,
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
        {products.map((item) => (
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
