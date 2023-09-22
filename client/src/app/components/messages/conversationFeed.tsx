import React, { useRef, useEffect, useState, SyntheticEvent } from "react";
import { Button, Input, ProfilePic, Typography } from "..";
import conversationFeedModule from "./css/conversationFeed.module.css";
import { conversationObject } from "@/app/(portal)/feed/view/mockup";
import { userData } from "@/app/(portal)/feed/view/mockup";
import { useDomPurify } from "@/app/hooks/useDomPurify";

const ConversationFeed: React.FC = () => {
  const textRef = useRef<HTMLTextAreaElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [textareaHeight, setTextareaHeight] = useState<number>(40);
  const [bodyHeight, setBodyHeight] = useState<number>(250);
  const [messageQueue, setMessageQueue] = useState<any[]>(
    conversationObject[1]
  );
  const [postMessageContent, setPostMessageContent] = useState<string>("");
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
    };
  }, []);

  function registerMessage(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setPostMessageContent(e.target.value);
  }

  function addMessage() {
    const textArea = textRef.current;
    textArea!.value = "";
    setPostMessageContent("");
    setMessageQueue((prev) => [
      ...prev,
      {
        username: userData.username,
        profilePic: userData.profilePic,
        time: "2022-09-15T15:30:00Z",
        content: postMessageContent,
      },
    ]);
    setTimeout(() => scrollToBottom(), 10);
  }

  return (
    <div className={conversationFeedModule.master}>
      <div
        className={conversationFeedModule.body}
        ref={bodyRef}
        style={{ height: `${bodyHeight}px` }}
      >
        {messageQueue.map((message, idx) => (
          <div className={conversationFeedModule.messageContainer} key={idx}>
            <ProfilePic
              location="comment"
              source={message.profilePic.src}
              className={conversationFeedModule.profilePic}
            />
            <div className={conversationFeedModule.header}>
              <Typography>{message.username}</Typography>
              <Typography fontSize={12}>{message.time}</Typography>
            </div>
            {displayHTMLMessage(message.content, {
              color: "black",
              paddingLeft: 60,
            })}
          </div>
        ))}
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
          disabled={postMessageContent.length > 0 ? false : true}
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
