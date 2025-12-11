import axiosInstance from "../../services/axiosInstance";
import { getLogsFailure, getLogsRequest, getLogsSuccess } from "./logs-slice";
import { GetLogs } from "./logs-types";


export const getLogs: GetLogs = async (page, per_page, description, dispatch) => {
  dispatch(getLogsRequest());
  const url = `/logs/all?page=${page}&per_page=${per_page}&description=${description}`;

  try {
    let response = await axiosInstance.get(url);
    dispatch(getLogsSuccess(response.data));
    return true;
  } catch (error: any) {
    const { data } = error.response;
    dispatch(getLogsFailure(data));
  }

  return false;
};