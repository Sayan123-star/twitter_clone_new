import React, { useEffect, useState } from 'react'
import { faMessage } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, register } from '../actions/user.action'
import { toast } from 'react-toastify'
import "./logSign.css"


const Register = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const {loading, error,success} = useSelector(state=>state.user)
    const [user, setUser] = useState({
        name:"",
        email:"",
        username:"",
        password:""
    });

    const {name,username,email,password}=user
// Submitting register form
    const SubmitForm=(e)=>{
        e.preventDefault();
      dispatch(register(user))
    }
    const SubmitChange =(e)=>{
        setUser({...user, [e.target.name]:e.target.value})
    }
    // Showing toast if errors or success
    useEffect(()=>{
        if(error){ 
          toast.error(error)
          dispatch(clearErrors())
        }
        if(success===true){
            toast.success(" Registered Successfully")
            navigate("/login");
        }
      },[dispatch,error,success,navigate])

    return (
        <div className='w-screen h-screen flex items-center justify-center' style={{boxSizing:"border-box", backgroundColor:"grey"}} >
            <div className="log flex items-center justify-evenly  w-[70%]" style={{border:"1px solid gray",borderRadius:"5%",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
                <div className='col cover bg-primary'>
                    Welcome Back !!
                    <div><FontAwesomeIcon icon={faMessage} size="3x" /></div>
                </div>
                <div className='col formcover bg-white'>
                    <Form onSubmit={SubmitForm} >
                        <h3>Register</h3>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Control type="text" name="name" value={name} onChange={SubmitChange} required placeholder="Enter your Full Name" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Control type="email" name="email" value={email} onChange={SubmitChange} required placeholder="Enter your Email" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Control type="text" name="username" value={username} onChange={SubmitChange} required placeholder="Enter your Username" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupPassword">
                            <Form.Control type="password" name="password" value={password} onChange={SubmitChange} required placeholder="Enter your Password" />
                        </Form.Group>
                        <Button type="submit" variant='dark'>Register</Button>
                    </Form>
                    
                    <p>Already have an account please <Link to="/login">Login</Link></p>
                </div>
            </div>
        </div >
    )
}

export default Register
