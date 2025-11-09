import { createSlice } from "@reduxjs/toolkit";

const initialThemeState = {
    theme:false,
    activatePremium:false
}

const themeSlice = createSlice({
    name:"theme",
    initialState:initialThemeState,
    reducers:{
        changeTheme:(state)=>{
            state.theme = !state.theme
        },
        activatePremium:(state)=>{
            state.activatePremium = true
        }
    }
});

export const themeActions= themeSlice.actions;
export default themeSlice.reducer;