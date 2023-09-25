"use client";
import { useSocket } from "@/app/controllers/socketProvider";
import { useEffect, useState } from "react";
import { SOCKETS_EMITTERS, SOCKET_LISTENNER } from "@/socket/socketEvents";

export const useRoomSocket = (roomId: string) => {
  const [newMessage, setNewMessage] = useState<
    { message: string; timestamp: string } | undefined
  >();
  const { socket } = useSocket();

  useEffect(() => {
    socket.emit(SOCKETS_EMITTERS.JOIN_ROOM, roomId);

    socket.on(SOCKET_LISTENNER.LISTEN_MESSAGE, (message, roomId) => {
      setNewMessage(message);
    });
  }, []);

  function sendMessageToServer(message: any) {
    socket.emit(
      SOCKETS_EMITTERS.SEND_MESSAGE,
      message,
      roomId,
      (message: string, timestamp: string) => {
        if (message) setNewMessage({ message, timestamp });
      }
    );
  }

  return { newMessage, socket, sendMessageToServer };
};
