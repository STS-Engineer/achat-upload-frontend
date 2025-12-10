import axiosInstance from "../../services/axiosInstance";
import { getAchatsFailure, getAchatsRequest, getAchatsSuccess, uploadExcelFileFailure, uploadExcelFileRequest, uploadExcelFileSuccess } from "./achat-slice";
import { GetAchats, UploadExcelFile } from "./achat-types";


export const getachats: GetAchats = async (dispatch) => {
  dispatch(getAchatsRequest());
  const url = `/achat/all`;

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
