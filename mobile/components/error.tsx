import { ImageBackground, Text } from "react-native";

export default function ErrorPage({
  error,
  screenWidth,
  screenHeight,
  tabBarHeight,
}: {
  error: Error;
  screenWidth: number;
  screenHeight: number;
  tabBarHeight: number;
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
      <Text
        style={{
          fontSize: 32,
          textAlign: "center",
          marginVertical: "auto",
        }}
      >
        Error: {error.message}
      </Text>
    </ImageBackground>
  );
}
