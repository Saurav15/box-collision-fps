export const detectCollision = (Object1BoundingBox, Object2BoundingBox) => {
  return Object1BoundingBox.intersectsBox(Object2BoundingBox);
};
