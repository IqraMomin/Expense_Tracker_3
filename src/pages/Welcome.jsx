import React from 'react'
import AuthHeader from '../components/UI/AuthHeader'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

function Welcome() {
    const history=useHistory();
    const profileFormHandler = ()=>{
        history.replace("/profile");
    }
    return (
        <AuthHeader title="Welcome To Expense Tracker!!!" 
        description="Your profile is inComplete"
        text="Complete now"
        onClick={profileFormHandler}/>
    )
}

export default Welcome
