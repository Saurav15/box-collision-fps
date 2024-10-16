import { useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { useMultiKeyPress } from "./hooks/useMultipleKeyPress";
import { turnCharacterRight } from "./movementFunctions/turnRight";
import { turnCharacterLeft } from "./movementFunctions/turnLeft";
import { moveAhead } from "./movementFunctions/moveAhead";
import * as THREE from "three";
import {
  DISTANCE_BETWEEN_CAMERA_CHARACTER,
  RUNNING_SPEED,
  TURN_BY_ANGLE,
  WALKING_SPEED,
} from "./constants/constant";
import { makeCameraRotateAndMoveAsObjectsRotates } from "./cameraFunctions/makeCameraRotateAsCharacterRotates";
import { useAnimationController } from "./hooks/useAnimationController";
import { useAddHouse } from "./hooks/useAddHouse";

function Practice() {
  const { camera } = useThree();

  const keysPressed = useMultiKeyPress();
  const { mixer, playAnimation, character } = useAnimationController();
  const house = useAddHouse();

  // initializing the AnimationMixer for walking and running model.
  const clock = useRef(new THREE.Clock()); // Clock to track time

  useFrame(() => {
    if (keysPressed["w"] || keysPressed["W"]) {
      moveAhead(character, WALKING_SPEED, camera, 90);
      playAnimation("walking");
    }
    if (keysPressed["r"] || keysPressed["R"]) {
      moveAhead(character, RUNNING_SPEED, camera, 90);
      playAnimation("running");
    }
    if (keysPressed["d"] || keysPressed["D"]) {
      turnCharacterRight(character, TURN_BY_ANGLE);
    }
    if (keysPressed["a"] || keysPressed["A"]) {
      turnCharacterLeft(character, TURN_BY_ANGLE);
    }
    if (keysPressed[" "]) {
      playAnimation("jumping");
    }

    if (!Object.values(keysPressed).some((value) => value === true)) {
      playAnimation("idle");
    }
    makeCameraRotateAndMoveAsObjectsRotates(
      character,
      camera,
      DISTANCE_BETWEEN_CAMERA_CHARACTER,
      90
    );

    // Update clock to make the animations run
    if (mixer) {
      const delta = clock.current.getDelta();
      mixer.update(delta);
    }
  });

  return <primitive object={character} />;
}

export default Practice;
