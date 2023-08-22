export const socketListeners = {
  userMessage: "sendUserMessage",
  userToUser: "userToUserMessage",
  userToBot: "userToBotMessage",
  botMessage: "sendBotMessage",
};
Object.freeze(socketListeners);

export const socketEmitters = {
  botResponse: "reponseBotMessage",
};

Object.freeze(socketEmitters);
