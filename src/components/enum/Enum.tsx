import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

const Enum = () => {
  const dispatch = useDispatch();

  const { managerList } = useSelector((state: any) => state.manager);

  const managerOptions = useMemo(() => {
    return managerList?.length
      ? managerList.map((manager: any) => ({
          value: manager.id,
          label: manager.manager,
        }))
      : [];
  }, [managerList]);

  useEffect(() => {
    getManagers(dispatch);
  }, [dispatch]);

  return {
    
  };
};

export default Enum;
