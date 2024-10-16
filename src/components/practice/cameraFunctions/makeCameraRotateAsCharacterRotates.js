import { degToRad } from "three/src/math/MathUtils";

/**
 * Function to make camera change its position across the x-z axis and rotate in a circle as the character rotates.
 * This must be run at every frame, so we constantly moniter the characters y rotation and then rotate camera in circle with the radius of `distanceBetweenCameraAndCharacter`
 * @param {*} character
 * @param {*} camera
 * @param {*} distanceBetweenCameraAndCharacter
 * @param {*} offsetAngle - When you import a 3D character or model into a Three.js scene, sometimes the model doesn't face the direction you expect. This misalignment happens because the model's local axes (its own X, Y, Z directions) may not match the global axes of the scene.The refactorAngle is an angle that helps correct this misalignment. By applying this angle, you can rotate the model so that it faces the intended direction.
 */
export const makeCameraRotateAndMoveAsObjectsRotates = (
  character,
  camera,
  distanceBetweenCameraAndCharacter,
  offsetAngle
) => {
  // This line will continiously get the current Y rotation of the object that we are looking at.
  const updatedLookOutAngle = character.rotation.y - degToRad(offsetAngle);
  // Get the x coordinates of the camera as per the latest object rotation.
  // Look at this for better understanding: https://gamedev.stackexchange.com/questions/9607/moving-an-object-in-a-circular-path?newreg=8da55a2ad9114a7eb1cbc83394550987
  const camerasXComponent =
    character.position.x +
    distanceBetweenCameraAndCharacter * Math.cos(Math.PI - updatedLookOutAngle);
  // Get the z coordinates of the camera as per the latest object rotation.
  const camerasZComponent =
    character.position.z +
    distanceBetweenCameraAndCharacter * Math.sin(updatedLookOutAngle);
  // Update the cameras position using gsap.
  camera.position.set(camerasXComponent, 2, camerasZComponent);
  // We dont need to adjust the rotation of the camera as it moves aling the circle around the object, we can just make it look at the main object.
  camera.lookAt(character.position);
};
