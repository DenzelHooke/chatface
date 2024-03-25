import { Request } from "express";

export interface Token {
  // User represents ID
  user: string;
  iat: number;
}

export interface RequestModifed extends Request {
  token?: any;
}
