import React from 'react'

function ExpenseItem(props) {
    return (
        <li>
            <h3>{props.category}</h3>
            <p>{props.title}</p>
            <p>{props.amount}</p>

        </li>
    )
}

export default ExpenseItem
