const Jwt = require('jsonwebtoken')

module.exports =  function (req, res, next){
        //Get Token From Request Header
        const token = req.header('auth-token')
        if(!token) return res.status(401).json({message : "Access Denied"})

        //Match Token With Our Secret Key
        try{
            const verified = Jwt.verify(token, process.env.TOKEN_SECRET)
            req.user = verified ;
            next()
        }catch(err){
                res.status(400).json({message : "Invalid Token"})
        }

}   