import {Response, Request} from "express"

const register = (res: Response, req: Request) => {
    console.log(req)

    res.status(200).json({message: "Success!"})
}

module.exports = {
    register
}

