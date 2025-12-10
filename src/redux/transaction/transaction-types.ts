import { Dispatch } from "redux";

export type GetTransactions = (
  dispatch: Dispatch<any>
) => Promise<boolean>;

export type AddTransaction = (
  data: any,
  dispatch: Dispatch<any>
) => Promise<boolean>;
