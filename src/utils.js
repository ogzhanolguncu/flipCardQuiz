export const replaceSpecialChars = (txt) =>
  txt
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&micro/g, "µ");
