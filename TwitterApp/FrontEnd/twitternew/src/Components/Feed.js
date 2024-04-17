import React from 'react'
import TweetPage from './demo'
import { useEffect, useState } from 'react';
import Avatar from 'react-avatar';
import { Button, Form, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearErrors, createTweets, getTweets } from '../actions/tweet.action';
import { toast } from 'react-toastify';
import './feed.css'
import { getuser } from '../actions/user.action';
import Loader from './Loader';

const Feed = () => {
  // Using useSelector to access the state of Reducers
  const { tweets } = useSelector((state) => state.tweetView)
  const { success, error, refresh } = useSelector((state) => state.tweetCreate)
  const {loading, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //  State for modal and image uploader and content
  const [image, setImage] = useState({ preview: '', data: '' });
  const [content, setContent] = useState("");
  //  State variable to handle whether or not the modal is open
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //  Function that handles submission of form
  const TweetSubmit = (e) => {
    e.preventDefault();
    const myform = new FormData();
    myform.set("content", content);
    if (image.data !== '') { myform.append('image', image.data) };
    dispatch(createTweets(myform))
  }
  const imageSubHandle = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0]
    }
    setImage(img)
  }
  useEffect(() => {
    if (user === null) {
      navigate("/login")
    }
  }, [user, navigate])
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors())
    }
    if (success) {
      toast.success("User create tweet Successfully")

    }
    setContent("")
  }, [dispatch, error, success, toast])

  useEffect(() => {
    if (refresh === true) {
      dispatch(getTweets())
    }
  }, [dispatch, refresh])
  // useEffect(()=>{dispatch(getuser())},[dispatch])
  useEffect(() => {
    dispatch(getTweets())
  }, [dispatch])
  return (
    <>
    {loading?(<Loader/>):(
      <div className='main w-[50%] border border-gray-200'>
      <div className="flex items-center justify-between border-b border-gray-200">
        <div className="curor-pointer">
          <h1 className="font-bold text-lg px-2 py-2">Home</h1>
        </div>
        <Button variant="primary" className='me-2' onClick={handleShow}>
          Post
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          {/* Form to submit the tweet with image upload functionality */}
          <Form onSubmit={TweetSubmit}>
            <Modal.Body>
              <Form.Control as='textarea' name="content" value={content} onChange={(e) => setContent(e.target.value)} 
              placeholder='Enter a message' />
              <Form.Control name='file' className='ImageUpload' type='file' accept='image/*' onChange={imageSubHandle} />
              {image.preview && <img src={image.preview} />}
              <FontAwesomeIcon className='icon' icon={faImage} />

            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button type='submit' variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
      {tweets && tweets?.map((tweet) => <TweetPage key={tweet?._id} tweet={tweet} />)}
    </div>
    )}
    </>
  )
}

export default Feed
