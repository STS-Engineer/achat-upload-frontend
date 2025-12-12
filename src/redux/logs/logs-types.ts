import { Dispatch } from "redux";

export type GetLogs = (
  page: number,
  per_page: number,
  description: string,
  dispatch: Dispatch<any>
) => Promise<boolean>;

export type ExtractExcel = (
    dispatch: Dispatch<any>
) => Promise<boolean>;




