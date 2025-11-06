import React from 'react'
import './App.css'
import AuthPage from './pages/AuthPage'
import { Route ,Switch} from 'react-router-dom'
import Welcome from './pages/Welcome'
import ProfilePage from './pages/ProfilePage'
import ResetPassword from './components/ResetPassword'

function App() {
 
  
  return (
    <React.Fragment>
      <Switch>
      <Route path='/' exact><AuthPage/></Route>
      <Route path='/welcome'><Welcome/></Route>
      <Route path="/profile"><ProfilePage/></Route>
      <Route path="/reset"><ResetPassword/></Route>
      </Switch>
    </React.Fragment>
  )
}

export default App
