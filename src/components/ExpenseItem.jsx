import React from 'react'
import { useDispatch } from 'react-redux';
import { expenseActions } from '../store/expenseSlice';
import axios from 'axios';

function ExpenseItem({expense,onEdit}) {
    const dispatch = useDispatch();

    const removeExpenseHandler = async () => {
        await axios.delete(
          `https://expense-tracker-e3353-default-rtdb.firebaseio.com/expenses/${expense.id}.json`
        );
        dispatch(expenseActions.removeExpense(expense.id));
      };
    
    
    
    return (
        <li>
            <h3>{expense.category}</h3>
            <p>{expense.title}</p>
            <p>{expense.amount}</p>
            <button onClick={()=>{onEdit(expense)}}>Edit</button>
            <button onClick={removeExpenseHandler}>Delete</button>
        </li>
    )
}

export default ExpenseItem
