import { configureStore } from '@reduxjs/toolkit';
import achatReducer from './achats/achat-slice';
import fournisseurReducer from './fournisseurs/fournisseur-slice';
import transactionReducer from './transaction/transaction-slice';
import logReducer from './logs/logs-slice';
import authReducer from './auth/auth-slice';

export const store = configureStore({
  reducer: {
    achat: achatReducer,
    fournisseur: fournisseurReducer,
    transaction: transactionReducer,
    log: logReducer,
    auth: authReducer
  },
  devTools: true,
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;