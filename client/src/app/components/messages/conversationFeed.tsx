import React, { useRef, useEffect, useState } from "react";
import { Button, ProfilePic, Typography } from "..";
import conversationFeedModule from "./css/conversationFeed.module.css";
import { useDomPurify } from "@/app/hooks/useDomPurify";
import { useRoomSocket } from "@/app/hooks/socket/useRoomSocket";
import {
  formatTime,
  diffDateInSec,
  displayRoomChatDate,
} from "@/app/utils/date";
import { SOCKETS_EMITTERS } from "@/socket/socketEvents";
import { useUser } from "@/app/controllers/userProvider";
import { apiClient } from "@/app/utils/apiClient";
import avatarPic from "@/assets/images/avatar.png"; // to delete once a default avatar pic is associated to a user if no profile pic.

const ConversationFeed: React.FC<{
  roomId: string;
  contactProfilePic: string;
  handleInboxFeed: (roomId: string, content: string) => void;
}> = ({ roomId, contactProfilePic, handleInboxFeed }) => {
  const textRef = useRef<HTMLTextAreaElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  const [textareaHeight, setTextareaHeight] = useState<number>(40);
  const [bodyHeight, setBodyHeight] = useState<number>(250);
  const { chatHistory, newMessage, isLoading, socket, sendMessageToServer } =
    useRoomSocket(roomId);
  const [messageQueue, setMessageQueue] = useState<any[] | []>(
    chatHistory || []
  );
  const [messageContent, setMessageContent] = useState<string>("");
  const { user } = useUser();
  const { displayHTMLMessage } = useDomPurify();
  let [offset, setOffset] = useState<number>(0);
  const [allowFetchExtrahistory, setAllowFetchExtrahistory] =
    useState<boolean>(false);
  const allowFetchRef = useRef(allowFetchExtrahistory);

  function adjustHeight() {
    const textArea = textRef.current;
    const body = bodyRef.current;
    if (!textArea || !body) return;

    textArea.style.height = "auto";
    const scrollHeight = textArea.scrollHeight;
    const textareaMaxHeight = 100;

    if (scrollHeight > textareaMaxHeight) {
      setTextareaHeight(textareaMaxHeight);
      setElementHeight(textArea, textareaMaxHeight, "auto");
    } else {
      setTextareaHeight(scrollHeight);
      const newHeight = 250 - (scrollHeight - 40);
      setElementHeight(body, newHeight);
      setElementHeight(textArea, scrollHeight);
      setBodyHeight(newHeight);
    }
  }
  let controller: AbortController | null = null;
  async function fetchMoreHistory() {
    if (allowFetchRef.current === false) return;
    const body = bodyRef.current;
    if (!body) return;
    const totalScrollHeight = body.scrollHeight;
    const visibleHeight = body.clientHeight;
    const amountScrolled = body.scrollTop;
    const previousScrollHeight = body.scrollHeight;

    const threshold = 0.01 * (totalScrollHeight - visibleHeight); // 80% scroll to the top
    if (amountScrolled <= threshold) {
      // User has scrolled up by 99.9%
      setAllowFetchExtrahistory(false);
      if (controller) {
        controller.abort();
      }
      controller = new AbortController();
      const signal: AbortSignal = controller.signal;
      const olderChatHistory = await apiClient(
        `message/${roomId}?offset=${offset + 1}`,
        { signal }
      );
      setOffset(offset++);

      if (olderChatHistory) {
        setMessageQueue((prev) => [...olderChatHistory, ...prev]);

        setTimeout(() => {
          const newScrollHeight = body.scrollHeight;
          const addedHeight = newScrollHeight - previousScrollHeight;
          body.scrollTop = body.scrollTop + addedHeight;
        }, 20);
        setAllowFetchExtrahistory(true);

        setTimeout(() => {}, 100);
      } else {
        setAllowFetchExtrahistory(false);
      }
    }
  }

  function scrollToBottomAtLoad() {
    const body = bodyRef.current;
    if (!body) return;
    body.scrollTop = body.scrollHeight;
  }

  function scrollToBottom() {
    const body = bodyRef.current;
    if (body) {
      const lastElement = body.lastChild;
      if (lastElement) {
        (lastElement as HTMLElement).scrollIntoView({ behavior: "smooth" });
      }
    }
  }

  useEffect(() => {
    const textArea = textRef.current;
    const body = bodyRef.current;
    scrollToBottomAtLoad();
    setTimeout(() => setAllowFetchExtrahistory(true), 500);
    if (!textArea) return;
    const textarea = textRef.current;
    textarea.addEventListener("input", adjustHeight);

    if (!body) return;
    body.addEventListener("scroll", fetchMoreHistory);

    return () => {
      textarea.removeEventListener("input", adjustHeight);
      body.removeEventListener("scroll", fetchMoreHistory);
      socket.emit(SOCKETS_EMITTERS.LEAVE_ROOM, roomId);
    };
  }, []);

  useEffect(() => {
    if (newMessage) {
      setMessageQueue((prev) => [
        ...prev,
        {
          username: newMessage.username,
          timestamp: newMessage.timestamp,
          content: newMessage.message,
          userId: newMessage.userId,
        },
      ]);
      setTimeout(() => scrollToBottom(), 10);
      handleInboxFeed(roomId, newMessage.message);
    }
  }, [newMessage]);

  useEffect(() => {
    if (chatHistory && offset === 0) {
      setMessageQueue(chatHistory);
      setTimeout(() => scrollToBottom(), 10);
    } else if (chatHistory && offset > 0) {
      const body = bodyRef.current;
      setMessageQueue(() => [...chatHistory, ...messageQueue]);
      if (!body) return;

      setTimeout(() => {
        messageRef.current?.scrollIntoView({ behavior: "smooth" });
        setAllowFetchExtrahistory(true);
      }, 500);
    }
  }, [chatHistory]);

  useEffect(() => {
    allowFetchRef.current = allowFetchExtrahistory;
  }, [allowFetchExtrahistory]);

  function registerMessage(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setMessageContent(e.target.value);
  }

  function addMessage() {
    const body = bodyRef.current;
    const textArea = textRef.current;
    textArea!.value = "";
    setElementHeight(textArea, 40);
    setElementHeight(body, 250);
    setMessageQueue((prev) => [
      ...prev,
      {
        username: user!.username,
        timestamp: new Date().toISOString(),
        content: messageContent,
        userId: user?.id,
      },
    ]);

    sendMessageToServer(messageContent);
    handleInboxFeed(roomId, messageContent);
    setMessageContent("");
    setTimeout(() => scrollToBottom(), 10);
  }

  return (
    <div className={conversationFeedModule.master}>
      <div
        className={conversationFeedModule.body}
        ref={bodyRef}
        style={{ height: `${bodyHeight}px` }}
      >
        {isLoading ? (
          <Typography margin={10}>Loading Messages</Typography>
        ) : messageQueue.length === 0 ? (
          <Typography margin={10}>Beginning of the conversation</Typography>
        ) : (
          messageQueue.map((message, idx) => {
            const prevMessage = messageQueue[idx - 1];
            const NextMessage = messageQueue[idx + 1];
            const time = displayDate(message.timestamp, prevMessage?.timestamp);
            const isDisplayed = displayUsernameAndProfilePic(
              message,
              prevMessage,
              NextMessage
            );
            return (
              <>
                {time && <TimeStamp idx={idx} time={time} />}
                <div
                  className={conversationFeedModule.messageContainer}
                  key={idx}
                >
                  {isDisplayed && (
                    <>
                      {" "}
                      <ProfilePic
                        location="comment"
                        //@ts-ignore
                        source={
                          user?.id === message.userId
                            ? user?.profilePic
                            : contactProfilePic || avatarPic
                        }
                        className={conversationFeedModule.profilePic}
                      />
                      <div className={conversationFeedModule.header}>
                        <Typography>{message.username}</Typography>
                      </div>
                    </>
                  )}
                  {displayHTMLMessage(message.content, {
                    color: "black",
                    paddingLeft: 60,
                  })}
                </div>
              </>
            );
          })
        )}
        <span className={conversationFeedModule.break}></span>
      </div>
      <div className={conversationFeedModule.textareaContainer}>
        <textarea
          ref={textRef}
          className={conversationFeedModule.textarea}
          placeholder="Write your message..."
          style={{ height: `${textareaHeight}px` }}
          onChange={registerMessage}
        />
      </div>
      <div className={conversationFeedModule.buttonContainer}>
        <Button
          disabled={messageContent.length > 0 ? false : true}
          onClick={addMessage}
          variant="primary"
          backgroundColor="black"
          padding={"5px 10px"}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default ConversationFeed;

const TimeStamp: React.FC<{ idx: number; time: string }> = ({ idx, time }) => {
  return (
    <div
      style={{
        marginTop: idx === 0 ? 5 : 20,
      }}
      className={conversationFeedModule["timestamp-container"]}
    >
      <div className={conversationFeedModule["timestamp-breakline"]} />
      <Typography
        fontSize={"sm"}
        color="grey"
        padding={"0, 15px"}
        style={{ textAlign: "center" }}
      >
        {formatTime(time)}
      </Typography>
      <div className={conversationFeedModule["timestamp-breakline"]} />
    </div>
  );
};

function setElementHeight(
  element: HTMLElement | null,
  newHeight: number,
  overflowY?: string
) {
  if (element) {
    element.style.height = `${newHeight}px`;
    if (overflowY) {
      element.style.overflowY = overflowY;
    }
  }
}

function displayDate(currentMessageTime: string, prevMessageTime: any) {
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

function displayUsernameAndProfilePic(
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
