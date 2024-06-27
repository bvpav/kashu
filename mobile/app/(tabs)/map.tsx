import React from "react";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StoreMap from "@/components/store-map/StoreMap";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function Map() {
  const [isARView, setIsARView] = React.useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {!isARView && <StoreMap />}
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => setIsARView((prev) => !prev)}
      >
        <Text style={styles.buttonText}>
          <MaterialCommunityIcons name="skull-scan" size={24} />
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    top: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "blue", // You can change the color as needed
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  buttonText: {
    color: "white",
    fontSize: 24,
    lineHeight: 24,
    fontWeight: "bold",
  },
});
