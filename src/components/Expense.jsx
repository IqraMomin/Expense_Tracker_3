import React from 'react'
import ExpenseForm from './ExpenseForm'
import ExpenseList from './ExpenseList'

function Expense() {
    return (
        <React.Fragment>
            <ExpenseForm/>
            <ExpenseList/>
        </React.Fragment>
    )
}

export default Expense
