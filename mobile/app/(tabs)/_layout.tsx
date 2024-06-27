import { Tabs } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import Header from "@/components/header";
import { prefetchCategories } from "@/services/category";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

export default function TabsLayout() {
  const queryClient = useQueryClient();
  useEffect(() => {
    console.log("prefetching categories");
    const prefetch = async () => {
      const config = prefetchCategories();
      await queryClient.prefetchQuery(config);
    };

    prefetch();
  }, [queryClient]);

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
        tabBarLabelStyle: {
          fontSize: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={({ navigation, route }) => ({
          tabBarIcon: ({ focused }) => (
            <Feather
              name="home"
              size={28}
              color={focused ? "#A5366F" : "black"}
            />
          ),
          header: () => null,
        })}
      />
      <Tabs.Screen
        name="shopping-cart"
        options={({ navigation, route }) => ({
          tabBarIcon: ({ focused }) => (
            <Feather
              name="shopping-cart"
              size={28}
              color={focused ? "#A5366F" : "black"}
            />
          ),
          header: () => <Header title="Количка" />,
        })}
      />
    </Tabs>
  );
}
