"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { SOCKET_LISTENNER } from "@/socket/socketEvents";

type SocketContextProps = {
  socket: Socket;
};

type SocketProviderProps = {
  children: React.ReactNode;
};

const socketContext = createContext<SocketContextProps | undefined>(undefined);

const socket = io("http://localhost:8000", { withCredentials: true });

const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [isLogout, setIslogout] = useState<boolean>(false);
  // const [rooms, setRooms] = useState(); if the the socket is interupted we need to keep some sort of memory of which rooms the user joined. and push them back once the socket is back

  useEffect(() => {
    socket.on(SOCKET_LISTENNER.CONNECT, () => {
      console.log(socket.id); // true
    });

    socket.on(SOCKET_LISTENNER.DISCONNECT, () => {
      console.log("disconnecting", socket.id);
      if (!isLogout) {
        console.log("Disconnected unexpectedly. Trying to reconnect...");
        setTimeout(() => socket.connect(), 1000);
      }
    });

    socket.io.on(SOCKET_LISTENNER.RECONNECT, () => {
      console.log("Reconnection fired!!");
    });

    return () => {
      setIslogout(true);
      socket.disconnect();
    };
  }, []);

  const value = {
    socket,
  };

  return (
    <socketContext.Provider value={value}>{children}</socketContext.Provider>
  );
};

export default SocketProvider;

export function useSocket() {
  const context = useContext(socketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
}
