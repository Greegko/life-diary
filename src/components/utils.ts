const getTime = (date: Date) => {
  return date.toISOString().split('T')[1].split(':').slice(0, 2).join(':');
}

export const formatDate = (date: Date) => {
  return date.toISOString().split('T')[0] + " " + getTime(date);
}

export const formatDuration = (duration: number) => {
  return getTime(new Date(duration * 60 * 1000));
}
