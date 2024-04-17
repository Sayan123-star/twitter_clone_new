import React, { useEffect } from 'react'
import LeftBar from './LeftBar'
import Feed from './Feed'
import RightBar from './RightBar'
import { useDispatch, useSelector } from 'react-redux'
import { getTweets } from '../actions/tweet.action'
import { useNavigate } from 'react-router-dom';

const Home = () => {

  return (
    <div className='flex justify-between w-[80%] mx-auto'>
      <Feed/>
    </div>
  )
}

export default Home
