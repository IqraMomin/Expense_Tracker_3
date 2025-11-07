import React, { useReducer } from 'react'

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
    return state
}
export const ExpenseProvider=(props)=>{
const [expense,dispatchExpense] = useReducer(reducer,defaultValue);

const addExpenseHandler = (item)=>{
    dispatchExpense({type:"ADD",item})

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
