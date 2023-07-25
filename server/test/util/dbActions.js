import { executeQuery } from "../../utils/databaseQuery";
import mockData from "./mockData";

// after each test I need to reset the db to it's original state
// so we can repeatedly test wihtout encoutering error

export async function resetUserTable() {
  const query = `DELETE FROM users
                   WHERE id > 75;`;
  await executeQuery(query);
}

// only for the purpose of testing we are retrieving the email verify token manually
// by querying the db

export async function getEmailToken(email) {
  const query = `SELECT email_verification_token as token
                 FROM users
                 WHERE email = $1;`;
  const response = await executeQuery(query, [email]);
  const token = response[0].token;
  return token;
}

export async function createUser(testRequest) {
  const { email, password } = mockData.profile;
  const { path: authPath } = mockData.auth;

  const body = { email, password };

  await testRequest.post(`${authPath}/signup`).send(body);
  const token = await getEmailToken(email);
  await testRequest.get(`${authPath}/verify-email`).query({ token });
}
