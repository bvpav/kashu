// app/category/[id].tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
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
        }}
      >
        {products.map((item) => (
          // <Link
          //   href={"category/" + item.id}
          //   asChild
          //   key={item.id}
          //   className="w-[40%]"
          // >
          <Pressable
            key={item.product_id}
            style={styles.categoryContainer}
            className="w-[40%]"
          >
            <Image
              source={require(`@/assets/category/4.jpg`)}
              style={{
                height: 140,
                width: 140,
              }}
              className="rounded-xl"
            />
            <Text className="text-xl">{item.name}</Text>
          </Pressable>
          // </Link>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  categoryContainer: {
    alignItems: "center",
    margin: 5,
    borderWidth: 1,
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
