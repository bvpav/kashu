import remToPx from "@/constants/fontSize";
import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroAmbientLight,
  ViroTrackingReason,
  ViroTrackingStateConstants,
  ViroAnimations,
  ViroSphere,
  ViroMaterials,
} from "@reactvision/react-viro";
import { rem } from "nativewind";
import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";

const SCALE_FACTOR = 0.3;
const NON_COLLECTABLE_WAIT_TIME = 1000;
const COLLECTABLE_WAIT_TIME = 5000;

const coordinates = [
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

const SceneAR = () => {
  const [text, setText] = useState("Initializing AR...");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [movementStarted, setMovementStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMovementStarted(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (movementStarted) {
      moveObject(0);
    }
  }, [movementStarted]);

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
      setText("Have fun!");
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
    }
  }

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroSphere
        position={[0, 0, -1]}
        radius={0.2}
        materials={["sphereMaterial"]}
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
        scene: SceneAR,
      }}
      style={styles.f1}
    />
  );
};

const styles = StyleSheet.create({
  f1: { flex: 1 },
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: remToPx(2),
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center",
  },
});

ViroMaterials.createMaterials({
  sphereMaterial: {
    diffuseColor: "#a55cda",
  },
});
