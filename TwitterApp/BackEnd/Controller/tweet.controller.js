const tweetModel = require("../Model/Tweet.model");
const userModel = require("../Model/user.model");
// Tweet creation
const createTweet = async(req,res)=>{
    const {content}=req.body
    req.body.tweetby=req.user._id;
    let image=req.file
    // if req.file is undefined no image
    req.file!==undefined? image = req.file.path:image=''
    const path = image.split('\\')[1];
    if(!content){
        return res.status(401).json({error:"Please fill the necessary fields",success:false})
    }
    const user = await userModel.findById(req.user._id).select("-password")
    const tweet = await tweetModel.create({content,tweetby:req.user._id,userDetails:user,image:path})
    try {
        res.status(201).json({message:"Tweet Created Successfully",success:true,tweet})
    } catch (error) {
        console.log(error);
    }
}
// Tweet delete controller
const deleteTweet = async(req,res)=>{
    try {
        const tweet = await tweetModel.findById(req.params.id)
        if(!tweet){
            return res.status(401).json({error:"No Tweet found",success:false})
        }
        await tweet.deleteOne();
        res.status(201).json({message:"Tweet deleted Successfully",success:true})
    } catch (error) {
        console.log(error);
    }
}
// Like Dislike controller
const likeDislike = async(req,res)=>{
    try {
    const userId = req.user._id;
    const tweetId = req.params.id;
    const tweet = await tweetModel.findById(tweetId)
    // If user Id exist pulling out from likes array
    if(tweet.likes.includes(userId)){
        await tweetModel.findByIdAndUpdate(tweetId,{$pull:{likes:userId}})
        return res.status(200).json({message:"User disliked the Tweet"})
    }
    // Else pushing userId in likes array
    else{
        await tweetModel.findByIdAndUpdate(tweetId,{$push:{likes:userId}})
        return res.status(200).json({message:"User liked the tweet"})
    }
    } catch (error) {
     console.log(error);   
    }
}
// Retweet controller
const retweet = async(req,res)=>{
    try {
    const userId = req.user._id;
    const tweetId = req.params.id;
    const tweet = await tweetModel.findById(tweetId)
    if(tweet.retweet.includes(userId)){
        await tweetModel.findByIdAndUpdate(tweetId,{$pull:{retweet:userId}})
        return res.status(200).json({message:"User removed retweet the Tweet"})
    }
    else{
        await tweetModel.findByIdAndUpdate(tweetId,{$push:{retweet:userId}})
        return res.status(200).json({message:"User retweeted the tweet"})
    }
    } catch (error) {
     console.log(error);   
    }
}
// Adding comments in the tweet by the content and user id
const commentTweet = async(req,res)=>{
    try {
    const comment={content:req.body.content,commentedBy:req.user._id}
      await tweetModel.findByIdAndUpdate(req.body.id,{$push:{comments:comment}}).populate("comments.commentedBy","_id username")
        return res.status(200).json({message:"User commented the tweet",success:true})
    
    } catch (error) {
     console.log(error);   
    }
}
// Getting all the tweets
const getTweets= async(req,res)=>{
    try {
        const allTweets = await tweetModel.find().populate("comments.commentedBy","_id name username picture")
        return res.status(201).json({allTweets})
    } catch (error) {
        console.log(error);
    }
}
// Getting all the tweets of the user
const userTweets= async(req,res)=>{
    try {
        const id = req.user._id;
        const loggedUser = await userModel.findById(id);
        const loggedUserTweets = await tweetModel.find({tweetby:id})
        
        return res.status(201).json({tweets:loggedUserTweets})
    } catch (error) {
        console.log(error);
    }
}
// Getting all the tweets of the other user by their id
const otherTweets= async(req,res)=>{
    try {
        const id = req.params.id;
        const otherUser = await userModel.findById(id);
        const otherUserTweets = await tweetModel.find({tweetby:id})
        
        return res.status(201).json({tweets:otherUserTweets})
    } catch (error) {
        console.log(error);
    }
}
// Getting one tweet by its details
const oneTweets= async(req,res)=>{
    try {
        const id = req.params.id;
        const oneTweet = await tweetModel.findById({_id:id}).populate("tweetby","_id name, username picture")
        .populate("comments.commentedBy","_id name, username picture").populate("retweet","_id name, username picture")
        
        return res.status(201).json({oneTweet})
    } catch (error) {
        console.log(error);
    }
}
module.exports = {createTweet,deleteTweet,likeDislike,getTweets,userTweets,otherTweets,commentTweet,retweet,oneTweets};