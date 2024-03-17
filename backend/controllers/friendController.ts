import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import UserModel from "../models/UserModel";
import jwt from "jsonwebtoken";

interface AddFriendDto {
  id: string;
}

const addFriend = expressAsyncHandler(async (req: Request, res: Response) => {
  try {
    const data: AddFriendDto = req.body;
    const senderToken = req.cookies.token;
    const recipientID = data.id;

    // TODO CLEAN UP AND MAKE HELPER FUNCTIONS!

    // Verify if token is unmodified/valid
    const tokenIsValid = jwt.verify(
      senderToken,
      process.env.JWT_SECRET as string
    );

    console.log("token: ", tokenIsValid);
    console.log("Recipient ID: ", recipientID);

    // Raise error if token has been modified
    if (!tokenIsValid) {
      throw new Error("Token is invalid");
    }

    // Raise error if sender doesnt have ID cookie
    if (!recipientID) {
      throw new Error("Recipient ID must be provided");
    }

    // Find recipient
    const recipient = await UserModel.findById(recipientID);

    if (!recipient) {
      throw new Error("No user found that matches ID");
    }

    res.status(200).json({
      recipient: recipient,
    });
    // Set "friend requests" field with array of users
  } catch (error) {
    console.log(error);
    throw new Error("An unknown error occured while attempting to add friend");
  }
});

//! TODO MOVE OVER GET FRIENDS INTO THIS CONTROLLER

module.exports = { addFriend };
