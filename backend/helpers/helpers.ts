import userModel from "../models/UserModel";
import roomModel from "../models/RoomModel";
import { IRoom } from "../models/RoomModel";
import { IUser } from "../models/UserModel";
import jwt from "jsonwebtoken";
import { RequestModifed, Token } from "../types/types";

export const accountCreationSuccessMessage = () => {
  return "Account created successfully";
};

export const hasNoFriendRequests = (recipient: IUser, sender: IUser) => {
  let isValid = true;

  if (!sender.friendRequestsSent) {
    return true;
  }

  sender.friendRequestsSent.forEach((id) => {
    // If recipient already has a request from user
    if (id === recipient.id) {
      isValid = false;
    }
  });

  return isValid;
};

export const verifyJwt = (token: string) => {
  const verified: Token = jwt.verify(
    token,
    process.env.JWT_SECRET as string
  ) as Token;

  if (!verified) {
    return false;
  }

  return verified;
};

export const findRoom = async (token1: string, token2: string) => {
  const regex = new RegExp(`(?=.*${token1})(?=.*${token2})`);
  return await roomModel.findOne({ roomID: regex });
};

export const findUser = async (id: string) => {
  console.log("id: ", id);
  return await userModel.findOne({ _id: id });
};
