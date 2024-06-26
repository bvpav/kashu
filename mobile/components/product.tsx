import React from "react";
import { Text, View } from "react-native";
import { StyleSheet } from "react-native";

export default function Product({
  product,
  category,
}: {
  product: string;
  category: string;
}) {
  return (
    <View style={styles.container}>
      <Text className="text-black bg-black w-1/2">
        {product} {category}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderWidth: 1,
    margin: 2,
    width: "auto",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});
