import React, { useContext, useState } from 'react'
import "./AuthHeader.css";
import AuthContext from '../../store/auth-context';

function AuthHeader(props) {
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;
    const token = authCtx.token;
    const [error,setError] = useState("");

    const emailVerificationHanlder = async ()=>{
        if(!token){
            setError("Trying Loging In Again");
            alert(error);
            return;
        };
        try{
            const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDu64KsXOLbIT6KN-z3lc1ieSfC1emiObU",{
                method:"POST",
                body:JSON.stringify({
                    requestType:"VERIFY_EMAIL",
                    idToken:token,
                }),
                headers:{
                    "Content-Type":"application/json"
                }
            })
            const data = await response.json();
            if(!response.ok){
                if(data && data.error && data.error.message){
                    setError(data.error.message);
                    alert(error);
                }
            }

        }catch(err){
            setError(err);
            alert(error);

        }

    }
    return (
        <div className='auth-header-div'>
            <p className='title'>{props.title}</p>
            {isLoggedIn && <button onClick={emailVerificationHanlder}>Verify your email</button>}
            <p className='desc'>{props.description}
            <button onClick={props.onClick}>{props.text}</button>
            </p>
        </div>
    )
}

export default AuthHeader
