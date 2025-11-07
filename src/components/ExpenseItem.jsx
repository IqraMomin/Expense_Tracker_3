import React from 'react'

function ExpenseItem(props) {
    return (
        <li>
            <h3>{props.expense}</h3>
            <p>{props.description}</p>
            <p>{props.amount}</p>

        </li>
    )
}

export default ExpenseItem
