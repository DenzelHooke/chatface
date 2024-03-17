import userModel from "../models/UserModel";
import { IUser } from "../models/UserModel";
import Cookies from "cookies";
import jwt from "jsonwebtoken";

import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";

// @desc Return all friends for this user
// @route POST /api/user/friends/?all*
// @access PRIVATE
const getFriends = expressAsyncHandler(async (req: Request, res: Response) => {
  res.json({ message: "Get friends hit!" });
});

const addFriend = expressAsyncHandler(
  async (req: Request, res: Response) => {}
);

const findFriends = expressAsyncHandler(async (req: Request, res: Response) => {
  try {
    const { username } = req.body;
    // ^ example: returns all results that *start* with "jo"

    const users = await userModel.find({
      username: { $regex: `^${username}`, $options: "i" },
    });

    if (users) {
      res.json({ result: users });
    }
  } catch (error) {
    throw new Error("An unknown error occured while searching for users.");
    console.log(error);
  }
});

module.exports = { getFriends, addFriend, findFriends };
