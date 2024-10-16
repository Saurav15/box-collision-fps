/**
 * Function to rotate character in right direction.
 * @param {*} character
 * @param {*} angleToTurnBy
 */
export const turnCharacterRight = (character, angleToTurnBy) => {
  character.rotation.y -= angleToTurnBy;
};
