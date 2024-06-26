import {
  Viro3DObject,
  ViroARScene,
  ViroARSceneNavigator,
  ViroAmbientLight,
  ViroSpotLight,
  ViroText,
  ViroAnimations,
  ViroTrackingReason,
  ViroTrackingStateConstants,
} from "@reactvision/react-viro";
import React, { useState } from "react";
import { StyleSheet } from "react-native";

ViroAnimations.registerAnimations({
  rotateAndMoveForward: {
    properties: {
      // rotateY: "+=360",
      positionZ: "-=0.2"
    },
    duration: 1000,
    easing: "Linear"
  },
});

const HelloWorldSceneAR = () => {
  const [text, setText] = useState("Initializing AR...");

  function onInitialized(state: any, reason: ViroTrackingReason) {
    console.log("onInitialized", state, reason);
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setText("Hello World!");
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {

    }
  }

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroText
        text={text}
        scale={[0.5, 0.5, 0.5]}
        position={[0, 0, -1]}
        style={styles.helloWorldTextStyle}
      />

      <ViroAmbientLight color={"#aaaaaa"} />

      <ViroSpotLight
        innerAngle={5}
        outerAngle={90}
        direction={[0, -1, -0.2]}
        position={[0, 3, 1]}
        color="#ffffff"
        castsShadow={true}
      />


      <Viro3DObject
        source={require('./res/emoji_smile/emoji_smile.vrx')}
        position={[0, 0, -1]}
        scale={[1, 1, 1]}
        type="VRX"
        dragType="FixedDistance" onDrag={()=>{}}
        animation={{name: "rotateAndMoveForward", run: true, loop: true}}
      />

      {/* <Viro3DObject
        source={require('./res/emoji_smile/emoji_smile.vrx')}
        position={[0, 0, -1]}
        scale={[0.2, 0.2, 0.2]}
        type="VRX"
        dragType="FixedDistance" onDrag={()=>{}}
        animation={{name: "rotateAndMoveForward", run: true, loop: true}}
      /> */}

    </ViroARScene>
  );
};

export default () => {
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: HelloWorldSceneAR,
      }}
      style={styles.f1}
    />
  );
};

var styles = StyleSheet.create({
  f1: { flex: 1 },
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center",
  },
});
