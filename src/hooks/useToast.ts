import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearToast } from "../redux/achats/achat-slice";
import toast from "react-hot-toast";

export const useToast = () => {
  const dispatch = useDispatch();

  const achat = useSelector((state: any) => state.achat);
  const fournisseur = useSelector((state: any) => state.fournisseur);
  const transaction = useSelector((state: any) => state.transaction);
  const log = useSelector((state: any) => state.log);
  const auth = useSelector((state: any) => state.auth);
  const manager = useSelector((state: any) => state.manager);

  useEffect(() => {
    const slices = [
      { ...achat, clear: clearToast },
      { ...fournisseur, clear: clearToast },
      { ...transaction, clear: clearToast },
      { ...log, clear: clearToast },
      { ...auth, clear: clearToast },
      { ...manager, clear: clearToast },
    ];

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
  }, [achat, fournisseur, transaction, log, auth, manager, dispatch]);
};

export default useToast;
