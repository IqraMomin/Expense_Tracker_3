import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState = {
    expenseList: [],
    totalExpense:0
}

const expenseSlice = createSlice({
    name: 'expense',
    initialState: initialExpenseState,
    reducers: {
        addExpense: (state, action) => { 
            state.expenseList=state.expenseList.concat(action.payload);
            state.totalExpense = state.totalExpense+Number(action.payload.amount)
        },
        removeExpense: (state,action) => { 
            const itemToRemove = state.expenseList.find(ele=>ele.id===action.payload);
            if(itemToRemove){
                state.totalExpense = state.totalExpense-Number(itemToRemove.amount);
            }
            state.expenseList = state.expenseList.filter(ele=>{
                return ele.id!==action.payload
            });
            console.log(state.totalExpense);
        },
        editExpense: (state,action) => { 
            const existingItem = state.expenseList.find(ele=>ele.id===action.payload.id);
            if(existingItem){
                state.totalExpense = state.totalExpense-Number(existingItem.amount);
            }
            state.expenseList = state.expenseList.map(ele=>{
                return ele.id===action.payload.id ? {...ele,...action.payload.updatedItem}:ele
            })
            state.totalExpense +=Number(action.payload.updatedItem.amount);
            console.log(state.totalExpense);
        },
        setExpenses:(state, action) =>{
            state.expenseList = action.payload;
            state.totalExpense = action.payload.reduce((sum,item)=>{
                return sum+Number(item.amount)
            },0);
          }
    }
});
export const expenseActions = expenseSlice.actions;
export default expenseSlice.reducer;