import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { User, UserUpdate } from "../../redux/auth/auth-slice-types";
import { SettingsIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Select from "react-select";
import Enum from "../enum/Enum";
import { updateUser } from "../../redux/auth/auth";
import { useDispatch } from "react-redux";

export default function UserInfoCard({ user } : { user: User }) {
  const dispatch = useDispatch();
  const { isOpen, openModal, closeModal } = useModal();
  const [formUser, setFormUser] = useState<UserUpdate>({
    id: user?.id,
    first_name: user?.first_name,
    last_name: user?.last_name,
    email: user?.email,
    manager_id: user?.manager_id,
  });
  const { managerOptions } = Enum();

  const handleSelectChange = (name: string, e: any) => {
    setFormUser(prevState => ({
      ...prevState,
      [name]: e
    }));
  }

  const handleUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const adjustedUser = {
      ...formUser,
     manager_id:
      typeof formUser.manager_id === "string"
        ? Number(formUser.manager_id)
        : formUser.manager_id ?? null,
    };
    
    updateUser(formUser.id, adjustedUser, dispatch);

    closeModal();
  };

  useEffect(() => {
    setFormUser(user);
  }, [user]);

  return (
    <div className="mt-7 bg-gray-100 dark:bg-gray-800 p-4 rounded-2xl">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Personal Information
          </h4>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                First Name
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user?.first_name}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Last Name
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user?.last_name}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Email address
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user?.email}
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Linked to Plant - Manager name
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                { user?.plant_name ? `${user?.plant_name} - ${user?.manager}` : "No plant linked" }
              </p>
            </div>
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

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Edit Personal Information
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Update your details to keep your profile up-to-date.
            </p>
          </div>
          <form className="flex flex-col" onSubmit={handleUpdateSubmit}>
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <div className="mt-7">
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Personal Information
                </h5>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div className="col-span-2 lg:col-span-1">
                    <Label>First Name</Label>
                    <Input
                      type="text"
                      id="first_name"
                      placeholder="nom"
                      value={formUser?.first_name}
                      onChange={(e) =>
                        setFormUser({ ...formUser, first_name: e.target.value })
                      }
                      name="first_name"
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Last Name</Label>
                    <Input
                      type="text"
                      id="last_name"
                      placeholder="nom"
                      value={formUser?.last_name}
                      onChange={(e) =>
                        setFormUser({ ...formUser, last_name: e.target.value })
                      }
                      name="last_name"
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Email Address</Label>
                    <Input
                      type="text"
                      id="email"
                      placeholder="nom"
                      value={formUser?.email}
                      onChange={(e) =>
                        setFormUser({ ...formUser, email: e.target.value })
                      }
                      name="email"
                    />
                  </div>
                  <div className="col-span-2 lg:col-span-1">
                    <Label>Managers</Label>
                      <Select
                        options={managerOptions}
                        placeholder="Select Manager"
                        value={managerOptions.find(
                          (o: any) => o.value === formUser?.manager_id
                        )}
                        onChange={(option) =>
                          handleSelectChange("manager_id", option?.value)
                        }
                        maxMenuHeight={200}
                        isClearable
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
    </div>
  );
}
