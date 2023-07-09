import * as authServices from "../services/auth.service.js";

export async function createUser(req, res) {
  const {
    username,
    password,
    affinity_name,
    email,
    oauth_provider,
    oauth_id,
    oauth_access_token,
  } = req.body;

  //if we are going to register the user
  //from a password authentification then
  if (password) {
    const user = await authServices.createUserLocal({
      username,
      password,
      affinity_name,
      email,
    });
    console.log(user);
    if (user.success === false) {
      res.status(409).json({ message: user.errorMessage });
    } else res.status(201).json(user);
  }
  // otherwise user registered with OAuth
  else {
    const user = await authServices.createUserOAuth({
      username,
      affinity_name,
      email,
      oauth_provider,
      oauth_id,
      oauth_access_token,
    });
    if (user.success === false) {
      res.status(409).json({ message: user.errorMessage });
    } else res.status(201).json(user);
  }
}
