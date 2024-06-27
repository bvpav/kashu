import { Text } from "react-native";
import BackgroundImage from "./background-image";

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
    <BackgroundImage screenWidth={screenWidth} screenHeight={screenHeight}>
      <Text
        style={{
          fontSize: 32,
          textAlign: "center",
          marginVertical: "auto",
        }}
      >
        Error: {error.message}
      </Text>
    </BackgroundImage>
  );
}
