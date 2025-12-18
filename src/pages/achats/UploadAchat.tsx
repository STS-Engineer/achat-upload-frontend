import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import { useDispatch, useSelector } from "react-redux";
import Panel from "../../components/form/panel";
import { Label } from "recharts";
import Button from "../../components/ui/button/Button";
import FileInput from "../../components/form/input/FileInput";
import { useEffect, useState } from "react";
import { uploadExcel } from "../../redux/achats/achat";
import { useNavigate } from "react-router";
import useToast from "../../hooks/useToast";
import { resetAchatState } from "../../redux/achats/achat-slice";

export default function FrameworkElements() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast: toastMessage, requests } = useSelector((state: any) => state.achat);
  const [file, setFile] = useState<File | null>(null);
  const showSpinner = Object.keys(requests).includes('uploadExcelFileRequest') 
    && Object.keys(requests).length === 1;

  const handleUploadExcel = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    if (file) {
      formData.append("file", file);
    }

    uploadExcel(formData, dispatch);
  };

  useEffect(() => {
    setTimeout(() => {
        if (toastMessage === "File uploaded successfully") {
            navigate("/");
        }
    }, 1500);
  }, [toastMessage, navigate]);

  useEffect(() => {
    if(Object.keys(requests).includes('uploadExcelFileFailure'))
    {
      console.log('resetting state');
      dispatch(resetAchatState());
    }
  }, [dispatch, requests]);

  useToast();

  return (
    <div className="p-8 space-y-16">
      <PageMeta title="Upload purchase" description="" />
      <PageBreadcrumb pageTitle="Upload purchase" />
      <section className="grid grid-cols-1 lg:grid-cols-1 gap-12 mt-10">
         <Panel
            title="Insert purchase file"
            className="bg-gradient-to-br from-orange-50 via-orange-100 to-orange-50  dark:bg-gradient-to-br dark:from-gray-800 dark:via-gray-900 dark:to-gray-800"
            >
            <form className="space-y-6" onSubmit={handleUploadExcel}>
                <div>
                    <Label>Excel file</Label>
                    <FileInput
                        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                    />
                </div>
                <Button
                  className="
                    flex items-center justify-center gap-2
                    px-4 py-2 rounded-lg text-white font-medium transition
                    bg-gradient-to-r from-[#F68C1F] to-[#EF7807]
                    hover:from-[#F78F3F] hover:to-[#F47A07]
                    dark:from-[#B55A00] dark:to-[#8A4600]
                  "
                  disabled={showSpinner}
                >
                  { showSpinner ? (
                     <svg
                    className="animate-spin w-5 h-5 text-white"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="10"
                      cy="10"
                      r="8.5"
                      stroke="currentColor"
                      strokeWidth="3"
                      className="opacity-30"
                    />
                    <path
                      d="M18.5172 10C19.3361 10 20.0113 9.33252 19.8903 8.52257..."
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                    ) : (
                      <span>Upload</span>
                    )}
                </Button>
            </form>
        </Panel>
      </section>
    </div>
  );
}
