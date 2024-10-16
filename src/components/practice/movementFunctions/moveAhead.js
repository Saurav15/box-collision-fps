/**
 * Function to make character move ahead, it also updates the camera postition to make sure that camera fillows the character as it moves ahead.
 * @param {*} character
 * @param {*} movingSpeed
 * @param {*} camera
 * @param {*} offsetAngle - When you import a 3D character or model into a Three.js scene, sometimes the model doesn't face the direction you expect. This misalignment happens because the model's local axes (its own X, Y, Z directions) may not match the global axes of the scene.The refactorAngle is an angle that helps correct this misalignment. By applying this angle, you can rotate the model so that it faces the intended direction.
 */

import { degToRad } from "three/src/math/MathUtils";

export const moveAhead = (character, movingSpeed, camera, offsetAngle) => {
  // Move in the same direaction as the object is facing
  const directionTheObjectIsFacing =
    character.rotation.y - degToRad(offsetAngle); //Angle

  // To make object move on the x-z plane we need to find, by what distance do we need to move the character in x and in z direaction
  // XCoordinate direction
  const xDirectionForObjectToMove =
    Math.cos(directionTheObjectIsFacing) * movingSpeed;
  // zCoordinate direction
  const zDirectionForObjectToMove =
    Math.sin(-directionTheObjectIsFacing) * movingSpeed;

  // Updating the objects position
  character.position.x += xDirectionForObjectToMove;
  character.position.z += zDirectionForObjectToMove;

  // Updating the cameras position to make sure that camera follows the character.
  camera.position.x += xDirectionForObjectToMove;
  camera.position.z += zDirectionForObjectToMove;
};
