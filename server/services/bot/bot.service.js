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
      const question = messages;

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
      //   console.log("GPT ANSWER", response.choices[0]);
      return response.choices[0].message.content;
    },

    buildPrompt() {
      return `You are ${this.character.username} from the star wars universe. 
      Your knowledge is limited to the star wars univserse. 
      Always answer at the first person like "I" or "me" not the third person. You can be creative but keep in mind to be as close as possible
      to ${this.character.username} personality. Remember if the question is outside of the scope of star wars then just answer, I do not possess this kind of information as your galaxy is very far far away.`;
    },
    async gptResponse(chatConfig) {
      const response = await openai.chat.completions.create(chatConfig);
      return response;
    },
  };
}

export default BotFactory;
