import { Button, ProfilePic, Typography } from "@/app/components";
import React, { useState, useRef } from "react";
import { userData, userMessages } from "@/app/(portal)/feed/view/mockup";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import messagingBoxStyle from "./css/messagingBoxCard.module.css";

const MessagingBoxCard: React.FC = () => {
  const [isExpended, setIsExpended] = useState<boolean>(false);
  const [messagingBoxHeight, setMessagingBoxHeight] = useState<number>(52);
  const messagingBoxRef = useRef(null);
  function handleExpand() {
    if (typeof window !== "undefined" && !isExpended) {
      const maxHeight = window.innerHeight * 0.8;
      //@ts-ignore
      const contentHeight = messagingBoxRef.current?.scrollHeight;
      setIsExpended(!isExpended);

      setMessagingBoxHeight(52 + Math.min(maxHeight, contentHeight));
    } else {
      setMessagingBoxHeight(52);
      setIsExpended(!isExpended);
    }
  }

  return (
    <div
      className={messagingBoxStyle.master}
      style={{ height: messagingBoxHeight }}
    >
      <div className={messagingBoxStyle.header}>
        <div className={messagingBoxStyle.leftContainer} onClick={handleExpand}>
          <ProfilePic location="comment" source={userData.profilePic.src} />
          <Typography color="black" marginLeft={5}>
            Messaging
          </Typography>
        </div>
        <Button onClick={handleExpand}>
          {isExpended ? (
            <AiOutlineArrowDown style={{ width: 15, height: 15 }} />
          ) : (
            <AiOutlineArrowUp style={{ width: 15, height: 15 }} />
          )}
        </Button>
      </div>

      <div
        ref={messagingBoxRef}
        style={{
          //@ts-ignore
          width: "100%",
          ...(!isExpended
            ? {
                visibility: "hidden",
                position: "absolute",
                width: "100%",
                height: "auto",
                overflow: "hidden",
                opacity: 0,
                zIndex: -1,
              }
            : {
                visibility: "visible",
                position: "relative",
                opacity: 1,
                zIndex: "auto",
                overflow: "auto",
                borderTop: "1px solid grey",
                marginTop: 10,
              }),
        }}
      >
        {userMessages.map((message, idx) => (
          <div key={idx} className={messagingBoxStyle.messageContainer}>
            <ProfilePic location="comment" source={message.contactPic.src} />
            <div className={messagingBoxStyle.rightContainer}>
              <div className={messagingBoxStyle["message-top"]}>
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
      </div>
    </div>
  );
};

export default MessagingBoxCard;
