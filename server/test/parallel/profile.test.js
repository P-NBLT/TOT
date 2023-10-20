import { createUser } from "../util/dbActions.js";
import mockData from "../util/mockData.js";

// extract mock data
const { username, affinity, side, email, password } = mockData.profile;
const { path: authPath } = mockData.auth;

// build body for post request
const authBody = { email, password };
const porfileBody = { username, affinity, side };

//global variable
let session;
let request;

beforeAll(async () => {
  session = global.testSession;
  request = global.testRequest;
  await createUser(request);
});

describe("User create a profile", () => {
  let id;
  let authenticatedSession;
  beforeAll(function (done) {
    session
      .post(`${authPath}/login/local`)
      .send(authBody)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        authenticatedSession = testSession;

        id = res._body.data.user.id;
        return done();
      });
  });
  test("profile created", async function () {
    const response = await authenticatedSession
      .post("/profile/create-profile")
      .send(porfileBody);

    const responseBody = response.body;
    const user = responseBody.data.user;
    expect(user).toHaveProperty("id");
    expect(user).toHaveProperty("username");
    expect(user.username).toBe(username);
    expect(user.id).toBe(id);
  });
});

describe("User login and have its username in the respone body", () => {
  test("user login and have username", async () => {
    const response = await request
      .post(`${authPath}/login/local`)
      .send(authBody)
      .expect(200);

    const user = response.body.data.user;
    expect(user).toHaveProperty("username");
  });
});
