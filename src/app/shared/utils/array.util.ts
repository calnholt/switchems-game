

export const ArrayUtil = {
  getRandomIndex,
  getRandomItemFromArray,
  randomizeOrder,
  getRandomUniqueEntriesFromArray
};

function getRandomItemFromArray<T>(arr: T[], random: () => number): T | undefined {
  if (arr.length === 0) {
    return undefined;
  }
  return arr[getRandomIndex(arr.length, random)];
}

function getRandomIndex(length: number, random: () => number) { return (random() * length); }

function randomizeOrder<T>(array: T[], random: () => number) {
  let arrayCopy = [...array];
  for (let i = arrayCopy.length - 1; i > 0; i--) {
    const j = (random() * (i + 1));
    [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
  }
  return arrayCopy;
}

function getRandomUniqueEntriesFromArray<T>(array: T[], entries: number, random: () => number): T[] {
  if (entries <= 0 || entries > array.length) {
    return [];
  }
  const result: T[] = [];
  const indices: number[] = array.map((a: T, i: number) => i);
  for (let i = 0; i < entries; i++) {
    const randomIndex = getRandomIndex(indices.length, random);
    const index = indices[randomIndex];
    result.push(array[index]);
    indices.splice(randomIndex, 1);
  }
  return result;
}