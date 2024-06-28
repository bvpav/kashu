import { ImageBackground, Dimensions } from "react-native";
import { useTabBarHeight } from "@/contexts/tab-bar-height";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useEffect } from "react";

export default function IndexScreen() {
  const screenHeight = Dimensions.get("window").height;
  const screenWidth = Dimensions.get("window").width;

  const { setTabBarHeight } = useTabBarHeight();
  const tabBarHeight = useBottomTabBarHeight();

  useEffect(() => {
    setTabBarHeight(tabBarHeight);
  }, [tabBarHeight, setTabBarHeight]);

  return (
    <ImageBackground
      source={require("@/assets/images/welcome.png")}
      resizeMode="cover"
      style={{
        position: "absolute",
        zIndex: -1,
        width: screenWidth,
        height: screenHeight + tabBarHeight,
        justifyContent: "center",
        alignItems: "center",
      }}
    />
  );
}
