import React, { useState } from "react";
import messagingBoxStyle from "./css/messagingBoxCard.module.css";
import { userMessages } from "./mockup";
import InboxBubble from "@/app/components/messages/inboxBubble";
import ConversationBubble from "@/app/components/messages/conversationBubble";
import { useWindowSize } from "@/app/hooks/useWindowSize";

type Conversation = {
  username: string;
  roomId: string;
  profilePic: string;
  open: boolean;
};

const MessagingBoxCard: React.FC = () => {
  const [conversationBubbles, setConversationBubbles] = useState<
    Conversation[]
  >([]);
  const { width } = useWindowSize();

  function expandConversation(roomId: string) {
    setConversationBubbles((prevConversation) =>
      prevConversation.map((conversation) => {
        if (conversation.roomId === roomId)
          return { ...conversation, open: !conversation.open };
        else return conversation;
      })
    );
    return;
  }

  function addConversationToQueue(message: any) {
    const isAlreadyOpen = conversationBubbles.findIndex(
      (conversation: any) => conversation.roomId === message.roomId
    );
    if (isAlreadyOpen !== -1) {
      setConversationBubbles((prev) => {
        const copy = [...prev];
        copy[isAlreadyOpen] = { ...copy[isAlreadyOpen], open: true };
        return copy;
      });
      return;
    }

    const conversation = {
      username: message.contactName,
      roomId: message.roomId,
      profilePic: message.profilePic,
      open: true,
    };
    const maxConversationDisplay = width! > 1200 ? 3 : 2;
    if (conversationBubbles.length < maxConversationDisplay) {
      //@ts-ignore
      setConversationBubbles((prev) => [...prev, conversation]);
    } else {
      const copy = [...conversationBubbles];
      copy.shift();
      setConversationBubbles([...copy, conversation]);
    }
  }

  function handleCloseConversation(roomId: string) {
    setConversationBubbles((prev) => [
      ...prev.filter((conversation) => conversation.roomId !== roomId),
    ]);
  }

  return (
    <div className={messagingBoxStyle.conversationsQueueContainer}>
      <aside className={messagingBoxStyle.conversationOverlayContainer}>
        <InboxBubble
          messages={userMessages}
          addConversationToQueue={addConversationToQueue}
        />
        {conversationBubbles &&
          conversationBubbles.map((conversation, idx) => (
            <ConversationBubble
              expandConversation={expandConversation}
              handleCloseConversation={handleCloseConversation}
              contactData={conversation}
              key={conversation.roomId}
            />
          ))}
      </aside>
    </div>
  );
};

export default MessagingBoxCard;
