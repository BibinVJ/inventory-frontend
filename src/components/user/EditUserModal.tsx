
import { useState, useEffect } from 'react';
import { Modal } from '../ui/modal';
import Input from '../form/input/InputField';
import Label from '../form/Label';
import Button from '../ui/button/Button';
import { toast } from 'sonner';
import { updateUser } from '../../services/UserService';
import { getRoles } from '../../services/RoleService';
import { User, Role } from '../../types';
import Select from '../form/Select';
import Switch from '../form/switch/Switch';
import { formatKebabCase } from '../../utils/string';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onUserUpdated: () => void;
  user: User;
}

export default function EditUserModal({ isOpen, onClose, onUserUpdated, user }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [roleId, setRoleId] = useState<number | null>(null);
  const [status, setStatus] = useState('active');
  const [roles, setRoles] = useState<Role[]>([]);
  const [errors, setErrors] = useState({ name: '', email: '', phone: '', role_id: '' });

  useEffect(() => {
    if (isOpen) {
      const fetchRoles = async () => {
        try {
          const rolesData = await getRoles(1, 1, 'created_at', 'desc', true);
          // @ts-ignore
          setRoles(rolesData);
        } catch (error) {
          console.error('Error fetching roles:', error);
          toast.error('Failed to fetch roles');
        }
      };
      fetchRoles();
    }
  }, [isOpen]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone || '');
      setRoleId(user.role.id);
      setStatus(user.status);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = { name: '', email: '', phone: '', role_id: '' };
    let hasError = false;

    if (!name) {
      newErrors.name = 'Name is required';
      hasError = true;
    }

    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    try {
      await updateUser(user.id, { name, email, phone, role_id: roleId, status });
      onUserUpdated();
      toast.success('User updated successfully');
      onClose();
    } catch (error: any) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
        toast.error('Please correct the errors in the form');
      } else {
        console.error('Error updating user:', error);
        toast.error('Failed to update user');
      }
    }
  };

  const roleOptions = roles.map(r => ({ value: r.id, label: formatKebabCase(r.name) }));

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[700px] lg:p-11">
      <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Edit User
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
            Update the details of the user.
          </p>
        </div>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="px-2 overflow-y-auto custom-scrollbar">
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
              <div>
                <Label>Name <span className="text-red-500">*</span></Label>
                <Input type="text" value={name} onChange={(e) => { setName(e.target.value); setErrors({ ...errors, name: '' }) }} error={!!errors.name} hint={errors.name} />
              </div>
              <div>
                <Label>Email</Label>
                <Input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setErrors({ ...errors, email: '' }) }} error={!!errors.email} hint={errors.email} />
              </div>
              <div>
                <Label>Phone</Label>
                <Input type="text" value={phone} onChange={(e) => { setPhone(e.target.value); setErrors({ ...errors, phone: '' }) }} error={!!errors.phone} hint={errors.phone} />
              </div>
              <div>
                <Label>Role</Label>
                <Select options={roleOptions} value={String(roleId)} onChange={(value) => { setRoleId(Number(value)); setErrors({ ...errors, role_id: '' }) }} error={!!errors.role_id} hint={errors.role_id} />
              </div>
              <div>
                <Label>Status</Label>
                <Switch label={status === 'active' ? 'Active' : 'Inactive'} checked={status === 'active'} onChange={(checked) => setStatus(checked ? 'active' : 'inactive')} />
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
