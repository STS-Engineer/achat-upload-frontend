import axiosInstance from "../../services/axiosInstance";
import { addFournisseurFailure, addFournisseurRequest, addFournisseurSuccess, getFournisseursFailure, getFournisseursRequest, getFournisseursSuccess } from "./fournisseur-slice";
import { AddFournisseur, GetFournisseurs } from "./fournisseur-types";


export const getFournisseurs: GetFournisseurs = async (dispatch) => {
  dispatch(getFournisseursRequest());
  const url = `/fournisseur/all`;

  try {
    let response = await axiosInstance.get(url);
    dispatch(getFournisseursSuccess(response.data));
    return true;
  } catch (error: any) {
    const { data } = error.response;
    dispatch(getFournisseursFailure(data));
  }

  return false;
};

export const addFournisseur: AddFournisseur = async (data, dispatch) => {
  dispatch(addFournisseurRequest());
  try {
    const response = await axiosInstance.post("/fournisseur/add-fournisseur", data);

    dispatch(addFournisseurSuccess(response.data));
    return true;
  } catch (error: any) {
    dispatch(addFournisseurFailure(error.response?.data));
    return false;
  }
};
