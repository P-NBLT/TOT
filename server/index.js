import { pid } from "node:process";
import { createHttpServer } from "./server.js";
import { config } from "./config/index.js";

console.log(`This process has pid::: ${pid}`);
const httpServer = createHttpServer();

const PORT = config.SERVER_PORT;

httpServer.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
