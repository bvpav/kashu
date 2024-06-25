import { Link } from "expo-router";
import categoriesData from "../categories.json"; // replace with the actual path to your JSON file
import React, { useState, useEffect } from "react";
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
  const [categories, setCategories] = useState<Category[]>([]);
  const screenWidth = Dimensions.get("window").width;
  useEffect(() => {
    setCategories(categoriesData.categories);
    console.log(categoriesData.categories);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Text className="text-center text-3xl m-5">Категории на продукти</Text>
      <ScrollView
        contentContainerStyle={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        {categories.map((item) => (
          <Link href={"category/" + item.id} asChild key={item.id}>
            <Pressable style={styles.categoryContainer} className="w-full">
              <Image
                source={require(`../../assets/category/4.jpg`)}
                style={{
                  height: screenWidth * 0.35,
                  width: screenWidth * 0.35,
                  borderRadius: 8,
                }}
              />
              <Text className="text-xl">{item.name}</Text>
            </Pressable>
          </Link>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
