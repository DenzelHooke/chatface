import { Response } from "express";
import expressAsyncHandler from "express-async-handler";
import UserModel from "../models/UserModel";
import RoomModel from "../models/RoomModel";

import { hasNoFriendRequests } from "../helpers/helpers";
import { Token } from "../types/types";
import { RequestModifed } from "../types/types";

interface AddFriendDto {
  id: string;
}

export const addFriend = expressAsyncHandler(
  async (req: RequestModifed, res: Response) => {
    try {
      const data: AddFriendDto = req.body;
      const senderToken = req.cookies.token;
      const recipientID = data.id;
      const token: Token = req.token;
      const senderID = token.user;

      // Raise error if token has been modified
      if (!token) {
        throw new Error("Token is invalid");
      }

      // Raise error if recipient ID is missing
      if (!recipientID) {
        throw new Error("Recipient ID must be provided");
      }

      // Find recipient
      const recipient = await UserModel.findById(recipientID);
      const sender = await UserModel.findById(token.user);
      // Check if sender has already sent friend request to this user

      if (!sender) {
        throw new Error("Sender user model not found");
      }

      if (!recipient) {
        throw new Error("No user found that matches ID");
      }

      // Check if recipient has already received a request from sender
      if (!hasNoFriendRequests(recipient, sender)) {
        res
          .status(401)
          .json({ message: "Friend request already sent", duplicate: true });
        return;
      }
      // Push sender ID to friendRequests array
      recipient.friendRequests.push(token.user);

      // Push recipient id to show that sender sent friend request to recipient
      sender.friendRequestsSent.push(recipient.id);

      // Create room
      const roomID = recipientID + senderID;
      sender.rooms.push(roomID);
      recipient.rooms.push(roomID);

      // Save changes
      await recipient.save();
      await sender.save();

      const room = await RoomModel.create({
        roomID: roomID,
      });

      room.save();

      res.status(200).json({
        message: "Friend request sent",
        duplicate: false,
      });
    } catch (error) {
      console.error(error);
      throw new Error(
        "An unknown error occurred while attempting to add friend"
      );
    }
  }
);
