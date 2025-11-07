import React, { useContext } from 'react'
import ExpenseContext from '../store/expense-context'
import ExpenseItem from './ExpenseItem';

function ExpenseList() {
    const expenseCtx = useContext(ExpenseContext);
    return (
        <ul>
            {expenseCtx.expenseList.map(ele=>{
                return <ExpenseItem
                key={ele.expenseId}
                id={ele.expenseId}
                amount={ele.amount}
                title={ele.title}
                category={ele.category}/>
            })}
        </ul>
    )
}

export default ExpenseList
