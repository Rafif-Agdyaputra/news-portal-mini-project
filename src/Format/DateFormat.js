export const DateFormat = (date) => {
  const getDate = new Date(date);

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }

  const afterFormated = getDate.toLocaleDateString("id-ID", options);

  return afterFormated;
}