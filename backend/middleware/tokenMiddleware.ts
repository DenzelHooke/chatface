import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"


export const verifyRequest = (req: Request, res: Response, next: NextFunction) => {
    console.log("Verifying user: ", req.cookies)
    const codedToken = req.cookies.token

    // Verify token
    const verified = jwt.verify(codedToken, process.env.JWT_SECRET as string)


    if(!verified) {
        throw new Error("Token provided is invalid")
    }

    // Pass request off to next function
    // Passes request off to next function/middleware  
    next()
}