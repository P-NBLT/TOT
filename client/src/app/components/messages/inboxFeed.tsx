import React from "react";
import { ProfilePic, Typography } from "..";
import inboxFeedStyle from "./css/inboxFeed.module.css";
import { formatTime } from "@/app/utils/date";
import avatarPic from "@/assets/images/avatar.png";

type InboxFeedProps = {
  // messagingBoxRef: any;
  messages: any[] | []; // to correctly type once the structure for messages is clear
  addConversationToQueue: (message: any) => void;
};

const InboxFeed: React.FC<InboxFeedProps> = ({
  messages,
  addConversationToQueue,
}) => {
  return (
    <>
      {messages && messages.length > 0 ? (
        messages.map((message, idx) => (
          <div
            key={idx}
            className={inboxFeedStyle.messageContainer}
            onClick={() => addConversationToQueue(message)}
          >
            <ProfilePic
              location="inboxMessage"
              source={message.profilePic || avatarPic}
            />
            <div className={inboxFeedStyle.rightContainer}>
              <div className={inboxFeedStyle["message-top"]}>
                <Typography color="black">{message.contactName}</Typography>
                <Typography color="grey">
                  {formatTime(message.timestamp)}
                </Typography>
              </div>
              <Typography color="grey">
                {message.content.length > 40
                  ? message.content.slice(0, 55).concat("...")
                  : message.content}
              </Typography>
            </div>
          </div>
        ))
      ) : (
        <div>
          <Typography>
            You don't have any conversation yet. Look for a friend in the search
            bar above to start a conversation
          </Typography>
        </div>
      )}
    </>
  );
};

export default InboxFeed;
