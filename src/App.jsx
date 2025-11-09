import React from 'react'
import './App.css'
import AuthPage from './pages/AuthPage'
import { Route ,Switch} from 'react-router-dom'
import Welcome from './pages/Welcome'
import ProfilePage from './pages/ProfilePage'
import ResetPassword from './components/ResetPassword'
import ExpensePage from './pages/ExpensePage'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'
import { useSelector } from 'react-redux'

function App() {

  const isLoggedIn = useSelector(state=>state.auth.isLoggedIn);
 
  
  return (
    <React.Fragment>
      <Switch>
      <Route path='/' exact><AuthPage/></Route>
      <Route path='/welcome'><Welcome/></Route>
      <Route path="/profile"><ProfilePage/></Route>
      <Route path="/reset"><ResetPassword/></Route>
      <Route path="/expensepage">
      {isLoggedIn && <ExpensePage/>}
      {!isLoggedIn && <Redirect to="/"/>}
      </Route>
      </Switch>
    </React.Fragment>
  )
}

export default App
