import {
  format,
  parseISO,
  isToday,
  isYesterday,
  subDays,
  isBefore,
} from "date-fns";

export function formatTime(time: string) {
  const dateObject = parseISO(time);
  if (isToday(dateObject)) {
    return "Today";
  } else if (isYesterday(dateObject)) {
    return "Yesterday";
  } else if (isBefore(dateObject, subDays(new Date(), 1))) {
    return format(parseISO(time), "dd/MM/yyyy");
  }
}
