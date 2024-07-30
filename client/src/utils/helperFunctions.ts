function dateToGRformat(date: str | undefined): string | null {
  if (date !== undefined) {
    const newDate: Date = new Date(date);
    return newDate.toLocaleDateString("en-GB");
  }
  return null;
}

export { dateToGRformat };
