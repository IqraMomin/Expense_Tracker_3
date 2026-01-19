import { createSlice } from "@reduxjs/toolkit";
import { fetchExpenses ,removeExpense,addExpense,editExpenses} from "./expense-actions";

const initialExpenseState = {
    loading:false,
    error:null,
    expenseList: [],
    totalExpense:0
}

const expenseSlice = createSlice({
    name: 'expense',
    initialState: initialExpenseState,
    reducers: {},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchExpenses.pending,(state)=>{
            state.loading = true
        })
        .addCase(fetchExpenses.fulfilled,(state,action)=>{
            state.loading = false;
            state.expenseList = action.payload;
            state.totalExpense = action.payload.reduce(
                (sum, item) => sum + Number(item.amount),
                0
              );
        })
        .addCase(fetchExpenses.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(removeExpense.pending,(state)=>{
            state.loading = true
        })
        .addCase(removeExpense.fulfilled,(state,action)=>{
            state.loading = false;
            const itemToRemove = state.expenseList.find(ele=>ele.id===action.payload);
            if(itemToRemove){
                state.totalExpense = state.totalExpense-Number(itemToRemove.amount);
            }
            state.expenseList = state.expenseList.filter(ele=>{
                return ele.id!==action.payload
            });
        })
        .addCase(removeExpense.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(addExpense.pending,(state)=>{
            state.loading = true
        })
        .addCase(addExpense.fulfilled,(state,action)=>{
            state.expenseList=state.expenseList.concat(action.payload);
            state.totalExpense = state.totalExpense+Number(action.payload.amount);
        })
        .addCase(addExpense.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(editExpenses.pending,(state)=>{
            state.loading = true
        })
        .addCase(editExpenses.fulfilled,(state,action)=>{
            const existingItem = state.expenseList.find(ele=>ele.id===action.payload.id);
            if(existingItem){
                state.totalExpense = state.totalExpense-Number(existingItem.amount);
            }
            state.expenseList = state.expenseList.map(ele=>{
                return ele.id===action.payload.id ? {...ele,...action.payload.updatedItem}:ele
            })
            state.totalExpense +=Number(action.payload.updatedItem.amount);
        })
        .addCase(editExpenses.rejected,(state)=>{
            state.loading = false;
            state.error = action.payload;
        })
    }
});
export const expenseActions = expenseSlice.actions;
export default expenseSlice.reducer;