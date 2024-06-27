import { StyleSheet, Text, View, Dimensions } from "react-native";
import BackgroundImage from "@/components/background-image";

export default function TestScreen() {
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  return (
    <>
      <BackgroundImage
        screenWidth={screenWidth}
        screenHeight={screenHeight}
        tabBarHeight={40}
      >
        <View style={{ ...styles.container, marginTop: screenHeight * 0.12 }}>
          <Text className="text-black">Insert Map Here...</Text>
        </View>
      </BackgroundImage>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
