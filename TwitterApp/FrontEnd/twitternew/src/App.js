//  Importing all the dependencies
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LeftBar from './Components/LeftBar';
import Feed from './Components/Feed';
import RightBar from './Components/RightBar';
import Profile from './Components/Profile.js';
import Login from './Components/Login.js';
import Register from './Components/Register.js';
import TweetView from './Components/TweetView.js';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getuser } from './actions/user.action.js';
import OtherProfile from "./Components/OtherProfile.js"
import { getTweets } from './actions/tweet.action.js';

function App() {
  const {user,islogged}=useSelector((state)=>state.user)
  const dispatch=useDispatch(); 
  // the useEffect will get the user and tweets even after reloding
  useEffect(()=>{
    dispatch(getuser())
 },[dispatch])
  useEffect(()=>{
    dispatch(getTweets())
  },[dispatch])
 
  return (
    <div className="App">
      <BrowserRouter>
      {/* creating all the routes  for different pages */}
      <div className='main flex justify-between w-[80%] mx-auto'>
      <LeftBar/>
      <Routes>
        <Route path="/login" Component={Login}/>
      </Routes>
      <Routes>
        <Route path="/signup" Component={Register}/>
      </Routes>
      <Routes>
        <Route path="/" Component={Feed}/>
        <Route path="/profile" Component={Profile}/>
        
      </Routes>
      <Routes>
      <Route path="/profile/:id" Component={OtherProfile}/>
      <Route path="/tweetview/:id" Component={TweetView}/>
      </Routes>
      <RightBar/>
    </div>
    </BrowserRouter>
    {/* toast view */}
    <ToastContainer/>
    </div>

  );
}

export default App;
