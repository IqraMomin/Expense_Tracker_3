import React, { useEffect } from 'react'
import './App.css'
import { Route } from 'react-router-dom'
import { useSelector ,useDispatch } from 'react-redux'
import { Col, Container, Row } from 'react-bootstrap'
import Sidebar from './components/Sidebar.jsx'
import DashboardContent from './components/Dashboard/DashboardContent'
import Expense from './components/Expense/Expense'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'
import AuthForm from "./components/Auth/AuthForm"
import ResetPassword from './components/Auth/ResetPassword'
import { fetchExpenses } from './store/expense-actions'




function App() {

  const isLogin = useSelector(state => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
  
      dispatch(fetchExpenses());
    }, [isLogin,dispatch]);
  
  

 


  return (

    <Container fluid className='p-0'>
      {!isLogin && (
        <>
          <Route path="/" exact>
            <AuthForm />
          </Route>

          <Route path="/authpage" exact>
            <AuthForm />
          </Route>
          <Route path="/reset">
            <ResetPassword/>
          </Route>

          {/* If user tries to open dashboard when not logged in */}
          <Route path="/welcome">
            <Redirect to="/authpage" />
          </Route>

          <Route path="/expensepage">
            <Redirect to="/authpage" />
          </Route>
        </>
      )}

    {/* SHOW DASHBOARD ONLY WHEN LOGGED IN */}
    {isLogin && (
      <Row>
        <Col md={3} className="bg-light" style={{ height: "100vh" }}>
          <Sidebar />
        </Col>

        <Col md={9} className="bg-dark text-white p-5" style={{ overflowX: "hidden" }}>
          
        <Route path="/"exact><DashboardContent/></Route>
          <Route path="/welcome">
            <DashboardContent />
          </Route>

          <Route path="/expensepage">
            <Expense />
          </Route>
          

        </Col>
      </Row>
    )}
  </Container>
  )
}

export default App
