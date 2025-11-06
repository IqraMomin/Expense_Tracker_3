import React from 'react'
import "./AuthHeader.css";

function AuthHeader(props) {
    return (
        <div className='auth-header-div'>
            <p>{props.title}</p>
            <p>{props.description}
            <button onClick={props.onClick}>{props.text}</button>
            </p>
        </div>
    )
}

export default AuthHeader
