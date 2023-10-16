import React, { useState, useEffect } from "react";
import messagingBoxStyle from "./css/messagingBoxCard.module.css";
import InboxBubble from "@/app/components/messages/inboxBubble";
import ConversationBubble from "@/app/components/messages/conversationBubble";
import { useWindowSize } from "@/app/hooks/useWindowSize";
import { apiClient } from "@/app/utils/apiClient";
import { useUser } from "@/app/controllers/userProvider";

type Conversation = {
  username: string;
  roomId: string;
  profilePic: string;
  open: boolean;
};

type InboxFeedMessage = {
  contactName: string;
  profilePic: string;
  timestamp: string;
  content: string;
  roomId: string;
};

const MessagingBoxCard: React.FC = () => {
  const { user } = useUser();
  const [inboxFeedMessages, setInboxFeedMessages] = useState<
    InboxFeedMessage[] | []
  >([]);
  const [conversationBubbles, setConversationBubbles] = useState<
    Conversation[]
  >([]);
  const { width } = useWindowSize();
  const [offset, setOffset] = useState<number>(0); // logic for incrementing the offset will be added later.

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

  function isInboxFeed(roomId: string) {
    const idx = inboxFeedMessages.findIndex((el) => el.roomId === roomId);
    if (idx > 0) {
    }
    return idx === -1 ? true : false;
  }

  function handleInboxFeed(roomId: string, content: string) {
    const inboxFeedCopy = [...inboxFeedMessages];
    const idx = inboxFeedCopy.findIndex((el) => el.roomId === roomId);
    inboxFeedCopy[idx].content = content;
    inboxFeedCopy[idx].timestamp = new Date().toISOString();
    inboxFeedCopy.unshift(inboxFeedCopy[idx]);
    inboxFeedCopy.splice(idx + 1, 1);
    console.log(inboxFeedCopy);
    setInboxFeedMessages(inboxFeedCopy);
  }

  async function addConversationToQueue(message: any) {
    if (!message.roomId) {
      var newRoom = await createRoom(user!.id, message.contactId);

      setInboxFeedMessages((prev: InboxFeedMessage[]) => [
        {
          ...message,
          content: "New Chat",
          timestamp: new Date().toISOString(),
          roomId: newRoom.roomId,
        },
        ...prev,
      ]);
    } else if (!message.content && isInboxFeed(message.roomId)) {
      setInboxFeedMessages((prev: InboxFeedMessage[]) => [
        {
          ...message,
          content: "New chat",
          timestamp: new Date().toISOString(),
        },
        ...prev,
      ]);
    }

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

  useEffect(() => {
    async function getLastActiveChats() {
      const rooms = await apiClient(
        `chat/user/${user?.id}/rooms/recent?offset=${offset}`
      );
      console.log(rooms);
      setInboxFeedMessages(rooms);
    }
    user && getLastActiveChats();
  }, [user?.id]);

  return (
    <div className={messagingBoxStyle.conversationsQueueContainer}>
      <aside className={messagingBoxStyle.conversationOverlayContainer}>
        <InboxBubble
          messages={inboxFeedMessages}
          addConversationToQueue={addConversationToQueue}
        />
        {conversationBubbles &&
          conversationBubbles.map((conversation, idx) => (
            <ConversationBubble
              expandConversation={expandConversation}
              handleCloseConversation={handleCloseConversation}
              handleInboxFeed={handleInboxFeed}
              contactData={conversation}
              key={conversation.roomId}
            />
          ))}
      </aside>
    </div>
  );
};

export default MessagingBoxCard;

async function createRoom(userId: string, userId2: string) {
  const response = await apiClient("chat/single", {
    data: { users: [userId, userId2] },
    method: "POST",
  });
  return { roomId: response.chat.chat_id };
}
