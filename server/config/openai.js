import { OpenAI } from "openai";
import { config } from "./index.js";

const openai = new OpenAI({ apiKey: config.OPEN_AI_API_KEY });

export default openai;
