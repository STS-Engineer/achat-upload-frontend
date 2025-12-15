import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { deleteAchat, getachats, updateAchat } from "../../redux/achats/achat";
import { Achat, AchatUpdate } from "../../redux/achats/achat-slice-types";
import Pagination from "../../components/common/Pagination";
import ConfirmDialog from "../../components/form/ConfirmDialogProps";
import { Modal } from "../../components/ui/modal";
import { useModal } from "../../hooks/useModal";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
import TextArea from "../../components/form/input/TextArea";
import Select from "../../components/form/Select";
import Enum from "../../components/enum/Enum";
import useToast from "../../hooks/useToast";

export default function FormElements() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { achatsList } = useSelector((state: any) => state.achat);
  const { isOpen, openModal, closeModal } = useModal();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedAchat, setSelectedAchat] = useState<Achat | null>(null);
  const [formAchat, setFormAchat] = useState<AchatUpdate | null>(null);
  const { fournisseursOptions } =  Enum();
  
  const headers = ["mvt Date", "reference", "description", "Quantity", "Price Unit", "supplier", "Actions"];

  const handleClick = () => {
    navigate("/upload-achat");
  }

  const handlePageChange = (page: number) => {
    getachats(page, 5, dispatch);
  };

  const openDeleteConfirm = (achat: Achat) => {
    setSelectedAchat(achat);
    setIsConfirmOpen(true);
  }

  const handleConfirmDelete = () => {
    if (!selectedAchat) return;
    deleteAchat(selectedAchat.id, dispatch);
    setIsConfirmOpen(false);
  }

  const handleSelectChange = (name: string, e: any) => {
    setFormAchat(prevState => ({
      ...prevState,
      [name]: e
    }));
  }

  const openEditModal = (achat: Achat) => {
    setSelectedAchat(achat);
    setFormAchat(achat);
    openModal();
  };

  const handleAchatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAchat || !formAchat) return;
    const adjustedAchat = {
      ...formAchat,
      fournisseur_id:
        typeof formAchat.fournisseur_id === "string" ?
        Number(formAchat.fournisseur_id)
        : formAchat.fournisseur_id ?? null,
    };

    updateAchat(selectedAchat.id, adjustedAchat, dispatch);
    closeModal();
  }

  useEffect(() => {
    getachats(1, 5, dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (selectedAchat) {
      setFormAchat(selectedAchat);
    }
  }, [selectedAchat]);

  useToast();

  return (
    <div className="p-6 space-y-8">
      <PageMeta title="purchase" description="..." />
      <PageBreadcrumb pageTitle="purchase" />
      <div className="space-y-6">
        <div className="flex justify-end gap-2">
          <button
            onClick={handleClick}
            className="px-3 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition"
          >
            Import file purchase
          </button>
        </div>
        <ComponentCard title="purchase List">
          <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-white/[0.05] bg-white dark:bg-gray-900 shadow-lg">
            <div className="max-w-full overflow-x-auto relative">
                <Table className="min-w-full border-collapse table-auto">
                  <TableHeader className="sticky top-0 z-30 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 dark:from-[#1C1C1E] dark:via-[#2A2A2C] dark:to-[#111113] border-b border-gray-200 dark:border-white/[0.1]">
                    <TableRow className="divide-x divide-gray-200 dark:divide-white/[0.05]">
                      {headers?.map((header, index) => {
                        let stickyClasses = "";
                        if (index === 0)
                          stickyClasses =
                            "sticky left-0 z-40 w-[80px] shadow-[2px_0_6px_-3px_rgba(0,0,0,0.1)]";
                        else if (index === 1)
                          stickyClasses =
                            "sticky left-[80px] z-40 w-[250px] shadow-[2px_0_6px_-3px_rgba(0,0,0,0.1)]";
                        else if (index === 9)
                          stickyClasses =
                            "sticky right-0 z-40 w-[200px] shadow-[-2px_0_6px_-3px_rgba(0,0,0,0.1)]";

                        return (
                          <TableCell
                            key={header}
                            isHeader
                            className={`px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 tracking-wide bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 dark:from-[#1C1C1E] dark:via-[#2A2A2C] dark:to-[#111113] ${stickyClasses}`}
                          >
                            {header}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  </TableHeader>

                  {/* Table Body */}
                  <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                    {achatsList?.achats?.length > 0 ? (
                      achatsList.achats.map((q: Achat) => (
                          <TableRow
                            key={q.id}
                            className="divide-x divide-gray-100 dark:divide-white/[0.05] group hover:bg-blue-50 dark:hover:bg-white/[0.05] transition-colors duration-200"
                          >
                            <TableCell className="sticky left-0 z-20 w-[120px] bg-white dark:bg-gray-900 group-hover:bg-blue-50 dark:group-hover:bg-white/[0.05] px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                                {q.mvt_date}
                            </TableCell>
                            <TableCell className="sticky left-0 z-20 w-[80px] bg-white dark:bg-gray-900 group-hover:bg-blue-50 dark:group-hover:bg-white/[0.05] px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                                {q.reference}
                            </TableCell>
                            <TableCell className="sticky left-0 z-20 w-[80px] bg-white dark:bg-gray-900 group-hover:bg-blue-50 dark:group-hover:bg-white/[0.05] px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                                {q.description}
                            </TableCell>
                            <TableCell className="sticky left-0 z-20 w-[80px] bg-white dark:bg-gray-900 group-hover:bg-blue-50 dark:group-hover:bg-white/[0.05] px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                                {q.quantite}
                            </TableCell>
                            <TableCell className="sticky left-0 z-20 w-[80px] bg-white dark:bg-gray-900 group-hover:bg-blue-50 dark:group-hover:bg-white/[0.05] px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                                {q.prix}
                            </TableCell>

                            {/* Sticky Name */}
                            <TableCell className="sticky left-[80px] z-20 w-[250px] bg-white dark:bg-gray-900 group-hover:bg-blue-50 dark:group-hover:bg-white/[0.05] px-4 py-3">
                               {q.fournisseur?.name ? q.fournisseur.name : q.fournisseur_name || "N/A"}
                            </TableCell>
                            <TableCell className="sticky right-0 z-20 w-[200px] bg-white dark:bg-gray-900 group-hover:bg-blue-50 dark:group-hover:bg-white/[0.05] px-4 py-3 text-center">
                              <div className="flex justify-center gap-2">
                                <button
                                  className="px-2 py-1 text-xs bg-gradient-to-r from-green-400 to-green-500 text-white rounded-md shadow hover:scale-105 transition-transform duration-200"
                                  onClick={() => openEditModal(q)}
                                >
                                  Edit
                                </button>
                                <button
                                  className="px-2 py-1 text-xs bg-gradient-to-r from-red-400 to-red-500 text-white rounded-md shadow hover:scale-105 transition-transform duration-200"
                                  onClick={() => openDeleteConfirm(q)}
                                >
                                  Delete
                                </button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                    ) : (
                      <tr>
                        <td colSpan={10}>
                          <p className="text-gray-500 p-6 text-center">
                            No purchase found.
                          </p>
                        </td>
                      </tr>
                    )}
                  </TableBody>
                </Table>
            </div>
          </div>
          <Pagination
            page={achatsList.page}
            totalPages={achatsList.total_pages}
            onPageChange={handlePageChange}
          />
        </ComponentCard>
        <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
          <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
            <div className="px-2 pr-2">
              <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                Edit Purchase
              </h4>
              <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                Update the purchase details here
              </p>
            </div>
            <form className="flex flex-col" onSubmit={handleAchatSubmit}>
              <div className="custom-scrollbar overflow-y-auto px-2 pb-3">
                <div className="mt-7">
                  <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                    Purchase Details
                  </h5>

                  <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                    <div className="col-span-2 lg:col-span-1">
                      <Label>Reference</Label>
                      <Input
                        type="text"
                        id="reference"
                        placeholder="reference"
                        value={formAchat?.reference}
                        onChange={(e) =>
                          setFormAchat({ ...formAchat, reference: e.target.value })
                        }
                        name="reference"
                      />
                    </div>
                    <div className="col-span-2 lg:col-span-1">
                      <Label>Supplier</Label>
                      <Select
                      defaultValue={
                        typeof formAchat?.fournisseur_id === "string"
                          ? parseInt(formAchat?.fournisseur_id)
                          : formAchat?.fournisseur_id || ""}
                      options={fournisseursOptions}
                      placeholder="Select Supplier"
                      onChange={(e) => handleSelectChange("fournisseur_id", e)}
                    />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-1">
                    <div className="col-span-2 lg:col-span-1">
                      <Label>Description</Label>
                      <TextArea
                        placeholder="description"
                        value={formAchat?.description}
                        onChange={(e) =>
                          setFormAchat({ ...formAchat, description: e })
                        }
                        name="description"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                <Button size="sm" variant="outline" onClick={closeModal}>
                  Close
                </Button>
                <Button size="sm">
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </Modal>
        <ConfirmDialog
          isOpen={isConfirmOpen}
          title="Delete purchase"
          message="Are you sure you want to delete this purchase? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={handleConfirmDelete}
          onCancel={() => setIsConfirmOpen(false)}
        /> 
      </div>
    </div>
  );
}
