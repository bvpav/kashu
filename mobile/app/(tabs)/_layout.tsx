import { Tabs } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { View, Text, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "white",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: () => <AntDesign name="home" size={24} color="white" />,
          headerTransparent: true,
          tabBarActiveTintColor: "white",
          header: () => (
            <BlurView intensity={50} style={styles.headerContainer}>
              <View style={styles.wrapper}>
                <Text style={styles.headerTitle}>Home</Text>
              </View>
            </BlurView>
          ),
        }}
      />
      <Tabs.Screen
        name="shopping-cart"
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="local-grocery-store" size={24} color="white" />
          ),
          headerTransparent: true,
          tabBarActiveTintColor: "white",
          header: () => (
            <BlurView intensity={50} style={styles.headerContainer}>
              <View style={styles.wrapper}>
                <Text style={styles.headerTitle}>Количка</Text>
              </View>
            </BlurView>
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          tabBarIcon: () => <Feather name="map" size={24} color="white" />,
          headerTransparent: true,
          tabBarActiveTintColor: "white",
          header: () => (
            <BlurView intensity={50} style={styles.headerContainer}>
              <View style={styles.wrapper}>
                <Text style={styles.headerTitle}>Карта</Text>
              </View>
            </BlurView>
          ),
        }}
      />
    </Tabs>
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
    width: "100%",
    borderWidth: 4,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: "#A5366F",
  },
  headerTitle: {
    textAlign: "center",
    color: "#A5366F",
    fontSize: 30,
    fontWeight: "bold",
  },
  iconLeft: {
    // Styles for left icon
  },
  iconRight: {
    // Styles for right icon
  },
});
