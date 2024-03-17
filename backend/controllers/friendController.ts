import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import UserModel from "../models/UserModel";
import jwt from "jsonwebtoken";

interface AddFriendDto {
  id: string;
}

interface Token {
  user: string;
  iat: number;
}

const addFriend = expressAsyncHandler(async (req: Request, res: Response) => {
  try {
    const data: AddFriendDto = req.body;
    const senderToken = req.cookies.token;
    const recipientID = data.id;

    // Verify if token is unmodified/valid
    const token: Token = jwt.verify(
      senderToken,
      process.env.JWT_SECRET as string
    ) as Token;

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

    if (!recipient) {
      throw new Error("No user found that matches ID");
    }

    // Initialize friendRequests array if it doesn't exist
    if (!recipient.friendRequests) {
      recipient.friendRequests = [];
    }

    // Push sender's user ID to friendRequests array
    recipient.friendRequests.push(token.user);

    // Save changes
    await recipient.save();

    res.status(200).json({
      message: "Friend request sent",
    });
  } catch (error) {
    console.error(error);
    throw new Error("An unknown error occurred while attempting to add friend");
  }
});

// Export the addFriend function
export { addFriend };
