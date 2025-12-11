import { createSlice } from "@reduxjs/toolkit";
import { Transactionstate } from "./transaction-slice-types";


const initialState : Transactionstate    = {
    transactionsList:[],
    success : false,
    error: false,
    toast: ''
}

const Transactionslice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    getTransactionsRequest(state) {
      state.success = false;
      state.error = false;
    },
    getTransactionsSuccess(state, action) {
      state.transactionsList = action.payload;
      state.success = true;
      state.error = false;
    },
    getTransactionsFailure(state) {
      state.success = false;
      state.error = true;
    },
    addTransactionRequest(state) {
      state.success = false;
      state.error = false;
    },
    addTransactionSuccess(state, action) {
      state.transactionsList.items.push(action.payload);
      state.toast = 'Transaction ajouté avec succès';
      state.success = true;
      state.error = false;
    },
    addTransactionFailure(state, action) {
      state.toast = action.payload.detail;
      state.success = false;
      state.error = true;
    },
    resetTransactionState(state) {
      state.success = false;
      state.error = false;
      state.toast = '';
    },
    sendEmailRequest(state) {
      state.success = false;
      state.error = false;
    },
    sendEmailSuccess(state) {
      state.toast = 'Email envoyé avec succès';
      state.success = true;
      state.error = false;
    },
    sendEmailFailure(state, action) {
      state.toast = action.payload.detail;
      state.success = false;
      state.error = true;
    }
  }
})

export const {
    getTransactionsRequest,
    getTransactionsSuccess,
    getTransactionsFailure,
    addTransactionRequest,
    addTransactionSuccess,
    addTransactionFailure,
    resetTransactionState,
    sendEmailRequest,
    sendEmailSuccess,
    sendEmailFailure
} = Transactionslice.actions;

export default Transactionslice.reducer;