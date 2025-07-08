import { sequelize } from "../config/db.js";
import { userModel } from "../models/user.model.js";

const User = userModel(sequelize);

const getusers = () => {
  return User.findAll();
};

const updateUserProfile = async ({ userId, name, email, profilepic }) => {
  const user = await User.findByPk(userId);

  if (!user) {
    throw new Error("User not found");
  }

  user.name = name || user.name;
  user.email = email || user.email;
  user.profilepic = profilepic || user.profilepic;

  await user.save();

  return user;
};

export default { getusers, updateUserProfile };
