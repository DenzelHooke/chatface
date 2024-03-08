import userModel from "../models/UserModel";
import { IUser } from "../models/UserModel";
import Cookies from "cookies";
const jwt = require("jsonwebtoken");

import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";

// @desc Return all friends for this user
// @route POST /api/user/friends/?all*
// @access PRIVATE
const getFriends = expressAsyncHandler(async (req: Request, res: Response) => {
  res.json({ message: "Get friends hit!" });
});

const addFriend = expressAsyncHandler(async (req: Request, res: Response) => {
  res.json({ message: "Add Friend Hit!" });
});

module.exports = { getFriends, addFriend };
