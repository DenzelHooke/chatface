import userModel from "../models/UserModel";

const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const saltRounds = 10;

import { Response, Request } from "express";

const register = asyncHandler((req: Request, res: any) => {
  console.log(req.body);
  const { username, password1, password2 } = req.body;

  if (!username || !password1 || !password2) {
    throw new Error("Mising body data!");
  }

  bcrypt.genSalt(saltRounds, function (err: any, salt: any) {
    bcrypt.hash(password1, salt, function (err: any, hash: any) {
      // Store hash in your password DB.
      console.log(hash);
    });
  });

  // console.log(JSON.parse(req.body));
  // const { username, password } = req.body
});

module.exports = {
  register,
};
