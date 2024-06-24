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
      <Text className="text-black">
        {product} {category}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});
