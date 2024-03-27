import userModel from "../models/UserModel";
import { IUser } from "../models/UserModel";
import { accountCreationSuccessMessage } from "../helpers/helpers";
const jwt = require("jsonwebtoken");
import Cookies from "cookies";

const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const saltRounds = 10;

import { Response, Request } from "express";

// @desc Register User
// @route POST /api/auth/register/
// @access PUBLIC
const register = asyncHandler(async (req: Request, res: any) => {
  const { username, email, password1, password2 } = req.body;

  if (!username || !password1 || !password2 || !email) {
    res.status(401);
    throw new Error("Mising body data!");
  }

  if (password1 != password2) {
    throw new Error("Passwords do not match");
  }

  const usernameExists = await userModel.findOne<IUser>({
    username,
  });

  if (usernameExists) {
    res.status(401);
    throw new Error("User with that username already exists");
  }

  const emailExists = await userModel.findOne<IUser>({
    email: email,
  });

  if (emailExists) {
    res.status(401);
    throw new Error("Account with that email already exists");
  }

  // Wait for password to hash
  // Uses blowfish cipher, slightly slower but much more secure than other algs
  const salt = await bcrypt.genSalt(saltRounds);

  // Hash password with salt
  const hashedPass = await bcrypt.hash(password1, salt);

  let newUser: any;

  try {
    newUser = await userModel.create({
      username: username,
      email: email,
      password: hashedPass,
      profilePicture:
        "https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=600&h=450&dpr=1",
    });
  } catch (error) {
    console.error(error);
    res.status(401);
    throw new Error(error as string);
  }

  res.status(201).json({
    message: accountCreationSuccessMessage(),
  });
});

const login = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const cookie = new Cookies(req, res);

    // If either field isnt included, reject user
    if (!username || !password) {
      res.status(401);
      throw new Error("Username and password required.");
    }

    // Check if user exists
    const exists = await userModel.findOne<IUser>({
      username: { $regex: new RegExp(`^${username}$`, "i") },
    });

    // If not account, reject user
    if (!exists) {
      res.status(401);
      throw new Error(
        "The email address you entered is not associated with any account."
      );
    }

    // Validate password

    const passwordValid = await bcrypt.compare(password, exists.password);

    if (passwordValid === false) {
      res.status(401);
      throw new Error(
        "The provided credentials are incorrect. Please try again."
      );
    }

    // Generate jwt
    const token = await jwt.sign(
      {
        user: exists.id,
      },
      process.env.JWT_SECRET as string
    );

    res.cookie("token", token);

    res.status(200).json({ message: "Hello World" });
  } catch (error) {
    console.error(error);
    res.status(401);
    throw new Error(error as string);
  }
});

module.exports = {
  register,
  login,
};
