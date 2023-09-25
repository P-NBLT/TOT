export enum SOCKETS_EMITTERS {
  JOIN_ROOM = "join-room",
  LEAVE_ROOM = "leave-room",
  SEND_MESSAGE = "message-from-client",
}

export enum SOCKET_LISTENNER {
  CONNECT = "connect",
  DISCONNECT = "disconnect",
  RECONNECT = "reconnect",
  LISTEN_MESSAGE = "message-from-server",
}
