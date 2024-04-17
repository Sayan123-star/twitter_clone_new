import React, { useEffect } from 'react'
import Avatar from 'react-avatar'
import { useDispatch, useSelector } from 'react-redux'
import { getOtherUsers } from '../actions/user.action'
import { Link } from 'react-router-dom'
import'./feed.css'
import Loader from './Loader'

const RightBar = () => {
  const {error, othUser,loading}=useSelector((state)=>state.otherUser)
  const {islogged}=useSelector(state=>state.user)
  const dispatch = useDispatch()
  useEffect(()=>{
    // Getting the users other than the logged in user
    dispatch(getOtherUsers())
  },[dispatch])
  return (
    <>
    {islogged?(<div className='w-[20%]'>
      <div className="p-4">
        <h3 className=' text-decoration-underline'>All Users</h3>
        {loading?(<Loader/>):(
          <div>
          {/* mapping all the users with heir avatars */}
        { othUser && othUser.map((item,index)=>{
          return(
            <div key={item?._id} className="buttunout flex  ic justify-between">
          
            <div className=" d-flex">
            
              <div>
              {!item?.picture?(<Avatar className='ava' src={require("../Img/profile.jpg")} size="40"  round={true} />)
                :(<Avatar className='ava' src={`http://localhost:5000/uploads/${item?.picture}`} size="40"  round={true} />)
                }
              </div>
              <div className="ml-2">
                <h5 className=''>{item?.name}</h5>
                <p className="text-sm">@{item?.username}</p>
              </div>
              
            </div>
            <div className="buttunout1">
              <Link to={`/profile/${item?._id}`}>
              <button className=" px-4 bg-black text-white rounded-full">Profile</button></Link>
            </div>
          </div>
          )
          })
        }
        </div>
        )}
        
      </div>
    </div>):(<div className=' d-none'>
      <div className="p-4">
        <h3 className=' text-decoration-underline'>All Users</h3>
        
        <div>
          {/* mapping all the users with heir avatars */}
        { othUser && othUser.map((item,index)=>{
          return(
            <div key={item?._id} className="buttunout flex  ic justify-between">
          
            <div className=" d-flex">
            
              <div>
              {!item?.picture?(<Avatar className='ava' src={require("../Img/profile.jpg")} size="40"  round={true} />)
                :(<Avatar className='ava' src={`http://localhost:5000/uploads/${item?.picture}`} size="40"  round={true} />)
                }
              </div>
              <div className="ml-2">
                <h5 className=''>{item?.name}</h5>
                <p className="text-sm">@{item?.username}</p>
              </div>
              
            </div>
            <div className="buttunout1">
              <Link to={`/profile/${item?._id}`}>
              <button className=" px-4 bg-black text-white rounded-full">Profile</button></Link>
            </div>
          </div>
          )
          })
        }
        </div>
      </div>
    </div>)}
    </>
  )
}

export default RightBar
