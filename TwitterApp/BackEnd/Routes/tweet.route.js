// Getting the dependencies for Tweet router
const express = require("express")
const { createTweet, deleteTweet, likeDislike, getTweets, userTweets, otherTweets, commentTweet, retweet, oneTweets } = require("../Controller/tweet.controller");
const { isLogged } = require("../middleware/auth");
const upload = require("../middleware/imageUpload");
const router = express.Router()
// The different routes for controlling Tweet related tasks
router.post("/createtweet",isLogged,upload.single("image"),createTweet)
router.delete("/deletetweet/:id",isLogged,deleteTweet)
router.put("/like/:id",isLogged,likeDislike)
router.put("/retweet/:id",isLogged,retweet)
router.put("/comment",isLogged,commentTweet)
router.get("/getallTweets",isLogged,getTweets)
router.get("/getuserTweets",isLogged,userTweets)
router.get("/otherTweets/:id",isLogged,otherTweets)
router.get("/oneTweet/:id",isLogged,oneTweets)

module.exports=router;