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

export default function FrameworkElements() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast: toastMessage } = useSelector((state: any) => state.achat);
  const [file, setFile] = useState<File | null>(null);

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
                    className={`px-4 py-2 rounded-lg text-white font-medium transition bg-gradient-to-r from-[#F68C1F] to-[#EF7807] hover:from-[#F78F3F] hover:to-[#F47A07] dark:from-[#B55A00] dark:to-[#8A4600]"`}
                >
                    Upload
                </Button>
            </form>
        </Panel>
      </section>
    </div>
  );
}
