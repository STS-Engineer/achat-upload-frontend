import { Dispatch } from "redux";

export type GetDocuments = (
  dispatch: Dispatch<any>,
  page?: number,
  per_page?: number,
) => Promise<boolean>;



