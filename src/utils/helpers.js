export function formatDate(date) {
  return new Intl.DateTimeFormat('en-US').format(new Date(date));
}
