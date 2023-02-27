import { createSlice } from '@reduxjs/toolkit';

const initialState = [{name: "", amount: 0}]

export const paymentsMadeSlice = createSlice({

    // name hre is prefix for general action types created
    name: 'paymentsMade',
    initialState,
    reducers: {
        addPayer: (state, action)=> { state.push(action.payload)}
    }
})

export const {addPayer} = paymentsMadeSlice.actions;
export const selectPayers = (state) => state.paymentsMade

export default paymentsMadeSlice.reducer