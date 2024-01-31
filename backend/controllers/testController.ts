import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

// @desc Get test
// @route Get /api/users
// @access Public

const getTestUsers = (req: Request, res: any) => {
  return res.status(200).json({
    users: ["John Doe", "Jane Doe", "Harry Potter", "Master Chief"],
  });
};



const getTest =  (req: Request, res: Response) => {
  // res.redirect('/')
  res.status(200).send("Hello")
}

export { getTestUsers, getTest };


