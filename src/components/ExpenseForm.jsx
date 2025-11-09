import React, { useRef , useEffect} from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { expenseActions } from '../store/expenseSlice';

function ExpenseForm({editExpense,onEditComplete}) {
    const amountInputRef = useRef();
    const titleInputRef = useRef();
    const optionInputRef = useRef();
    const dispatch = useDispatch();


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
            editExpenseHandler(editExpense.id,data);
            onEditComplete();
        }else{
            addExpenseHandler(data);
        }
       
        titleInputRef.current.value="";
        amountInputRef.current.value="";
    }

    const addExpenseHandler = async (item) => {
        const res = await axios.post(
          "https://expense-tracker-e3353-default-rtdb.firebaseio.com/expenses.json",
          item
        );
        const newItem = { id: res.data.name, ...item };
        dispatch(expenseActions.addExpense(newItem));
      };
    
      const editExpenseHandler = async (id, updatedItem) => {
        await axios.put(
          `https://expense-tracker-e3353-default-rtdb.firebaseio.com/expenses/${id}.json`,
          updatedItem
        );
        dispatch(expenseActions.editExpense({ id, updatedItem }));
      };
    
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
