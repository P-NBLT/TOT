import React, { useRef, useEffect, useState } from "react";
import { Button, ProfilePic, Typography } from "..";
import conversationFeedModule from "./css/conversationFeed.module.css";
import { userData } from "@/app/(portal)/feed/view/mockup";
import { useDomPurify } from "@/app/hooks/useDomPurify";
import { useRoomSocket } from "@/app/hooks/socket/useRoomSocket";
import { formatTime } from "@/app/utils/date";
import { SOCKETS_EMITTERS } from "@/socket/socketEvents";
// to delete
import avatarPic from "@/assets/images/avatar.png";
import { useUser } from "@/app/controllers/userProvider";

const ConversationFeed: React.FC<{
  roomId: string;
  contactProfilePic: string;
  handleInboxFeed: (roomId: string, content: string) => void;
}> = ({ roomId, contactProfilePic, handleInboxFeed }) => {
  const textRef = useRef<HTMLTextAreaElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
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
    scrollToBottomAtLoad();
    if (!textArea) return;
    const textarea = textRef.current;
    textarea.addEventListener("input", adjustHeight);

    return () => {
      textarea.removeEventListener("input", adjustHeight);
      socket.emit(SOCKETS_EMITTERS.LEAVE_ROOM, roomId);
    };
  }, []);

  useEffect(() => {
    if (newMessage) {
      setMessageQueue((prev) => [
        ...prev,
        {
          username: newMessage.username,
          time: newMessage.timestamp,
          profilePic: avatarPic,
          content: newMessage.message,
          userId: newMessage.userId,
        },
      ]);
      setTimeout(() => scrollToBottom(), 10);
    }
  }, [newMessage]);

  useEffect(() => {
    if (chatHistory) {
      setMessageQueue(chatHistory);
      setTimeout(() => scrollToBottom(), 10);
    }
  }, [chatHistory]);

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
        profilePic: userData.profilePic,
        time: new Date().toISOString(),
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
          <p>Loading Messages</p>
        ) : messageQueue.length === 0 ? (
          <p>Beginning of the conversation</p>
        ) : (
          messageQueue.map((message, idx) => (
            <div className={conversationFeedModule.messageContainer} key={idx}>
              <ProfilePic
                location="comment"
                //@ts-ignore
                source={
                  (message.userId === user?.id
                    ? user?.profilePic
                    : contactProfilePic) || avatarPic
                }
                className={conversationFeedModule.profilePic}
              />
              <div className={conversationFeedModule.header}>
                <Typography>{message.username}</Typography>
                <Typography fontSize={12}>
                  {formatTime(message.time)}
                </Typography>
              </div>
              {displayHTMLMessage(message.content, {
                color: "black",
                paddingLeft: 60,
              })}
            </div>
          ))
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
