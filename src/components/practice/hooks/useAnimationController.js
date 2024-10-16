import { useLoader } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import * as THREE from "three";

export const useAnimationController = () => {
  // Import the character and its basic standing animation
  const { scene: character, animations: idleAnimationClip } = useLoader(
    GLTFLoader,
    "/standing_angry.glb"
  );

  // Mixer which every animation will use
  const mixer = useRef(new THREE.AnimationMixer(character));

  // Import all the animations.
  const { animations: runningAnimationClip } = useLoader(
    GLTFLoader,
    "/run.glb"
  );
  const { animations: walkingAnimationClip } = useLoader(
    GLTFLoader,
    "/walk.glb"
  );
  const { animations: jumpingAnimationClip } = useLoader(
    GLTFLoader,
    "/jump.glb"
  );

  // Ref to store the current animation's controller. (We are saving the controller of the currently running animation because we then can directly use this controller to stop and play the prev animation)
  const currentAnimation = useRef(null);

  // Create a controller for each animation.
  const walkingAnimationController = mixer.current.clipAction(
    walkingAnimationClip[0]
  );
  const idleAnimationController = mixer.current.clipAction(
    idleAnimationClip[0]
  );
  const runningAnimationController = mixer.current.clipAction(
    runningAnimationClip[0]
  );
  const jumpingAnimationController = mixer.current.clipAction(
    jumpingAnimationClip[0]
  );

  const startWalking = () => {
    if (
      currentAnimation.current &&
      currentAnimation.current != walkingAnimationController
    ) {
      currentAnimation.current.stop();
    }
    walkingAnimationController.play();
    currentAnimation.current = walkingAnimationController;
  };

  const startRunning = () => {
    if (
      currentAnimation.current &&
      currentAnimation.current != runningAnimationController
    ) {
      currentAnimation.current.stop();
    }
    runningAnimationController.play();
    currentAnimation.current = runningAnimationController;
  };

  const idleAnimation = () => {
    if (
      currentAnimation.current &&
      currentAnimation.current !== idleAnimationController
    ) {
      currentAnimation.current.stop();
    }
    idleAnimationController.play();
    currentAnimation.current = idleAnimationController;
  };

  const jumpAnimation = () => {
    if (
      currentAnimation.current &&
      currentAnimation.current !== jumpingAnimationController
    ) {
      currentAnimation.current.stop();
    }
    jumpingAnimationController.play();
    currentAnimation.current = jumpingAnimationController;
  };

  const playAnimation = (animationType) => {
    if (animationType === "walking") {
      startWalking();
    }
    if (animationType === "idle") {
      idleAnimation();
    }
    if (animationType === "running") {
      startRunning();
    }
    if (animationType === "jumping") {
      jumpAnimation();
    }
  };

  return { mixer: mixer.current, playAnimation, character };
};
