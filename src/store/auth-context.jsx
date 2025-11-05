import React, { useState } from 'react'

const AuthContext = React.createContext({
    token:"",
    isLoggedIn:null,
    login:(token)=>{}
})

export function AuthProvider(props) {
const [token,setToken] = useState("");
const isLoggedIn = !!token;
const loginHandler = (token)=>{
    setToken(token);
}

    const contextValue = {
        token:token,
        isLoggedIn:isLoggedIn,
        login:loginHandler

    }
    return (
        <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
    )
}

export default AuthContext
