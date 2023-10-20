import React, { useEffect } from "react";
import { Button, ProfilePic, Typography } from "..";
import conversationFeedModule from "./css/conversationFeed.module.css";
import { useDomPurify } from "@/app/hooks/useDomPurify";
import { formatTime } from "@/app/utils/date";
import { displayDate, displayUsernameAndProfilePic } from "./utils/date";
import { useUser } from "@/app/controllers/userProvider";
import { useConversationUI } from "./utils/useMessageUI";
import { useMessage } from "./utils/useMessage";
import avatarPic from "@/assets/images/avatar.png"; // to delete once a default avatar pic is associated to a user if no profile pic.

const ConversationFeed: React.FC<{
  roomId: string;
  contactProfilePic: string;
  handleInboxFeed: (roomId: string, content: string) => void;
}> = ({ roomId, contactProfilePic, handleInboxFeed }) => {
  const {
    textRef,
    bodyRef,
    textareaHeight,
    bodyHeight,
    adjustHeight,
    scrollToBottom,
  } = useConversationUI();
  const { user } = useUser();
  const {
    messageQueue,
    messageContent,
    isLoading,
    chatHistory,
    newMessage,
    fetchMoreHistory,
    registerMessage,
    addMessage,
  } = useMessage(roomId, user, bodyRef, textRef, handleInboxFeed);

  const { displayHTMLMessage } = useDomPurify();

  useEffect(() => {
    setTimeout(() => scrollToBottom(), 10);
  }, [chatHistory]);

  useEffect(() => {
    setTimeout(() => scrollToBottom(), 10);
  }, [newMessage]);

  useEffect(() => {
    const textArea = textRef.current;
    const body = bodyRef.current;
    if (!textArea) return;
    const textarea = textRef.current;
    textarea.addEventListener("input", adjustHeight);

    if (!body) return;
    body.addEventListener("scroll", fetchMoreHistory);

    return () => {
      textarea.removeEventListener("input", adjustHeight);
      body.removeEventListener("scroll", fetchMoreHistory);
    };
  }, []);

  function handleSendMessage() {
    addMessage();
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
              <div key={idx}>
                {time && <TimeStamp idx={idx} time={time} />}
                <div className={conversationFeedModule.messageContainer}>
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
              </div>
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
          onClick={handleSendMessage}
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
