import React, { useState } from 'react'
import "./AuthHeader.css";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../store/authSlice';
import { themeActions } from '../../store/themeSlice';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function AuthHeader(props) {
    const dispatch= useDispatch();
    const isLoggedIn = useSelector(state=>state.auth.isLoggedIn);
    const token = useSelector(state=>state.auth.token);
    const [error,setError] = useState("");
    const history = useHistory();
    const totalExpense = useSelector(state=>state.expense.totalExpense);
    const premium = useSelector(state=>state.theme.activatePremium);
    const theme = useSelector(state=>state.theme.theme);

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
    const activatePremiumHandler = ()=>{
        dispatch(themeActions.changeTheme());
        dispatch(themeActions.activatePremium());

    }
    return (
        <React.Fragment>


            
        <div className={`auth-header-div ${theme ? "dark-theme":"light-theme"}`}>
            <p className='title'>{props.title}</p>
            <div className='headers-actions'>
            
              
            <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Expense Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            {isLoggedIn &&
            <Nav.Link href="#link" onClick={emailVerificationHanlder}>Verify your email</Nav.Link>}
            
            {isLoggedIn && <Nav.Link href="#link" onClick={()=>{history.replace("/expensepage")}}>Add Expense</Nav.Link>}
            
            {totalExpense >= 10000 && 
            <Nav.Link href="#home" onClick={activatePremiumHandler}>Activate Premium</Nav.Link>}
            
            <NavDropdown title="Activate Premium" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Activate Premium</NavDropdown.Item>
              {premium && <NavDropdown.Item href="#action/3.2" onClick={()=>{dispatch(themeActions.changeTheme())}}>
                 Change Theme
              </NavDropdown.Item>}
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
            {isLoggedIn && <Nav.Link href="#home" onClick={logoutHandler}>Logout</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>


            </div>
           
            <p className='desc'>{props.description}
            <button onClick={props.onClick}>{props.text}</button>
            </p>

        </div>
        </React.Fragment>
    )
}

export default AuthHeader
