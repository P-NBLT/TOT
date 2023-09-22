import React, { useRef, useState } from "react";
import MessageHeader from "./messageHeader";
import InboxFeed from "./inboxFeed";
import bubbleStyle from "./css/bubble.module.css";
import { userData } from "@/app/(portal)/feed/view/mockup";

type InboxBubbleProps = {
  position?: number;
  messages: any[];
  addConversationToQueue: (id: string) => void;
};

const InboxBubble: React.FC<InboxBubbleProps> = ({
  messages,
  addConversationToQueue,
}) => {
  const [isExpended, setIsExpended] = useState<boolean>(false);
  const [messagingBoxHeight, setMessagingBoxHeight] = useState<number>(52);
  const messagingBoxRef = useRef(null);
  function handleExpand() {
    if (typeof window !== "undefined" && !isExpended) {
      const maxHeight = window.innerHeight * 0.8;
      //@ts-ignore
      const contentHeight = messagingBoxRef.current?.scrollHeight;
      const overHead = 65;
      setIsExpended(!isExpended);
      const choosenHeight =
        contentHeight + overHead >= maxHeight
          ? maxHeight
          : contentHeight + overHead;

      setMessagingBoxHeight(choosenHeight);
    } else {
      setMessagingBoxHeight(52);
      setIsExpended(!isExpended);
    }
  }
  console.log(messagingBoxHeight);
  return (
    <div
      className={`${bubbleStyle.master} ${bubbleStyle["master-inbox"]}`}
      style={{ height: messagingBoxHeight }}
    >
      <MessageHeader
        view="messaging"
        handleExpand={handleExpand}
        isExpended={isExpended}
        userData={userData}
      />
      <div
        ref={messagingBoxRef}
        className={
          bubbleStyle[
            isExpended ? "inboxContainer-visible" : "inboxContainer-hidden"
          ]
        }
      >
        <InboxFeed
          messagingBoxRef={messagingBoxRef}
          addConversationToQueue={addConversationToQueue}
          messages={messages}
        />
      </div>
    </div>
  );
};

export default InboxBubble;
