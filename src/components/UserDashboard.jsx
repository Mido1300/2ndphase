import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import useUserManagement from '../hooks/useUserManagement';
import UserList from './UserList';

function UserDashboard() {
  const { isDarkMode, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const userManagement = useUserManagement();
  const {
    users,
    setUsers,
    form,
    avatarPreview,
    setAvatarPreview,
    addUser,
    editUser,
    deleteUser,
    filter,
    setFilter,
    initialFormValues,
  } = userManagement;

  const toggleFilterMenu = () => {
    setUsers((prev) => ({ ...prev, filterMenuOpen: !prev.filterMenuOpen }));
  };

  return (
    <div className="container">
      <div className="header">
        <h1>User Management Dashboard</h1>
        <div className="header-controls">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <label className="toggle-switch">
              <input type="checkbox" checked={isDarkMode} onChange={toggleTheme} />
              <span className="toggle-slider"></span>
            </label>
            <span className="mode-icon">
              <i className={`fas ${isDarkMode ? 'fa-moon' : 'fa-sun'}`}></i>
              {isDarkMode ? 'Dark Mode' : 'Light Mode'}
            </span>
          </div>
          <div className="user-profile">
            <img
              src="https://randomuser.me/api/portraits/men/1.jpg"
              alt="Admin Profile"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            <div className={`dropdown ${dropdownOpen ? 'active' : ''}`}>
              <a href="#" onClick={(e) => { e.preventDefault(); logout(); }}>
                <i className="fas fa-sign-out-alt"></i> Logout
              </a>
            </div>
          </div>
        </div>
      </div>
      <UserList
        users={{ users, filter, filterMenuOpen: userManagement.filterMenuOpen }}
        setUsers={(updates) => setUsers((prev) => ({ ...prev, ...updates }))}
        form={form}
        avatarPreview={avatarPreview}
        setAvatarPreview={setAvatarPreview}
        addUser={addUser}
        editUser={editUser}
        deleteUser={deleteUser}
        initialFormValues={initialFormValues}
      />
    </div>
  );
}

export default UserDashboard;