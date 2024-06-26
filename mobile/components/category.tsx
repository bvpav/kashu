import Category from "@/types/categories";
import React from "react";
import { Link } from "expo-router";
import { Pressable, Text, View, Image, StyleSheet } from "react-native";
import { getColorBasedOnIndex } from "@/constants/Colors";

export default function CategoryRender({
  item,
  index,
  screenWidth,
}: {
  item: Category;
  index: number;
  screenWidth: number;
}) {
  const { color, borderColor } = getColorBasedOnIndex(index);
  return (
    <Link href={"category/" + item.name} asChild key={item.id}>
      <Pressable
        style={{
          ...styles.categoryContainer,
          height: screenWidth * 0.35,
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
}

const styles = StyleSheet.create({
  categoryContainer: {
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
