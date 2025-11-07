import React,{useContext} from 'react'
import './App.css'
import AuthPage from './pages/AuthPage'
import { Route ,Switch} from 'react-router-dom'
import Welcome from './pages/Welcome'
import ProfilePage from './pages/ProfilePage'
import ResetPassword from './components/ResetPassword'
import ExpensePage from './pages/ExpensePage'
import AuthContext from './store/auth-context'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'

function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
 
  
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
