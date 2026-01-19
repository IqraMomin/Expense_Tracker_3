import { createAsyncThunk } from "@reduxjs/toolkit";
import { expenseActions } from "./expenseSlice";
import axios from "axios";

export const fetchExpenses = createAsyncThunk("expense/fetchExpenses",async(_,thunkAPI)=>{    
        try {
            const response = await axios.get(
              "https://expense-tracker-e3353-default-rtdb.firebaseio.com/expenses.json"
            );
            const data = response.data;
            const loadedExpenses = [];
    
            for (const key in data) {
              loadedExpenses.push({ id: key, ...data[key] });
            }
            return loadedExpenses;
            //dispatch(expenseActions.setExpenses(loadedExpenses));
          } catch (err) {
            return thunkAPI.rejectWithValue("Error fetching expenses");
          }    
})

export const removeExpense= createAsyncThunk("expense/removeExpense",
async(id,thunkAPI)=>{
  try{
    await axios.delete(
      `https://expense-tracker-e3353-default-rtdb.firebaseio.com/expenses/${id}.json`
    );
    return id;
  }
  catch(err){
    return thunkAPI.rejectWithValue("Failed deleting the data");
  }
})

export const addExpense = createAsyncThunk("expense/addExpense",async(item,thunkAPI)=>{
  try{
    const res = await axios.post(
      "https://expense-tracker-e3353-default-rtdb.firebaseio.com/expenses.json",
      item
  );
  const newItem = { id: res.data.name, ...item };
  return newItem;
    }catch(err){
      return thunkAPI.rejectWithValue("Failed to Add Expense");
    }
})

export const editExpenses =createAsyncThunk("expense/editExpenses",async({id,updatedItem},thunkAPI)=>{
  try{
    await axios.put(
      `https://expense-tracker-e3353-default-rtdb.firebaseio.com/expenses/${id}.json`,
      updatedItem
  );
  return { id, updatedItem }
    }catch(err){
      return thunkAPI.rejectWithValue("Failed to Update Expense");
    }
}
)
