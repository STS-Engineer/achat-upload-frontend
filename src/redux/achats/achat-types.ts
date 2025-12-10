import { Dispatch } from "redux";

export type GetAchats = (
  dispatch: Dispatch<any>
) => Promise<boolean>;

export type UploadExcelFile = (
  data: FormData,
  dispatch: Dispatch<any>
) => Promise<boolean>;




