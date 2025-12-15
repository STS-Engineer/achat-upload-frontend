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
import { useDispatch, useSelector } from "react-redux";
import { extractExcel, getLogs } from "../../redux/logs/logs";
import { Log } from "../../redux/logs/logs-slice-types";
import Pagination from "../../components/common/Pagination";
import Input from "../../components/form/input/InputField";
import { SearchCheck } from "lucide-react";
import { DownloadIcon } from "../../icons";

export default function FormElements() {
  const dispatch = useDispatch();

  // Pagination state
  const [page, setPage] = useState(1);
  const per_page = 5;
  const [description, setDescription] = useState("");

  const { logsList } = useSelector((state: any) => state.log);

  const headers = ["Problem Type", "Description", "File Name"];

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleDownload = () => {
    extractExcel(dispatch)
  }

  useEffect(() => {
    getLogs(page, per_page, "", dispatch);
  }, [dispatch, page]);

  useEffect(() => {
    if (description && description.length > 3) {
      getLogs(page, per_page, description, dispatch);
    }
  }, [description, page, dispatch]);

  return (
    <div className="p-6 space-y-8">
      <PageMeta title="Logs" description="..." />
      <PageBreadcrumb pageTitle="Logs" />

      <div className="space-y-6">
        <ComponentCard title="Logs List">
          <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-white/[0.05] bg-white dark:bg-gray-900 shadow-lg">
            <div className="flex justify-end w-full px-4 py-3">
              <div className="flex items-center gap-3">
                 <button
                    className="
                      flex items-center justify-center
                      h-10 w-10
                      rounded-lg border border-gray-300
                      dark:border-white/[0.1]
                      hover:bg-gray-100 dark:hover:bg-white/[0.05]
                      transition
                    "
                    title="Download logs"
                    onClick={handleDownload}
                  >
                    <DownloadIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  </button>
                <div className="relative w-full sm:w-[280px]">
                <SearchCheck 
                  className="absolute top-1/2 -translate-y-1/2 left-3 w-5 h-5"
                />
                <Input
                  type="text"
                  placeholder="Search logs..."
                  className="
                    pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-white/[0.1]"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              </div>
            </div>
            <div className="max-w-full overflow-x-auto relative">
              <Table className="min-w-full border-collapse table-auto">
                {/* Table Header */}
                <TableHeader className="sticky top-0 z-30 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 dark:from-[#1C1C1E] dark:via-[#2A2A2C] dark:to-[#111113] border-b border-gray-200 dark:border-white/[0.1]">
                  <TableRow className="divide-x divide-gray-200 dark:divide-white/[0.05]">
                    {headers.map((header) => (
                      <TableCell
                        key={header}
                        isHeader
                        className="sticky left-0 z-40 w-[300px] px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 tracking-wide
                          bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50
                          dark:from-[#1C1C1E] dark:via-[#2A2A2C] dark:to-[#111113]"
                      >
                        {header}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHeader>

                {/* Table Body */}
                <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                  {logsList?.items?.length > 0 ? (
                    logsList.items.map((log: Log) => (
                      <TableRow
                        key={log.id}
                        className="divide-x divide-gray-100 dark:divide-white/[0.05] group hover:bg-blue-50 dark:hover:bg-white/[0.05] transition-colors duration-200"
                      >
                        <TableCell
                          className="
                            sticky left-0 z-20 bg-white dark:bg-gray-900
                            group-hover:bg-blue-50 dark:group-hover:bg-white/[0.05]
                            px-4 py-3 text-sm text-gray-500 dark:text-gray-400
                          "
                        >
                          <p className="line-clamp-3 whitespace-normal">
                            {log.problem_type}
                          </p>
                        </TableCell>
                        <TableCell
                          className="
                            sticky left-0 z-20 bg-white dark:bg-gray-900
                            group-hover:bg-blue-50 dark:group-hover:bg-white/[0.05]
                            px-4 py-3 text-sm text-gray-500 dark:text-gray-400
                          "
                        >
                          <p className="line-clamp-3 whitespace-normal">
                            {log.description}
                          </p>
                        </TableCell>
                        <TableCell
                          className="
                            sticky left-0 z-20 bg-white dark:bg-gray-900
                            group-hover:bg-blue-50 dark:group-hover:bg-white/[0.05]
                            px-4 py-3 text-sm text-gray-500 dark:text-gray-400
                          "
                        >
                          <p className="line-clamp-3 whitespace-normal">
                            {log?.document?.filename}
                          </p>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={10}>
                        <p className="text-gray-500 p-6 text-center">
                          No Logs found.
                        </p>
                      </td>
                    </tr>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Pagination Component */}
          <Pagination
            page={logsList.page}
            totalPages={logsList.total_pages}
            onPageChange={handlePageChange}
          />
        </ComponentCard>
      </div>
    </div>
  );
}
