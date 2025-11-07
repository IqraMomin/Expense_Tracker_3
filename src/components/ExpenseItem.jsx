import React, { useContext } from 'react'
import ExpenseContext from '../store/expense-context'

function ExpenseItem({expense,onEdit}) {
    const expenseCtx = useContext(ExpenseContext);
    
    const deleteExpenseHandler = ()=>{
        expenseCtx.removeExpense(expense.id);
    }
    return (
        <li>
            <h3>{expense.category}</h3>
            <p>{expense.title}</p>
            <p>{expense.amount}</p>
            <button onClick={()=>{onEdit(expense)}}>Edit</button>
            <button onClick={deleteExpenseHandler}>Delete</button>
        </li>
    )
}

export default ExpenseItem
