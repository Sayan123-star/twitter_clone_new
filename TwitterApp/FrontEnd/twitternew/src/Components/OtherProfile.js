import React, { useEffect, useState } from 'react'
import Avatar from 'react-avatar'
import { Button, Form, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import "./profile.css"
import { useNavigate, useParams } from 'react-router-dom'
import { followUser, getOneUser, getuser, unfollowUser } from '../actions/user.action'
import { otherTweets } from '../actions/tweet.action'
import TweetPage from './demo'
import { toast } from 'react-toastify';
import { FOLLOW_USER_RESET, UNFOLLOW_USER_RESET } from '../consants/user.consants'
import { API_URL_POINT } from '../config'
import Loader from './Loader'

const OtherProfile = () => {
  const { loading,user, islogged } = useSelector((state) => state.user)
  const { tweets } = useSelector((state) => state.tweetView)
  const dispatch = useDispatch()
  const params = useParams();
  const { userdetail, isFollow, isUnfollow } = useSelector((state) => state.userDetail);
  // Getting the user details by user Id using paramter
  useEffect(() => {
    dispatch(getOneUser(params.id))
    dispatch(otherTweets(params.id))
  }, [dispatch, params.id])
  // handling the follow and unfollow
  const followUnfollowHandle = () => {
    if (user?.following.includes(params.id)) {
      dispatch(unfollowUser(params.id, user))
    } else {
      dispatch(followUser(params.id, user))
    }
  }
  // use effects  for showing a message after following or unfollowing
  useEffect(() => {
    if (isFollow) {
      toast.success(`${user?.username} followed ${userdetail?.username}`)
      dispatch(getuser())
    }
    dispatch({ type: FOLLOW_USER_RESET })
  }, [dispatch, isFollow])
  useEffect(() => {
    if (isUnfollow) {
      toast.success(`${user?.username} unfollowed ${userdetail?.username}`)
      dispatch(getuser())
    }
    dispatch({ type: UNFOLLOW_USER_RESET })
  }, [dispatch, isUnfollow])

  return (
    <>
    {loading?(<Loader/>):(
      <div className='main w-[50%]  border border-gray-200'>
      <div className="curor-pointer">
        <h1 className="font-bold text-lg px-2 py-2">Profile</h1>
      </div>
      <img className='ava' src={require("../Img/Bokeh-twitter-header-banner.jpg")} alt='Banner' />
      <div className="position-absolute ms-2 img" >
        {!userdetail?.picture ? (<Avatar className='ava' src={require("../Img/profile.jpg")} size="90" round={true} />)
          : (<Avatar className='ava' src={`${API_URL_POINT}uploads/${userdetail?.picture}`} size="90" round={true} />)
        }
      </div>
      <div className=' float-end d-flex'>

        <div className="text-right m-2">
          {user?._id !== userdetail?._id ? (<button className='btn btn-outline-secondary ' onClick={followUnfollowHandle}>
            {user?.following.includes(params.id) ? ("Following") : ("Follow")}
          </button>) : ("")}
        </div></div>
      <div className=" ms-2 mt-5">
        <h5>{userdetail?.name}</h5>
        <p>@{userdetail?.username}</p></div>
      <div className='m-3'>
        <p>Creating an Social Media website and also created projects like frontend
          e-commerce project and React e-commerce project</p>
      </div>

      {tweets && tweets?.map((tweet) => tweet?.tweetby.includes(params.id) ?
        <TweetPage key={tweet?._id} tweet={tweet} /> : "")}
    </div>
    )}
    </>
  )
}

export default OtherProfile
