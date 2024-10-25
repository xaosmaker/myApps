function dateToGRformat(date?: string): string {
  let newDate;
  if (date) {
    newDate = new Date(date);
  } else {
    newDate = new Date();
  }

  return newDate.toLocaleDateString("en-GB");
}
function timeTo24Format() {
  const date = new Date();
  return `${("0" + date.getHours()).slice(-2)}:${(
    "0" + date.getMinutes()
  ).slice(-2)}`;
}

export { dateToGRformat, timeTo24Format };
