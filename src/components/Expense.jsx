import React, { useState } from 'react'
import ExpenseForm from './ExpenseForm'
import ExpenseList from './ExpenseList'

function Expense() {
    const [editExpense,setEditExpense]=useState(null);
    return (
        <React.Fragment>
            <ExpenseForm editExpense={editExpense} onEditComplete={()=>{setEditExpense(null)}}/>
            <ExpenseList onEdit={(exp)=>{setEditExpense(exp)}}/>
        </React.Fragment>
    )
}

export default Expense
