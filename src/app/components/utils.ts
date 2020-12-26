import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

export const timeFormat = 'HH:mm';
export const dateFormat = 'YYYY-MM-DD';
export const datetimeFormat = dateFormat + " " + timeFormat;

export const formatDate = (date: Date) => {
  return dayjs(date).format(datetimeFormat);
}

export const formatDuration = (duration: number) => {
  return dayjs(duration * 60 * 1000).utc().format(timeFormat);
}
