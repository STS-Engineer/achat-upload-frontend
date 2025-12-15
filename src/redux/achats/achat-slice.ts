import { createSlice } from "@reduxjs/toolkit";
import { Achat, Achatstate } from "./achat-slice-types";

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
    uploadExcelFileFailure(state, action) {
      state.toast = action.payload.detail;
      state.success = false;
      state.error = true;
    },
    updateAchatRequest(state) {
          state.success = false;
          state.error = false;
    },
    updateAchatSuccess(state, action) {
      const index = state.achatsList.achats.findIndex(
        (achat: Achat) => achat.id === action.payload.id
      );
      if (index !== -1) {
        state.achatsList.achats[index] = action.payload;
      }
      state.toast = 'purchase updated successfully';
      state.success = true;
      state.error = false;
    },
    updateAchatFailure(state, action) {
      state.toast = action.payload.detail;
      state.success = false;
      state.error = true;
    },
    deleteAchatRequest(state) {
      state.success = false;
      state.error = false;
    },
    deleteAchatSuccess(state, action) {
      state.achatsList.achats = state.achatsList.achats.filter(
        (achat: Achat) => achat.id !== action.payload.id
      );
      state.toast = 'purchase deleted successfully';
      state.success = true;
      state.error = false;
    },
    deleteAchatFailure(state, action) {
      state.toast = action.payload.detail;
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
    uploadExcelFileFailure,
    updateAchatRequest,
    updateAchatSuccess,
    updateAchatFailure,
    deleteAchatRequest,
    deleteAchatSuccess,
    deleteAchatFailure
} = Achatslice.actions;

export default Achatslice.reducer;