import User from "../models/User.js";

// in order for this middleware to work properly
// you must format the body of your request as follow
// {users: [<userId1>, <userId2>, <userId3>, ...]}
// or if one user
// {user: <userId>}
export async function verifyUserExist(req, res, next) {
  const { users, user } = req.body;
  try {
    if (users) {
      for (let userId of users) {
        let isUser = await User.findUserById(userId);
        if (!isUser) throw new Error(`User of id: ${userId} does not exist`);
      }
    } else if (user) {
      let isUser = await User.findUserById(user);
      if (!isUser) throw new Error(`User of id: ${user} does not exist`);
    } else
      throw new Error(
        "Make sure the body of the request is correctly formated: {users: [<userIds...>]}/{user: <userId>} or maybe this is middleware is not needed here"
      );
    return next();
  } catch (err) {
    return res.status(400).json({ errMessage: err.message });
  }
}
