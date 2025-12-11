import { Dispatch } from "redux";

export type GetTransactions = (
  page: number,
  per_page: number,
  dispatch: Dispatch<any>
) => Promise<boolean>;

export type AddTransaction = (
  data: any,
  dispatch: Dispatch<any>
) => Promise<boolean>;

export type SendEmailTransaction = (
  data: any,
  dispatch: Dispatch<any>
) => Promise<boolean>;

