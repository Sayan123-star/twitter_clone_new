// Getting the dependencies
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv");
const userModel = require("../Model/user.model");
dotenv.config()

const isLogged = async(req,res,next)=>{
    // Getting the authorization headers
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(401).json({error:"User is not logged in",success:false})
    }
    // After getting the headers replace with a token and Bearer 
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token,process.env.JWT_TOKEN,(error,payload)=>{
        if(error){
            return res.status(401).json({error,success:false})
        }
        const {_id}= payload;
        userModel.findById(_id)
        .then((logUser)=>{
            req.user=logUser;
            next();
        })
    })

}
module.exports={isLogged}