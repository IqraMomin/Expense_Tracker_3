import React, { useContext } from 'react'
import ExpenseContext from '../store/expense-context'
import ExpenseItem from './ExpenseItem';

function ExpenseList({onEdit}) {
    const expenseCtx = useContext(ExpenseContext);
    return (
        <ul>
            {expenseCtx.expenseList.map(ele=>{
                return <ExpenseItem
                key={ele.id}
                expense={ele}
                onEdit={onEdit}/>
            })}
        </ul>
    )
}

export default ExpenseList
