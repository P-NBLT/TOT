function BotFactory(character) {
  return {
    character,
    async processMessage(messages) {
      const question = messages[0].message;

      const botPrompt = this.buildPrompt(question);

      const response = await this.gptResponse(chatAIConfig);

      return response;
    },

    buildPrompt() {
      return `You are ${this.character.username} from the star wars universe. 
      Your knowledge is limited to the star wars univserse.`;
    },
    async gptResponse() {
      const response = "gpt answer ";
      return response;
    },
  };
}

export default BotFactory;
