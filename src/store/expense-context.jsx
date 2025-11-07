import React, { useEffect, useReducer } from 'react'
import axios from 'axios'

const ExpenseContext = React.createContext({
    expenseList:[],
    addExpense:(item)=>{},
    removeExpense:(id)=>{}
})
const defaultValue = {
    expenseList:[]
}
const reducer = (state,action)=>{
    if(action.type==="ADD"){
        const updatedList = state.expenseList.concat(action.item);

        return{
            expenseList:updatedList
        }
    }
    if(action.type==="FETCH"){
        return {
            ...state,
            expenseList:action.item
        }
    }
    return state
}
export const ExpenseProvider=(props)=>{
const [expense,dispatchExpense] = useReducer(reducer,defaultValue);

useEffect(()=>{
    const fetchExpense = async()=>{
        try{
            const response = await axios.get("https://expense-tracker-e3353-default-rtdb.firebaseio.com/expenses.json")
           const data = response.data;
           const loadedExpense = [];
           for(const key in data){
            loadedExpense.push({
                id:key,
                ...data[key]
            })
           }
            dispatchExpense({type:"FETCH",item:loadedExpense});
        }catch(err){
            console.log(err);
        }
    }
    fetchExpense()
},[])

const addExpenseHandler = async(item)=>{
    dispatchExpense({type:"ADD",item});
    try{
        const response = await axios.post("https://expense-tracker-e3353-default-rtdb.firebaseio.com/expenses.json",item);
        console.log(response.data);

    }catch(err){
        console.log(err);

    }

}
const removeExpenseHanlder = (id)=>{
    console.log(id);
    

}

    const contextValue={
        expenseList:expense.expenseList,
        addExpense:addExpenseHandler,
        removeExpense:removeExpenseHanlder
        
    }

    return <ExpenseContext.Provider value={contextValue}>
        {props.children}
    </ExpenseContext.Provider>
}

export default ExpenseContext
