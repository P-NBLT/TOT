import React, { useEffect, useRef, useState } from "react";
import MessageHeader from "./messageHeader";
import InboxFeed from "./inboxFeed";
import bubbleStyle from "./css/bubble.module.css";
import { userData } from "@/app/(portal)/feed/view/mockup";
import { SearchBar, Typography } from "..";
import { StaticImageData } from "next/image";
import ConnectionFeed from "../connection/connectionFeed";
import { debounce } from "@/app/utils/debounce";
import { apiClient } from "@/app/utils/apiClient";
import { useUser } from "@/app/controllers/userProvider";

type InboxBubbleProps = {
  position?: number;
  messages:
    | {
        contactName: string;
        profilePic: string;
        timestamp: string;
        content: string;
        roomId: string;
      }[]
    | [];
  addConversationToQueue: (id: string) => void;
};

type SearchResultsConnection = {
  username: string;
  profilePic: StaticImageData;
  id: string;
  faction: string;
  roomId?: string;
};
type SearchResultsMessage = {
  contactName: string;
  profilePic: StaticImageData;
  roomId: string;
  content: string;
  timestamp: string;
};

const InboxBubble: React.FC<InboxBubbleProps> = ({
  messages,
  addConversationToQueue,
}) => {
  const { user } = useUser();
  const [isExpended, setIsExpended] = useState<boolean>(false);
  const [messagingBoxHeight, setMessagingBoxHeight] = useState<number>(52);
  const [isInboxFeed, setIsInboxFeed] = useState(true);
  const [searchResultsConnection, setSearchResultsConnection] = useState<
    SearchResultsConnection[] | []
  >([]);
  const [searchResultsMessage, setSearchResultsMessage] = useState<
    SearchResultsMessage[] | []
  >([]);
  const messagingBoxRef = useRef<HTMLDivElement | null>(null);

  //
  //
  //
  function handleExpand() {
    if (typeof window !== "undefined" && !isExpended) {
      const height = window.innerHeight * 0.8;
      //@ts-ignore
      setIsExpended(!isExpended);
      setMessagingBoxHeight(height);
    } else {
      setMessagingBoxHeight(52);
      setIsExpended(!isExpended);
    }
  }
  console.log("user obj", user);
  useEffect(() => {
    if (messagingBoxRef.current) {
      if (isInboxFeed) {
        messagingBoxRef.current.style.overflow = "auto";
      } else {
        messagingBoxRef.current.style.overflow = "visible";
      }
    }
  }, [isInboxFeed]);

  function handleFocusEvents() {
    setTimeout(() => setIsInboxFeed(!isInboxFeed), 100);
  }

  function handleSearch(e: any) {
    const query = e.target.value;
    debounce(async (item) => {
      console.log("I am debouncing", item);
      if (item === "") {
        setSearchResultsConnection([]);
        setSearchResultsMessage([]);
        return;
      }

      const response = await apiClient(`search?id=${user!.id}&query=${query}`);

      setSearchResultsConnection(response.friends);
      setSearchResultsMessage(response.chats);
    }, 500)(query);
  }

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
        <SearchBar
          variant="bubbleInbox"
          onBlur={handleFocusEvents}
          onFocus={handleFocusEvents}
          onChange={handleSearch}
        />
        {isInboxFeed ? (
          <InboxFeed
            addConversationToQueue={addConversationToQueue}
            messages={messages}
          />
        ) : (
          <div
            style={{
              height: "100%",
            }}
          >
            {searchResultsConnection.length == 0 &&
              searchResultsMessage.length == 0 && (
                <div
                  style={{
                    marginTop: "50%",
                  }}
                >
                  <Typography
                    style={{
                      textAlign: "center",
                    }}
                  >
                    Look for old conversation, or connection you would like to
                    engage a conversation with
                  </Typography>
                </div>
              )}
            {searchResultsConnection.length > 0 && (
              <>
                <Typography>Connection</Typography>
                <ConnectionFeed
                  connections={searchResultsConnection}
                  addConversationToQueue={addConversationToQueue}
                />
              </>
            )}
            {searchResultsMessage.length > 0 && (
              <>
                <Typography>Message</Typography>
                <InboxFeed
                  addConversationToQueue={addConversationToQueue}
                  messages={searchResultsMessage}
                />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default InboxBubble;
