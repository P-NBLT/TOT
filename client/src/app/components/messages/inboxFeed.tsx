import React from "react";
import { ProfilePic, Typography } from "..";
import inboxFeedStyle from "./css/inboxFeed.module.css";

type InboxFeedProps = {
  messagingBoxRef: any;
  messages: any[]; // to correctly type once the structure for messages is clear
  addConversationToQueue: (message: any) => void;
};

const InboxFeed: React.FC<InboxFeedProps> = ({
  messages,
  addConversationToQueue,
}) => {
  return (
    <>
      {messages &&
        messages.map((message, idx) => (
          <div
            key={idx}
            className={inboxFeedStyle.messageContainer}
            onClick={() => addConversationToQueue(message)}
          >
            <ProfilePic
              location="inboxMessage"
              source={message.profilePic.src}
            />
            <div className={inboxFeedStyle.rightContainer}>
              <div className={inboxFeedStyle["message-top"]}>
                <Typography color="black">{message.contactName}</Typography>
                <Typography color="grey">{message.timestamp}</Typography>
              </div>
              <Typography color="grey">
                {message.content.length > 40
                  ? message.content.slice(0, 60).concat("...")
                  : message.content}
              </Typography>
            </div>
          </div>
        ))}
    </>
  );
};

export default InboxFeed;
