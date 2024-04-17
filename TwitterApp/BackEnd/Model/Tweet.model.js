const mongoose = require("mongoose");

const TweetSchema = mongoose.Schema({
    content:{
        type:String,
        required:true,
    },
    tweetby:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },
    userDetails:[],
    comments:[
        {
            content: String,
            commentedBy:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'User'
            },
            commentedAt: {
                type:Date,
                default:Date.now()},
                userDetails:{}
        }
    ],
    likes:[{ 
        type:mongoose.Schema.ObjectId,
        ref:"User"
    }],
    retweet:[{ 
        type:mongoose.Schema.ObjectId,
        ref:"User"
    }],
    image:{
        type:String,
    },
    // user:{
    //     type:mongoose.Schema.ObjectId,
    //     ref:"User",
    //     required:true
    // },
},{timestamps:true})

module.exports = mongoose.model("Tweet",TweetSchema)