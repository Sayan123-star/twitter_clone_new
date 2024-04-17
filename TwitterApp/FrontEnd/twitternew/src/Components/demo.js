import React, { useEffect, useState } from 'react';
import Avatar from 'react-avatar';
import { Button, Form, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faRetweet } from '@fortawesome/free-solid-svg-icons'
import { faComment, faHeart, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { clearErrors, commentNeHandle, delTweets, getTweets } from '../actions/tweet.action';
import axios from 'axios';
import { API_URL_POINT } from '../config';
import { CREATE_TWEET_RESET, DELETE_TWEET_RESET, UPDATE_TWEET_RESET } from '../consants/tweet.consants';
import { toast } from 'react-toastify';

function TweetPage({ tweet }) {
  const { user, islogged } = useSelector((state) => state.user)
  const { isDeleted, error, isUpdated } = useSelector((state) => state.tweetDelete)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [edit, setEdit] = useState(false);
  const editClose = () => setEdit(false);
  const editShow = () => setEdit(true);
  // Like dislike handle api controller
  const likeDislikeHandle = async (id) => {
    try {
      const CONFIG_OB = {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem('token')}` }
      }
      const { data } = await axios.put(`${API_URL_POINT}/api/v1/like/${id}`, { userId: user?._id }, CONFIG_OB)
      toast.success(data.message)
      dispatch(getTweets())
      dispatch({ type: CREATE_TWEET_RESET })
    } catch (error) {
      toast.error(error.response.data.error)
      console.log(error);
    }
  }
  // Retweet api handle
  const retweetHandle = async (id) => {
    try {
      const CONFIG_OB = {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem('token')}` }
      }
      const { data } = await axios.put(`${API_URL_POINT}/api/v1/retweet/${id}`, { userId: user?._id }, CONFIG_OB)

      toast.success(data.message)
      dispatch(getTweets())
    } catch (error) {
      toast.error(error.response.data.error)
      console.log(error);
    }
  }
  const commentSubHandle = (e) => {
    e.preventDefault();
    dispatch(commentNeHandle(tweet?._id, text))
  }
  // use effect to update the data when component mounts
  useEffect(() => {
    if (error) {
      toast.error(error)
    }
    if (isUpdated) {
      dispatch({ type: UPDATE_TWEET_RESET })
    }
  }, [dispatch, error, isUpdated])
  const deleTweet = async (id) => {
    dispatch(delTweets(id))
  }
  // use effect to to check if the data is deleted or not
  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearErrors())
    }
    if (isDeleted) {
      dispatch({ type: DELETE_TWEET_RESET })
    }
  }, [dispatch, error, isDeleted])

  return (
    <>
      <div>
        <div>

          <div className='main1 border-bottom border-gray-200'>
            <div className='d-flex p-2'>

              {!tweet?.userDetails[0]?.picture ? (<Avatar className='ava' src={require("../Img/profile.jpg")} size="40" round={true} />)
                : (<Avatar className='ava' src={`${API_URL_POINT}uploads/${tweet?.userDetails[0]?.picture}`} size="40" round={true} />)
              }
              <div className=' ms-1 w-100'>
                <div className="d-flex align-items-center mt-3">
                  <p className=' position-absolute'><Link className='text-decoration-none' to={`/profile/${tweet?.userDetails[0]?._id}`}>@{tweet?.userDetails[0]?.username}</Link></p>
                </div>
                <Link className=' text-decoration-none text-black' to={`/tweetview/${tweet?._id}`}>
                  <div>
                    <p className=' ms-2'>{tweet?.content}</p>
                    {tweet?.image && <img src={`${API_URL_POINT}uploads/${tweet?.image}`} alt={tweet?._id} />}
                  </div>
                </Link>
                <div className='d-flex justify-content-between'>
                  <div className=' d-flex' >
                    <div onClick={() => likeDislikeHandle(tweet?._id)} className=' me-1 hover:bg-gray-200 cursor-pointer rounded-full'>
                      {tweet?.likes?.length == 0 ? (<FontAwesomeIcon style={{ height: "15px" }} icon={faHeart} />) :
                        (<FontAwesomeIcon style={{ height: "15px", color: "red" }} icon={faHeart} />)}</div>
                    <p >{tweet?.likes?.length}</p></div>
                  <div className=' d-flex '>
                    <div className=' me-1 hover:bg-gray-200 cursor-pointer rounded-full'>
                      <FontAwesomeIcon style={{ height: "15px" }} icon={faComment} onClick={editShow} /></div>
                    <p>{tweet?.comments?.length}</p></div>
                  <Modal show={edit} onHide={editClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={commentSubHandle}>
                      <Modal.Body>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                          <Form.Label>Comment</Form.Label>
                          <Form.Control as='textarea' value={text} onChange={(e) => setText(e.target.value)} type="text" required placeholder="Enter your comment" />
                        </Form.Group>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={editClose}>
                          Close
                        </Button>
                        <Button type='submit' onClick={() => commentNeHandle(tweet?._id)} variant="primary" >
                          Save Changes
                        </Button>
                      </Modal.Footer>
                    </Form>
                  </Modal>
                  <div className=' d-flex '>
                    <div className=' me-1 hover:bg-gray-200 cursor-pointer rounded-full'>
                      <FontAwesomeIcon style={{ height: "15px" }} onClick={() => retweetHandle(tweet?._id)} icon={faRetweet} /></div>
                    <p>{tweet?.retweet?.length}</p></div>
                  {tweet?.tweetby === user?._id ? (<div className=' d-flex '>
                    <div onClick={() => deleTweet(tweet?._id)} className=' me-1 hover:bg-gray-200 cursor-pointer rounded-full'>
                      <FontAwesomeIcon style={{ height: "15px" }} icon={faTrashCan} /></div></div>) : (<div className=' d-flex d-none'>
                        <div className=' me-1 hover:bg-gray-200 cursor-pointer rounded-full'>
                          <FontAwesomeIcon style={{ height: "15px" }} icon={faTrashCan} /></div></div>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TweetPage;