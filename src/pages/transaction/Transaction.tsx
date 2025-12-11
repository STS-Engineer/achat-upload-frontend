import { useEffect, useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import { useDispatch, useSelector } from "react-redux";
import { Transaction } from "../../redux/transaction/transaction-slice-types";
import Panel from "../../components/form/panel";
import { Label } from "recharts";
import Input from "../../components/form/input/InputField";
import DatePicker from "../../components/form/date-picker";
import Button from "../../components/ui/button/Button";
import Alert from "../../components/ui/alert/Alert";
import { addTransaction, getTransactions, sendEmailTransaction } from "../../redux/transaction/transaction";
import { resetTransactionState } from "../../redux/transaction/transaction-slice";
import { MailIcon } from "../../icons";
import Pagination from "../../components/common/Pagination";

export default function FrameworkElements() {
  const dispatch = useDispatch();

  // Pagination state
  const [page, setPage] = useState(1);
  const per_page = 3;

  const { transactionsList, toast } = useSelector((state: any) => state.transaction);

  const [formTransaction, setFormTransaction] = useState({
    responsable_name: "",
    responsable_email: "",
    date_limite: "",
  });

  const [clickedButtons, setClickedButtons] = useState<{ [key: number]: boolean }>({});

  const handleAddFournisseur = (e: React.FormEvent) => {
    e.preventDefault();
    const adjustedFormTransaction = {
      ...formTransaction,
      date_limite: new Date(formTransaction.date_limite).toISOString(),
    };
    addTransaction(adjustedFormTransaction, dispatch);
  };

  const handleSendEmail = (transaction: Transaction) => {
    setClickedButtons((prev) => ({
      ...prev,
      [transaction.id]: true,
    }));

    sendEmailTransaction(transaction, dispatch);
  };

  // Fetch transactions on load & when page changes
  useEffect(() => {
    getTransactions(page, per_page, dispatch);
  }, [dispatch, page]);

  // Reset toast after display
  useEffect(() => {
    setTimeout(() => {
      if (toast) 
        {
          dispatch(resetTransactionState());
          setFormTransaction({
            responsable_name: "",
            responsable_email: "",
            date_limite: "",
          });
        }
    }, 1500);
  }, [dispatch, toast]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="p-8 space-y-16">
      <PageMeta title="Transaction Management" description="" />
      <PageBreadcrumb pageTitle="Transactions" />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Transactions</h2>

        {transactionsList.items?.length === 0 && (
          <div className="p-6 border rounded-2xl bg-gray-50 dark:bg-gray-900/20 text-center">
            <p className="text-gray-500 dark:text-gray-400">No transactions found.</p>
          </div>
        )}

        {/* Grid List */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {transactionsList.items?.map((f: Transaction) => (
            <div
              key={f.id}
              className="relative rounded-2xl border bg-white dark:bg-gray-900 shadow-sm p-6
              flex flex-col justify-between hover:shadow-md transition bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100
              dark:bg-gradient-to-br dark:from-gray-800 dark:via-gray-900 dark:to-gray-800"
            >
              {new Date() > new Date(f.date_limite) && (
                <button
                  type="button"
                  disabled={clickedButtons[f.id]}
                  className="
                    absolute top-3 right-3 p-2 rounded-full transition
                    bg-blue-100 hover:bg-blue-200
                    dark:bg-blue-900/40 dark:hover:bg-blue-900
                    disabled:bg-gray-300 disabled:cursor-not-allowed
                    dark:disabled:bg-gray-700"
                  onClick={() => handleSendEmail(f)}
                >
                  <MailIcon
                    className="
                      w-4 h-4 
                      text-blue-700 dark:text-blue-300
                      disabled:text-gray-500"
                  />
                </button>
              )}

              <div className="space-y-1">
                <h3 className="text-md font-normal text-gray-800 dark:text-gray-100">
                  {f.responsable_name}
                </h3>
                <span className="inline-block mt-2 px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-full">
                  {f.responsable_email}
                </span>
                <span className="inline-block mt-2 px-3 py-1 text-xs font-medium bg-red-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-full">
                  {new Date(f.date_limite).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          page={transactionsList.page}
          totalPages={transactionsList.total_pages}
          onPageChange={handlePageChange}
        />
      </section>

      {/* Add Transaction Form */}
      <section className="grid grid-cols-1 lg:grid-cols-1 gap-12 mt-10">
        <Panel
          title="Add Transaction"
          className="bg-gradient-to-br from-orange-50 via-orange-100 to-orange-50  dark:bg-gradient-to-br dark:from-gray-800 dark:via-gray-900 dark:to-gray-800"
        >
          <form className="space-y-6" onSubmit={handleAddFournisseur}>
            <div>
              <Label>Nom</Label>
              <Input
                type="text"
                id="responsable_name"
                placeholder="nom"
                value={formTransaction.responsable_name}
                onChange={(e) => setFormTransaction({ ...formTransaction, responsable_name: e.target.value })}
                name="responsable_name"
              />
            </div>

            <div>
              <Label>Email</Label>
              <Input
                type="email"
                id="responsable_email"
                placeholder="email"
                value={formTransaction.responsable_email}
                onChange={(e) => setFormTransaction({ ...formTransaction, responsable_email: e.target.value })}
                name="responsable_email"
              />
            </div>

            <div>
              <Label>Date limite</Label>
              <DatePicker
                id="date_limite"
                placeholder="Select date"
                value={formTransaction.date_limite}
                onChange={(date: string) => setFormTransaction({ ...formTransaction, date_limite: date })}
                name="date_limite"
              />
            </div>

            <Button className="px-4 py-2 rounded-lg text-white font-medium transition bg-gradient-to-r from-[#F68C1F] to-[#EF7807] hover:from-[#F78F3F] hover:to-[#F47A07] dark:from-[#B55A00] dark:to-[#8A4600]">
              Add
            </Button>

            {toast && (
              <Alert
                title={toast}
                message=""
                variant={toast === "Transaction already exists" ? "error" : "success"}
              />
            )}
          </form>
        </Panel>
      </section>
    </div>
  );
}