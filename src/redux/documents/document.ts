import axiosInstance from "../../services/axiosInstance";
import { getDocumentsFailure, getDocumentsRequest, getDocumentsSuccess } from "./document-slice";
import { GetDocuments } from "./document-types";


export const getDocuments: GetDocuments = async (
  dispatch,
  page,
  per_page
) => {
  dispatch(getDocumentsRequest());

  let url = "/document/all";

  if (page !== undefined && per_page !== undefined) {
    url += `?page=${page}&per_page=${per_page}`;
  }

  try {
    const response = await axiosInstance.get(url);
    dispatch(getDocumentsSuccess(response.data));
    return true;
  } catch (error: any) {
    dispatch(getDocumentsFailure(error.response?.data));
    return false;
  }
};