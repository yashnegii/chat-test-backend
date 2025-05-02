import jwt from "jsonwebtoken"


export  function veifyToken (request, response, next) {
    try{
        let token = request.cookies.jwt;
        const decodedToken = jwt.verify(token, process.env.JWT_TOKEN)
        next()
    }catch{
        response.status(500).json({message: "unautharised user"})
    }
}


