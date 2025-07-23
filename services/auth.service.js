import { sequelize } from "../config/db.js";
import { userModel } from "../models/user.model.js";
import bcrypt, { compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import Randomstring from "randomstring";
import dotenv from 'dotenv'
dotenv.config()
const User = userModel(sequelize);

export const createUser = async (userBody) => {
  const userExist = await User.findOne({ where: { email: userBody.email } });
  if (userExist) {
    throw new Error("Email already exists");
  }

  const hashPass = bcrypt.hashSync(userBody.password, 10);
  const newUser = await User.create({ ...userBody, password: hashPass });

  return newUser;
};

export const findUser = (email) => {
  return User.findOne({ where: { email } });
};

export const createToken = (user) => {
  return jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
};

export const createRandomString = () => {
  return Randomstring.generate();
};

export const createTokenForForgotPass = async (email, token) => {
  return await User.update({ token }, { where: { email } });
};

export const checktoken = async (token) => {
  return User.findOne({ where: { token } });
};

export const hashPass = async (password) => {
  return bcrypt.hashSync(password, 10);
};
export default {
  createUser,
  findUser,
  createToken,
  createRandomString,
  createTokenForForgotPass,
  checktoken,
  hashPass,
};
