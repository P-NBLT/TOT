import React, { useEffect, useRef, useState } from "react";
import MessageHeader from "./messageHeader";
import bubbleStyle from "./css/bubble.module.css";
import ConversationFeed from "./conversationFeed";

type ConversationBubbleProps = {
  expandConversation?: (roomId: string) => void;
  handleCloseConversation: (roomId: string) => void;
  handleInboxFeed: (roomId: string, content: string) => void;
  contactData: {
    username: string;
    roomId: string;
    profilePic: string;
    open: boolean;
  };
};

const ConversationBubble: React.FC<ConversationBubbleProps> = ({
  contactData,
  handleCloseConversation,
  expandConversation,
  handleInboxFeed,
}) => {
  const [isExpended, setIsExpended] = useState<boolean>(contactData.open);
  const [messagingBoxHeight, setMessagingBoxHeight] = useState<number>(400);
  const messagingBoxRef = useRef(null);
  function handleExpand() {
    if (typeof window !== "undefined") {
      setIsExpended(!isExpended);
      setMessagingBoxHeight(isExpended ? 52 : 400);
      expandConversation!(contactData.roomId);
    }
  }
  useEffect(() => {
    setIsExpended(contactData.open);
    setMessagingBoxHeight(contactData.open ? 400 : 52);
  }, [contactData.open]);

  return (
    <div
      className={`${bubbleStyle.master} ${bubbleStyle["master-conversation"]}`}
      style={{
        height: messagingBoxHeight,
        width: isExpended ? 336 : 288,
      }}
    >
      <MessageHeader
        view="room"
        handleExpand={handleExpand}
        isExpended={isExpended}
        userData={contactData}
        handleCloseConversation={handleCloseConversation}
      />
      <div
        ref={messagingBoxRef}
        className={
          bubbleStyle[
            isExpended
              ? "conversationContainer-visible"
              : "conversationContainer-hidden"
          ]
        }
      >
        <ConversationFeed
          roomId={contactData.roomId}
          contactProfilePic={contactData.profilePic}
          handleInboxFeed={handleInboxFeed}
        />
      </div>
    </div>
  );
};

export default ConversationBubble;
