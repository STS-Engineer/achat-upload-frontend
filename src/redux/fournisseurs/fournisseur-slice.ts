import { createSlice } from "@reduxjs/toolkit";
import { Fournisseur, Fournisseurstate } from "./fournisseur-slice-types";


const initialState : Fournisseurstate    = {
    fournisseursList:{
      items: [],
      page: 1,
      per_page: 5,
      total: 0,
      total_pages: 1,
    },
    success : false,
    error: false,
    toast: ''
}

const Fournisseurslice = createSlice({
  name: 'fournisseur',
  initialState,
  reducers: {
    getFournisseursRequest(state) {
      state.success = false;
      state.error = false;
    },
    getFournisseursSuccess(state, action) {
      state.fournisseursList = action.payload;
      state.success = true;
      state.error = false;
    },
    getFournisseursFailure(state) {
      state.success = false;
      state.error = true;
    },
    addFournisseurRequest(state) {
      state.success = false;
      state.error = false;
    },
    addFournisseurSuccess(state, action) {
      state.fournisseursList?.items.push(action.payload);
      state.toast = 'Supplier added successfully';
      state.success = true;
      state.error = false;
    },
    addFournisseurFailure(state, action) {
      state.toast = action.payload.detail;
      state.success = false;
      state.error = true;
    },
    resetFournisseurState(state) {
      state.toast = '';
      state.success = false;
      state.error = false;
    },
    updateFournisseurRequest(state) {
      state.success = false;
      state.error = false;
    },
    updateFournisseurSuccess(state, action) {
      const index = state.fournisseursList.items.findIndex(
        (fournisseur: Fournisseur) => fournisseur.supplier_id === action.payload.supplier_id
      );
      if (index !== -1) {
        state.fournisseursList.items[index] = action.payload;
      }
      state.toast = 'Supplier updated successfully';
      state.success = true;
      state.error = false;
    },
    updateFournisseurFailure(state, action) {
      state.toast = action.payload.detail;
      state.success = false;
      state.error = true;
    },
    deleteFournisseurRequest(state) {
      state.success = false;
      state.error = false;
    },
    deleteFournisseurSuccess(state, action) {
      state.fournisseursList.items = state.fournisseursList.items.filter(
        (fournisseur: Fournisseur) => fournisseur.supplier_id !== action.payload.id
      );
      state.toast = 'Supplier deleted successfully';
      state.success = true;
      state.error = false;
    },
    deleteFournisseurFailure(state, action) {
      state.toast = action.payload.detail;
      state.success = false;
      state.error = true;
    }
  }
})

export const {
    getFournisseursRequest,
    getFournisseursSuccess,
    getFournisseursFailure,
    addFournisseurRequest,
    addFournisseurSuccess,
    addFournisseurFailure,
    resetFournisseurState,
    updateFournisseurRequest,
    updateFournisseurSuccess,
    updateFournisseurFailure,
    deleteFournisseurRequest,
    deleteFournisseurSuccess,
    deleteFournisseurFailure
} = Fournisseurslice.actions;

export default Fournisseurslice.reducer;