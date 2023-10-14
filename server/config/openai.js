import { Configuration, OpenAIApi } from "openai";
import { config } from "./index.js";

const configuration = new Configuration({ apiKey: config.OPEN_AI_API_KEY });

const openai = new OpenAIApi(configuration);

export default openai;
