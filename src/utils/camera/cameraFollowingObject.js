import { Vector3 } from "three";

export const makeCameraFollowCharacter = (character, camera) => {
  // Take the objects position.
  const characterPosition = character.position;
  const cameraPosition = camera.position;

  //   const newCameraPosition = new Vector3();
  //   newCameraPosition.x = characterPosition.x;
  //   newCameraPosition.y = characterPosition.y + 2;
  //   newCameraPosition.z = characterPosition.z + 3;

  //   camera.position.copy(newCameraPosition);

  // Set that position as the cameras postion.
  // Update the y and z offset from that position creating some distance between camera and object.
  // Make camera look at the object.
};
