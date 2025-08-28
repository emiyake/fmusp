/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 * src: https://stackoverflow.com/a/1527820/3670829
 */
export function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const getRandomPercentage = (min = 0, max = 100) => {
  // Get random number between min and max
  const random = Math.floor(Math.random() * (max - min)) + min;

  return `${random}%`;
};
