import { useLocalStorage } from './useLocalStorage';
import { useForm } from './useForm';
import { useFetch } from './useFetch';

export function useUserManagement() {
  const [users, setUsers] = useLocalStorage('users', [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@example.com',
      role: 'admin',
      country: 'USA',
      phone: '+1 555-0101',
      birthdate: '1985-03-15',
      department: 'IT',
      position: 'Senior Developer',
      isActive: true,
      joinDate: '2020-01-10',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
    {
      id: 2,
      name: 'Emma Johnson',
      email: 'emma.johnson@example.com',
      role: 'manager',
      country: 'UK',
      phone: '+44 555-0102',
      birthdate: '1990-07-22',
      department: 'Marketing',
      position: 'Marketing Manager',
      isActive: true,
      joinDate: '2021-03-15',
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    {
      id: 3,
      name: 'Michael Brown',
      email: 'michael.brown@example.com',
      role: 'editor',
      country: 'Canada',
      phone: '+1 555-0103',
      birthdate: '1988-11-30',
      department: 'Content',
      position: 'Content Editor',
      isActive: false,
      joinDate: '2019-06-20',
      avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
    },
    {
      id: 4,
      name: 'Sarah Davis',
      email: 'sarah.davis@example.com',
      role: 'customer',
      country: 'Australia',
      phone: '+61 555-0104',
      birthdate: '1995-02-10',
      department: 'Support',
      position: 'Support Specialist',
      isActive: true,
      joinDate: '2022-09-05',
      avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
    },
    {
      id: 5,
      name: 'David Wilson',
      email: 'david.wilson@example.com',
      role: 'viewer',
      country: 'Germany',
      phone: '+49 555-0105',
      birthdate: '1983-09-18',
      department: 'Analytics',
      position: 'Data Analyst',
      isActive: true,
      joinDate: '2020-11-12',
      avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
    },
    {
      id: 6,
      name: 'Lisa Anderson',
      email: 'lisa.anderson@example.com',
      role: 'manager',
      country: 'France',
      phone: '+33 555-0106',
      birthdate: '1992-04-25',
      department: 'HR',
      position: 'HR Manager',
      isActive: true,
      joinDate: '2021-07-30',
      avatar: 'https://randomuser.me/api/portraits/women/7.jpg',
    },
    {
      id: 7,
      name: 'James Taylor',
      email: 'james.taylor@example.com',
      role: 'editor',
      country: 'Japan',
      phone: '+81 555-0107',
      birthdate: '1987-12-05',
      department: 'Design',
      position: 'UX Designer',
      isActive: false,
      joinDate: '2018-04-22',
      avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
    },
    {
      id: 8,
      name: 'Emily White',
      email: 'emily.white@example.com',
      role: 'customer',
      country: 'China',
      phone: '+86 555-0108',
      birthdate: '1993-06-14',
      department: 'Sales',
      position: 'Sales Representative',
      isActive: true,
      joinDate: '2022-02-18',
      avatar: 'https://randomuser.me/api/portraits/women/9.jpg',
    },
    {
      id: 9,
      name: 'Robert Lee',
      email: 'robert.lee@example.com',
      role: 'viewer',
      country: 'India',
      phone: '+91 555-0109',
      birthdate: '1989-08-07',
      department: 'Finance',
      position: 'Financial Analyst',
      isActive: true,
      joinDate: '2020-05-25',
      avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
    },
    {
      id: 10,
      name: 'Anna Garcia',
      email: 'anna.garcia@example.com',
      role: 'admin',
      country: 'Brazil',
      phone: '+55 555-0110',
      birthdate: '1991-10-03',
      department: 'Operations',
      position: 'Operations Manager',
      isActive: true,
      joinDate: '2021-12-01',
      avatar: 'https://randomuser.me/api/portraits/women/11.jpg',
    },
  ]);

  const { data: fetchedUsers, loading, error } = useFetch(null, {});

  const addFormProps = useForm(
    {
      name: '',
      email: '',
      role: '',
      country: '',
      phone: '',
      birthdate: '',
      department: '',
      position: '',
      isActive: true,
      avatarFile: null,
      avatar: 'https://via.placeholder.com/100',
    },
    (data) => {}
  );

  const addUser = (data) => {
    const newUser = {
      id: users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1,
      ...data,
      joinDate: new Date().toISOString().split('T')[0],
      avatar: data.avatarFile
        ? URL.createObjectURL(data.avatarFile)
        : data.avatar || 'https://via.placeholder.com/100',
    };
    setUsers([...users, newUser]);
    addFormProps.setValues(addFormProps.initialValues);
  };

  const editUser = (id, data) => {
    setUsers(
      users.map((u) =>
        u.id === id
          ? {
              ...u,
              ...data,
              avatar: data.avatarFile
                ? URL.createObjectURL(data.avatarFile)
                : data.avatar || u.avatar,
            }
          : u
      )
    );
  };

  const deleteUser = (id) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  const getUser = (id) => users.find((u) => u.id === id);

  const editFormProps = (id) => {
    const user = getUser(id) || {};
    return useForm(
      {
        name: user.name || '',
        email: user.email || '',
        role: user.role || '',
        country: user.country || '',
        phone: user.phone || '',
        birthdate: user.birthdate || '',
        department: user.department || '',
        position: user.position || '',
        isActive: user.isActive !== undefined ? user.isActive : true,
        avatarFile: null,
        avatar: user.avatar || 'https://via.placeholder.com/100',
      },
      (data) => {}
    );
  };

  return {
    users,
    addUser,
    editUser,
    deleteUser,
    getUser,
    addFormProps,
    editFormProps,
    loading,
    error,
  };
}