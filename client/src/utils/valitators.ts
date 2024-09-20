const SYMBOLS = [
  "*",
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  "_",
  "-",
  "=",
  "+",
  "{",
  "[",
  "]",
  "}",
  ")",
];
function validateIsNumber(v: string) {
  const regex: RegExp = /^[0-9]*$/;
  return regex.test(v);
}
function validateHasCommasAndSpacesOnly(v: string) {
  const regex: RegExp = /^[0-9 ,]*$/;
  return regex.test(v);
}
function containSymbol(str: string) {
  for (const symbol of SYMBOLS) {
    if (str.includes(symbol)) {
      return true;
    }
  }
  return false;
}
function validateSplitWithRegexAndGT0(data: string, regex: RegExp) {
  const dataArray = data.split(regex);

  const dataArrayGT = dataArray.filter((data) => Number(data) > 0);
  if (dataArray.length === dataArrayGT.length) {
    return true;
  }
  return false;
}
function validateEmail(name: string) {
  if (!name && !name.trim()) {
    return false;
  }
  if (!name.includes("@")) {
    return false;
  }

  if (name.split(/ /g).length !== 1) {
    return false;
  }
  if (
    (name.match(/@/g) || []).length === 1 &&
    name.indexOf(".", name.indexOf("@")) > name.indexOf("@")
  ) {
    return true;
  }
  return false;
}

function validatePassword(p: string) {
  if (!p.trim()) {
    return {
      type: false,
      message: "Password can't be empty string",
    };
  }
  const cappitalLetter = p.match(/[A-Z]/g) || [];
  const symbol = containSymbol(p);
  if (cappitalLetter.length < 1) {
    return {
      type: false,
      message: "Password must contain one or More CappitalLetters",
    };
  }
  if (!symbol) {
    return {
      type: false,
      message: `Password should contain one of those symbols \n ${SYMBOLS.join(
        ", "
      )} `,
    };
  }
}

export {
  validateEmail,
  validateHasCommasAndSpacesOnly,
  validatePassword,
  validateIsNumber,
  validateSplitWithRegexAndGT0,
};
