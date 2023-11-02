

export const ArrayUtil = {
  getRandomIndex,
  getRandomItemFromArray,
  randomizeOrder
};

function getRandomItemFromArray<T>(arr: T[]): T | undefined {
  if (arr.length === 0) {
    return undefined;
  }
  return arr[getRandomIndex(arr.length)];
}

function getRandomIndex(length: number) { return Math.floor(Math.random() * length); }

function randomizeOrder<T>(array: T[]) {
  let arrayCopy = [...array];
  for (let i = arrayCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
  }
  return arrayCopy;
}