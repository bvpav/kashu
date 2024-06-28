import BackgroundImage from "@/components/background-image";
import StoreMap from "@/components/store-map/StoreMap";
import remToPx from "@/constants/fontSize";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ARComponent from "@/components/ar-cmp";
export default function TestScreen() {
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const [isARView, setIsARView] = React.useState(false);

  return (
    <>
      <BackgroundImage
        screenWidth={screenWidth}
        screenHeight={screenHeight}
        tabBarHeight={40}
      >
        <View style={{ ...styles.container, marginTop: screenHeight * 0.12 }}>
          {!isARView && <StoreMap />}
          {isARView && <ARComponent />}
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => setIsARView((prev) => !prev)}
          >
            <Text style={styles.buttonText}>
              <MaterialCommunityIcons name="cube-scan" size={24} />
            </Text>
          </TouchableOpacity>
        </View>
      </BackgroundImage>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  buttonContainer: {
    position: "absolute",
    top: 30,
    right: 30,
    width: 60,
    height: 60,
    backgroundColor: "#A5366F",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
  },
  buttonText: {
    color: "white",
    fontSize: remToPx(1.4),
    lineHeight: 24,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
