import React, { useRef ,useContext} from 'react'
import ExpenseContext from '../store/expense-context';

function ExpenseForm() {
    const amountInputRef = useRef();
    const descriptionInputRef = useRef();
    const optionInputRef = useRef();
    const expenseCtx = useContext(ExpenseContext);

    const formSubmitHandler = (event)=>{
        event.preventDefault();
        const data = {
            id:Date.now().toString(),
            amount:amountInputRef.current.value,
            description:descriptionInputRef.current.value,
            expense:optionInputRef.current.value
        }
        expenseCtx.addExpense(data);
    }
    return (
        <div>
            <form onSubmit={formSubmitHandler}>
                <label htmlFor="amount">Amount:</label>
                <input id='amount' type='number' ref={amountInputRef}/>
                <label htmlFor="description">Description</label>
                <input type='text' id='description' ref={descriptionInputRef}/>
                <select name="expense" id="expense" ref={optionInputRef}>
                    <option value="food">Food</option>
                    <option value="pretol">Pretol</option>
                    <option value="salary">Salary</option>
                </select>
                <button>Add Expense</button>
            </form>
            
        </div>
    )
}

export default ExpenseForm
