import axiosInstance from "../../services/axiosInstance";
import { extractExcelDataFailure, extractExcelDataRequest, extractExcelDataSuccess, getLogsFailure, getLogsRequest, getLogsSuccess } from "./logs-slice";
import { ExtractExcel, GetLogs } from "./logs-types";


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

export const extractExcel: ExtractExcel = async (dispatch) => {
  dispatch(extractExcelDataRequest());

  const apiUrl = "/logs/export";

  try {
    const response = await axiosInstance.post(
      apiUrl,
      {},
      {
        responseType: "blob",
        headers: {
          "Content-Type":
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        },
      }
    );

    const blob = new Blob([response.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = "logs_export.xlsx";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(blobUrl);

    dispatch(extractExcelDataSuccess());
    return true;
  } catch (error) {
    dispatch(extractExcelDataFailure());
    return false;
  }
};