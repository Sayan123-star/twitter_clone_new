import { UserRedeucer, oneUserReducer, otherUsersReducer, profileReducer } from "./reducers/user.reducer";
import { TweetReducer, delUpTweetReducer, newTweetReducer, oneTweetReducer } from "./reducers/tweet.reducer";
import { combineReducers } from "redux";

export const combineReducer = combineReducers({
    user:UserRedeucer,
    otherUser: otherUsersReducer,
    userDetail: oneUserReducer,
    tweetView: TweetReducer,
    tweetCreate: newTweetReducer,
    tweetDelete: delUpTweetReducer,
    profileUpdate:profileReducer,
    oneTweet:oneTweetReducer,
})