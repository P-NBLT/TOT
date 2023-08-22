import { socketEmitters } from "./socketEvents.js";

export function botResponse(socket, response) {
  socket.emit(socketEmitters.botResponse, response);
}
