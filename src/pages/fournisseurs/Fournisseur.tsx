import { useEffect, useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import { useDispatch, useSelector } from "react-redux";
import { addFournisseur, deleteFournisseur, getFournisseurs, updateFournisseur } from "../../redux/fournisseurs/fournisseur";
import { Fournisseur } from "../../redux/fournisseurs/fournisseur-slice-types";
import Panel from "../../components/form/panel";
import { Label } from "recharts";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
import Pagination from "../../components/common/Pagination";
import { resetFournisseurState } from "../../redux/fournisseurs/fournisseur-slice";
import { Modal } from "../../components/ui/modal";
import ConfirmDialog from "../../components/form/ConfirmDialogProps";
import { BadgeMinusIcon, SearchCheck, SettingsIcon } from "lucide-react";
import useToast from "../../hooks/useToast";

export default function FournisseursElements() {
   const dispatch = useDispatch();

  // Pagination state
  const [page, setPage] = useState(1);
  const per_page = 6;

  const { fournisseursList, toast } = useSelector((state: any) => state.fournisseur);

  const [formFournisseur, setFormFournisseur] = useState({
    supplier_name: "",
  });
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedFournisseur, setSelectedFournisseur] = useState<Fournisseur | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [nameSupplier, setNameSupplier] = useState("");

  const handleAddFournisseur = (e: React.FormEvent) => {
    e.preventDefault();
    addFournisseur(formFournisseur, dispatch);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleEdit = (fournisseur: Fournisseur) => {
      setSelectedFournisseur(fournisseur);
      setIsOpen(true);
      setFormFournisseur(fournisseur);
  };

  const openDeleteConfirm = (fournisseur: Fournisseur) => {
      setSelectedFournisseur(fournisseur);
      setIsDeleteConfirmOpen(true);
  }

  const closeModal = () => {
        setSelectedFournisseur(null);
        setIsDeleteConfirmOpen(false);
    };

  const handleEditSubmit = (formFournisseur: any) => (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!selectedFournisseur) return;
      updateFournisseur(selectedFournisseur.supplier_id, formFournisseur, dispatch );
      closeModal();
  }

  const handleConfirmDelete = () => {
      if (!selectedFournisseur) return;
      deleteFournisseur(selectedFournisseur?.supplier_id, dispatch);
      setIsDeleteConfirmOpen(false);
  }

  const handleInputValue = (e: any) => {
    const { name, value } = e.target;
    setFormFournisseur(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  useEffect(() => {
    if ((nameSupplier && nameSupplier.length > 3) || nameSupplier.length === 0) {
      getFournisseurs(dispatch, page, per_page, nameSupplier);
    }
  }, [nameSupplier, page, dispatch]);

  useEffect(() => {
    setPage(1);
  }, [nameSupplier]);
  
  useEffect(() => {
    setTimeout(() => {
      if (toast) 
        {
          dispatch(resetFournisseurState());
          setFormFournisseur({
            supplier_name: "",
          });
          if (isOpen) {
            setIsOpen(false);
          }
        }
    }, 1500);
  }, [dispatch, toast]);

  useToast();

  return (
    <div className="p-8 space-y-16">
      <PageMeta title="supplier Management" description="" />
      <PageBreadcrumb pageTitle="supplier" />

      <section className="space-y-6">
        <div className="flex items-center justify-between ">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              supplier List
          </h2>
          <div className="relative w-full sm:w-[280px]">
            <SearchCheck 
              className="absolute top-1/2 -translate-y-1/2 left-3 w-5 h-5"
            />
            <Input
              type="text"
              placeholder="Search suppliers..."
              className="
                pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-white/[0.1]"
              onChange={(e) => setNameSupplier(e.target.value)}
            />
          </div>
        </div>

        {/* Empty State */}
        {fournisseursList.items?.length === 0 && (
          <div className="p-6 border rounded-2xl bg-gray-50 dark:bg-gray-900/20 text-center">
            <p className="text-gray-500 dark:text-gray-400">No suppliers found.</p>
          </div>
        )}

        {/* Grid List */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 ">
          {fournisseursList?.items?.map((f: Fournisseur) => (
            <div
              key={f.supplier_id}
              className="
                relative
                rounded-2xl border bg-white dark:bg-gray-900 shadow-sm p-6
                hover:shadow-md transition
                bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100
                dark:bg-gradient-to-br dark:from-gray-800 dark:via-gray-900 dark:to-gray-800
              "
            >
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={() => handleEdit(f)}
              className="
                p-2 rounded-lg
                bg-blue-50 dark:bg-blue-900/20
                text-blue-600 dark:text-blue-300
                hover:bg-blue-100 dark:hover:bg-blue-900/30
                transition
              "
              title="Edit supplier"
            >
              <SettingsIcon className="w-4 h-4" />
            </button>

            <button
              onClick={() => openDeleteConfirm(f)}
              className="
                p-2 rounded-lg
                bg-orange-50 dark:bg-orange-900/20
                text-orange-600 dark:text-orange-300
                hover:bg-orange-100 dark:hover:bg-orange-900/30
                transition
              "
              title="Delete supplier"
            >
              <BadgeMinusIcon className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <div className="space-y-1 pr-10">
            <h3 className="text-md font-normal text-gray-800 dark:text-gray-100">
              {f.supplier_name}
            </h3>
          </div>
        </div>
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          page={fournisseursList.page}
          totalPages={fournisseursList.total_pages}
          onPageChange={handlePageChange}
        />
      </section>

      {/* Add Fournisseur Form */}
      <section className="grid grid-cols-1 gap-12 mt-10">
        <Panel
          title="Add supplier"
          className="bg-gradient-to-br from-orange-50 via-orange-100 to-orange-50  
            dark:bg-gradient-to-br dark:from-gray-800 dark:via-gray-900 dark:to-gray-800"
        >
          <form className="space-y-6" onSubmit={handleAddFournisseur}>
            <div>
              <Label>Nom</Label>
              <Input
                type="text"
                id="name"
                placeholder="nom"
                value={formFournisseur.supplier_name}
                onChange={handleInputValue}
                name="supplier_name"
              />
            </div>
            <Button
              className="px-4 py-2 rounded-lg text-white font-medium transition 
                bg-gradient-to-r from-[#F68C1F] to-[#EF7807] hover:from-[#F78F3F] hover:to-[#F47A07]
                dark:from-[#B55A00] dark:to-[#8A4600]"
              disabled={formFournisseur.supplier_name.trim() === ""}
            >
              Add
            </Button>
          </form>
        </Panel>
      </section>
      <Modal
        isOpen={isOpen && selectedFournisseur !== null}
        onClose={closeModal}
        className="max-w-[700px] p-6 lg:p-10"
        >
            <form 
                className="flex flex-col px-2 overflow-y-auto custom-scrollbar"
                onSubmit={handleEditSubmit(formFournisseur)}
            >
                <div>
                    <h5 className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl">
                    Edit Supplier
                    </h5>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                    Modify the details of the selected supplier.
                    </p>
                </div>

                <div className="mt-8 space-y-6">
                    {/* Label */}
                    <div>
                    <Label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                        Name
                    </Label>
                    <Input
                        type="text"
                        value={formFournisseur?.supplier_name || ""}
                        onChange={handleInputValue}
                        className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                        name="supplier_name"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-6 sm:justify-end">
                    <button
                        onClick={closeModal}
                        type="button"
                        className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
                    >
                    Close
                    </button>
                    <Button
                        className="px-4 py-2 bg-gradient-to-r from-[#F68C1F] to-[#EF7807] text-white rounded-lg"
                        disabled={formFournisseur.supplier_name.trim() === ""}
                    >
                        Update Supplier
                    </Button>
                </div>
            </form>
      </Modal>
      <ConfirmDialog
        isOpen={isDeleteConfirmOpen}
        title="Delete Supplier"
        message="Are you sure you want to delete this supplier? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsDeleteConfirmOpen(false)}
      />
    </div>
  );
}
