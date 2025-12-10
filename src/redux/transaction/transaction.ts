import axiosInstance from "../../services/axiosInstance";
import { addTransactionFailure, addTransactionRequest, addTransactionSuccess, getTransactionsFailure, getTransactionsRequest, getTransactionsSuccess } from "./transaction-slice";
import { AddTransaction, GetTransactions } from "./transaction-types";



export const getTransactions: GetTransactions = async (dispatch) => {
  dispatch(getTransactionsRequest());
  const url = `/transaction/all`;

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





