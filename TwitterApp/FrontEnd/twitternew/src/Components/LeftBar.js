import React, { useEffect } from 'react'
import{ FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHome, faImage, faSignOut, faUser} from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LOGOUT_SUCCESS } from '../consants/user.consants'
import { toast } from 'react-toastify'
const LeftBar = () => {
  const dispatch = useDispatch()
  const {islogged}=useSelector(state=>state.user)
  const navigate = useNavigate();
  // controlling the log out funtionality
  const logoutHandle=()=>{
    navigate("/login")
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    dispatch({type:LOGOUT_SUCCESS})
    toast.success('Log out successfully')
  }
  return (
    <>
    {islogged?(<div className='w-[20%]'>
      <div>
        <div >
            {/* Left side bar */}
            <img width={50} src={require("../Img/twitter-logo.avif")} alt="Twitter Logo" />
        </div>
        <div>
            {/* Home ,profile and logout buttons */}
            <div className='flex items-center my-1 px-1  hover:bg-gray-200 hover:cursor-pointer rounded-full'>
                <div><FontAwesomeIcon icon={faHome} /></div>
                <Link className=' text-black text-decoration-none' to="/"><p className='font-bold mt-3 ml-2'>Home</p></Link>
            </div>
            <div className='flex items-center my-1 px-1 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
                <div><FontAwesomeIcon icon={faUser} /></div>
                <Link className=' text-black text-decoration-none' to="/profile"><p className='font-bold mt-3 ml-2'>Profile</p></Link>
            </div>
            <div onClick={logoutHandle} className='flex items-center my-1 px-1 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
                <div><FontAwesomeIcon icon={faSignOut} /></div>
                <p className=' text-black font-bold mt-3 ml-2'>Logout</p>
            </div>
        </div>
      </div>
    </div>):(<div className=' d-none'>
      <div>
        <div >
            {/* Left side bar */}
            <img width={50} src={require("../Img/twitter-logo.avif")} alt="Twitter Logo" />
        </div>
        <div>
            {/* Home ,profile and logout buttons */}
            <div className='flex items-center my-1 px-1  hover:bg-gray-200 hover:cursor-pointer rounded-full'>
                <div><FontAwesomeIcon icon={faHome} /></div>
                <Link className=' text-black text-decoration-none' to="/"><p className='font-bold mt-3 ml-2'>Home</p></Link>
            </div>
            <div className='flex items-center my-1 px-1 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
                <div><FontAwesomeIcon icon={faUser} /></div>
                <Link className=' text-black text-decoration-none' to="/profile"><p className='font-bold mt-3 ml-2'>Profile</p></Link>
            </div>
            <div onClick={logoutHandle} className='flex items-center my-1 px-1 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
                <div><FontAwesomeIcon icon={faSignOut} /></div>
                <p className=' text-black font-bold mt-3 ml-2'>Logout</p>
            </div>
        </div>
      </div>
    </div>)}
    </>
    
  )
}

export default LeftBar
