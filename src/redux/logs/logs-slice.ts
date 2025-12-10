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
    }
  }
})

export const {
    getLogsRequest,
    getLogsSuccess,
    getLogsFailure,
} = Logslice.actions;

export default Logslice.reducer;