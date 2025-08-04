import {
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";
import { User } from "../../types";
import { formatKebabCase } from "../../utils/string";
import { PencilIcon } from "../../icons";

interface UserMetaCardProps {
  user: User | null;
  onEditSocials: () => void;
  onEditImage: () => void;
}

export default function UserMetaCard({
  user,
  onEditSocials,
  onEditImage,
}: UserMetaCardProps) {
  const getSocialLink = (platform: string) => {
    return user?.social_links.find((link) => link.platform === platform)?.url;
  };
  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
          <div className="relative">
            <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
              <img
                src={user?.profile_image || "/images/user/default.jpg"}
                alt={user?.name || "user"}
              />
            </div>
            <button
              onClick={onEditImage}
              className="absolute bottom-0 right-0 flex items-center justify-center w-8 h-8 bg-white border border-gray-200 rounded-full dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
            >
              <PencilIcon className="w-4 h-4" />
            </button>
          </div>
          <div className="order-3 xl:order-2">
            <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
              {user?.name}
            </h4>
            <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {user?.role ? formatKebabCase(user.role.name) : "role"}
              </p>
            </div>
          </div>

          <div className="flex items-center order-2 gap-2 grow xl:order-3 xl:justify-end">
            <a
              href={getSocialLink("facebook") || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center gap-2 rounded-full border border-gray-300 bg-white text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
            >
              <Facebook size={20} />
            </a>

            <a
              href={getSocialLink("linkedin") || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center gap-2 rounded-full border border-gray-300 bg-white text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
            >
              <Linkedin size={20} />
            </a>

            <a
              href={getSocialLink("instagram") || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center gap-2 rounded-full border border-gray-300 bg-white text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
            >
              <Instagram size={20} />
            </a>

          </div>
        </div>

        <button
          onClick={onEditSocials}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
        >
          <PencilIcon className="fill-current" width="18" height="18" />
          Edit Socials
        </button>
      </div>
    </div>
  );
}