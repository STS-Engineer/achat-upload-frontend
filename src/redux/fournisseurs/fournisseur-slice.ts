import { createSlice } from "@reduxjs/toolkit";
import { Fournisseurstate } from "./fournisseur-slice-types";


const initialState : Fournisseurstate    = {
    fournisseursList:[],
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
      state.fournisseursList.push(action.payload);
      state.toast = 'Fournisseur ajouté avec succès';
      state.success = true;
      state.error = false;
    },
    addFournisseurFailure(state, action) {
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
    addFournisseurFailure
} = Fournisseurslice.actions;

export default Fournisseurslice.reducer;