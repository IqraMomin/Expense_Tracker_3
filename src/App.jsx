import React,{useEffect} from 'react'
import './App.css'
import AuthPage from './pages/AuthPage'
import { Route ,Switch} from 'react-router-dom'
import Welcome from './pages/Welcome'
import ProfilePage from './pages/ProfilePage'
import ResetPassword from './components/ResetPassword'
import ExpensePage from './pages/ExpensePage'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'
import { useDispatch, useSelector } from 'react-redux'
import { expenseActions } from './store/expenseSlice'
import axios from 'axios'

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get(
          "https://expense-tracker-e3353-default-rtdb.firebaseio.com/expenses.json"
        );
        const data = response.data;
        const loadedExpenses = [];

        for (const key in data) {
          loadedExpenses.push({ id: key, ...data[key] });
        }
        console.log("Loaded Expenses",loadedExpenses);
        dispatch(expenseActions.setExpenses(loadedExpenses));
      } catch (err) {
        console.error("Error fetching expenses:", err);
      }
    };

    fetchExpenses();
  }, [dispatch]);



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
