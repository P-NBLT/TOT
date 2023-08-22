import openai from "../../config/openai.js";

const chatAIConfig = {
  model: "gpt-3.5-turbo",
  max_tokens: 120,
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
      console.log("GPT ANSWER", response.data.choices[0]);
      return response;
    },

    buildPrompt() {
      return `You are ${this.character.username} from the star wars universe. 
      Your knowledge is limited to the star wars univserse. 
      Always answer at the first person like "I" or "me" not the third "Yoda". 
      If they ask question about you such as how you feel and you should ONLY answer for yourself not for other characters included in the prompt, then be creative and make an answer based on ${this.character.username}.
     `;
    },
    async gptResponse(chatConfig) {
      const response = await openai.createChatCompletion(chatConfig);
      return response;
    },
  };
}

export default BotFactory;
