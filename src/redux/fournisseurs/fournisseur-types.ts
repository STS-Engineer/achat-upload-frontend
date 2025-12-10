import { Dispatch } from "redux";

export type GetFournisseurs = (
  dispatch: Dispatch<any>
) => Promise<boolean>;

export type AddFournisseur = (
  data: any,
  dispatch: Dispatch<any>
) => Promise<boolean>;




