import { createSlice } from "@reduxjs/toolkit";
import { Documentstate } from "./document-slice-types";


const initialState : Documentstate    = {
    documentsList:[],
    success : false,
    error: false,
    toast: ''
}

const Documentslice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    getDocumentsRequest(state) {
      state.success = false;
      state.error = false;
    },
    getDocumentsSuccess(state, action) {
      state.documentsList = action.payload;
      state.success = true;
      state.error = false;
    },
    getDocumentsFailure(state) {
      state.success = false;
      state.error = true;
    },
  }
})

export const {
    getDocumentsRequest,
    getDocumentsSuccess,
    getDocumentsFailure,
} = Documentslice.actions;

export default Documentslice.reducer;