/**
 * Function to trim animations.
 * @param {*} clip
 * @param {*} startTime - Start time of animation.
 * @param {*} endTime - End time of animation.
 */
export function trimAnimationClip(clip, startTime, endTime) {
  const updatedTracks = clip.tracks.map((track) => {
    const newTrack = track.clone();
    const newTimes = [];
    const newValues = [];

    for (let i = 0; i < track.times.length; i++) {
      if (track.times[i] >= startTime && track.times[i] <= endTime) {
        newTimes.push(track.times[i] - startTime);
        newValues.push(
          ...track.values.slice(
            i * track.getValueSize(),
            (i + 1) * track.getValueSize()
          )
        );
      }
    }

    newTrack.times = newTimes;
    newTrack.values = newValues;
    return newTrack;
  });

  return { ...clip, duration: endTime - startTime, tracks: updatedTracks };
}
