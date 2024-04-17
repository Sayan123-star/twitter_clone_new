
// import axios from "axios"

import axios from "axios";
import { API_URL_POINT } from "../config";
import { ALL_USER_FAIL, ALL_USER_REQUEST, ALL_USER_SUCCESS, CLEAR_ERRORS, FOLLOW_USER_FAIL, FOLLOW_USER_REQUEST, FOLLOW_USER_SUCCESS, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS, UNFOLLOW_USER_FAIL, UNFOLLOW_USER_REQUEST, UNFOLLOW_USER_SUCCESS, UPDATE_USER_FAIL, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS } from "../consants/user.consants";

export const register=(user)=> async(dispatch)=>{ 
    try {
        dispatch({type:REGISTER_REQUEST}) 
        const config = {headers:{"Content-Type": "application/json"}}
        const {data}= await axios.post(`${API_URL_POINT}/api/v1/register`,user,config)
        dispatch({type:REGISTER_SUCCESS,payload:data})
    } catch (error) {
        dispatch({type:REGISTER_FAIL,payload:error.response.data.error})
    } 
}
export const login=(email,password)=> async(dispatch)=>{ 
    try {
        dispatch({type:LOGIN_REQUEST}) 
        const config = {headers:{"Content-Type": "application/json"}}
        const {data}= await axios.post(`${API_URL_POINT}/api/v1/login`,{email,password},config)
        localStorage.setItem("token",data.token)
        localStorage.setItem("user",JSON.stringify(data.user))
        dispatch({type:LOGIN_SUCCESS,payload:data})
    } catch (error) {
        dispatch({type:LOGIN_FAIL,payload:error.response.data.error})
    }
}

export const getuser = ()=> async(dispatch)=>{

    try {
        dispatch({type:LOAD_USER_REQUEST});
        const CONFIG_OB = {
            headers: { "Content-Type": "application/json",  Authorization : `Bearer ${localStorage.getItem('token')}` }
          }
        const {data}= await axios.get(`${API_URL_POINT}/api/v1/profile/me`,CONFIG_OB);
        dispatch({type:LOAD_USER_SUCCESS, payload:data})

    } catch (error) {
        dispatch({type:LOAD_USER_FAIL, payload: error.response.data.error})
    }
}

export const getOtherUsers = ()=> async(dispatch)=>{
    try {
        const CONFIG_OB = {
            headers: { "Content-Type": "application/json",  Authorization : `Bearer ${localStorage.getItem('token')}` }
          }
          dispatch({type:ALL_USER_REQUEST});
        const {data}=await axios.get(`${API_URL_POINT}/api/v1/otherProfile`,CONFIG_OB);
        dispatch({type:ALL_USER_SUCCESS, payload: data.othUser})

    } catch (error) {
        dispatch({type:ALL_USER_FAIL, payload: error.response.data.error})
    }
}

export const getOneUser = (id)=> async(dispatch)=>{
    try {
        const CONFIG_OB = {
            headers: { "Content-Type": "application/json",  Authorization : `Bearer ${localStorage.getItem('token')}` }
          }
          dispatch({type:USER_DETAILS_REQUEST});
        const {data}=await axios.get(`${API_URL_POINT}/api/v1/oneProfile/${id}`,CONFIG_OB);
        dispatch({type:USER_DETAILS_SUCCESS, payload: data.oneUser})

    } catch (error) {
        dispatch({type:USER_DETAILS_FAIL, payload: error.response.data.error})
    }
}

export const followUser=(id,user)=>async(dispatch)=>{
    try {
        const CONFIG_OB = {
            headers: { "Content-Type": "application/json",  Authorization : `Bearer ${localStorage.getItem('token')}` }
          }
          dispatch({type:FOLLOW_USER_REQUEST});
        const {data}=await axios.post(`${API_URL_POINT}/api/v1/follow/${id}`,{id:user?._id},CONFIG_OB);
        dispatch({type:FOLLOW_USER_SUCCESS, payload: data})

    } catch (error) {
        dispatch({type:FOLLOW_USER_FAIL, payload: error.response.data.error})
    }
}
export const unfollowUser=(id,user)=>async(dispatch)=>{
    try {
        const CONFIG_OB = {
            headers: { "Content-Type": "application/json",  Authorization : `Bearer ${localStorage.getItem('token')}` }
          }
          dispatch({type:UNFOLLOW_USER_REQUEST});
        const {data}=await axios.post(`${API_URL_POINT}/api/v1/unfollow/${id}`,{id:user?._id},CONFIG_OB);
        dispatch({type:UNFOLLOW_USER_SUCCESS, payload: data})

    } catch (error) {
        dispatch({type:UNFOLLOW_USER_FAIL, payload: error.response.data.error})
    }
}
export const updateProfile=(name,location,dob)=>async(dispatch)=>{
    try {
        const CONFIG_OB = {
            headers: { "Content-Type": "application/json",  Authorization : `Bearer ${localStorage.getItem('token')}` }
          }
          dispatch({type:UPDATE_USER_REQUEST});
        const {data}=await axios.put(`${API_URL_POINT}/api/v1/updateProfile`,{name,location,dob},CONFIG_OB);
        dispatch({type:UPDATE_USER_SUCCESS, payload: data})

    } catch (error) {
        dispatch({type:UPDATE_USER_FAIL, payload: error.response.data.error})
    }
}
export const updateImage=(user)=>async(dispatch)=>{
    try {
        const CONFIG_OB = {
            headers: {Authorization : `Bearer ${localStorage.getItem('token')}` }
          }
          dispatch({type:UPDATE_USER_REQUEST});
        const {data}=await axios.put(`${API_URL_POINT}/api/v1/updateProfileImage`,user,CONFIG_OB);
        dispatch({type:UPDATE_USER_SUCCESS, payload: data})

    } catch (error) {
        dispatch({type:UPDATE_USER_FAIL, payload: error.response.data.error})
    }
}

//Clear Errors
export const clearErrors= ()=> async (dispatch)=>{
    dispatch({ type:CLEAR_ERRORS })
}