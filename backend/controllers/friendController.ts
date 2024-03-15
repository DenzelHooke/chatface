import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import UserModel from "../models/UserModel";
import Cookies from "cookies";
import { Jwt, verify } from "jsonwebtoken";

interface AddFriendDto {
  id: string;
}

const addFriend = expressAsyncHandler(async (req: Request, res: Response) => {
  const data: AddFriendDto = req.body;
  const Cookie = new Cookies(req, res);

  const c = Cookie.get("token");
  //   Check if recipient exists
  const userExists = UserModel.findById({ id: data.id });

  console.log("cookie: ", c);
  res.json({ message: data.id });
});

//! TODO MOVE OVER GET FRIENDS INTO THIS CONTROLLER

module.exports = { addFriend };
