import { Request, Response } from "express";

// @desc Get test
// @route Get /api/users
// @access Public

const getTestUsers = (req: Request, res: any) => {
  return res.status(200).json({
    users: ["John Doe", "Jane Doe", "Harry Potter", "Master Chief"],
  });
};

export { getTestUsers };
