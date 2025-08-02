import { useEffect } from "react";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import UserMetaCard from "../components/UserProfile/UserMetaCard";
import UserInfoCard from "../components/UserProfile/UserInfoCard";
import PageMeta from "../components/common/PageMeta";
import { useAuth } from "../hooks/useAuth";
import { useModal } from "../hooks/useModal";
import EditProfileModal from "../components/UserProfile/EditProfileModal";

export default function UserProfiles() {
  const { fetchProfile, user } = useAuth();
  const { isOpen, openModal, closeModal } = useModal();

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return (
    <>
      <PageMeta
        title="User Profile"
        description="This is the user profile page"
      />
      <PageBreadcrumb pageTitle="Profile" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Profile
        </h3>
        <div className="space-y-6">
          <UserMetaCard user={user} onEdit={openModal} />
          <UserInfoCard user={user} onEdit={openModal} />
          {/* <UserAddressCard /> */}
        </div>
      </div>
      <EditProfileModal isOpen={isOpen} onClose={closeModal} user={user} />
    </>
  );
}
