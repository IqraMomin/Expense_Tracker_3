import React, { useState } from 'react'
import ExpenseForm from './ExpenseForm'
import ExpenseList from './ExpenseList'
import { Col, Row } from 'react-bootstrap';
import "./Expense.css"
import { useSelector } from 'react-redux';

function Expense() {
    const [editExpense,setEditExpense]=useState(null);
    const [openForm,setOpenForm] = useState(false);
    const [search,setSearch] = useState("");
    const allExpense = useSelector(state=>state.expense.expenseList) || [];
    const filteredExpense = allExpense.filter(exp => {
        const term = search.toLowerCase();
        return (
          (exp.category ?? "").toLowerCase().includes(term) ||
          (exp.title ?? "").toLowerCase().includes(term)
        );
      });

    return (
            <Row className='gx-4' style={{height:"100%"}}>
                <h2>Expenses</h2>
                <Col md={12} className="form-col" style={{backgroundColor: "#bc9df6"}}>
                {!openForm && 
                <div>
                    <button onClick={()=>{setOpenForm(true)}}>Add Expense</button>
                </div>
                 }   
                {openForm && <ExpenseForm 
                onClose={()=>{
                    setOpenForm(false)
                setEditExpense(null)}}
                editExpense={editExpense} 
                onEditComplete={()=>{setEditExpense(null)}}/>}          
                </Col>
                <Col md={12}>
                    <div className='all-expense-div'>
                    <h2>All Expenses</h2>
                    <input value={search} 
                    placeholder='Search By Category, Description...'
                    onChange={(e)=>{setSearch(e.target.value)}}/>
                    </div>
                
                <ExpenseList 
                expenseList={filteredExpense}
                onEdit={(exp)=>{setEditExpense(exp)}}/>
                </Col>
            </Row>
    )
}

export default Expense
