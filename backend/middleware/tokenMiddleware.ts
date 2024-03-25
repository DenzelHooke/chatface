import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { RequestModifed, Token } from "../types/types";

export const verifyRequest = (
  req: RequestModifed,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("Verifying user: ", req.cookies);
    const codedToken = req.cookies.token;

    // Verify token
    const verified: Token = jwt.verify(
      codedToken,
      process.env.JWT_SECRET as string
    ) as Token;

    if (!verified) {
      throw new Error("Token provided is invalid");
    }

    // Pass request off to next function
    // Passes request off to next function/middleware
    req.token = verified;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
