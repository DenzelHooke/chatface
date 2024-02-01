const asyncHandler = require("express-async-handler");

import { Response, Request } from "express"

const register = asyncHandler((res: any, req: Request) => {

    console.log(JSON.parse(req.body))
    // const { username, password } = req.body
        
    
    // if(!username || !password) {
    //     throw new Error("Hello")
    // }
})

module.exports = {
    register
}

