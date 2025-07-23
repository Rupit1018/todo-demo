import authService from "../services/auth.service.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

import dotenv, { config } from "dotenv";
dotenv.config();
export const signup = async (req, res) => {
  try {
    const user = await authService.createUser(req.body);
    res.status(200).json({
      data: user,
      message: "SignUp Successfully.....!",
    });
  } catch (error) {
    res.status(404).json({
      error: error.message,
      message: "Error to SignUp .....!",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUser = await authService.findUser(email);
    if (!checkUser) {
      throw new Error("User not found.");
    }

    const isMatch = bcrypt.compareSync(password, checkUser.password);
    if (!isMatch) {
      throw new Error("Incorrect password.");
    }

    const token = await authService.createToken(checkUser);

    res.status(200).json({
      token,
      user: {
        id: checkUser.id,
        name: checkUser.name,
        email: checkUser.email,
      },
      message: "Login successful.",
    });
  } catch (error) {
    res.status(401).json({
      message: error.message || "Login failed",
    });
  }
};

export const forgotPassword = async (req, res) => {
  const email = req.body.email;
  try {
    const checkUser = await authService.findUser(email);
    if (checkUser) {
      const randomString = authService.createRandomString();
      const token = await authService.createTokenForForgotPass(
        email,
        randomString
      );
      sendmail(checkUser.name, checkUser.email, randomString);
    } else {
      throw new Error("User Not Found.....!");
    }
    res.status(200).json({
      data: {},
      message: "Please check your inbox to reset your password......!",
    });
  } catch (error) {
    res.status(404).json({
      error: error.message,
      message: "Error to ForGot Password .....!",
    });
  }
};

export const sendmail = async (name, email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAILUSER,
        pass: process.env.MAILPASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.MAILUSER,
      to: email,
      subject: "Reset your password",
      html: `<p>Hi ${name},</p>
             <p>Please <a href="http://localhost:5000/auth/reset-password?token=${token}">click here</a> to reset your password.</p>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(" Email sent:", info.response);
  } catch (err) {
    console.error(" Email sending failed:", err);
    throw err;
  }
};

export const resetPassword = async (req, res) => {
  try {
    const token = req.query.token;
    if (!token) {
      return res.status(400).json({ message: "Token is required in query." });
    }

    const user = await authService.checktoken(token);
    if (!user) {
      throw new Error("Token not matched or expired.");
    }

    const { password } = req.body;
    if (!password) {
      return res.status(400).json({ message: "Password is required." });
    }

    const hashed = await authService.hashPass(password);

    user.password = hashed;
    user.token = null;
    await user.save();

    const { id, name, email, updatedAt } = user;
    res.status(200).json({
      message: "Password reset successful.",
      user: { id, name, email, updatedAt },
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      message: "Error resetting password.",
    });
  }
};
  