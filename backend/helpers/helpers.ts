import userModel from "../models/UserModel";
import roomModel from "../models/RoomModel";
import { IRoom } from "../models/RoomModel";
import { IUser } from "../models/UserModel";
import jwt from "jsonwebtoken";
import { Message, MessageData, RequestModifed, Token } from "../types/types";

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
  return await roomModel.findOne<IRoom>({ roomID: regex });
};

export const findUser = async (id: string) => {
  return await userModel.findOne({ _id: id });
};

export const saveMessage = async (
  message: MessageData,
  user: IUser,
  roomID: string
) => {
  try {
    const room = await roomModel.findOne<IRoom>({ roomID });

    if (!room) {
      throw new Error("Room ID not found while attempting to save message");
    }

    room.messages.push(
      createNewMessageObject(
        message.message,
        roomID,
        user._id.toString(),
        user.username
      )
    );

    room.save();
  } catch (error) {
    throw new Error(error as string);
  }
};

const createNewMessageObject = (
  message: string,
  roomID: string,
  userID: string,
  username: string
) => {
  return {
    message: message,
    roomID: roomID,
    userID: userID,
    username: username,
    timestamp: new Date(),
  } as Message;
};

export const getAllMessages = async (roomID: string) => {
  const room = await roomModel.findOne<IRoom>({ roomID });

  if (!room) {
    throw new Error("Room ID not found while attempting to save message");
  }

  return room.messages.map((item) => ({
    userID: item.userID,
    username: item.username,
    message: item.message,
  }));
};
