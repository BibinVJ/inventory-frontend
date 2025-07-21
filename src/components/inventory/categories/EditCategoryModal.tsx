
import { useState, useEffect } from 'react';
import api from '../../../services/api';
import { Modal } from '../../ui/modal';
import Input from '../../form/input/InputField';
import Label from '../../form/Label';
import Switch from '../../form/switch/Switch';

interface Category {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCategoryUpdated: () => void;
  category: Category;
}

export default function EditCategoryModal({ isOpen, onClose, onCategoryUpdated, category }: Props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [errors, setErrors] = useState({ name: '' });

  useEffect(() => {
    if (category) {
      setName(category.name);
      setDescription(category.description);
      setIsActive(category.is_active);
    }
  }, [category]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      setErrors({ name: 'Name is required' });
      return;
    }
    try {
      await api.put(`/category/${category.id}`, { name, description, is_active: isActive });
      onCategoryUpdated();
      onClose();
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };



  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[700px] lg:p-11">
      <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Edit Category
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Update the details of the category.
            </p>
          </div>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="px-2 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-1">
                <div>
                  <Label>Name <span className="text-red-500">*</span></Label>
                  <Input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setErrors({ name: '' });
                    }}
                    error={!!errors.name}
                    hint={errors.name}
                  />
                </div>

                <div>
                  <Label>Description</Label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div>
                  <Label>Status</Label>
                  {{ isActive }}
                  <Switch
                    label={isActive ? 'Active' : 'Inactive'}
                    defaultChecked={isActive}
                    onChange={setIsActive}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:ring-gray-500">
                Close
              </button>
              <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Save Changes
              </button>
            </div>
          </form>
        </div>
    </Modal>
  );
}

