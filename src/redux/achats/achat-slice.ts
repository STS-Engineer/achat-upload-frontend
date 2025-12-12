import { createSlice } from "@reduxjs/toolkit";
import { Achatstate } from "./achat-slice-types";


const initialState : Achatstate    = {
    achatsList:[],
    success : false,
    error: false,
    toast: ''
}

const Achatslice = createSlice({
  name: 'achats',
  initialState,
  reducers: {
    getAchatsRequest(state) {
      state.success = false;
      state.error = false;
    },
    getAchatsSuccess(state, action) {
      state.achatsList = action.payload;
      state.success = true;
      state.error = false;
    },
    getAchatsFailure(state) {
      state.success = false;
      state.error = true;
    },
    uploadExcelFileRequest(state) {
      state.success = false;
      state.error = false;
    },
    uploadExcelFileSuccess(state) {
      state.toast = 'File uploaded successfully';
      state.success = true;
      state.error = false;
    },
    uploadExcelFileFailure(state) {
      state.toast = "Error uploading file";
      state.success = false;
      state.error = true;
    }
  }
})

export const {
    getAchatsRequest,
    getAchatsSuccess,
    getAchatsFailure,
    uploadExcelFileRequest,
    uploadExcelFileSuccess,
    uploadExcelFileFailure
} = Achatslice.actions;

export default Achatslice.reducer;