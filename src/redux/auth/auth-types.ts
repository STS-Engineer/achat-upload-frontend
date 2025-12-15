import { Dispatch } from "redux";

export type Login = (
  data: any,
  dispatch: Dispatch<any>
) => Promise<boolean>;

export type ResetPassword = (
  data: any,
  dispatch: Dispatch<any>
) => Promise<boolean>;

export type Me = (
  dispatch: Dispatch<any>
) => Promise<boolean>;

export type UploadProfileImage = (
  user_id: number,
  formData: FormData,
  dispatch: Dispatch<any>
) => Promise<boolean>;

export type UpdateUser = (
  id: number,
  data: any,
  dispatch: Dispatch<any>
) => Promise<boolean>;