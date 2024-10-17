function dateToGRformat(date: string): string {
  const newDate: Date = new Date(date);
  return newDate.toLocaleDateString("en-GB");
}
function timeTo24Format() {
  const date = new Date();
  return `${("0" + date.getHours()).slice(-2)}:${(
    "0" + date.getMinutes()
  ).slice(-2)}`;
}

export { dateToGRformat, timeTo24Format };
