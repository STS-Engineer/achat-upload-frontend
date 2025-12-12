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
import SignIn from "./pages/auth/SignIn";
import ResetPassword from "./pages/auth/ResetPassword";
import RequireAuth from "./components/auth/RequireAuth";
import UserProfiles from "./pages/user/UserProfiles";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Toaster position="top-right" />
       
       
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route element={<RequireAuth />}>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Achat />} />
              <Route path="/upload-achat" element={<UploadAchat />} />
              <Route path="/fournisseurs" element={<Fournisseur />} />
              <Route path="/transactions" element={<Transaction />} />
              <Route path="/logs" element={<LogsPage />} />
              <Route path="/profile" element={<UserProfiles />} />
            </Route>
          </Route>
            {/* Fallback Route */}
            <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
