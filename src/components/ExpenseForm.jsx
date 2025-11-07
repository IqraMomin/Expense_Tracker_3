import React, { useRef ,useContext, useEffect} from 'react'
import ExpenseContext from '../store/expense-context';

function ExpenseForm({editExpense,onEditComplete}) {
    const amountInputRef = useRef();
    const titleInputRef = useRef();
    const optionInputRef = useRef();
    const expenseCtx = useContext(ExpenseContext);

    useEffect(()=>{
        if(editExpense){
            amountInputRef.current.value=editExpense.amount;
            titleInputRef.current.value=editExpense.title;
            optionInputRef.current.value = editExpense.category||""           

        }else{
            amountInputRef.current.value="";
            titleInputRef.current.value="";
            
        }
    },[editExpense]);

    const formSubmitHandler = (event)=>{
        event.preventDefault();
        const data = {
            amount:amountInputRef.current.value,
            title:titleInputRef.current.value,
            category:optionInputRef.current.value
        }
        if(editExpense){
            expenseCtx.editExpense(editExpense.id,data);
            onEditComplete();
        }else{
            expenseCtx.addExpense(data);
        }
       
        titleInputRef.current.value="";
        amountInputRef.current.value="";
    }
    return (
        <div>
            <form onSubmit={formSubmitHandler}>
                <label htmlFor="amount">Amount:</label>
                <input id='amount' type='number' ref={amountInputRef}/>
                <label htmlFor="description">Description</label>
                <input type='text' id='description' ref={titleInputRef}/>
                <select name="expense" id="expense" ref={optionInputRef}>
                    <option value="food">Food</option>
                    <option value="pretol">Pretol</option>
                    <option value="salary">Salary</option>
                </select>
                <button>{editExpense ?"Update Expense": "Add Expense"}</button>
            </form>
            
        </div>
    )
}

export default ExpenseForm
