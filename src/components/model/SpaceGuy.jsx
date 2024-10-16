import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import React, { useEffect, useRef } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { trimAnimationClip } from "../../utils/animation/trimAnimation";
import { walkAhead } from "../../utils/movementFunctions/walk";
import { runAhead } from "../../utils/movementFunctions/run";
import gsap from "gsap";
import { makeCameraFollowCharacter } from "../../utils/camera/cameraFollowingObject";
import { moveRight } from "../../utils/movementFunctions/moveRight";
import { degToRad } from "three/src/math/MathUtils";

function SpaceGuy() {
  // Import camera three js
  const { camera } = useThree();
  // Inititalizin the walking and running animation model.
  const { scene: spaceGuyModel, animations: walkingAnimation } = useLoader(
    GLTFLoader,
    "/walk.glb"
  );
  const { animations: runningAnimation } = useLoader(GLTFLoader, "/run.glb");
  const { animations: standingAngryAnimation } = useLoader(
    GLTFLoader,
    "/standing_angry.glb"
  );
  // initializing the AnimationMixer for walking and running model.
  const mixer = useRef(new THREE.AnimationMixer(spaceGuyModel));
  const clock = useRef(new THREE.Clock()); // Clock to track time
  // AnimationAction controllers
  const walkingActionController = useRef(null);
  const runningActionController = useRef(null);
  const standingAngryActionController = useRef(null);
  const currentAnimationMode = useRef(walkingActionController.current);
  const howLongWIsPressed = useRef(null);
  const stopPrevAnimationSettimeOut = useRef(null);

  const rotationSpeed = 1; // Adjust this value to control the rotation speed (reduced from 0.05 to 0.01)
  let isRotatingCamera = false;
  const cameraDistance = 5; // Adjust this value to control the distance between the camera and the object

  // Frame counter to control rotation rate
  let frameCounter = 0;
  const rotationDelay = 5; // Adjust this value to control the rotation delay (higher value = slower rotation)

  // Function to trnasition from Walking to Running.
  const transitionToRunning = () => {
    if (
      currentAnimationMode.current &&
      currentAnimationMode.current === walkingActionController.current
    ) {
      // walkingActionController.current.crossFadeTo(
      //   runningActionController.current,
      //   0.3
      // );
      walkingActionController.current.stop();
      runningActionController.current.play();
      currentAnimationMode.current = runningActionController.current;
    }
  };

  // Function to transition from running to walking
  const transitionToWalking = () => {
    if (
      currentAnimationMode.current &&
      currentAnimationMode.current !== walkingActionController.current
    ) {
      // standingAngryActionController.current.stop();
      standingAngryActionController.current.crossFadeTo(
        walkingActionController.current,
        0.2
      );
      stopPrevAnimationSettimeOut.current = setTimeout(() => {
        standingAngryActionController.current.stop();
      }, 0.3);
      walkingActionController.current.play();
      currentAnimationMode.current = walkingActionController.current;
    }
  };

  const transitionToStanding = () => {
    if (
      currentAnimationMode.current === standingAngryActionController.current
    ) {
      return;
    }
    if (currentAnimationMode.current === walkingActionController.current) {
      walkingActionController.current.crossFadeTo(
        standingAngryActionController.current,
        0.3
      );
      walkingActionController.current.stop();
    }
    if (currentAnimationMode.current === runningActionController.current) {
      runningActionController.current.crossFadeTo(
        standingAngryActionController.current,
        0.3
      );
      runningActionController.current.stop();
    }
    currentAnimationMode.current = standingAngryActionController.current;
    standingAngryActionController.current.play();
  };

  useEffect(() => {
    // First set the position of the model slightly above the ground.
    // spaceGuyModel.rotateY(180)

    // Trim the animation of running.
    const trimmedRunningAnimation = trimAnimationClip(
      runningAnimation[0],
      0.2,
      3.29
    );

    // Play the animations using animation mixer
    walkingActionController.current = mixer.current.clipAction(
      walkingAnimation[0]
    );
    runningActionController.current = mixer.current.clipAction(
      trimmedRunningAnimation
    );
    standingAngryActionController.current = mixer.current.clipAction(
      standingAngryAnimation[0]
    );

    currentAnimationMode.current = standingAngryActionController.current;
    standingAngryActionController.current.play();

    window.addEventListener("keydown", (e) => {
      // if (e.key === "w") {
      //   // If already walking or running then return
      //   if (currentAnimationMode.current === runningActionController.current) {
      //     runAhead(spaceGuyModel, camera);
      //     return;
      //   }
      //   walkAhead(spaceGuyModel, camera);
      //   transitionToWalking();
      //   if (howLongWIsPressed.current) {
      //     return;
      //   }
      //   // howLongWIsPressed.current = setTimeout(() => {
      //   //   runAhead(spaceGuyModel, camera);
      //   //   transitionToRunning();
      //   // }, 2000);
      // }

      if (e.key === "d") {
        isRotatingCamera = true;
      }
      if (e.key === "a") {
        camera.rotation.y -= 0.02;
      }
    });

    window.addEventListener("keyup", (e) => {
      if (e.key === "w") {
        transitionToStanding();
        clearTimeout(howLongWIsPressed.current);
        clearTimeout(stopPrevAnimationSettimeOut.current);
        howLongWIsPressed.current = null;
      }

      if (e.key === "d") {
        isRotatingCamera = false;
      }
    });

    // Cleanup function to stop all actions when the component unmounts
    return () => {
      mixer.current.stopAllAction();
    };
  }, []);

  useFrame(() => {
    if (mixer.current) {
      const delta = clock.current.getDelta();
      mixer.current.update(delta);
    }

    if (isRotatingCamera) {
      // Increment the frame counter
      frameCounter++;

      // Rotate the camera around the object every rotationDelay frames
      if (frameCounter % rotationDelay === 0) {
        // Get the current rotation quaternion
        const currentRotation = camera.quaternion.clone();

        // Rotate the camera around the object
        const rotationAxis = new THREE.Vector3(0, 1, 0); // Rotate around the Y axis
        currentRotation.multiply(
          new THREE.Quaternion().setFromAxisAngle(rotationAxis, rotationSpeed)
        );
        camera.applyQuaternion(currentRotation);

        // Update the camera position based on the new rotation
        const cameraOffset = new THREE.Vector3(cameraDistance, 0, 0);
        cameraOffset.applyQuaternion(currentRotation);
        camera.position.copy(spaceGuyModel.position).add(cameraOffset);

        camera.lookAt(spaceGuyModel.position);
      }
    } else {
      // Reset the frame counter when not rotating
      frameCounter = 0;
    }
  });
  return (
    <>
      <primitive object={spaceGuyModel} />
    </>
  );
}

export default SpaceGuy;
