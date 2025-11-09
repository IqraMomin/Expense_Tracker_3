import React, { useState } from 'react'
import "./AuthHeader.css";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../store/authSlice';

function AuthHeader(props) {
    //const authCtx = useContext(AuthContext);
    const dispatch= useDispatch();
    const isLoggedIn = useSelector(state=>state.auth.isLoggedIn);
    const token = useSelector(state=>state.auth.token);
    const [error,setError] = useState("");
    const history = useHistory();

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
    const logoutHandler = ()=>{
        dispatch(authActions.logout());
        history.replace("/");

    }
    return (
        <div className='auth-header-div'>
            <p className='title'>{props.title}</p>
            {isLoggedIn && <button onClick={emailVerificationHanlder}>Verify your email</button>}
            {isLoggedIn && <button onClick={()=>{history.replace("/expensepage")}}>Add Expense</button>}
            {isLoggedIn && <button onClick={logoutHandler}>Logout</button>}
            <p className='desc'>{props.description}
            <button onClick={props.onClick}>{props.text}</button>
            </p>
        </div>
    )
}

export default AuthHeader
