function validateIsNumber(v: string) {
  const regex: RegExp = /^[0-9]*$/;
  return regex.test(v);
}
function validateHasCommasAndSpacesOnly(v: string) {
  const regex: RegExp = /^[0-9 ,]*$/;
  return regex.test(v);
}
function validateSplitWithRegexAndGT0(data: string, regex: RegExp) {
  const dataArray = data.split(regex);

  const dataArrayGT = dataArray.filter((data) => Number(data) > 0);
  if (dataArray.length === dataArrayGT.length) {
    return true;
  }
  return false;
}

export {
  validateHasCommasAndSpacesOnly,
  validateIsNumber,
  validateSplitWithRegexAndGT0,
};
