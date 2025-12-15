import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import FileInput from "../../components/form/input/FileInput";
import { User } from "../../redux/auth/auth-slice-types";
import avatar from "../../../public/images/logo/avatar.jpg";
import { SettingsIcon } from "lucide-react";
import { useState } from "react";
import { uploadProfileImage } from "../../redux/auth/auth";
import { useDispatch } from "react-redux";

export default function UserMetaCard({ user } : { user: User }) {
  const dispatch = useDispatch();
  const { isOpen, openModal, closeModal } = useModal();
  const [file, setFile] = useState<File | null>(null);

  const handleUploadProfileImage = (e: React.FormEvent) => {
    e.preventDefault();
   
    const formData = new FormData();

    if (file) {
      formData.append("avatar", file);
    }

    uploadProfileImage(user.id, formData, dispatch);
    closeModal();
  };

  return (
    <>
      <div className="p-5 border border-gray-300 rounded-2xl bg-gray-100 dark:bg-gray-800 dark:border-gray-700 lg:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
            <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
              {user?.document ? (
                <img
                  src={`${import.meta.env.VITE_API_URL}/uploads/profiles/${user?.document}`}
                  alt="user"
                  className="w-full h-full object-cover"
                />
              ): (
                <img
                  src={avatar}
                  alt="user"
                  className="w-full h-full object-cover"
                />
              )}
              
            </div>
            <div className="order-3 xl:order-2">
              <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                {user?.first_name} {user?.last_name}
              </h4>
            </div>
          </div>
          <button
            onClick={openModal}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
          >
            <SettingsIcon className="h-4 w-4" />
            Edit
          </button>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-2">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Edit Profile image
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Update your profile image here
            </p>
          </div>
          <form className="flex flex-col" onSubmit={handleUploadProfileImage}>
            <div className="custom-scrollbar overflow-y-auto px-2 pb-3">
              <div className="mt-7">
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Profile Image
                </h5>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-1">
                  <div className="col-span-2 lg:col-span-1">
                    <FileInput
                        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Close
              </Button>
              <Button size="sm">
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
