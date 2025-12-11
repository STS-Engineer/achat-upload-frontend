import { Dispatch } from "redux";

export type GetAchats = (
  page: number,
  per_page: number,
  dispatch: Dispatch<any>
) => Promise<boolean>;

export type UploadExcelFile = (
  data: FormData,
  dispatch: Dispatch<any>
) => Promise<boolean>;




