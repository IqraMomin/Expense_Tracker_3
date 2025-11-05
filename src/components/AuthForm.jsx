import React, { useContext, useRef, useState } from 'react'
import "./AuthForm.css";
import { Link } from 'react-router-dom';
import AuthContext from '../store/auth-context';
import {useHistory} from "react-router-dom";

function AuthForm() {
    const [isLogin, setIsLogin] = useState(false);
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const confirmInputRef = useRef();
    const [error, setError] = useState("");
    const authCtx = useContext(AuthContext);
    const history = useHistory();

    const formSubmitHandler = async (event) => {
        event.preventDefault();
        const email = emailInputRef.current.value;
        const password = passwordInputRef.current.value;
        const confirmPassword = !isLogin ? confirmInputRef.current.value : "";

        if (email.trim().length === 0 || password.trim().length === 0 || !isLogin && confirmPassword.trim().length === 0) {
            setError("All Fields are required");
            return;
        }
        if (!isLogin && password !== confirmPassword) {
            setError("Password did not match");
            return;
        }
        setError("");

        const userData = {
            email: emailInputRef.current.value,
            password: passwordInputRef.current.value
        }
        if (isLogin) {
            try {
                const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDu64KsXOLbIT6KN-z3lc1ieSfC1emiObU", {
                    method: "POST",
                    body: JSON.stringify(userData),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })               
                if(response.ok){
                    const data = await response.json();
                    authCtx.login(data.idToken);
                    history.replace("/welcome");
                    
                }else{
                    let errorMessage = data.error.message;
                    alert(errorMessage);
                }

            } catch (err) {

            }

        } else {
            try {
                const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDu64KsXOLbIT6KN-z3lc1ieSfC1emiObU", {
                    method: "POST",
                    body: JSON.stringify(userData),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                const data = await response.json();
                if (!response.ok) {
                    let errorMessage = "Authentication Failed";
                    if (data && data.error && data.error.message) {
                        errorMessage = data.error.message;
                    }
                    alert(errorMessage);
                }
                console.log("User has successfully signed up.");
            }
            catch (err) {
                console.log(err);
            }
        }
    }
    return (
        <div className='auth-main-div'>
            <div className='auth-div'>
                <h2>{isLogin ? "Login" : "SignUp"}</h2>
                <form onSubmit={formSubmitHandler}>
                    <input type='email' placeholder='Email' ref={emailInputRef} />
                    <input type='password' placeholder='Password' ref={passwordInputRef} />
                    {!isLogin && <input type='password' placeholder='Confirm Password' ref={confirmInputRef} />}
                    <button type='submit'>{isLogin ? "Login" : "SignUp"}</button>
                </form>
                {isLogin && <Link to="#">Forgot Password</Link>}
            </div>
            {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}
            {!isLogin && <button className='auth-btn' onClick={() => {
                setIsLogin(prev => !prev);
            }}>Have an account?Login</button>}
        </div>
    )
}

export default AuthForm
