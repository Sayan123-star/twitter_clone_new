import React, { useEffect, useState } from 'react'
import Avatar from 'react-avatar'
import { Button, Form, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import "./profile.css"
import { useNavigate } from 'react-router-dom'
import { getTweets, userTweets } from '../actions/tweet.action'
import TweetPage from './demo'
import { clearErrors, getuser, updateImage, updateProfile } from '../actions/user.action'
import { toast } from 'react-toastify';
import { UPDATE_USER_RESET } from '../consants/user.consants'
import { API_URL_POINT } from '../config'
import Loader from './Loader'

const Profile = () => {
    const { loading, user, islogged } = useSelector((state) => state.user)
    const { tweets } = useSelector((state) => state.tweetView)
    const { isUpdated, error } = useSelector((state) => state.profileUpdate)
    const [edit, setEdit] = useState(false);
    const [picture, setPicture] = useState({ preview: '', data: '' });
    const editClose = () => setEdit(false);
    const editShow = () => setEdit(true);
    const [upload, setUpload] = useState(false);
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [dob, setDob] = useState("");
    const uploadClose = () => setUpload(false);
    const uploadShow = () => setUpload(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // changing the state of the image
    const imageChange = (e) => {
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0]
        }
        setPicture(img)
    }
    //  form submit handler 
    const imageUploadHandler = (e) => {
        e.preventDefault()
        const myform = new FormData();
        myform.append("picture", picture.data);
        dispatch(updateImage(myform))
    }
    const updateProfileHandle = (e) => {
        e.preventDefault();
        dispatch(updateProfile(name, location, dob))
    }
    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(clearErrors())
        }
        if (isUpdated) {
            toast.success("User Profile Updated Successfully")
            dispatch(getuser())
        }
        dispatch({ type: UPDATE_USER_RESET })
    }, [dispatch, error, isUpdated, navigate])
    useEffect(() => {
        dispatch(userTweets())
    }, [dispatch])
    return (
        <>
        {loading?(<Loader/>):(<div className='main  w-[50%]  border border-gray-200'>
            <div className="curor-pointer">
                <h1 className="font-bold text-lg px-2 py-2">Profile</h1>
            </div>
            <img className='ava' src={require("../Img/Bokeh-twitter-header-banner.jpg")} alt='Banner' />
            <div className="position-absolute ms-2 img" >
                {!user?.picture ? (<Avatar className='ava1' src={require("../Img/profile.jpg")} size="90" round={true} />)
                    : (<Avatar className='ava1' src={`${API_URL_POINT}uploads/${user?.picture}`} size="90" round={true} />)
                }
            </div>
            <div className=' float-end d-flex'>
                <div className="  m-2">
                    <button className='btn btn-outline-primary ' onClick={uploadShow}>
                        <p className='p'>Update Profile Image</p>
                    </button>
                    <Modal show={upload} onHide={uploadClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Modal heading</Modal.Title>
                        </Modal.Header>
                        <Form onSubmit={imageUploadHandler}>
                            <Modal.Body>
                                <Form.Group className="mb-3" controlId="formGroupEmail">
                                    <Form.Control name='picture' type="file" accept="image/*" onChange={imageChange} required /><br />
                                    {picture.preview && <img src={picture.preview} />}
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={uploadClose}>
                                    Close
                                </Button>
                                <Button type='submit' variant="primary" onClick={uploadClose}>
                                    Save Changes
                                </Button>
                            </Modal.Footer>
                        </Form>
                    </Modal>
                </div>
                <div className="text-right m-2">
                    <button className='btn btn-outline-secondary ' onClick={editShow}>
                        Edit
                    </button>
                    <Modal show={edit} onHide={editClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Modal heading</Modal.Title>
                        </Modal.Header>
                        <Form onSubmit={updateProfileHandle}>
                            <Modal.Body>

                                <Form.Group className="mb-3" controlId="formGroupEmail">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter your name" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formGroupPassword">
                                    <Form.Label>Location</Form.Label>
                                    <Form.Control value={location} onChange={(e) => setLocation(e.target.value)} type="text" required placeholder="Enter your location" />
                                    <Form.Label>Date of Birth</Form.Label>
                                    <Form.Control value={dob} type="date" onChange={(e) => setDob(e.target.value)} required placeholder="Enter your DOB" />
                                </Form.Group>

                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={editClose}>
                                    Close
                                </Button>
                                <Button type='submit' variant="primary" onClick={editClose}>
                                    Save Changes
                                </Button>
                            </Modal.Footer>
                        </Form>
                    </Modal>
                </div></div>
            <div className=" ms-2 mt-5">
                <h5>{user?.name}</h5>
                <p>@{user?.username}</p></div>
            <div className='m-3 row'>
                <div className='col'><h6 className=''>Joined on: </h6>
                    <p className=''>{String(user?.createdAt).substr(0, 10)}</p></div>
                <div className='col'><h6 className=''>Updated on: </h6>
                    <p className='' >{String(user?.updatedAt).substr(0, 10)}</p></div>
                {user?.dob ? (<><h6>Date of Birth: </h6>
                    <p>{String(user?.dob).substr(0, 10)}</p></>) : ""}
            </div>
            {tweets && tweets?.map((tweet) => tweet?.tweetby.includes(user?._id)?<TweetPage key={tweet?._id} tweet={tweet} />:"")}
        </div>)}
        </>
    )
}

export default Profile
