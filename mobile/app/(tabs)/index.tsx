import { Link, Tabs } from "expo-router";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
} from "react-native";

export default function IndexScreen() {
  const screenHeight = Dimensions.get("window").height;
  const screenWidth = Dimensions.get("window").width;
  return (
    <ImageBackground
      source={require("@/assets/images/background.jpg")}
      resizeMode="cover"
      style={{
        position: "absolute",
        zIndex: -1,
        width: screenWidth,
        height: screenHeight,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Tabs.Screen options={{ title: "Home" }} />

      <View style={styles.container}>
        <Text className="text-black">This screen is the index screen.</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
