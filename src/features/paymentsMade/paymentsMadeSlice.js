import { createSlice } from '@reduxjs/toolkit';

const initialState = ["non"]

export const paymentsMadeSlice = createSlice({
    name: 'paymentsMade',
    initialState,
    reducers: {
        addPayer: (state, action)=> state.push(action.payload)
    }
})

export const {addPayer} = paymentsMadeSlice.actions;
export const selectPayers = (state) => state.paymentsMade

export default paymentsMadeSlice.reducer