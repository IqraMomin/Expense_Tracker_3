import React from 'react'
import { useDispatch } from 'react-redux';
import { Table } from 'react-bootstrap';
import { removeExpense } from '../../store/expense-actions';

function ExpenseItem({expense,onEdit}) {
    const dispatch = useDispatch();

    const removeExpenseHandler = () => {
        dispatch(removeExpense(expense.id));
    
    }
    
    return (
        <tr>
          <td>{expense.date}</td>
          <td>{expense.category}</td>
            <td>{expense.title}</td>
            <td>{expense.amount}</td>
            <td>
            <button onClick={()=>{onEdit(expense)}}>Edit</button>
            </td>
            <td>
            <button onClick={removeExpenseHandler}>Delete</button>
            </td>           
        </tr>
    )
}

export default ExpenseItem
