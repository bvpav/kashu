import Header from "@/components/header";
import { prefetchCategories } from "@/services/category";
import Feather from "@expo/vector-icons/Feather";
import { useQueryClient } from "@tanstack/react-query";
import { Tabs } from "expo-router";
import { useEffect } from "react";
export default function TabsLayout() {
  const queryClient = useQueryClient();
  useEffect(() => {
    const prefetch = async () => {
      const config = prefetchCategories();
      console.log("prefetching");
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
        //@ts-ignore
        options={({ navigation, route }) => ({
          tabBarIcon: ({ focused }: { focused: boolean }) => (
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
        //@ts-ignore
        options={({ navigation, route }) => ({
          tabBarIcon: ({ focused }: { focused: boolean }) => (
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
