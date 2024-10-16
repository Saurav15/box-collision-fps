import { useLoader, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import * as THREE from "three";

export const useAddHouse = () => {
  const { scene } = useThree();
  const { scene: houseScene } = useLoader(GLTFLoader, "/small_house.glb");
  scene.add(houseScene);
};
