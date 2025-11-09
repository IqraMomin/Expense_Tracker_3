import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState = {
    expenseList: []
}

const expenseSlice = createSlice({
    name: 'expense',
    initialState: initialExpenseState,
    reducers: {
        addExpense: (state, action) => { 
            state.expenseList=state.expenseList.concat(action.payload);
        },
        removeExpense: (state,action) => { 
            state.expenseList = state.expenseList.filter(ele=>{
                return ele.id!==action.payload
            });
        },
        editExpense: (state,action) => { 
            state.expenseList = state.expenseList.map(ele=>{
                return ele.id===action.payload.id ? {...ele,...action.payload.updatedItem}:ele
            })
        },
        setExpenses:(state, action) =>{
            state.expenseList = action.payload;
          }
    }
});
export const expenseActions = expenseSlice.actions;
export default expenseSlice.reducer;