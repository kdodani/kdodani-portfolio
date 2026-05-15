/** Only hide before reveal when motion is explicitly allowed (not while preference is unknown). */
export function fadeUpInitial(
  reduceMotion: boolean | null,
  y = 10
): false | { opacity: number; y: number } {
  return reduceMotion === false ? { opacity: 0, y } : false;
}

export function motionDelay(reduceMotion: boolean | null, seconds: number): number {
  return reduceMotion === false ? seconds : 0;
}
