import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { clearToast } from "../redux/achats/achat-slice";

export const useToast = () => {
  const dispatch = useDispatch();

  const slices = useSelector((state: any) => [
    { ...state.achat, clear: clearToast },
    { ...state.fournisseur, clear: clearToast },
    { ...state.transaction, clear: clearToast },
    { ...state.log, clear: clearToast },
    { ...state.auth, clear: clearToast },
    { ...state.manager, clear: clearToast },
  ]);

  useEffect(() => {
    const activeToast = slices.find(
      (s) => s.toast && (s.success || s.error)
    );

    if (!activeToast) return;

    if (activeToast.success) {
      toast.success(activeToast.toast);
    }

    if (activeToast.error) {
      toast.error(activeToast.toast);
    }

    dispatch(activeToast.clear());
  }, [slices, dispatch]);
};

export default useToast;
