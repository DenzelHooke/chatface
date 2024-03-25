import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import UserModel from "../models/UserModel";
import { RequestModifed } from "../types/types";

export const getChatData = expressAsyncHandler(
  async (req: Request, res: Response) => {}
);

export const initRoom = expressAsyncHandler(
  async (req: RequestModifed, res: Response) => {
    console.log(req.token);
    // const user = UserModel.findById();
  }
);
