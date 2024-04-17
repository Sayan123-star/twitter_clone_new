import React, { useEffect, useState } from 'react';
import Avatar from 'react-avatar';
import { Button, Form, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faRetweet, faHeart as heart } from '@fortawesome/free-solid-svg-icons'
import { faComment, faHeart, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { clearErrors, commentNeHandle, delTweets, getTweets } from '../actions/tweet.action';
import axios from 'axios';
import { API_URL_POINT } from '../config';
import { CREATE_TWEET_RESET, DELETE_TWEET_RESET, UPDATE_TWEET_RESET } from '../consants/tweet.consants';
import { toast } from 'react-toastify';
import { oneTweet } from '../actions/tweet.action'

const TweetView = () => {
  const { tweetOne } = useSelector((state) => state.oneTweet)
  const { user, islogged } = useSelector((state) => state.user)
  const { isDeleted, error, isUpdated } = useSelector((state) => state.tweetDelete)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [text, setText] = useState("");
  const [edit, setEdit] = useState(false);
  const editClose = () => setEdit(false);
  const editShow = () => setEdit(true);

  const likeDislikeHandle = async (id) => {
    try {
      const CONFIG_OB = {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem('token')}` }
      }
      const { data } = await axios.put(`${API_URL_POINT}/api/v1/like/${id}`, { userId: user?._id }, CONFIG_OB)
      toast.success(data.message)
      dispatch(getTweets())
      navigate('/')
    } catch (error) {
      toast.error(error.response.data.error)
      console.log(error);
    }
  }
  const commentSubHandle = (e) => {
    e.preventDefault();
    dispatch(commentNeHandle(tweetOne?._id, text))
  }
  useEffect(() => {
    if (error) {
      toast.error(error)
    }
    if (isUpdated) {
      dispatch(getTweets())
      navigate("/")
      dispatch({ type: UPDATE_TWEET_RESET })
    }
  }, [dispatch, error, isUpdated])
  const deleTweet = async (id) => {
    dispatch(delTweets(id))
  }
  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearErrors())
    }
    if (isDeleted) {
      toast.success()
      dispatch(oneTweet())
    }
    dispatch({ type: DELETE_TWEET_RESET })
  }, [dispatch, error, isDeleted])
  // Getting each tweet by its id
  useEffect(() => {
    dispatch(oneTweet(params.id))
  }, [dispatch, params.id])
  return (
    <div className='main'>
      <div>
        <div className=' border-bottom border-gray-200'>
          <div className='d-flex p-2'>
{/* Image display of the tweeted user */}
            {!tweetOne?.tweetby?.picture ? (<Avatar className='ava' src={require("../Img/profile.jpg")} size="40" round={true} />)
              : (<Avatar className='ava' src={`http://localhost:5000/uploads/${tweetOne?.tweetby?.picture}`} size="40" round={true} />)
            }
            <div className=' ms-1 w-100'>
              <div className="d-flex align-items-center mt-3">
                <p className=' position-absolute'><Link className='text-decoration-none' to={`/profile/${tweetOne?.tweetby?._id}`}>@{tweetOne?.tweetby?.username}</Link></p>
              </div>

              <div>
                <p className=' ms-2'>{tweetOne?.content}</p>
                {tweetOne?.image && <img src={`http://localhost:5000/uploads/${tweetOne?.image}`} style={{ width: "400px", height: "400px" }} alt={tweetOne?._id} />}
              </div>
              <div className='d-flex justify-content-between'>
                <div className=' d-flex' >
                  <div onClick={() => likeDislikeHandle(tweetOne?._id)} className=' me-1 hover:bg-gray-200 cursor-pointer rounded-full'>
                    {tweetOne?.likes?.length == 0 ? (<FontAwesomeIcon style={{ height: "15px" }} icon={faHeart} />) :
                      (<FontAwesomeIcon style={{ height: "15px", color: "red" }} icon={heart} />)}</div>
                  <p >{tweetOne?.likes?.length}</p></div>
                <div className=' d-flex '>
                  <div className=' me-1 hover:bg-gray-200 cursor-pointer rounded-full'>
                    <FontAwesomeIcon style={{ height: "15px" }} icon={faComment} onClick={editShow} /></div>
                  <p>{tweetOne?.comments?.length}</p></div>
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
                      <Button type='submit' onClick={() => commentNeHandle(tweetOne?._id)} variant="primary" >
                        Save Changes
                      </Button>
                    </Modal.Footer>
                  </Form>
                </Modal>
                <div className=' d-flex '>
                  <div className=' me-1 hover:bg-gray-200 cursor-pointer rounded-full'>
                    <FontAwesomeIcon style={{ height: "15px" }} icon={faRetweet} /></div>
                  <p>{tweetOne?.retweet?.length}</p></div>
                {tweetOne?.tweetby === user?._id ? (<div className=' d-flex '>
                  <div onClick={() => deleTweet(tweetOne?._id)} className=' me-1 hover:bg-gray-200 cursor-pointer rounded-full'>
                    <FontAwesomeIcon style={{ height: "15px" }} icon={faTrashCan} /></div></div>) : (<div className=' d-flex d-none'>
                      <div className=' me-1 hover:bg-gray-200 cursor-pointer rounded-full'>
                        <FontAwesomeIcon style={{ height: "15px" }} icon={faTrashCan} /></div></div>)}
              </div>
            </div>
          </div>
          <h5>All Comments</h5>
        </div>
      </div>
      {tweetOne?.comments && tweetOne?.comments.map((item, index) => {
        return (
          <>
            <div className=' border-bottom border-gray-200'>
              {tweetOne?.retweet && tweetOne?.retweet.map((i, index) => {
                return (
                  <>
                    {i?.username === item?.commentedBy?.username ? (
                      <p>@{i?.username} has retweeted on @{tweetOne?.tweetby?.username}'s post</p>
                    ) : ("")}
                  </>
                )
              })}
              <div className='d-flex p-2'>
                {!item?.commentedBy?.picture ? (<Avatar className='ava' src={require("../Img/profile.jpg")} size="40" round={true} />)
                  : (<Avatar className='ava' src={`http://localhost:5000/uploads/${item?.commentedBy?.picture}`} size="40" round={true} />)
                }
                <div className=' ms-1 w-100'>
                  <div className="d-flex align-items-center mt-3">


                    <p className=' position-absolute'>@{item?.commentedBy?.username}</p>
                  </div>
                  <p className='flex'>{item?.content}</p>
                  <p>Commented on: {String(item?.commentedAt).substr(0, 10)}</p>
                </div>
              </div>
            </div>
          </>
        )
      })}
    </div>

  )
}

export default TweetView
