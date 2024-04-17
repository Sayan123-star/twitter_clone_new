import React, { useEffect, useState } from 'react'
import { faMessage } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, login } from '../actions/user.action'
import { toast } from 'react-toastify'
import "./logSign.css"

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {loading,error,islogged} = useSelector(state=>state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // Submit the form to login. 
    const LoginSubmitHandle=(e)=>{ 
        e.preventDefault();
        dispatch(login(email,password))
    }
    // Showing toast on success or errors
    useEffect(()=>{
        if(error){
            toast.error(error);
            dispatch(clearErrors())
        }
        else if(islogged===true){
            toast.success("User Logged in Successfully")
            navigate("/profile")
        }
    },[error,dispatch,islogged,navigate])
    return (
        <div className='w-screen h-screen flex items-center justify-center' style={{boxSizing:"border-box", backgroundColor:"grey"}} >
            <div className="log flex items-center justify-evenly  w-[70%]" style={{border:"1px solid gray",borderRadius:"5%",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
                <div className='cover col bg-primary'>
                    Welcome Back !!
                    <div><FontAwesomeIcon icon={faMessage} size="3x" /></div>
                </div>
                <div className='formcoverLog col bg-white'>
                    <Form onSubmit={LoginSubmitHandle}>
                        <h3>Login</h3>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Control type="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} required placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupPassword">
                            <Form.Control type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)}  required placeholder="Password" />
                        </Form.Group>
                        <Button type="submit" variant='dark'>Login</Button>
                    </Form>
                    <p>If you have not yet registered please <Link to="/signup"> Signup</Link></p>
                </div>
            </div>
        </div >
    )
}

export default Login
