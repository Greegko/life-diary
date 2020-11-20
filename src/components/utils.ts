export const formatDate = (date: Date) => {
  return date.toISOString().split('T')[0] + " " + date.toISOString().split('T')[1].split(':').slice(0, 2).join(':');
}
