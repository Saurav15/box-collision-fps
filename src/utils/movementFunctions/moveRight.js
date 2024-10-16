import { characterWalkingSpeed } from "./constants";

export const moveRight = (Object) => {
  // make character move in right direction
  Object.position.x += characterWalkingSpeed;
};
