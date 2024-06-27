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

const SCALE_FACTOR = 0.3;
const NON_COLLECTABLE_WAIT_TIME = 1000;
const COLLECTABLE_WAIT_TIME = 5000;

const coordinates: { is_collectable: boolean; x: number; y: number }[] = [
  { is_collectable: false, x: 0, y: 6 },
  { is_collectable: false, x: 1, y: 7 },
  { is_collectable: true, x: 2, y: 7 },
  { is_collectable: false, x: 3, y: 7 },
  { is_collectable: false, x: 4, y: 7 },
  { is_collectable: false, x: 5, y: 7 },
  { is_collectable: true, x: 6, y: 7 },
  { is_collectable: false, x: 7, y: 7 },
  { is_collectable: false, x: 8, y: 7 },
  { is_collectable: false, x: 9, y: 7 },
];

coordinates.forEach((coord, index) => {
  ViroAnimations.registerAnimations({
    [`moveTo${index}`]: {
      properties: {
        positionX: coord.x * SCALE_FACTOR,
        positionZ: coord.y * SCALE_FACTOR,
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

  useEffect(() => {
    //after 3 seconds to setMovementStarted to true
    setTimeout(() => {
      setMovementStarted(true);
    }, 3000);
  }, []);

  const moveObject = (index: number) => {
    if (index < coordinates.length) {
      setCurrentIndex(index);
      const waitTime = coordinates[index].is_collectable
        ? COLLECTABLE_WAIT_TIME
        : NON_COLLECTABLE_WAIT_TIME;
      setTimeout(() => moveObject(index + 1), waitTime);
    }
  };

  function onInitialized(state: any, reason: ViroTrackingReason) {
    console.log("onInitialized", state, reason);
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setText("Follow me!");
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
    }
  }

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroText
        text={text}
        scale={[1, 1, 1]}
        position={[0, 0, -1]}
        style={styles.helloWorldTextStyle}
        animation={{ name: `moveTo${currentIndex}`, run: true, loop: false }}
      />

      <ViroAmbientLight color={"#aaaaaa"} />
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
