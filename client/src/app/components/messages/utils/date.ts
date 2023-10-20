import { diffDateInSec, displayRoomChatDate } from "@/app/utils/date";

export function displayDate(currentMessageTime: string, prevMessageTime: any) {
  if (!prevMessageTime) {
    return currentMessageTime;
  }
  const dateToCompareFrom = prevMessageTime;

  const response = displayRoomChatDate(currentMessageTime, dateToCompareFrom);

  if (response.isToday) {
    const diff = diffDateInSec(dateToCompareFrom, currentMessageTime);
    // more than 15 min
    if (diff > 60 * 15) {
      return currentMessageTime;
    }
  } else if (response.isToday === false && response.continue === true) {
    return currentMessageTime;
  } else return null;
}

export function displayUsernameAndProfilePic(
  currentMessage: any,
  prevMessage: any,
  nextMessage: any
) {
  if (!prevMessage) return true;

  if (
    currentMessage.userId === prevMessage.userId ||
    (!nextMessage && currentMessage.userId === prevMessage.userId)
  ) {
    const diff = diffDateInSec(prevMessage.timestamp, currentMessage.timestamp);
    // 2 minutes or less
    if (diff <= 60 * 2) return false;
    else return true;
  } else if (currentMessage.userId !== prevMessage.userId) return true;
}
