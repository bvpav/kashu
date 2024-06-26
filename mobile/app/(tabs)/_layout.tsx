import { Tabs } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Header from "@/components/header";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#A5366F",
        tabBarInactiveTintColor: "black",
        headerTransparent: true,
        tabBarStyle: {
          backgroundColor: "#ffffff",
          justifyContent: "center",
          alignItems: "center",
          borderTopWidth: 3,
          borderColor: "#A5366F",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: () => <AntDesign name="home" size={24} color="#A5366F" />,
          header: () => null,
        }}
      />
      <Tabs.Screen
        name="shopping-cart"
        options={{
          tabBarIcon: () => (
            <MaterialIcons
              name="local-grocery-store"
              size={28}
              color="#A5366F"
            />
          ),
          header: () => <Header title="Количка" />,
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          tabBarIcon: () => <Feather name="map" size={28} color="#A5366F" />,
          header: () => <Header title="Карта" />,
        }}
      />
    </Tabs>
  );
}
