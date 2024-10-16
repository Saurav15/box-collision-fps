import { characterWalkingSpeed } from "./constants";
import * as THREE from "three";

export const walkAhead = (Object, camera) => {
  // Get the Y-axis rotation from the camera's rotation matrix\
  const euler = new THREE.Euler().setFromQuaternion(camera.quaternion, "YXZ");
  // Object.rotation.y = euler.y - Math.PI;
  // Now we cannot make the character move without knowing where he is looking and on the basis of where the character is looking, we will update the position of the character in the xz plane.
  // To know the direction of the character in the xz plane we will use sin and cosin function as both the function gives us one component of the position. Sin gives the x-component while the Cosin gives the z-component.
  console.log(camera.rotation);
  const xMovementDirection = Math.sin(euler.y - Math.PI);
  const zMoviementDirection = Math.cos(euler.y - Math.PI);
  console.log("xcomponent is: ", xMovementDirection);
  console.log("zcomponent is: ", zMoviementDirection);
  Object.position.x += xMovementDirection * characterWalkingSpeed;
  Object.position.z += zMoviementDirection * characterWalkingSpeed;
  // Moving in front direction.
};
