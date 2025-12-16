import { Dispatch } from "redux";

export type GetFournisseurs = (
  dispatch: Dispatch<any>,
  page?: number,
  per_page?: number,
  name?: string
) => Promise<boolean>;

export type AddFournisseur = (
  data: any,
  dispatch: Dispatch<any>
) => Promise<boolean>;

export type UpdateFournisseur = (
  id: number,
  data: any,
  dispatch: Dispatch<any>
) => Promise<boolean>;

export type DeleteFournisseur = (
  id: number,
  dispatch: Dispatch<any>
) => Promise<boolean>;




