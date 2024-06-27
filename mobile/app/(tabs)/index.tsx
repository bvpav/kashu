import { ImageBackground, Dimensions } from "react-native";
import { useTabBarHeight } from "@/contexts/tab-bar-height";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useEffect } from "react";

export default function IndexScreen() {
  const screenHeight = Dimensions.get("window").height;
  const screenWidth = Dimensions.get("window").width;

  const { setTabBarHeight } = useTabBarHeight();
  const tabBarHeight = useBottomTabBarHeight();

  useEffect(() => {
    setTabBarHeight(tabBarHeight);
  }, [tabBarHeight, setTabBarHeight]);

  return (
    <ImageBackground
      source={require("@/assets/images/welcome.jpg")}
      resizeMode="cover"
      style={{
        position: "absolute",
        zIndex: -1,
        width: screenWidth,
        height: screenHeight + tabBarHeight,
        justifyContent: "center",
        alignItems: "center",
      }}
    />
  );
}
// import {
//   ViroARScene,
//   ViroARSceneNavigator,
//   ViroText,
//   ViroTrackingReason,
//   ViroTrackingStateConstants,
// } from "@reactvision/react-viro";
// import React, { useState } from "react";
// import { StyleSheet } from "react-native";

// const HelloWorldSceneAR = () => {
//   const [text, setText] = useState("Initializing AR...");

//   function onInitialized(state: any, reason: ViroTrackingReason) {
//     console.log("onInitialized", state, reason);
//     if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
//       setText("Hello World!");
//     } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
//       // Handle loss of tracking
//     }
//   }

//   return (
//     <ViroARScene onTrackingUpdated={onInitialized}>
//       <ViroText
//         text={text}
//         scale={[0.5, 0.5, 0.5]}
//         position={[0, 0, -1]}
//         style={styles.helloWorldTextStyle}
//       />
//     </ViroARScene>
//   );
// };

// export default () => {
//   return (
//     <ViroARSceneNavigator
//       autofocus={true}
//       initialScene={{
//         scene: HelloWorldSceneAR,
//       }}
//       style={styles.f1}
//     />
//   );
// };

// var styles = StyleSheet.create({
//   f1: { flex: 1 },
//   helloWorldTextStyle: {
//     fontFamily: "Arial",
//     fontSize: 30,
//     color: "#ffffff",
//     textAlignVertical: "center",
//     textAlign: "center",
//   },
// });
