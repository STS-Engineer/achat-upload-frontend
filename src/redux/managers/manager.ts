import axiosInstance from "../../services/axiosInstance";
import { getManagersFailure, getManagersRequest, getManagersSuccess } from "./manager-slice";
import { GetManagers } from "./manager-types";



export const getManagers: GetManagers = async (dispatch) => {
  dispatch(getManagersRequest());
  const url = `/manager/all`;

  try {
    let response = await axiosInstance.get(url);
    dispatch(getManagersSuccess(response.data));
    return true;
  } catch (error: any) {
    const { data } = error.response;
    dispatch(getManagersFailure(data));
  }

  return false;
};