const jwt = require('jsonwebtoken');

module.exports = function (req,res,next) {
     try{
        let token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(JSON.parse(token), process.env.JWT_SECRET);
        req.body.userid = decoded._id
        next();
     }
     catch(error){
        res.send({
            message: error.message,
            success: false,
        })
     }
}