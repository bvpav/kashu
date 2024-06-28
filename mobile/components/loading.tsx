import { Text } from "react-native";
import BackgroundImage from "./background-image";
import remToPx from "@/constants/fontSize";

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
          fontSize: remToPx(2),
          textAlign: "center",
          marginVertical: screenHeight * 0.4,
        }}
      >
        Loading...
      </Text>
    </BackgroundImage>
  );
}
