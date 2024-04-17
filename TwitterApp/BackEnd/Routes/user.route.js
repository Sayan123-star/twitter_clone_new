// Getting the dependencies for user router
const express = require("express");
const { userRegister, userLogin, getProfile, otherProfile, followUser, unfollowUser, oneProfile, updateUser, userImage } = require("../Controller/user.controller");
const { isLogged } = require("../middleware/auth");
const upload = require("../middleware/imageUpload");
const router = express.Router();
// The different routes for controlling user related tasks
router.post("/register",userRegister);
router.post("/login",userLogin);
router.get("/profile/me",isLogged,getProfile)
router.get("/otherProfile",isLogged,otherProfile)
router.put("/updateProfile",isLogged,updateUser)
router.put("/updateProfileImage",isLogged,upload.single("picture"),userImage)
router.get("/oneProfile/:id",isLogged,oneProfile)
router.post("/follow/:id",isLogged,followUser)
router.post("/unfollow/:id",isLogged,unfollowUser)

module.exports=router; 