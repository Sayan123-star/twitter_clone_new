
// import axios from "axios"

import axios from "axios";
import { API_URL_POINT } from "../config";
import { toast } from 'react-toastify';
import { CLEAR_ERRORS, CREATE_TWEET_FAIL, CREATE_TWEET_REQUEST, CREATE_TWEET_RESET, CREATE_TWEET_SUCCESS, DELETE_TWEET_FAIL, DELETE_TWEET_REQUEST, DELETE_TWEET_RESET, DELETE_TWEET_SUCCESS, GET_ONE_TWEET_FAIL, GET_ONE_TWEET_REQUEST, GET_ONE_TWEET_SUCCESS, GET_OTHER_TWEET_FAIL, GET_OTHER_TWEET_REQUEST, GET_OTHER_TWEET_SUCCESS, GET_TWEET_FAIL, GET_TWEET_REQUEST, GET_TWEET_SUCCESS, GET_USER_TWEET_FAIL, GET_USER_TWEET_REQUEST, GET_USER_TWEET_SUCCESS, UPDATE_TWEET_REQUEST, UPDATE_TWEET_SUCCESS } from "../consants/tweet.consants";

export const getTweets=()=>async(dispatch)=>{
    try {
        dispatch({type:GET_TWEET_REQUEST})
        const CONFIG_OB = {
            headers: { "Content-Type": "application/json",  Authorization : `Bearer ${localStorage.getItem('token')}` }
          }
          const {data}= await axios.get(`${API_URL_POINT}/api/v1/getallTweets`,CONFIG_OB)
          dispatch({type:GET_TWEET_SUCCESS,payload:data.allTweets})
    } catch (error) {
        dispatch({type:GET_TWEET_FAIL,payload: error.response.data.error})
    }
}
export const userTweets=()=>async(dispatch)=>{
    try {
        dispatch({type:GET_USER_TWEET_REQUEST})
        const CONFIG_OB = {
            headers: { "Content-Type": "application/json",  Authorization : `Bearer ${localStorage.getItem('token')}` }
          }
          const {data}= await axios.get(`${API_URL_POINT}/api/v1/getuserTweets`,CONFIG_OB)
          dispatch({type:GET_USER_TWEET_SUCCESS,payload:data.tweets})
    } catch (error) {
        dispatch({type:GET_USER_TWEET_FAIL,payload: error.response.data.error})
    }
}
export const otherTweets=(id)=>async(dispatch)=>{
    try {
        dispatch({type:GET_OTHER_TWEET_REQUEST})
        const CONFIG_OB = {
            headers: { "Content-Type": "application/json",  Authorization : `Bearer ${localStorage.getItem('token')}` }
          }
          const {data}= await axios.get(`${API_URL_POINT}/api/v1/otherTweets/${id}`,CONFIG_OB)
          dispatch({type:GET_OTHER_TWEET_SUCCESS,payload:data.tweets})
    } catch (error) {
        dispatch({type:GET_OTHER_TWEET_FAIL,payload: error.response.data.error})
    }
}
export const oneTweet=(id)=>async(dispatch)=>{
    try {
        dispatch({type:GET_ONE_TWEET_REQUEST})
        const CONFIG_OB = {
            headers: { "Content-Type": "application/json",  Authorization : `Bearer ${localStorage.getItem('token')}` }
          }
          const {data}= await axios.get(`${API_URL_POINT}/api/v1/oneTweet/${id}`,CONFIG_OB)
          dispatch({type: GET_ONE_TWEET_SUCCESS,payload:data})
    } catch (error) {
        dispatch({type:GET_ONE_TWEET_FAIL,payload: error.response.data.error})
    }
}
export const delTweets=(id)=>async(dispatch)=>{
    try {
        dispatch({type:DELETE_TWEET_REQUEST})
        const CONFIG_OB = {
            headers: { "Content-Type": "application/json",  Authorization : `Bearer ${localStorage.getItem('token')}` }
          }
          const {data}= await axios.delete(`${API_URL_POINT}/api/v1/deletetweet/${id}`,CONFIG_OB)
          dispatch({type:DELETE_TWEET_SUCCESS,payload:data})
          toast.success(data.message)
          dispatch(getTweets())
    } catch (error) {
        dispatch({type:DELETE_TWEET_FAIL,payload: error.response.data.error})
        toast.success(error);

    }
}

// Creating a new product
export const createTweets= (user)=> async (dispatch)=>{
    try {
        dispatch({type: CREATE_TWEET_REQUEST});
        const CONFIG_OB = {
            headers: {Authorization : `Bearer ${localStorage.getItem('token')}` } 
          }
          
    const {data}= await axios.post(`${API_URL_POINT}/api/v1/createtweet`,user,CONFIG_OB);
        dispatch({
            type: CREATE_TWEET_SUCCESS,
            payload: data,
        })
        dispatch({type:CREATE_TWEET_RESET}) 
    } catch (error) {
        dispatch({ 
            type: CREATE_TWEET_FAIL,
            payload: error.response.data.error,
        })
    }
}
export const commentNeHandle = (id,content)=>async(dispatch) => {

    try {
        dispatch({type:UPDATE_TWEET_REQUEST})
      const CONFIG_OB = {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem('token')}` }
      }
      const { data } = await axios.put(`${API_URL_POINT}/api/v1/comment`, {id,content}, CONFIG_OB)
      dispatch({ type: UPDATE_TWEET_SUCCESS, payload: data })
      if(data.success===true){
              toast.success(data.message)
              dispatch(getTweets())
      }
    } catch (error) {
      toast.error(error.response.data.error)
      console.log(error);
    }
  }

//Clear Errors
export const clearErrors= ()=> async (dispatch)=>{
    dispatch({ type:CLEAR_ERRORS })
}