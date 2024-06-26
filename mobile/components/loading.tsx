import { Text } from "react-native";
import BackgroundImage from "./background-image";

export default function LoadingPage({
  screenWidth,
  screenHeight,
  tabBarHeight,
}: {
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
        Loading...
      </Text>
    </BackgroundImage>
  );
}
