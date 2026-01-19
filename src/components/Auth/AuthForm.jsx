import React, { useRef, useState } from 'react'
import "./AuthForm.css";
import { Link } from 'react-router-dom';
import { authActions } from '../../store/authSlice';
import {useHistory} from "react-router-dom";
import { useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';

function AuthForm() {
    const [isLogin, setIsLogin] = useState(true);
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const confirmInputRef = useRef();
    const [error, setError] = useState("");
    const dispatch= useDispatch();
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
            password: passwordInputRef.current.value,
            returnSecureToken:true
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
                    console.log(data);
                    dispatch(authActions.login(data.idToken))
                    history.replace("/welcome");
                    
                }else{
                    let errorMessage = data.error.message;
                    alert(errorMessage);
                }

            } catch (err) {
                alert(err);
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
        <Container fluid
          className="d-flex justify-content-center align-items-center vh-100"
          style={{ backgroundColor: "#1e1e1e" }}
        >
          <div
            className="p-4 shadow-lg"
            style={{
              width: "380px",
              background: "#ffffff",
              borderRadius: "16px",
            }}
          >
            <h3 className="text-center mb-4" style={{ color: "#6f42c1" }}>
              {isLogin ? "Login" : "Sign Up"}
            </h3>
      
            <form onSubmit={formSubmitHandler}>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control py-2"
                  placeholder="Email"
                  ref={emailInputRef}
                />
              </div>
      
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control py-2"
                  placeholder="Password"
                  ref={passwordInputRef}
                />
              </div>
      
              {!isLogin && (
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control py-2"
                    placeholder="Confirm Password"
                    ref={confirmInputRef}
                  />
                </div>
              )}
      
              {error && <p className="text-danger fw-bold">{error}</p>}
      
              <button
                type="submit"
                className="btn w-100 py-2 mt-2"
                style={{
                  backgroundColor: "#6f42c1",
                  color: "white",
                  borderRadius: "8px",
                }}
              >
                {isLogin ? "Login" : "Sign Up"}
              </button>
            </form>
      
            {isLogin && (
              <div className="text-center mt-3">
                <Link to="/reset" style={{ color: "#6f42c1" }}>
                  Forgot Password?
                </Link>
              </div>
            )}
      
            <button
              className="btn btn-outline-secondary w-100 mt-3"
              onClick={() => setIsLogin((prev) => !prev)}
              style={{ borderRadius: "8px" }}
            >
              {isLogin ? "Create New Account" : "Have an account? Login"}
            </button>
          </div>
        </Container>
      );
      
}

export default AuthForm
