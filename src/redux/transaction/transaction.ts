import axiosInstance from "../../services/axiosInstance";
import { addTransactionFailure, addTransactionRequest, addTransactionSuccess, getTransactionsFailure, getTransactionsRequest, getTransactionsSuccess, sendEmailFailure, sendEmailRequest, sendEmailSuccess } from "./transaction-slice";
import { AddTransaction, GetTransactions, SendEmailTransaction } from "./transaction-types";



export const getTransactions: GetTransactions = async (page, per_page, dispatch) => {
  dispatch(getTransactionsRequest());
  const url = `/transaction/all?page=${page}&per_page=${per_page}`;

  try {
    let response = await axiosInstance.get(url);
    dispatch(getTransactionsSuccess(response.data));
    return true;
  } catch (error: any) {
    const { data } = error.response;
    dispatch(getTransactionsFailure(data));
  }

  return false;
};

export const addTransaction: AddTransaction = async (data, dispatch) => {
  dispatch(addTransactionRequest());
  try {
    const response = await axiosInstance.post("/transaction/add", data);

    dispatch(addTransactionSuccess(response.data));
    return true;
  } catch (error: any) {
    dispatch(addTransactionFailure(error.response?.data));
    return false;
  }
};

export const sendEmailTransaction: SendEmailTransaction = async (data, dispatch) => {
  dispatch(sendEmailRequest());
  try {
    const response = await axiosInstance.post("/transaction/send-email", data);

    dispatch(sendEmailSuccess(response.data));
    return true;
  } catch (error: any) {
    dispatch(sendEmailFailure(error.response?.data));
    return false;
  }
};





