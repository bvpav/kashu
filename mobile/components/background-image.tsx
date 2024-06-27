import React, { ReactNode } from "react";
import { ImageBackground } from "react-native";

export default function BackgroundImage({
  children,
  screenWidth,
  screenHeight,
  tabBarHeight = 0,
}: {
  children: ReactNode;
  screenWidth: number;
  screenHeight: number;
  tabBarHeight?: number;
}) {
  return (
    <ImageBackground
      source={require("@/assets/images/background.jpg")}
      resizeMode="cover"
      style={{
        position: "absolute",
        zIndex: -1,
        width: screenWidth,
        height: screenHeight + tabBarHeight,
      }}
    >
      {children}
    </ImageBackground>
  );
}
