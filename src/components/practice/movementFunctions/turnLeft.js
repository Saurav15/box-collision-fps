/**
 * Function to rotate character in left direction.
 * @param {*} character
 * @param {*} angleToTurnBy
 */
export const turnCharacterLeft = (character, angleToTurnBy) => {
  character.rotation.y += angleToTurnBy;
};
