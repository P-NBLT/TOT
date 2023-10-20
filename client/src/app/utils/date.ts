import {
  format,
  parseISO,
  isToday,
  isYesterday,
  subDays,
  isBefore,
  differenceInSeconds,
  isWithinInterval,
  startOfDay,
  isSameDay,
} from "date-fns";

export function formatTime(time: string) {
  const dateObject = parseISO(time);
  if (isToday(dateObject)) {
    return format(parseISO(time), "HH:mm");
  } else if (isYesterday(dateObject)) {
    return "Yesterday";
  } else if (isBefore(dateObject, subDays(new Date(), 1))) {
    const today = startOfDay(new Date());
    const oneWeekAgo = subDays(today, 6);
    if (isWithinInterval(dateObject, { start: oneWeekAgo, end: today })) {
      return format(dateObject, "EEEE");
    }
    return format(parseISO(time), "dd/MM/yyyy");
  }
}

export function diffDateInSec(time1: string, time2: string) {
  return differenceInSeconds(parseISO(time2), parseISO(time1));
}

export function displayRoomChatDate(time1: string, time2: string) {
  const isoTime1 = parseISO(time1);
  const isoTime2 = parseISO(time2);
  if (isToday(isoTime1)) {
    return { isToday: true, continue: true };
  } else if (!isSameDay(isoTime1, isoTime2)) {
    return { isToday: false, continue: true };
  } else return { isToday: false, continue: false };
}
