

export const ArrayUtil = {
  getRandomIndex,
  getRandomItemFromArray,
  randomizeOrder,
  getRandomUniqueEntriesFromArray
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

function getRandomUniqueEntriesFromArray<T>(array: T[], entries: number): T[] {
  if (entries <= 0 || entries > array.length) {
    return [];
  }
  const result: T[] = [];
  const indices: number[] = array.map((a: T, i: number) => i);
  for (let i = 0; i < entries; i++) {
    const randomIndex = Math.floor(Math.random() * indices.length);
    result.push(array[indices[randomIndex]]);
    indices.splice(indices[randomIndex], 1);
  }
  return result;
}