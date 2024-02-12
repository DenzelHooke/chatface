import { Request, Response, NextFunction } from "express"

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const status_code = res.statusCode ? res.statusCode : 500
    
    res.status(status_code)
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === "development" ? err.stack : null
    })
}


module.exports = {
    errorHandler
}