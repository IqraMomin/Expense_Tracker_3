import React, { useState } from 'react'
import ExpenseForm from './ExpenseForm'
import ExpenseList from './ExpenseList'
import { Col, Row } from 'react-bootstrap';
import "./Expense.css"

function Expense() {
    const [editExpense,setEditExpense]=useState(null);
    return (
            <Row className='gx-4' style={{height:"100%"}}>
                <h2>Expenses</h2>
                <Col md={12} className="form-col" style={{backgroundColor: "#bc9df6"}}>
                <ExpenseForm editExpense={editExpense} onEditComplete={()=>{setEditExpense(null)}}/>          
                </Col>
                <Col md={12}>
                <h2>All Expenses</h2>
                <ExpenseList onEdit={(exp)=>{setEditExpense(exp)}}/>
                </Col>
            </Row>
    )
}

export default Expense
