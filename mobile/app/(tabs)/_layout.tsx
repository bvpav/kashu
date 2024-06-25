import { Tabs } from "expo-router";
import {
  IconCategoryFilled,
  IconHomeFilled,
  IconMapPinFilled,
} from "@tabler/icons-react-native";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
      <Tabs.Screen
        name="index"
        options={{ tabBarIcon: () => <IconHomeFilled /> }}
      />
      <Tabs.Screen
        name="products"
        options={{ tabBarIcon: () => <IconCategoryFilled /> }}
      />
      <Tabs.Screen
        name="map"
        options={{ tabBarIcon: () => <IconMapPinFilled /> }}
      />
    </Tabs>
  );
}
