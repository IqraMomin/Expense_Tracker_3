import React, { useRef, useState } from 'react'
import "./AuthForm.css";

function AuthForm() {
    const [isLogin, setIsLogin] = useState(false);
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const confirmInputRef = useRef();
    const [error,setError] = useState("");

    const formSubmitHandler = async (event)=>{
        event.preventDefault();
        const email = emailInputRef.current.value;
        const password = passwordInputRef.current.value;
        const confirmPassword = confirmInputRef.current.value;

        if(email.trim().length===0 || password.trim().length===0||confirmPassword.trim().length===0){
            setError("All Fields are required");
            return;
        }
        if(password!==confirmPassword){
            setError("Password did not match");
            return;
        }
        setError("");

        const userData = {
            email:emailInputRef.current.value,
            password:passwordInputRef.current.value
        }
        try{
            const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDu64KsXOLbIT6KN-z3lc1ieSfC1emiObU",{
                method:"POST",
                body:JSON.stringify(userData),
                headers:{
                    "Content-Type":"application/json"
                }
            })
            const data =await response.json();
            if(!response.ok){
                let errorMessage = "Authentication Failed";
                if(data && data.error && data.error.message){
                    errorMessage = data.error.message;
                }
                alert(errorMessage);
            }
            console.log("User has successfully signed up.");
        }
        catch(err){
            console.log(err);
        }
    }
    return (
        <div className='auth-main-div'>
            <div className='auth-div'>
                <h2>{isLogin ? "Login" : "SignUp"}</h2>
                <form onSubmit={formSubmitHandler}>
                    <input type='email' placeholder='Email' ref={emailInputRef} />
                    <input type='password' placeholder='Password' ref={passwordInputRef} />
                    <input type='password' placeholder='Confirm Password' ref={confirmInputRef} />
                    <button type='submit'>{isLogin ? "Login" : "SignUp"}</button>
                </form>
            </div>
            {error && <p style={{color:"red",fontWeight:"bold"}}>{error}</p>}
            <button className='auth-btn' onClick={() => {
                setIsLogin(prev => !prev);
            }}>Have an account?Login</button>
        </div>
    )
}

export default AuthForm
