"use client";
import { useSocket } from "@/app/controllers/socketProvider";
import { useEffect, useState } from "react";
import { SOCKETS_EMITTERS, SOCKET_LISTENNER } from "@/socket/socketEvents";

type ChatHistory = {
  message: string;
  timestamp: string;
  username: string;
  userId: string;
}[];

export const useRoomSocket = (roomId: string) => {
  const [newMessage, setNewMessage] = useState<
    | { message: string; timestamp: string; username: string; userId: string }
    | undefined
  >();
  const [chatHistory, setChatHistory] = useState<
    | { message: string; timestamp: string; username: string; userId: string }[]
    | undefined
  >();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { socket } = useSocket();

  useEffect(() => {
    socket.emit(
      SOCKETS_EMITTERS.JOIN_ROOM,
      roomId,
      (chatHistory: ChatHistory) => {
        setChatHistory(chatHistory);
        setIsLoading(false);
      }
    );

    socket.on(SOCKET_LISTENNER.LISTEN_MESSAGE, (message, roomId) => {
      setNewMessage(message);
    });
  }, []);

  function sendMessageToServer(message: any) {
    socket.emit(
      SOCKETS_EMITTERS.SEND_MESSAGE,
      message,
      roomId,
      (
        message: string,
        timestamp: string,
        username: string,
        userId: string
      ) => {
        if (message) setNewMessage({ message, timestamp, username, userId });
      }
    );
  }

  return {
    chatHistory,
    newMessage,
    isLoading,
    socket,
    sendMessageToServer,
  };
};
