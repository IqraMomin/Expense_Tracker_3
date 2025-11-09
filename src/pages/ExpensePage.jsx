import React, { Fragment } from 'react'
import Expense from '../components/Expense'
import AuthHeader from '../components/UI/AuthHeader'

function ExpensePage() {
    return (
        <Fragment>
            <AuthHeader/>
            <Expense />
        </Fragment>

    )
}

export default ExpensePage
