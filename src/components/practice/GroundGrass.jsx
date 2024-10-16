import { useThree } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

function GroundGrass() {
  const grassLandRef = useRef(null);

  // Load Grass texture.
  const grassTexture = new THREE.TextureLoader().load(
    "/seamless_green_grass.jpg"
  );

  useEffect(() => {
    // These properties define how the texture is wrapped in the horizontal (S) and vertical (T) directions. By setting them to THREE.RepeatWrapping, the texture will repeat instead of stretching to fit the geometry.
    grassTexture.wrapS = THREE.RepeatWrapping;
    grassTexture.wrapT = THREE.RepeatWrapping;
    //  This sets how many times the texture should repeat in the S (horizontal) and T (vertical) directions. 10 means the texture will repeat 10 times across the plane in both directions.
    grassTexture.repeat.set(10, 10);
    grassLandRef.current.rotation.x = -Math.PI / 2;
  });

  return (
    <>
      <mesh ref={grassLandRef} position={[0, -0.5, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshLambertMaterial map={grassTexture} />
      </mesh>
    </>
  );
}

export default GroundGrass;
