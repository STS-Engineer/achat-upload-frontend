import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getManagers } from "../../redux/managers/manager";
import { getFournisseurs } from "../../redux/fournisseurs/fournisseur";

const Enum = () => {
  const dispatch = useDispatch();

  const { managerList } = useSelector((state: any) => state.manager);
  const { fournisseursList } = useSelector((state: any) => state.fournisseur);

  const managerOptions = useMemo(() => {
    return managerList?.items?.length
      ? managerList.items.map((manager: any) => ({
          value: manager.id,
          label: manager.manager,
        }))
      : [];
  }, [managerList]);

  const fournisseursOptions = useMemo(() => {
    return fournisseursList?.items?.length
      ? fournisseursList.items.map((fournisseur: any) => ({
          value: fournisseur.id,
          label: fournisseur.name,
        }))
      : [];
  }, [fournisseursList]);

  const plantsOptions = useMemo(() => {
    return managerList?.items?.length
      ? managerList?.items?.map((manager: any) => ({
          value: manager.id,
          label: manager.name,
        }))
      : [];
  }, [managerList]);

  useEffect(() => {
    getManagers(dispatch);
    getFournisseurs(dispatch);
  }, [dispatch]);

  return { managerOptions, fournisseursOptions, plantsOptions};
};

export default Enum;
