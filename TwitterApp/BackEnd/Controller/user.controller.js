// Getting the dependencies
const userModel = require("../Model/user.model");
const bcrypt = require("bcrypt") 
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()
// User Register
const userRegister = async(req,res)=>{
    const {name,username,email,password}=req.body;
    try {
        if(!name || !username || !email || !password){
           return res.status(401).json({error:"All these fields are required",success:false})
        }
        const user_email = await userModel.findOne({email});
        const user_user = await userModel.findOne({username});
        if(user_email||user_user){
            return res.status(401).json({error:"User already exists.",success:false}); 
        }
        // implementing bcrypt js to encrypt the password
        const hash = await bcrypt.hash(password,12);
        const registerUser = await userModel.create({
            name,username,email,password:hash
        })
        return res.status(201).json({message:"Account Created Successfully",success:true,registerUser})
    } catch (error) {
        console.log(error);   
    }
}
// User Login
const userLogin = async(req,res)=>{
    const {email,password}= req.body; 
    if(!email|| !password){
        return res.status(401).json({error:"Please enter mandatory details",success: false})
    }
    const user = await userModel.findOne({email});
    if(!user){
        return res.status(401).json({error:"User Doesnot exist",success:false})
    }
    // Comparing the passwords, inserted in login and the password in the databse for the selected email
    const validatePass = await bcrypt.compare(password,user.password);
    if(!validatePass){
        return res.status(401).json({error:"Password is invalid",success:false})
    }
    // generating the token
    const token = await jwt.sign({_id:user._id}, process.env.JWT_TOKEN)
    
    return res.status(201).json({token:token,user,message:"User Logged In Successfully",success:true})
}
// Getting profile of the user
const getProfile = async(req,res)=>{
    try {
        const id= req.user._id;
        const user = await userModel.findById(id).select("-password")
        return res.status(200).json({user})
    } catch (error) {
        console.log(error);
    }
}
// Getting profile of the other users
const otherProfile = async(req,res)=>{
    try {
        const id=req.user._id;
        const othUser = await userModel.find({_id:{$ne:id}}).select("-password")
        if(!othUser){
            return res.status(401).json({error:"No user found by the id"})
        }
        return res.status(201).json({othUser})
    } catch (error) {
        console.log(error);
    }
}
// Getting profile details of each user
const oneProfile = async(req,res)=>{
    try {
        const id=req.params.id;
        const oneUser = await userModel.findById(id).select("-password")
        if(!oneUser){
            return res.status(401).json({error:"No user found by the id"})
        }
        return res.status(201).json({oneUser})
    } catch (error) {
        console.log(error);
    }
}
// Following other users
const followUser = async(req,res)=>{
    try {
        const loggedId = req.user._id;
        const userId = req.params.id;
        const loggedUser = await userModel.findById(loggedId);
        const user = await userModel.findById(userId);
        if(!user.followers.includes(loggedId)){
            await user.updateOne({$push:{followers:loggedId}})
            await loggedUser.updateOne({$push:{following:userId}})
        }else{
            return res.status(400).json({error:`User already follows ${user.name}`})
        }
        return res.status(200).json({message:`${loggedUser.name} has successfully followed ${user.name}`})
    } catch (error) {
        console.log(error);
    }
}
// Unfollowing other users
const unfollowUser = async(req,res)=>{
    try {
        const userId = req.params.id;
        const loggedUser = await userModel.findById(req.user._id);
        const user = await userModel.findById(userId);
        if(loggedUser.following.includes(userId)){
            await loggedUser.updateOne({$pull:{following:userId}})
            await user.updateOne({$pull:{followers:req.user._id}})
        }else{ 
            return res.status(400).json({error:"User has not followed"})
        }
        return res.status(200).json({message:`${loggedUser.name} has unfollowed ${user.name}`})
    } catch (error) {
        console.log(error);
    }
}

// Update user details
const updateUser = async(req,res)=>{
    const newUserData={
        name: req.body.name,
        location: req.body.location,
        dob: req.body.dob}
    const user = await userModel.findByIdAndUpdate(req.user._id, newUserData)
    
    res.status(200).json({message:"User updated successfully",success:true})
}
// Updating user by uploading image
const userImage = async(req,res)=>{
    const picture = req.file.path;
    const path = picture.split('\\')[1];
    const user = await userModel.findByIdAndUpdate(req.user._id,{picture:path})
    
    res.status(200).json({message:"Image Uploaded successfully",success:true})
}
module.exports = {userRegister,userLogin,getProfile,otherProfile,followUser,unfollowUser,oneProfile,updateUser,userImage}