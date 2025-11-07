import React, { useEffect, useReducer } from 'react'
import axios from 'axios'

const ExpenseContext = React.createContext({
    expenseList:[],
    addExpense:(item)=>{},
    removeExpense:(id)=>{},
    editExpense:(item)=>{}
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
    if(action.type==="REMOVE"){
        const updatedList=state.expenseList.filter(ele=>{
            return ele.id!==action.id
        });
        return{
            expenseList:updatedList
        }
    }
    if(action.type==="EDIT"){
        return {
            expenseList:state.expenseList.map(ele=>{
                return ele.id===action.id ? {...ele,...action.updatedItem}:ele
            })
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
    try{
        const response = await axios.post("https://expense-tracker-e3353-default-rtdb.firebaseio.com/expenses.json",item);
        const newItem = {
            id:response.data.name,
            ...item
        }
        dispatchExpense({type:"ADD",item:newItem});

    }catch(err){
        console.log(err);

    }

}
const removeExpenseHanlder = async(id)=>{
    try{
        const response = await axios.delete(`https://expense-tracker-e3353-default-rtdb.firebaseio.com/expenses/${id}.json`);
        dispatchExpense({type:"REMOVE",id});
        console.log("Expense Successfully deleted");

    }catch(err){
        console.log(err);
    }
    

}
const editExpenseHandler =async (id,updatedItem)=>{
    try{
        const response = await axios.put(`https://expense-tracker-e3353-default-rtdb.firebaseio.com/expenses/${id}.json`,updatedItem);
        dispatchExpense({type:"EDIT",id,updatedItem});
    }catch(err){
        console.log(err);
    }

}

    const contextValue={
        expenseList:expense.expenseList,
        addExpense:addExpenseHandler,
        removeExpense:removeExpenseHanlder,
        editExpense:editExpenseHandler
        
    }

    return <ExpenseContext.Provider value={contextValue}>
        {props.children}
    </ExpenseContext.Provider>
}

export default ExpenseContext
