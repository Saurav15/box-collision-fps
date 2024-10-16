import { detectCollision } from "./detectCollision";

export const gravityWithBounceEffect = (
  Object1BoundingBox,
  Object2BoundingBox,
  Object1Ref,
  Object2ref,
  getVelocity,
  setVelocity,
  gravity,
  bounceFactor
) => {
  const isColliding = detectCollision(Object1BoundingBox, Object2BoundingBox);
  if (isColliding === true) {
    if (getVelocity > -0.09) {
      setVelocity(0);
      // Object1Ref.current.position.y = -5;
      return isColliding;
    }
    Object1Ref.current.position.y = Object2ref.current.position.y + 0.60002;
    setVelocity((velocity) => -velocity * bounceFactor);
  } else {
    setVelocity((velocity) => velocity + gravity);
    Object1Ref.current.position.y += getVelocity * 0.3;
  }

  return isColliding;
};
