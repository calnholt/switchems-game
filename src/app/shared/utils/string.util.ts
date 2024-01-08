export const StringUtil = {
  getFirstLetterCapitalized,
  capitalizeFirstLetterOfEachWord,
  capitalizeFirstLetterAndReplaceUnderscores,
  getScreamingSnakeCase,
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

function getScreamingSnakeCase(input: string): string {
  // Capitalize each letter
  const capitalized = input.toUpperCase();
  // Replace spaces with underscores
  const noSpaces = capitalized.replace(/ /g, "_");
  // Remove non-alphanumeric characters
  const alphanumeric = noSpaces.replace(/[^A-Z0-9_]/g, "");
  return alphanumeric;
}