// MIDDLEWARES to fetch payload and verify with signsture.

var jwt = require('jsonwebtoken');
const SECRET_SIGNATURE = 'ABCII78$%'

const fetchUser = (req, res, next)=>{
    const token = req.header('auth-token'); 
    if(!token){
        return res.status(401).json({error:"Unauthoprized access"});
    }

    try{
        const data = jwt.verify(token, SECRET_SIGNATURE); 
        req.user = data.user;
        next(); 
    }catch(e){
        return res.status(500).json({error: "Server Error"});
    }
}

module.exports = fetchUser; 