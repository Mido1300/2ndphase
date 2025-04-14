import { useState, useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { AuthContext } from '../contexts/AuthContext';
import { useUserManagement } from '../hooks/useUserManagement';
import UserList from './UserList';
import UserForm from './UserForm';
import UserProfile from './UserProfile';
import styles from '../styles/Dashboard.module.css';
import { FaSun, FaMoon, FaSignOutAlt } from 'react-icons/fa';

export default function UserDashboard() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { logout } = useContext(AuthContext);
  const {
    users,
    addUser,
    editUser,
    deleteUser,
    getUser,
    addFormProps,
    editFormProps,
  } = useUserManagement();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleViewUser = (id) => {
    setSelectedUserId(id);
    setIsViewModalOpen(true);
  };

  const handleEditUser = (id) => {
    setSelectedUserId(id);
    setIsEditModalOpen(true);
  };

  const handleEditFromView = (id) => {
    setIsViewModalOpen(false);
    setIsEditModalOpen(true);
  };

  return (
    <div className={`${styles.container} ${theme === 'dark' ? styles.darkMode : ''}`}>
      <div className={styles.header}>
        <h1>User Management Dashboard</h1>
        <div className={styles.headerControls}>
          <div className={styles.themeToggle}>
            <label className={styles.toggleSwitch}>
              <input
                type="checkbox"
                checked={theme === 'dark'}
                onChange={toggleTheme}
              />
              <span className={styles.toggleSlider}></span>
            </label>
            <span className={styles.modeIcon}>
              {theme === 'dark' ? <FaMoon /> : <FaSun />}
              {theme === 'dark' ? ' Dark Mode' : ' Light Mode'}
            </span>
          </div>
          <div className={styles.userProfile}>
            <img
              src="https://randomuser.me/api/portraits/men/1.jpg"
              alt="Admin Profile"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            />
            {isDropdownOpen && (
              <div className={styles.dropdown}>
                <a href="#" onClick={logout}>
                  <FaSignOutAlt /> Logout
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      <UserList
        users={users}
        onView={handleViewUser}
        onEdit={handleEditUser}
        onDelete={deleteUser}
        onAddUser={() => setIsAddModalOpen(true)}
      />
      {isAddModalOpen && (
        <UserForm
          title="Add New User"
          onSubmit={addUser}
          onClose={() => setIsAddModalOpen(false)}
          formProps={addFormProps}
        />
      )}
      {isEditModalOpen && (
        <UserForm
          title="Edit User"
          user={getUser(selectedUserId)}
          onSubmit={(data) => editUser(selectedUserId, data)}
          onClose={() => setIsEditModalOpen(false)}
          formProps={editFormProps(selectedUserId)}
        />
      )}
      {isViewModalOpen && (
        <UserProfile
          user={getUser(selectedUserId)}
          onClose={() => setIsViewModalOpen(false)}
          onEdit={handleEditFromView}
        />
      )}
    </div>
  );
}