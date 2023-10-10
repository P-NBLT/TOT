import React from "react";
import { ProfilePic, Typography } from "..";
import connectionFeedStyles from "./connectionFeed.module.css";
import avatarPng from "@/assets/images/avatar.png"; // temporary to delete once image hosted in db

type InboxFeedProps = {
  //   messagingBoxRef: any;
  connections: any[]; // to correctly type once the structure for connections is clear
  addConversationToQueue: (connection: any) => void;
};

const ConnectionFeed: React.FC<InboxFeedProps> = ({
  connections,
  addConversationToQueue,
}) => {
  return (
    <>
      {connections &&
        connections.map((connection, idx) => (
          <div
            key={idx}
            className={connectionFeedStyles.connectionContainer}
            onClick={() => addConversationToQueue(connection)}
          >
            <ProfilePic
              location="comment"
              source={connection.profilePic?.src || avatarPng}
            />
            <div className={connectionFeedStyles.rightContainer}>
              <Typography color="black">
                {truncate(connection.contactName, 20)}
              </Typography>
              <Typography color="grey">
                {truncate(connection.affinity, 10)}
              </Typography>
            </div>
          </div>
        ))}
    </>
  );
};

export default ConnectionFeed;

function truncate(text: string, length: number) {
  return text.length < length ? text : text.slice(0, length).concat("...");
}
