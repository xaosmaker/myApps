function dateToGRformat(date: string | undefined): string | null {
  if (date !== undefined) {
    const newDate: Date = new Date(date);
    return newDate.toLocaleDateString("en-GB");
  }
  return null;
}
function timeToHumanReadable() {
  const date = new Date();
  return `${("0" + date.getHours()).slice(-2)}:${(
    "0" + date.getMinutes()
  ).slice(-2)}`;
}

export { dateToGRformat, timeToHumanReadable };
