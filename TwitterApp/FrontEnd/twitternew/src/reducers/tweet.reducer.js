import { CLEAR_ERRORS, CREATE_TWEET_FAIL, CREATE_TWEET_REQUEST, CREATE_TWEET_RESET, CREATE_TWEET_SUCCESS, DELETE_TWEET_FAIL, DELETE_TWEET_REQUEST, DELETE_TWEET_RESET, DELETE_TWEET_SUCCESS, GET_ONE_TWEET_FAIL, GET_ONE_TWEET_REQUEST, GET_ONE_TWEET_SUCCESS, GET_OTHER_TWEET_FAIL, GET_OTHER_TWEET_REQUEST, GET_OTHER_TWEET_SUCCESS, GET_TWEET_FAIL, GET_TWEET_REQUEST, GET_TWEET_SUCCESS, GET_USER_TWEET_FAIL, GET_USER_TWEET_REQUEST, GET_USER_TWEET_SUCCESS, UPDATE_TWEET_FAIL, UPDATE_TWEET_REQUEST, UPDATE_TWEET_RESET, UPDATE_TWEET_SUCCESS } from "../consants/tweet.consants"

export const TweetReducer=((state = {tweets:[]},action)=>{
    switch (action.type) {
        case GET_TWEET_REQUEST:
        case GET_USER_TWEET_REQUEST:
        case GET_OTHER_TWEET_REQUEST:
            return {
                loading:true,
                tweets:[]
            }
        case GET_TWEET_SUCCESS:
            case GET_USER_TWEET_SUCCESS:
            case GET_OTHER_TWEET_SUCCESS:
            return {
                loading: false,
                tweets: action.payload,
            }
        case GET_TWEET_FAIL:
        case GET_USER_TWEET_FAIL:
        case GET_OTHER_TWEET_FAIL:
            return{
                loading: false,
                error: action.payload,
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error: null
            }
        default:
            return state;
    }
})
export const oneTweetReducer=((state = {tweetOne:{}},action)=>{
    switch (action.type) {
        case GET_ONE_TWEET_REQUEST:
            return {
                loading:true,
            }
        case GET_ONE_TWEET_SUCCESS:
            return {
                loading: false,
                tweetOne: action.payload.oneTweet,
            }
        case GET_ONE_TWEET_FAIL:
            return{
                loading: false,
                error: action.payload,
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error: null
            }
        default:
            return state;
    }
})

// This reducer is use to create a new product from the front end
export const newTweetReducer=((state = {tweet:{}},action)=>{
    switch (action.type) {
        case CREATE_TWEET_REQUEST:
            return {
                ...state,
                loading:true,
                refresh:false
            }
        case CREATE_TWEET_SUCCESS: 
            return {
                loading: false,
                success:action.payload.success,
                tweet: action.payload.tweet,
                
            }
        case CREATE_TWEET_FAIL:
            return{
                ...state,
                loading: false,
                error: action.payload,
            }
        case CREATE_TWEET_RESET:
            return{
                refresh:!state.refresh
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error: null
            }
        default:
            return state;
    }
})

export const delUpTweetReducer=((state = {},action)=>{
    switch (action.type) {
        case UPDATE_TWEET_REQUEST:
        case DELETE_TWEET_REQUEST:
            return {
                ...state,
                loading:true,
            }
        case DELETE_TWEET_SUCCESS:
            return {
                loading: false,
                isDeleted: action.payload,
            }
        case UPDATE_TWEET_SUCCESS:
            return{
                loading: false,
                isUpdated: action.payload
            }
        case UPDATE_TWEET_FAIL:
        case DELETE_TWEET_FAIL:
            return{
                ...state,
                loading: false,
                error: action.payload,
            }
        case DELETE_TWEET_RESET:
            return{
                ...state,
                isDeleted:false
            }
        case UPDATE_TWEET_RESET:
            return{
                ...state,
                isUpdated: null,
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error: null
            }
        default:
            return state;
    }
})