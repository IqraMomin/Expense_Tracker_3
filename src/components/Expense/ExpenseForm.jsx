import React, { useRef, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { editExpenses } from '../../store/expense-actions';
import "./ExpenseForm.css";
import { addExpense } from '../../store/expense-actions';

function ExpenseForm({ editExpense, onEditComplete }) {
    const amountInputRef = useRef();
    const titleInputRef = useRef();
    const optionInputRef = useRef();
    const [date, setDate] = useState("");
    const dispatch = useDispatch();


    useEffect(() => {
        if (editExpense) {
            amountInputRef.current.value = editExpense.amount;
            titleInputRef.current.value = editExpense.title;
            optionInputRef.current.value = editExpense.category || "",
            setDate(editExpense.date);

        } else {
            amountInputRef.current.value = "";
            titleInputRef.current.value = "";
            optionInputRef.current.value = "",
            setDate("");


        }
    }, [editExpense]);

    const formSubmitHandler = (event) => {
        event.preventDefault();
        const data = {
            amount: amountInputRef.current.value,
            title: titleInputRef.current.value,
            category: optionInputRef.current.value,
            date,
            month: new Date(date).toLocaleString("en-US", { month: "short" }),
            year: new Date(date).getFullYear()
        }
        if (editExpense) {
            editExpenseHandler(editExpense.id, data);
            onEditComplete();
        } else {
            addExpenseHandler(data);
        }

        titleInputRef.current.value = "";
        amountInputRef.current.value = "";
        setDate("");
    }

    const addExpenseHandler = (item) => {
        dispatch(addExpense(item));
    };

    const editExpenseHandler = (id, updatedItem) => {
        const editItem = {
            id,updatedItem
        }
        dispatch(editExpenses(editItem));
    };

    return (
        <form onSubmit={formSubmitHandler}>
            <div className='new-expense-controls'>
                <div className='new-expense-heading'>
                    Add Expense
                </div>
                <div className='new-expense-control'>
                    <label htmlFor="amount">Amount:</label>
                    <input id='amount' type='number' ref={amountInputRef} />

                </div>
                <div className='new-expense-control'>
                    <label htmlFor="description">Description</label>
                    <input type='text' id='description' ref={titleInputRef} />

                </div>
                <div className='new-expense-control'>
                <label htmlFor="expense">Category</label>
                    <select name="expense" id="expense" ref={optionInputRef} className='my-select'>
                    <option value="Groceries">Groceries</option>
                    <option value="Travel">Travel</option>                        
                        <option value="Utilities">Utilities</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Health">Health</option>
                    </select>
                    
                </div>
                <div className='new-expense-control'>
                <label htmlFor="date">Date</label>                   
                <input type='date' id='date' value={date} onChange={(e) => { setDate(e.target.value) }} />
                </div>
                <br/>
                <div className='new-expense-actions'>
                    <button>{editExpense ? "Update Expense" : "Add Expense"}</button>
                    {editExpense && <button onClick={onEditComplete}>Cancel</button>}
                </div>
            </div>
        </form>
    )
}

export default ExpenseForm
