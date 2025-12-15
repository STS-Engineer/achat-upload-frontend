import { createSlice } from "@reduxjs/toolkit";
import { Managerstate } from "./manager-slice-types";


const initialState : Managerstate    = {
    managerList:[],
    success : false,
    error: false,
    toast: ''
}

const Managerslice = createSlice({
  name: 'manager',
  initialState,
  reducers: {
    getManagersRequest(state) {
      state.success = false;
      state.error = false;
    },
    getManagersSuccess(state, action) {
      state.managerList = action.payload;
      state.success = true;
      state.error = false;
    },
    getManagersFailure(state) {
      state.success = false;
      state.error = true;
    },
  }
})

export const {
    getManagersRequest,
    getManagersSuccess,
    getManagersFailure,
} = Managerslice.actions;

export default Managerslice.reducer;