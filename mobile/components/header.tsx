import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { BlurView } from "expo-blur";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Header({
  title,
  backArrow,
}: {
  title: string;
  backArrow?: boolean;
}) {
  return (
    <BlurView intensity={10} style={styles.headerContainer}>
      <View style={styles.wrapper}>
        {backArrow && (
          <Pressable onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={38} color="#A5366F" />
          </Pressable>
        )}
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>{title}</Text>
        </View>
        <View style={styles.placeholder} />
      </View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 90,
    width: "100%",
    zIndex: 1000,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  wrapper: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 4,
    borderBottomWidth: 4,
    borderColor: "#A5366F",
  },

  titleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    color: "#A5366F",
    fontSize: 30,
    fontWeight: "bold",
  },
  placeholder: {
    width: 38,
  },
});
