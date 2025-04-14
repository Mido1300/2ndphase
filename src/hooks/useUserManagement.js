import { useState } from 'react';
import useLocalStorage from './useLocalStorage';
import useForm from './useForm';
import useFetch from './useFetch';
import { initialUsers } from '../usersData';

function useUserManagement() {
  // Manage users with localStorage
  const [users, setUsers] = useLocalStorage('users', initialUsers);

  // Form state for adding/editing users
  const initialFormValues = {
    id: null,
    name: '',
    email: '',
    role: '',
    country: '',
    phone: '',
    birthdate: '',
    department: '',
    position: '',
    isActive: true,
    avatar: 'https://via.placeholder.com/100',
  };
  const form = useForm(initialFormValues);
  const [avatarPreview, setAvatarPreview] = useState(initialFormValues.avatar);

  // Placeholder for fetching users from an API (not used currently)
  const { data: fetchedUsers, loading, error } = useFetch(null); // Set to null since we're using localStorage

  // Filter and search state
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Add user
  const addUser = () => {
    if (!form.validate()) return;
    const newUser = {
      ...form.values,
      id: users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1,
      joinDate: new Date().toISOString().split('T')[0],
      avatar: form.values.avatar || 'https://via.placeholder.com/100',
    };
    setUsers([...users, newUser]);
    form.reset();
    setAvatarPreview(initialFormValues.avatar);
  };

  // Edit user
  const editUser = (user) => {
    if (!form.validate()) return;
    setUsers(
      users.map((u) =>
        u.id === user.id
          ? { ...form.values, id: user.id, joinDate: u.joinDate, avatar: form.values.avatar || u.avatar }
          : u
      )
    );
    form.reset();
    setAvatarPreview(initialFormValues.avatar);
  };

  // Delete user
  const deleteUser = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  // Filter users
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter === 'all' ? true : filter === 'active' ? user.isActive : !user.isActive;
    return matchesSearch && matchesFilter;
  });

  return {
    users: filteredUsers,
    setUsers,
    form,
    avatarPreview,
    setAvatarPreview,
    addUser,
    editUser,
    deleteUser,
    filter,
    setFilter,
    searchTerm,
    setSearchTerm,
    loading,
    error,
    initialFormValues,
  };
}

export default useUserManagement;