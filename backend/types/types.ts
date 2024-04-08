import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface Token {
  // User represents ID
  user: string;
  iat: number;
}

export interface RequestModifed extends Request {
  token?: any;
}

export interface Message {
  user: string;
  message: string;
  timestamp: string;
}
