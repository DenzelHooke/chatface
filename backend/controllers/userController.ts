import UserModel from "../models/UserModel";
import { IUser } from "../models/UserModel";
import Cookies from "cookies";
import jwt from "jsonwebtoken";
import { hasNoFriendRequests } from "../helpers/helpers";
import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { Token } from "../types/types";

// @desc Return all friends for this user
// @route POST /api/user/friends/?all*
// @access PRIVATE
const getFriends = expressAsyncHandler(async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;

    const decodedToken: Token = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as Token;

    const user = await UserModel.findById(decodedToken.user);

    if (!user) {
      throw new Error("User not found with token");
    }

    res.status(200).json({
      result: user.friends.map(async (id: string) => {
        const user = await UserModel.findById(id);

        if (!user) {
          throw new Error("Couldn't find user by ID while creating map");
        }

        return {
          username: user.username,
          profilePicture: user.profilePicture,
          _id: user.id,
        };
      }),
    });
  } catch (error) {
    console.log(error);
    throw new Error("An unknown error occured while grabbing friend data");
  }

  res.json({ message: "Get friends hit!" });
});

const getPendingFriendRequests = expressAsyncHandler(async () => {});

const findUsers = expressAsyncHandler(async (req: Request, res: Response) => {
  try {
    const { username } = req.body;
    const senderToken = req.cookies.token;
    // ^ example: returns all results that *start* with "jo"

    //! CREATE MIDDLEWARE FOR TOKEN VALIDATION
    // Verify if token is unmodified/valid
    const token: Token = jwt.verify(
      senderToken,
      process.env.JWT_SECRET as string
    ) as Token;

    // Raise error if token has been modified
    if (!token) {
      throw new Error("Token is invalid");
    }

    const sender = await UserModel.findById(token.user);

    const users = await UserModel.find({
      username: { $regex: `^${username}`, $options: "i" },
    });

    if (!users) {
      res.status(200).json([]);
    }

    if (!sender) {
      throw new Error("Sender ID not found");
    }

    // Returns formatted array that contains whether the sender has sent requests to these users or not.
    const parsedUsers = users.map((recipient) => {
      return {
        username: recipient.username,
        sentFriendRequest: hasNoFriendRequests(recipient, sender),
        _id: recipient.id,
      };
    });

    if (parsedUsers) {
      res.status(200).json({ result: parsedUsers });
    }
  } catch (error) {
    console.log(error);
    throw new Error("An unknown error occured while searching for users.");
  }
});

module.exports = { getFriends, findUsers };
