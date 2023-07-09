import User from "../models/User.js";

export async function createUserLocal(userInfo) {
  const user = await User.createLocal(userInfo);
  return user;
}

export async function createUserOAuth(userInfo) {
  const user = await User.createOauth(userInfo);
  return user;
}
