import React from 'react'
import AuthForm from '../components/AuthForm'
import image from "../assets/image5.jpg"
import "../components/AuthForm.css";

function AuthPage() {
    return (
        <div className='auth-main'>
            <div className='auth-image'>
                <img src={image} alt="SignUp" />

            </div>
            <div className='form-div'><AuthForm/></div>
        </div>
        
    )
}

export default AuthPage
