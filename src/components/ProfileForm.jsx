import React, { useContext, useRef } from 'react'
import AuthContext from '../store/auth-context';

function ProfileForm() {
    const nameInputRef = useRef();
    const photoInputRef = useRef();
    const authCtx = useContext(AuthContext);
    const formSubmitHandler = async(event)=>{
        event.preventDefault();
        const userData={
            idToken:authCtx.token,
            displayName:nameInputRef.current.value,
            photoUrl:photoInputRef.current.value,
            refreshToken:true
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
                
                console.log(data);
            }

        }catch(err){
            console.log(err);
        }

    }
    return (
        <div>
            <h3>Contact Details</h3>
            <form onSubmit={formSubmitHandler}>
                <label htmlFor="name">Full Name:</label>
                <input id='name' type='text' ref={nameInputRef} required/>
                <label htmlFor="photo">Profile Photo URL:</label>
                <input id='photo' type='text' ref={photoInputRef} required/>
                <button>Update</button>
                
            </form>
        </div>
    )
}

export default ProfileForm
