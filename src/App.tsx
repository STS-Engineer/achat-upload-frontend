import { BrowserRouter as Router, Routes, Route } from "react-router";
import NotFound from "./pages/OtherPage/NotFound";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import toast, { ToastBar, Toaster } from "react-hot-toast";
import Achat from "./pages/achats/Achat";
import UploadAchat from "./pages/achats/UploadAchat";
import Fournisseur from "./pages/fournisseurs/Fournisseur";
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
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 1500,
            style: {
              borderRadius: "10px",
              color: "#fff",
              fontSize: "12px",
              padding: "8px",     
              minWidth: "200px",  
              height: "auto",
            },
            success: {
              style: {
                background: "#16a34a",
              },
            },
            error: {
              style: {
                background: "#dc2626",
              },
            },
          }}
          containerStyle={{
            top: "80px",
            zIndex: 99999,
          }}
        >
          {(t) => (
            <ToastBar toast={t} style={{ width: "auto", maxWidth: "300px" }}>
              {({ icon, message }) => (
                <div className="flex items-center gap-2 w-full">
                  {icon}
                  <div className="flex-1 text-sm">{message}</div>

                  {/* CLOSE BUTTON */}
                  <button
                    onClick={() => toast.dismiss(t.id)}
                    className="ml-2 text-white/80 hover:text-white transition"
                  >
                    ✕
                  </button>
                </div>
              )}
            </ToastBar>
          )}
        </Toaster>

        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route element={<RequireAuth />}>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Achat />} />
              <Route path="/upload-achat" element={<UploadAchat />} />
              <Route path="/fournisseurs" element={<Fournisseur />} />
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
