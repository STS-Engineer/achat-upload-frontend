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
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getachats } from "../../redux/achats/achat";
import { Achat } from "../../redux/achats/achat-slice-types";
import Pagination from "../../components/common/Pagination";

export default function FormElements() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { achatsList } = useSelector((state: any) => state.achat);
  
  const headers = ["reference", "supplier", "manager", "plant", "upload date", 'quantity', 'price', "size"];

  const handleClick = () => {
    navigate("/upload-achat");
  }

  const handlePageChange = (page: number) => {
    getachats(page, 5, dispatch);
  };

  useEffect(() => {
    getachats(1, 5, dispatch);
  }, [dispatch]);

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
                            {/* Sticky ID */}
                            <TableCell className="sticky left-0 z-20 w-[80px] bg-white dark:bg-gray-900 group-hover:bg-blue-50 dark:group-hover:bg-white/[0.05] px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                                {q.reference}
                            </TableCell>

                            {/* Sticky Name */}
                            <TableCell className="sticky left-[80px] z-20 w-[250px] bg-white dark:bg-gray-900 group-hover:bg-blue-50 dark:group-hover:bg-white/[0.05] px-4 py-3">
                               {q.fournisseur?.name}
                            </TableCell>

                            {/* Normal Columns */}
                            <TableCell className="px-6 py-3 text-sm text-gray-600 dark:text-gray-400">
                              {q.responsable_plant}
                            </TableCell>
                            <TableCell className="px-4 py-2 text-sm">
                              {q.plant}
                            </TableCell>
                            <TableCell className="px-6 py-3 text-sm text-gray-600 dark:text-gray-400">
                              {q.date}
                            </TableCell>
                            <TableCell className="px-6 py-3 text-sm text-gray-600 dark:text-gray-400">
                              {q.quantite}
                            </TableCell>
                            <TableCell className="px-6 py-3 text-sm font-medium text-gray-800 dark:text-white">
                              {q.prix}
                            </TableCell>
                            <TableCell className="px-6 py-3 text-sm font-medium text-gray-800 dark:text-white">
                              {q.taille}
                            </TableCell>

                            {/* Sticky Actions */}
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
      </div>
    </div>
  );
}
