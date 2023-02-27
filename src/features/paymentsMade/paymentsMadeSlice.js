import { createSlice } from '@reduxjs/toolkit';

const initialState = []

export const paymentsMadeSlice = createSlice({
    name: 'paymentsMade',
    initialState,
    reducers: {
        addPayer: (state, action)=> state.push(action.payload)
    }
})

export const {addPayer} = paymentsMadeSlice.actions;
export const selectPayers = (state) => state.paymentsMade.value

export default paymentsMadeSlice.reducer