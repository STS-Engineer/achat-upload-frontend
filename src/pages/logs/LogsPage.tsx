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
import { useDispatch, useSelector } from "react-redux";
import { getLogs } from "../../redux/logs/logs";
import { Log } from "../../redux/logs/logs-slice-types";

export default function FormElements() {
  const dispatch = useDispatch();
  const { logsList } = useSelector((state: any) => state.log);
  
  const headers = ["description"]

  useEffect(() => {
    getLogs(dispatch);
  }, [dispatch]);

  return (
    <div className="p-6 space-y-8">
      <PageMeta title="Logs" description="..." />
      <PageBreadcrumb pageTitle="Logs" />
      <div className="space-y-6">
        <ComponentCard title="Logs List">
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
                    {logsList?.length > 0 ? (
                      logsList.map((q: Log) => (
                          <TableRow
                            key={q.id}
                            className="divide-x divide-gray-100 dark:divide-white/[0.05] group hover:bg-blue-50 dark:hover:bg-white/[0.05] transition-colors duration-200"
                          >
                            {/* Sticky ID */}
                            <TableCell className="sticky left-0 z-20 w-[80px] bg-white dark:bg-gray-900 group-hover:bg-blue-50 dark:group-hover:bg-white/[0.05] px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                                {q.description}
                            </TableCell>
                            {/* Sticky Actions */}
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
        </ComponentCard>
      </div>
    </div>
  );
}
