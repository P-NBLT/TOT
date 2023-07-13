import User from "../models/User.js";
import Email from "../models/Email.js";

export async function sendEmailVerification(email, token) {
  await Email.sendVerificationEmail(email, token);
}

export async function createUserLocal(userInfo) {
  const user = await User.createLocal(userInfo);
  return user;
}

export async function createUserOAuth(userInfo) {
  const user = await User.createOauth(userInfo);
  return user;
}
