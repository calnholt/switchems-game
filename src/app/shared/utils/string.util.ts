export const StringUtil = {
  getFirstLetterCapitalized,
  capitalizeFirstLetterOfEachWord,
  capitalizeFirstLetterAndReplaceUnderscores,
}

function getFirstLetterCapitalized(str: string): string {
  return str.charAt(0).toUpperCase() + str.substring(1, str.length).toLowerCase();
}

function capitalizeFirstLetterOfEachWord(str: string) {
  return str.replace(/\b\w/g, function(char: string) {
    return char.toUpperCase();
  });
}

function capitalizeFirstLetterAndReplaceUnderscores(str: string) {
  return str
    .replace(/_/g, ' ') // Replace all underscores with spaces
    .replace(/\b\w/g, function(char: string) {
      return char.toUpperCase();
    });
}