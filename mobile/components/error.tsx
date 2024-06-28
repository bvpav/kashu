import { Text } from "react-native";
import BackgroundImage from "./background-image";
import { rem } from "nativewind";
import remToPx from "@/constants/fontSize";

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
          fontSize: remToPx(2),
          textAlign: "center",
          marginVertical: "auto",
        }}
      >
        Error: {error.message}
      </Text>
    </BackgroundImage>
  );
}
