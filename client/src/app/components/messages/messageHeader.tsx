import React from "react";
import { Button, ProfilePic, Typography } from "..";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import messageHeaderStyles from "./css/messageHeader.module.css";
import avatarPng from "@/assets/images/avatar.png";
import { useUser } from "@/app/controllers/userProvider";

type MessageHeaderProps = {
  isExpended: boolean;
  handleExpand: () => void;
  view?: "messaging" | "room";
  userData?: any;
  handleCloseConversation?: (id: string) => void;
};

const MessageHeader: React.FC<MessageHeaderProps> = ({
  handleExpand,
  isExpended,
  view = "room",
  userData,
  handleCloseConversation,
}) => {
  const { user } = useUser();
  return (
    <div className={messageHeaderStyles.masterHeader}>
      <div className={messageHeaderStyles.leftContainer} onClick={handleExpand}>
        <ProfilePic
          location="bubbleMessage"
          //@ts-ignore
          source={
            view === "room"
              ? userData?.profilePic! || avatarPng
              : user?.profilePic || avatarPng
          }
        />
        <Typography color="black" marginLeft={5}>
          {view === "room" ? userData?.username : "Messaging"}
        </Typography>
      </div>
      {view === "messaging" && (
        <Button onClick={handleExpand}>
          {isExpended ? (
            <AiOutlineArrowDown style={{ width: 15, height: 15 }} />
          ) : (
            <AiOutlineArrowUp style={{ width: 15, height: 15 }} />
          )}
        </Button>
      )}
      {view === "room" && (
        // @ts-ignore
        <Button onClick={() => handleCloseConversation(userData.roomId)}>
          <RxCross2 style={{ width: 15, height: 15 }} />
        </Button>
      )}
    </div>
  );
};

export default MessageHeader;
