import React, { useRef } from 'react'
import { Link } from 'react-router-dom';

function ResetPassword() {
    const resetInputRef = useRef();
    const formSubmitHandler =async (event)=>{
        event.preventDefault();
        try{
            const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDu64KsXOLbIT6KN-z3lc1ieSfC1emiObU",{
            method:"POST",
            body:JSON.stringify({
                requestType:"PASSWORD_RESET",
                email:resetInputRef.current.value
            }),
            headers:{
                "Content-Type":"application/json"
            }
            })
            const data = await response.json();
            if(!response.ok){               
                alert(data.error.message);
            }
            console.log(data);

        }catch(err){
            console.log(err);
        }

    }
    return (
        <React.Fragment>
        <form onSubmit={formSubmitHandler}>
            <label htmlFor="resetEmail">Enter the email with which you have registered</label>
            <input id='resetEmail' type='email' ref={resetInputRef}/>
            <button>Send Link</button>
        </form>
        <Link to="/login">Already a user ? Login</Link>
        </React.Fragment>
    )
}

export default ResetPassword
