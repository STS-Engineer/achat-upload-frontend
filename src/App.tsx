import { BrowserRouter as Router, Routes, Route } from "react-router";
import NotFound from "./pages/OtherPage/NotFound";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import { Toaster } from "react-hot-toast";
import Achat from "./pages/achats/Achat";
import UploadAchat from "./pages/achats/UploadAchat";
import Fournisseur from "./pages/fournisseurs/Fournisseur";
import Transaction from "./pages/transaction/Transaction";
import LogsPage from "./pages/logs/LogsPage";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Toaster position="top-right" />
       
       
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Achat />} />
            <Route path="/upload-achat" element={<UploadAchat />} />

            <Route path="/fournisseurs" element={<Fournisseur />} />

            <Route path="/transactions" element={<Transaction />} />

            <Route path="/logs" element={<LogsPage />} />

              
            </Route>
            {/* Fallback Route */}
            <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
