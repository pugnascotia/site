// @flow

export function formatDate(date: Date | string) {
  if (date == null) {
    return null;
  }

  if (typeof date === 'string') {
    date = new Date(date);
  }

  return date.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
}
