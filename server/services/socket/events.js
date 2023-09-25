const EVENTS_EMITTERS = {
  sendMessage: "message-from-server",
};

Object.freeze(EVENTS_EMITTERS);

const EVENTS_LISTENER = {
  connect: "connection",
  disconnect: "disconnect",
  joinRoom: "join-room",
  leaveRoom: "leave-room",
  incommingMessage: "message-from-client",
};

Object.freeze(EVENTS_LISTENER);

export { EVENTS_EMITTERS, EVENTS_LISTENER };
