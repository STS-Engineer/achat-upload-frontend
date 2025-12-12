import { useEffect, useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import { useDispatch, useSelector } from "react-redux";
import { addFournisseur, getFournisseurs } from "../../redux/fournisseurs/fournisseur";
import { Fournisseur } from "../../redux/fournisseurs/fournisseur-slice-types";
import Panel from "../../components/form/panel";
import { Label } from "recharts";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";
import Alert from "../../components/ui/alert/Alert";
import Pagination from "../../components/common/Pagination";
import { resetFournisseurState } from "../../redux/fournisseurs/fournisseur-slice";

export default function FournisseursElements() {
   const dispatch = useDispatch();

  // Pagination state
  const [page, setPage] = useState(1);
  const per_page = 3;

  const { fournisseursList, toast } = useSelector((state: any) => state.fournisseur);

  const [formFournisseur, setFormFournisseur] = useState({
    name: "",
    email: "",
  });

  const handleAddFournisseur = (e: React.FormEvent) => {
    e.preventDefault();
    addFournisseur(formFournisseur, dispatch);
  };

  // Load data when page changes
  useEffect(() => {
    getFournisseurs(page, per_page, dispatch);
  }, [dispatch, page]);

  // Handle page change from Pagination component
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
      setTimeout(() => {
        if (toast) 
          {
            dispatch(resetFournisseurState());
            setFormFournisseur({
              name: "",
              email: "",
            });
          }
      }, 1500);
    }, [dispatch, toast]);

  return (
    <div className="p-8 space-y-16">
      <PageMeta title="supplier Management" description="" />
      <PageBreadcrumb pageTitle="supplier" />

      <section className="space-y-6">
        <div className="flex items-center justify-between ">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              supplier List
          </h2>
        </div>

        {/* Empty State */}
        {fournisseursList.items?.length === 0 && (
          <div className="p-6 border rounded-2xl bg-gray-50 dark:bg-gray-900/20 text-center">
            <p className="text-gray-500 dark:text-gray-400">No suppliers found.</p>
          </div>
        )}

        {/* Grid List */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 ">
          {fournisseursList.items?.map((f: Fournisseur) => (
            <div
              key={f.id}
              className="rounded-2xl border bg-white dark:bg-gray-900 shadow-sm p-6
                flex flex-col justify-between hover:shadow-md transition bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 
                dark:bg-gradient-to-br dark:from-gray-800 dark:via-gray-900 dark:to-gray-800"
            >
              <div className="space-y-1">
                <h3 className="text-md font-normal text-gray-800 dark:text-gray-100">
                  {f.name}
                </h3>
                <span
                  className="inline-block mt-2 px-3 py-1 text-xs font-medium
                    bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-full"
                >
                  {f.email}
                </span>
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
                value={formFournisseur.name}
                onChange={(e) =>
                  setFormFournisseur({ ...formFournisseur, name: e.target.value })
                }
                name="name"
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="email"
                value={formFournisseur.email}
                onChange={(e) =>
                  setFormFournisseur({ ...formFournisseur, email: e.target.value })
                }
                name="email"
              />
            </div>
            <Button
              className="px-4 py-2 rounded-lg text-white font-medium transition 
                bg-gradient-to-r from-[#F68C1F] to-[#EF7807] hover:from-[#F78F3F] hover:to-[#F47A07]
                dark:from-[#B55A00] dark:to-[#8A4600]"
            >
              Add
            </Button>

            {toast && (
              <Alert
                title={toast}
                message=""
                variant={
                  toast === "fournisseur already registered" ? "error" : "success"
                }
              />
            )}
          </form>
        </Panel>
      </section>
    </div>
  );
}
