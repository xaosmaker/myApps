export function dateToUtcYYYYMMDD(date: Date | undefined): string | null {
  if (date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const some = `${year}-${month.toLocaleString("en-US", { minimumIntegerDigits: 2 })}-${day.toLocaleString("en-US", { minimumIntegerDigits: 2 })}`;
    console.log(some);

    return some;
  }
  return null;
}
