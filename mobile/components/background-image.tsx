import React, { ReactNode } from "react";
import { ImageBackground } from "react-native";

export default function BackgroundImage({
  children,
  screenWidth,
  screenHeight,
}: {
  children: ReactNode;
  screenWidth: number;
  screenHeight: number;
}) {
  return (
    <ImageBackground
      source={require("@/assets/images/background.jpg")}
      resizeMode="cover"
      style={{
        position: "absolute",
        zIndex: -1,
        width: screenWidth,
        height: screenHeight,
      }}
    >
      {children}
    </ImageBackground>
  );
}
