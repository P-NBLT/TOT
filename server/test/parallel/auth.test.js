import mockData from "../util/mockData.js";
import { getEmailToken } from "../util/dbActions.js";

const { email, password, path: authPath } = mockData.auth;
const body = { email, password };

let request;
let session;
beforeAll(() => {
  request = global.testRequest;
  session = global.testSession;
});

describe("Local Auth journey: singup, verify email, signin logout", () => {
  test("the user is signing up", async function () {
    const response = await request.post(`${authPath}/signup`).send(body);
    const responseBody = response.body;
    expect(response.status).toBe(201);
    expect(responseBody.message).toBe("success");
  });

  test("user signed up but can't login because need to verify his email", async function () {
    const response = await request.post(`${authPath}/login/local`).send(body);
    const responseBody = response.body;
    expect(response.status).toBe(401);
    expect(responseBody.message).toBe(
      "user email not verified. please verify yout email."
    );
  });

  test("user verify his email", async function () {
    const token = await getEmailToken(email);

    const response = await request
      .get(`${authPath}/verify-email`)
      .query({ token });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("email");
  });

  let user;
  test("user login. Object with user and session information is sent back", async function () {
    const response = await session
      .post(`${authPath}/login/local`)
      .send(body)
      .expect(200);

    user = response.body.user;
    expect(response.body).toHaveProperty("user");
    expect(response.body.user).toHaveProperty("id");
    expect(response.body).toHaveProperty("session");
    expect(response.body.session).toHaveProperty("passport");
  });

  test("user is loging out", async function () {
    expect(user).toHaveProperty("id");
    const response = await session.post(`${authPath}/logout`).expect(205);
  });
});
