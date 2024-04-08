import UserModel from "../models/UserModel";
import { IUser } from "../models/UserModel";
import Cookies from "cookies";
import jwt from "jsonwebtoken";
import { hasNoFriendRequests } from "../helpers/helpers";
import e, { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { RequestModifed, Token } from "../types/types";
import { AcceptRequestDto } from "../dto/dto";

// @desc Return all friends for this user
// @route POST /api/user/friends/?all*
// @access PRIVATE
export const getFriends = expressAsyncHandler(
  async (req: RequestModifed, res: Response) => {
    try {
      const token: Token = req.token;

      const user = await UserModel.findById(token.user);

      if (!user) {
        throw new Error("User not found with token");
      }

      const result = await Promise.all(
        user.friends.map(async (id: string) => {
          const user = await UserModel.findById(id);

          if (!user) {
            return;
          }

          return {
            username: user.username,
            profilePicture: user.profilePicture,
            _id: user.id,
          };
        })
      );

      res.status(200).json({
        result: result,
      });
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error(error as string);
    }
  }
);

export const getPendingFriendRequests = expressAsyncHandler(
  async (req: Request, res: Response) => {
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

      // .map immediatley returns the promise while it is pending, Promise.all returns an array of all RESOLVED promises once they are ready to resolve.
      const friendRequests = await Promise.all(
        user.friendRequests.map(async (id: string) => {
          const user = await UserModel.findById(id);

          if (!user) {
            return;
          }

          return {
            username: user.username,
            profilePicture: user.profilePicture,
            _id: user.id,
          };
        })
      );

      // .filter retudn all items that are not null values including "undefined".
      res.status(200).json({ result: friendRequests.filter(Boolean) });
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error(error as string);
    }
  }
);

export const findUsers = expressAsyncHandler(
  async (req: Request, res: Response) => {
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
      console.error(error);
      res.status(401);
      throw new Error(error as string);
    }
  }
);

export const getChat = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const token = jwt.decode(req.cookies.token);
  }
);

export const acceptFriendRequest = expressAsyncHandler(
  async (req: RequestModifed, res: Response) => {
    try {
      const token: Token = req.token;
      const data: AcceptRequestDto = req.body;
      const recipientID = data.id;

      // Raise error if recipient ID is missing
      if (!recipientID) {
        throw new Error("Recipient ID must be provided");
      }

      // Find recipient
      const recipient = await UserModel.findById(recipientID);
      const sender = await UserModel.findById(token.user);
      const senderID = sender?.id;
      // Check if sender has already sent friend request to this user

      if (!sender) {
        throw new Error("Sender user model not found");
      }

      if (!recipient) {
        throw new Error("No user found that matches ID");
      }

      // User who accepted the request
      sender.friendRequests = sender.friendRequests.filter(
        (id: string) => id != recipientID
      );

      // User who sent the request
      recipient.friendRequestsSent = recipient.friendRequestsSent.filter(
        (id: string) => id != senderID
      );

      // Create users as friends
      sender.friends.push(recipientID);
      recipient.friends.push(senderID);

      // Save changes
      await recipient.save();
      await sender.save();

      res.status(200).json({
        message: `You and ${recipient.username} are now friends!`,
      });
    } catch (error) {
      console.error(error);
      throw new Error(
        "An unknown error occurred while attempting to accept friend request"
      );
    }
  }
);

export const deleteFriend = expressAsyncHandler(
  async (req: RequestModifed, res: Response) => {
    try {
      console.log(req.params);
      const token: Token = req.token;
      const userID = token.user;
      const recipientID = req.params.id;
      const user = await UserModel.findById(userID);
      const recipient = await UserModel.findById(recipientID);

      if (!user) {
        throw new Error("User not found!");
      }

      if (!recipient) {
        throw new Error("Recipient not found!");
      }

      // Deletes recipient from user table
      user.friends = user?.friends.filter((id: string) => id != recipientID);

      // Deletes user from recipient table
      recipient.friends = recipient?.friends.filter(
        (id: string) => id != userID
      );

      user.rooms = user.rooms.filter(
        (roomID: string) => !roomID.split(recipientID)
      );

      recipient.rooms = recipient.rooms.filter(
        (roomID: string) => !roomID.split(userID)
      );

      await user.save();
      await recipient.save();

      res.status(201).json({ message: "Friend removed" });
    } catch (error) {
      throw new Error("Something went wrong while attempting to delete friend");
    }
  }
);
