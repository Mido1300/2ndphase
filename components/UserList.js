import { useState } from 'react';
import UserCard from './UserCard';
import styles from '../styles/UserList.module.css';
import { FaSearch, FaChevronDown, FaUserPlus } from 'react-icons/fa';

export default function UserList({ users, onView, onEdit, onDelete, onAddUser }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter === 'all' || (filter === 'active' ? user.isActive : !user.isActive);
    return matchesSearch && matchesFilter;
  });

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setIsFilterOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchFilterSection}>
        <div className={styles.searchBox}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className={styles.filterAddContainer}>
          <div className={styles.filterDropdown}>
            <button
              className={styles.filterBtn}
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <span>
                {filter === 'all'
                  ? 'All Users'
                  : filter === 'active'
                  ? 'Active Users'
                  : 'Inactive Users'}
              </span>
              <FaChevronDown />
            </button>
            {isFilterOpen && (
              <div className={styles.filterContent}>
                <a
                  href="#"
                  className={filter === 'all' ? styles.active : ''}
                  onClick={() => handleFilterChange('all')}
                >
                  All Users
                </a>
                <a
                  href="#"
                  className={filter === 'active' ? styles.active : ''}
                  onClick={() => handleFilterChange('active')}
                >
                  Active Users
                </a>
                <a
                  href="#"
                  className={filter === 'inactive' ? styles.active : ''}
                  onClick={() => handleFilterChange('inactive')}
                >
                  Inactive Users
                </a>
              </div>
            )}
          </div>
          <button className={styles.addUserBtn} onClick={onAddUser}>
            <FaUserPlus /> Add User
          </button>
        </div>
      </div>
      <div className={styles.userGrid}>
        {filteredUsers.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}