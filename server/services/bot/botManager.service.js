import { executeQuery } from "../../utils/databaseQuery.js";
import BotFactory from "./bot.service.js";

// The singleton construction may change in the futur.
// It is not yet fully clear what other responsability this class will hold.

const singleton = (function BotManager() {
  let instance;

  function createBotManager() {
    let object = new Object(bot);
    return Object.freeze(object);
  }

  const bot = {
    bots: [],
    async getBots() {
      const query = `SELECT *
          FROM profile
          WHERE username IN ($1, $2, $3)`;
      // for simplicity I am only using 3 bots.
      // expect this object to change in the futur
      const values = ["Yoda", "Darth Vader", "Luke Skywalker"];
      const botProfiles = await executeQuery(query, values);

      if (botProfiles.length > 0) {
        botProfiles.forEach((bot) => {
          this.bots.push(BotFactory(bot));
        });
      } else
        throw new Error(
          "Error while initiliazing botManager. Couldn't register bots."
        );
    },
    async channelMessage(messages, botId) {
      const bot = this.bots.find((b) => b.character.id === botId);
      // console.log("BOOT", messages, "\n\n\n\n");
      return await bot.processMessage(messages);

      // return `Hey!, this this ${bot.character.username} and I am happy to amswer.`;
    },
  };

  return {
    getBotManager: function () {
      if (!instance) {
        instance = createBotManager();
      }
      return instance;
    },
  };
})();

const chiefBot = singleton.getBotManager();
await chiefBot.getBots();

export default chiefBot;
