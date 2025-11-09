import React,{useEffect} from 'react'
import { expenseActions } from '../store/expenseSlice';
import ExpenseItem from './ExpenseItem';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';


function ExpenseList({onEdit}) {
    const expenseList = useSelector(state=>state.expense.expenseList);
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
    
            dispatch(expenseActions.setExpenses(loadedExpenses));
          } catch (err) {
            console.error("Error fetching expenses:", err);
          }
        };
    
        fetchExpenses();
      }, [dispatch]);
    
    
    return (
        <ul>
            {expenseList.map(ele=>{
                return <ExpenseItem
                key={ele.id}
                expense={ele}
                onEdit={onEdit}/>
            })}
        </ul>
    )
}

export default ExpenseList
