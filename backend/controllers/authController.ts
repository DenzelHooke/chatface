import userModel from "../models/UserModel";
import { IUser } from "../models/UserModel";
import { accountCreationSuccessMessage } from "../helpers/helpers";

const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const saltRounds = 10;

import { Response, Request } from "express";

// @desc Register User
// @route POST /api/auth/register/
// @access PUBLIC
const register = asyncHandler(async (req: Request, res: any) => {
  console.log(req.body);
  const { username, email, password1, password2 } = req.body;

  if (!username || !password1 || !password2 || !email) {
    throw new Error("Mising body data!");
  }

  const usernameExists = await userModel.findOne<IUser>({
    username,
  });

  if (usernameExists) {
    throw new Error("User with that username already exists");
  }

  const emailExists = await userModel.findOne<IUser>({
    email: email,
  });

  if (emailExists) {
    throw new Error("Account with that email already exists");
  }

  const salt = bcrypt.genSalt(saltRounds);
  // Wait for password to hash
  // Uses blowfish cipher, slightly slower but much more secure than other algs
  const hashedPass = await bcrypt.hash(password1, salt);
  let newUser;

  try {
    newUser = await userModel.create({
      username: username,
      email: email,
      password: hashedPass,
    });
  } catch (error) {
    throw new Error("Invalid user data");
  }

  res.status(201).json({
    message: accountCreationSuccessMessage(),
  });
});

module.exports = {
  register,
};
