import { useSelector } from "react-redux";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import UserInfoCard from "../../components/UserProfile/UserInfoCard";
import UserMetaCard from "../../components/UserProfile/UserMetaCard";


export default function UserProfiles() {
  const { user } = useSelector((state: any) => state.auth);
  return (
    <>
      <PageMeta
        title="Profile Dashboard "
        description="This is Profile Dashboard page"
      />
      <PageBreadcrumb pageTitle="Profile" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Profile
        </h3>
        <div className="space-y-6">
          <UserMetaCard user={user} />
          <UserInfoCard user={user} />
        </div>
      </div>
    </>
  );
}
