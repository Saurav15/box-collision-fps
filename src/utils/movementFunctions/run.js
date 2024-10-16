import { characterRunningSpeed } from "./constants";
import * as THREE from "three";

export const runAhead = (Object, camera) => {
  // Get the Y-axis rotation from the camera's rotation matrix\
  const euler = new THREE.Euler().setFromQuaternion(camera.quaternion, "YXZ");
  Object.rotation.y = euler.y - Math.PI;

  const xMovementDirection = Math.sin(Object.rotation.y);
  const zMoviementDirection = Math.cos(Object.rotation.y);

  Object.position.x += xMovementDirection * characterRunningSpeed;
  Object.position.z += zMoviementDirection * characterRunningSpeed;
};
