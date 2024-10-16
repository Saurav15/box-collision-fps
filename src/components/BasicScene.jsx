import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import React, { useEffect, useRef, useState } from "react";
import { gravityWithBounceEffect } from "../utils/gravityWithBounceEffect";
import SpaceGuy from "./model/SpaceGuy";

function BasicScene() {
  const mainCubeRef = useRef(null);
  const groundRef = useRef(null);
  const boundingBoxMainCubeRef = useRef(null);
  const boundingBoxForGroundRef = useRef(null);
  const { scene, camera } = useThree();
  // Adding controls to the main cube
  let spaceMovementInterval;

  const [getVelocity, setvelocity] = useState(0.001);
  let isMainCubeTouchingGround;
  // let velocity = 0;
  const gravity = -0.003;
  const bounceFactor = 0.5;
  // let boundingBoxForMainCube;

  // UseEffect for creating the bounding box
  useEffect(() => {
    // Adding the bounding box around the main cube
    boundingBoxMainCubeRef.current = new THREE.Box3().setFromObject(
      mainCubeRef.current
    );

    // Main cube bounding box helper
    const mainCubeBoundingBoxHelper = new THREE.Box3Helper(
      boundingBoxMainCubeRef.current
    );

    // Adding the bounding box around the ground.
    boundingBoxForGroundRef.current = new THREE.Box3().setFromObject(
      groundRef.current
    );
    const groundBoundingBoxHelper = new THREE.Box3Helper(
      boundingBoxForGroundRef.current,
      0xffff00
    );

    scene.add(
      boundingBoxMainCubeRef.current,
      mainCubeBoundingBoxHelper,
      boundingBoxForGroundRef.current,
      groundBoundingBoxHelper
    );

    // camera.position.set(0, 3, 4);
    // window.addEventListener("keydown" || "keydown", (event) => {
    //   switch (event.key) {
    //     // case "w":
    //     // case "W":
    //     //   mainCubeRef.current.position.z += -0.2;
    //     //   break;
    //     // case "s":
    //     // case "S":
    //     //   mainCubeRef.current.position.z += 0.1;
    //     //   break;
    //     case " ":
    //       // if (spaceMovementInterval) {
    //       //   console.log("spacemoment interval", spaceMovementInterval);
    //       //   break;
    //       // }
    //       // if (!isMainCubeTouchingGround) {
    //       //   break;
    //       // }
    //       // spaceMovementInterval = setInterval(() => {
    //       //   if (mainCubeRef.current.position.y < 2.5) {
    //       //     mainCubeRef.current.position.y += 0.01;
    //       //     setvelocity(() => 0);
    //       //   } else {
    //       //     clearInterval(spaceMovementInterval);
    //       //     spaceMovementInterval = null;
    //       //   }
    //       // }, 0.01);
    //       isMainCubeTouchingGround
    //         ? (spaceMovementInterval = setInterval(() => {
    //             if (mainCubeRef.current.position.y < 2.5) {
    //               mainCubeRef.current.position.y += 0.01;
    //               setvelocity(() => 0);
    //             } else {
    //               clearInterval(spaceMovementInterval);
    //               spaceMovementInterval = null;
    //             }
    //           }, 0.01))
    //         : null;
    //       mainCubeRef.current.position.y += 1;
    //       break;
    //   }
    // });
  }, []);

  // Use to run pieces of code on every frame
  // useFrame(() => {
  //   // Make camera look at the cube
  //   // camera.lookAt(mainCubeRef.current.position);

  //   boundingBoxMainCubeRef.current.setFromObject(mainCubeRef.current);

  //   isMainCubeTouchingGround = gravityWithBounceEffect(
  //     boundingBoxMainCubeRef.current,
  //     boundingBoxForGroundRef.current,
  //     mainCubeRef,
  //     groundRef,
  //     getVelocity,
  //     setvelocity,
  //     gravity,
  //     bounceFactor
  //   );

  //   console.log(getVelocity, isMainCubeTouchingGround);
  //   // As soon as the main cube covers half of the ground increase the ground twice.
  //   // if (mainCubeRef.current.position.z) {
  //   //   console.log(groundRef.current.scale);
  //   //   console.log(mainCubeRef.current.position.z);
  //   // }
  // });

  return (
    <>
      {/* Creating a basic cube box */}
      {/* Change position to [0,10,0] to make this work */}
      <mesh ref={mainCubeRef} position={[5, 0.8, 0]} castShadow={true}>
        <boxGeometry />
        <meshStandardMaterial color={"#a83240"} />
      </mesh>

      {/* Creating ground for the cube */}
      <mesh scale={[10, 0.2, 100]} ref={groundRef} receiveShadow={true}>
        <boxGeometry />
        <meshStandardMaterial color={"#8f61f2"} />
      </mesh>

      {/*  */}
      <SpaceGuy />
    </>
  );
}

export default BasicScene;
