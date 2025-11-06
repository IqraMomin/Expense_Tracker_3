import React, { useContext, useEffect, useRef } from 'react'
import AuthContext from '../store/auth-context';
import "./ProfileForm.css"
import {FaUser,FaGlobe} from "react-icons/fa";

function ProfileForm() {
    const nameInputRef = useRef();
    const photoInputRef = useRef();
    const authCtx = useContext(AuthContext);
    const token = authCtx.token;

    const fetchData=async()=>{
        if(!token) return;
        try{
            const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDu64KsXOLbIT6KN-z3lc1ieSfC1emiObU",{
                method:"POST",
                body:JSON.stringify({
                    idToken:token
                }),
                headers:{
                    "Content-Type":"application/json"
                }
            })
            if(response.ok){
                const data =await response.json();
                console.log(data);
                nameInputRef.current.value=data.users[0].displayName;
                photoInputRef.current.value=data.users[0].photoUrl
            }else{
                let errorMessage = "Update Failed";
                if(data && data.error && data.error.message){
                    errorMessage=data.error.message;
                    alert(errorMessage);
                }
            }

        }catch(err){
            alert(err);

        }

    }
    useEffect(()=>{
        fetchData();
    },[])
    const formSubmitHandler = async(event)=>{
        event.preventDefault();
        const userData={
            idToken:token,
            displayName:nameInputRef.current.value,
            photoUrl:photoInputRef.current.value,
            returnSecureToken:true
        }
        try{
            const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDu64KsXOLbIT6KN-z3lc1ieSfC1emiObU",{
                method:"POST",
                body:JSON.stringify(userData),
                headers:{
                    "Content-Type":"application/json"
                }
            })
            const data = await response.json();
            if(response.ok){
                
                console.log("Updated user data:", data);
            }

        }catch(err){
            console.log(err);
        }

    }
    return (
        <div className='profile-div'>

            <h2>Contact Details</h2>
            <form onSubmit={formSubmitHandler}>
                <div className='profile-form'>
                    <span className='icons'>
                    <FaUser className='icon'/>
                <label htmlFor="name">Full Name:</label>
                </span>
                <input id='name' type='text' ref={nameInputRef} required/>
                <span className='icons'>
                <FaGlobe className='icon'/>
                <label htmlFor="photo">Profile Photo URL:</label></span>
                <input id='photo' type='text' ref={photoInputRef} required/>
                </div>
                <br/>
                <button>Update</button>
                
            </form>
        </div>
    )
}

export default ProfileForm
