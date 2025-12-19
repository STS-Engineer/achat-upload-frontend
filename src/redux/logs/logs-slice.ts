import { createSlice } from "@reduxjs/toolkit";
import { Logstate } from "./logs-slice-types";


const initialState : Logstate    = {
    logsList:[],
    success : false,
    error: false,
    toast: ''
}

const Logslice = createSlice({
  name: 'logs',
  initialState,
  reducers: {
    getLogsRequest(state) {
      state.success = false;
      state.error = false;
    },
    getLogsSuccess(state, action) {
      state.logsList = action.payload;
      state.success = true;
      state.error = false;
    },
    getLogsFailure(state) {
      state.success = false;
      state.error = true;
    },
    extractExcelDataRequest(state) {
      state.success = false;
      state.error = false;
    },
    extractExcelDataSuccess(state) {
      state.success = true;
      state.error = false;
      state.toast = 'excel generated successfully';
    },
    extractExcelDataFailure(state) {
      state.success = false;
      state.error = true;
      state.toast = 'error extracting excel data';
    },
    resetLogsState(state) {
      state.success = false;
      state.error = false;
      state.toast = '';
    },
  }
})

export const {
    getLogsRequest,
    getLogsSuccess,
    getLogsFailure,
    extractExcelDataRequest,
    extractExcelDataSuccess,
    extractExcelDataFailure,
    resetLogsState
} = Logslice.actions;

export default Logslice.reducer;