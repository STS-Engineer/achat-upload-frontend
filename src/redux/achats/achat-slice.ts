import { createSlice } from "@reduxjs/toolkit";
import { Achat, Achatstate } from "./achat-slice-types";

const initialState : Achatstate    = {
    achatsList: {
      achats: [],
      page: 1,
      per_page: 5,
      total: 0,
      total_pages: 1,
    },
    success : false,
    error: false,
    toast: '',
    requests: {}
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
      state.requests= {
        ...state.requests,
        uploadExcelFileRequest: new Date().toISOString()
      };
    },
    uploadExcelFileSuccess(state) {
      state.toast = 'File uploaded successfully';
      state.success = true;
      state.error = false;
      state.requests= {
        ...state.requests,
        uploadExcelFileSuccess: new Date().toISOString()
      };
    },
    uploadExcelFileFailure(state, action) {
      state.toast = action.payload.detail || 'something went wrong';
      state.success = false;
      state.error = true;
      state.requests= {
        ...state.requests,
        uploadExcelFileFailure: new Date().toISOString()
      };
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
    },
    clearToast(state) {
      state.toast = '';
    },
    resetAchatState(state) {
      state.success = false;
      state.error = false;
      state.toast = '';
      state.requests = {};
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
    deleteAchatFailure,
    clearToast,
    resetAchatState
} = Achatslice.actions;

export default Achatslice.reducer;