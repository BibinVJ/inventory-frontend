import api from '../../../services/api';
import { Modal } from '../../ui/modal';

interface Category {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCategoryDeleted: () => void;
  category: Category;
}

export default function DeleteCategoryModal({ isOpen, onClose, onCategoryDeleted, category }: Props) {

  const handleDelete = async () => {
    try {
      await api.delete(`/category/${category.id}`);
      onCategoryDeleted();
      onClose();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[700px] lg:p-11">
      <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Delete Category
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
            Are you sure you want to delete the category "{category?.name}"? This action cannot be undone.
          </p>
        </div>
        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:ring-gray-500">
            Cancel
          </button>
          <button type="button" onClick={handleDelete} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}
