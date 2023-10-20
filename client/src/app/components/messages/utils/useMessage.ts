import { useState, useEffect, useRef, RefObject } from "react";
import { useRoomSocket } from "@/app/hooks/socket/useRoomSocket";
import { useConversationUI } from "./useMessageUI";
import { apiClient } from "@/app/utils/apiClient";

export function useMessage(
  roomId: string,
  user: any,
  bodyRef: RefObject<HTMLDivElement | null>,
  textRef: RefObject<HTMLTextAreaElement | null>,
  handleInboxFeed: (roomId: string, content: string) => void
) {
  const { chatHistory, newMessage, isLoading, sendMessageToServer } =
    useRoomSocket(roomId);
  const [messageQueue, setMessageQueue] = useState<any[] | []>(
    chatHistory || []
  );
  const [messageContent, setMessageContent] = useState<string>("");
  let [offset, setOffset] = useState<number>(0);
  const [allowFetchExtrahistory, setAllowFetchExtrahistory] =
    useState<boolean>(false);
  const allowFetchRef = useRef(allowFetchExtrahistory);
  const { setElementHeight } = useConversationUI();

  let controller: AbortController | null = null;
  async function fetchMoreHistory() {
    if (allowFetchRef.current === false) return;
    const body = bodyRef.current;
    if (!body) return;
    const totalScrollHeight = body.scrollHeight;
    const visibleHeight = body.clientHeight;
    const amountScrolled = body.scrollTop;
    const previousScrollHeight = body.scrollHeight;

    const threshold = 0.01 * (totalScrollHeight - visibleHeight); // 99.9% scroll to the top
    if (amountScrolled <= threshold) {
      setAllowFetchExtrahistory(false);
      if (controller) {
        controller.abort();
      }
      controller = new AbortController();
      const signal: AbortSignal = controller.signal;
      const olderChatHistory = await apiClient(
        `message/${roomId}?offset=${offset + 1}`,
        { signal }
      );
      setOffset(offset++);

      if (olderChatHistory) {
        setMessageQueue((prev) => [...olderChatHistory, ...prev]);

        setTimeout(() => {
          const newScrollHeight = body.scrollHeight;
          const addedHeight = newScrollHeight - previousScrollHeight;
          body.scrollTop = body.scrollTop + addedHeight;
        }, 20);
        setAllowFetchExtrahistory(true);

        setTimeout(() => {}, 100);
      } else {
        setAllowFetchExtrahistory(false);
      }
    }
  }

  function addMessage() {
    const body = bodyRef.current;
    const textArea = textRef.current;
    textArea!.value = "";
    setElementHeight(textArea, 40);
    setElementHeight(body, 250);
    setMessageQueue((prev) => [
      ...prev,
      {
        username: user!.username,
        timestamp: new Date().toISOString(),
        content: messageContent,
        userId: user?.id,
      },
    ]);

    sendMessageToServer(messageContent);
    handleInboxFeed(roomId, messageContent);
    setMessageContent("");
  }

  function registerMessage(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setMessageContent(e.target.value);
  }

  useEffect(() => {
    if (newMessage) {
      setMessageQueue((prev) => [
        ...prev,
        {
          username: newMessage.username,
          timestamp: newMessage.timestamp,
          content: newMessage.message,
          userId: newMessage.userId,
        },
      ]);
      handleInboxFeed(roomId, newMessage.message);
    }
  }, [newMessage]);

  useEffect(() => {
    if (chatHistory && offset === 0) {
      setMessageQueue(chatHistory);
    } else if (chatHistory && offset > 0) {
      const body = bodyRef.current;
      setMessageQueue(() => [...chatHistory, ...messageQueue]);
      if (!body) return;

      setTimeout(() => {
        setAllowFetchExtrahistory(true);
      }, 500);
    }
  }, [chatHistory]);

  useEffect(() => {
    allowFetchRef.current = allowFetchExtrahistory;
  }, [allowFetchExtrahistory]);

  return {
    messageQueue,
    messageContent,
    isLoading,
    chatHistory,
    newMessage,
    fetchMoreHistory,
    registerMessage,
    addMessage,
  };
}
