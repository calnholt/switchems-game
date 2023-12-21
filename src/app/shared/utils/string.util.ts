export const StringUtil = {
  getFirstLetterCapitalized,
}

function getFirstLetterCapitalized(str: string): string {
  return str.charAt(0).toUpperCase() + str.substring(1, str.length).toLowerCase();
}