import {
  Viro3DObject,
  ViroARScene,
  ViroARSceneNavigator,
  ViroAmbientLight,
  ViroText,
  ViroTrackingReason,
  ViroTrackingStateConstants,
  ViroButton,
  ViroAnimations,
} from "@reactvision/react-viro";
import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";

const SCALE_FACTOR = 0.1;

const coordinates: [number, number][] = [
  [0, 0],
  [1, 1],
  [2, 1],
  [3, 2],
  [4, 1],
  [5, 2],
  [5, 3],
  [4, 4],
  [4, 5],
  [5, 5],
].map((coord) => [coord[0] * SCALE_FACTOR, coord[1] * SCALE_FACTOR]);

coordinates.forEach((_, index) => {
  ViroAnimations.registerAnimations({
    [`moveTo${index}`]: {
      properties: {
        positionX: coordinates[index][0],
        positionZ: coordinates[index][1],
      },
      duration: 1000,
      easing: "Linear",
    },
  });
});

const HelloWorldSceneAR = () => {
  const [text, setText] = useState("Initializing AR...");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [movementStarted, setMovementStarted] = useState(false);

  useEffect(() => {
    if (movementStarted) {
      moveObject(0);
    }
  }, [movementStarted]);

  const moveObject = (index: number) => {
    if (index < coordinates.length) {
      setCurrentIndex(index);
      setTimeout(() => moveObject(index + 1), 1000);
    }
  };

  function onInitialized(state: any, reason: ViroTrackingReason) {
    console.log("onInitialized", state, reason);
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setText("Hello World!");
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      // Handle tracking unavailable
    }
  }

  function startMovement() {
    setMovementStarted(true);
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

      <Viro3DObject
        source={{
          uri: "https://github.com/bvpav/grocery-pathfinder/raw/iva/working-ar-viro/viro-ar/res/kashu/kashew.glb",
        }}
        position={[
          coordinates[currentIndex][0],
          0,
          coordinates[currentIndex][1],
        ]}
        scale={[0.1, 0.1, 0.1]}
        type="GLB"
        dragType="FixedDistance"
        onDrag={() => {}}
        animation={{ name: `moveTo${currentIndex}`, run: true, loop: false }}
      />

      <ViroButton
        source={require("./res/button/button.png")}
        position={[0, -1, -2]}
        scale={[0.4, 0.4, 0.4]}
        onClick={startMovement}
      />
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

const styles = StyleSheet.create({
  f1: { flex: 1 },
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center",
  },
});
