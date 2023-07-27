import openai from "../config/openai.js";

const chatAIConfig = {
  model: "gpt-3.5-turbo",
  max_tokens: 60,
  temperature: 0.4,
};

function BotFactory(character) {
  return {
    character,
    async processMessage(messages) {
      // for now I am giving only the last message.
      // later I want to add historic context.
      const question = messages[0].message;

      const botPrompt = this.buildPrompt(question);
      const prompt = [
        {
          role: "system",
          content: botPrompt,
        },
        {
          role: "user",
          content: question,
        },
      ];
      chatAIConfig.messages = prompt;

      const response = await this.gptResponse(chatAIConfig);

      return response;
    },

    buildPrompt() {
      return `You are ${this.character.username} from the star wars universe. 
      Your knowledge is limited to the star wars univserse.`;
    },
    async gptResponse(chatConfig) {
      const response = await openai.createChatCompletion(chatConfig);
      return response;
    },
  };
}

export default BotFactory;
