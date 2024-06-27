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
                  header: () => <Header title="Категории" backArrow={true} />,
                }}
              />
              <Stack.Screen
                name="category/[name]"
                options={{
                  headerTransparent: true,
                  header: () => null,
                }}
              />
              <Stack.Screen
                name="map"
                options={{
                  title: "Карта",
                  headerTransparent: true,
                  header: () => <Header title="Карта" backArrow={true} />,
                }}
              />
            </Stack>
          </QueryClientProvider>
        </TabBarHeightProvider>
      </CartProvider>
    </ThemeProvider>
  );
}
