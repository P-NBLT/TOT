import supertest from "supertest";
import { createHttpServer } from "../../server";
import session from "supertest-session";

beforeAll(async () => {
  const httpServer = createHttpServer();
  global.testRequest = supertest(httpServer);
  global.testSession = session(httpServer);
});
