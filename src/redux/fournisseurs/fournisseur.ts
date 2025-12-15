import axiosInstance from "../../services/axiosInstance";
import { addFournisseurFailure, addFournisseurRequest, addFournisseurSuccess, deleteFournisseurFailure, deleteFournisseurRequest, deleteFournisseurSuccess, getFournisseursFailure, getFournisseursRequest, getFournisseursSuccess, updateFournisseurFailure, updateFournisseurRequest, updateFournisseurSuccess } from "./fournisseur-slice";
import { AddFournisseur, GetFournisseurs, UpdateFournisseur } from "./fournisseur-types";


export const getFournisseurs: GetFournisseurs = async (page, per_page, dispatch) => {
  dispatch(getFournisseursRequest());
  const url = `/fournisseur/all?page=${page}&per_page=${per_page}`;

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

export const updateFournisseur: UpdateFournisseur = async (fournisseur_id, data, dispatch) => {
  dispatch(updateFournisseurRequest());
  try {
    const response = await axiosInstance.put(`/fournisseur/update/${fournisseur_id}`, data);

    dispatch(updateFournisseurSuccess(response.data));
    return true;
  } catch (error: any) {
    dispatch(updateFournisseurFailure(error.response?.data));
    return false;
  }
};

export const deleteFournisseur = async (fournisseur_id: number, dispatch: any) => {
  dispatch(deleteFournisseurRequest());
  try {
    const response = await axiosInstance.delete(`/fournisseur/delete/${fournisseur_id}`);

    dispatch(deleteFournisseurSuccess(response.data));
    return true;
  } catch (error: any) {
    dispatch(deleteFournisseurFailure(error.response?.data));
    return false;
  }
};