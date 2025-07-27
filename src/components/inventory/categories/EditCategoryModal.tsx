
import { useState, useEffect } from 'react';
import { Modal } from '../../ui/modal';
import Input from '../../form/input/InputField';
import Label from '../../form/Label';
import Switch from '../../form/switch/Switch';
import TextArea from '../../form/input/TextArea';
import Button from '../../ui/button/Button';
import { toast } from 'sonner';
import { updateCategory } from '../../../services/CategoryService';

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
      setDescription(category.description || '');
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
      await updateCategory(category.id, { name, description, is_active: isActive });
      onCategoryUpdated();
      toast.success('Category updated successfully');
      onClose();
    } catch (error: any) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
        toast.error('Please correct the errors in the form');
      } else {
        console.error('Error adding category:', error);
        toast.error('Failed to update category');
      }
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
                  <TextArea
                    placeholder="Enter description"
                    value={description}
                    onChange={setDescription}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div>
                  <Label>Status</Label>
                  <Switch
                    label={isActive ? 'Active' : 'Inactive'}
                    checked={isActive}
                    onChange={setIsActive}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                <Button
                    type="button"
                    variant='outline'
                    onClick={onClose}
                >
                    Close
                </Button>
                <Button
                    type="submit"
                >
                    Save Changes
                </Button>
            </div>
          </form>
        </div>
    </Modal>
  );
}

