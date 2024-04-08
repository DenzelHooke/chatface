import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import UserModel from "../models/UserModel";
import { RequestModifed } from "../types/types";
import RoomModel from "../models/RoomModel";
import { io } from "../server";

export const getChatData = expressAsyncHandler(
  async (req: Request, res: Response) => {}
);

export const initRoom = expressAsyncHandler(
  async (req: RequestModifed, res: Response) => {
    console.log(req.body);

    console.log(req.token);
    // Connect each user to namespace/room

    // const user = UserModel.findById();
  }
);
