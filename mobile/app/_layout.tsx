import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import "../styles/global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useColorScheme } from "@/hooks/useColorScheme";
import { CartProvider } from "@/contexts/cart-context";
import { View, Text, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import Header from "@/components/header";
import { TabBarHeightProvider } from "@/contexts/tab-bar-height";
// Prevent the splash screen from auto-hiding before asset loading is complete.
void SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient();
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      void SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <CartProvider>
        <TabBarHeightProvider>
          <QueryClientProvider client={queryClient}>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
              <Stack.Screen
                name="category/index"
                options={{
                  title: "Категории",
                  headerTransparent: true,
                  header: () => <Header title="Категории" />,
                }}
              />
              <Stack.Screen
                name="category/[name]"
                options={{
                  headerTransparent: true,
                  header: () => null,
                }}
              />
            </Stack>
          </QueryClientProvider>
        </TabBarHeightProvider>
      </CartProvider>
    </ThemeProvider>
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
