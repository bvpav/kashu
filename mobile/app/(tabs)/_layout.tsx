import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: () => <AntDesign name="home" size={24} color="white" />,
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="local-grocery-store" size={24} color="white" />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          tabBarIcon: () => <Feather name="map" size={24} color="white" />,
        }}
      />
    </Tabs>
  );
}
