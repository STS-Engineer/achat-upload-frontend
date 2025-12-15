import axiosInstance from "../../services/axiosInstance";
import { deleteAchatRequest, deleteAchatFailure, deleteAchatSuccess, getAchatsFailure, getAchatsRequest, getAchatsSuccess, updateAchatFailure, updateAchatRequest, updateAchatSuccess, uploadExcelFileFailure, uploadExcelFileRequest, uploadExcelFileSuccess } from "./achat-slice";
import { GetAchats, UpdateAchat, UploadExcelFile } from "./achat-types";


export const getachats: GetAchats = async (page, per_page, dispatch) => {
  dispatch(getAchatsRequest());
  const url = `/achat/all?page=${page}&per_page=${per_page}`;

  try {
    let response = await axiosInstance.get(url);
    dispatch(getAchatsSuccess(response.data));
    return true;
  } catch (error: any) {
    const { data } = error.response;
    dispatch(getAchatsFailure(data));
  }

  return false;
};

export const uploadExcel: UploadExcelFile = async (formData, dispatch) => {
  dispatch(uploadExcelFileRequest());

  try {
    const response = await axiosInstance.post("/achat/upload-file", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    dispatch(uploadExcelFileSuccess(response.data));
    return true;
  } catch (error: any) {
    dispatch(uploadExcelFileFailure(error.response?.data));
    return false;
  }
};

export const updateAchat: UpdateAchat = async (achat_id, data, dispatch) => {
  dispatch(updateAchatRequest());
  try {
    const response = await axiosInstance.put(`/achat/update/${achat_id}`, data);

    dispatch(updateAchatSuccess(response.data));
    return true;
  } catch (error: any) {
    dispatch(updateAchatFailure(error.response?.data));
    return false;
  }
};

export const deleteAchat = async (achat_id: number, dispatch: any) => {
  dispatch(deleteAchatRequest());
  try {
    const response = await axiosInstance.delete(`/achat/delete/${achat_id}`);

    dispatch(deleteAchatSuccess(response.data));
    return true;
  } catch (error: any) {
    dispatch(deleteAchatFailure(error.response?.data));
    return false;
  }
};
