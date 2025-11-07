import React, { useContext } from 'react'
import ExpenseContext from '../store/expense-context'
import ExpenseItem from './ExpenseItem';

function ExpenseList() {
    const expenseCtx = useContext(ExpenseContext);
    return (
        <ul>
            {expenseCtx.expenseList.map(ele=>{
                return <ExpenseItem
                key={ele.id}
                id={ele.id}
                amount={ele.amount}
                description={ele.description}
                expense={ele.expense}/>
            })}
        </ul>
    )
}

export default ExpenseList
