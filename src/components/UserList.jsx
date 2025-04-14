import { useState } from 'react';
import PropTypes from 'prop-types';
import UserCard from './UserCard';
import UserForm from './UserForm';
import UserProfile from './UserProfile';

function UserList({ users, setUsers, form, avatarPreview, setAvatarPreview, addUser, editUser, deleteUser, initialFormValues }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleView = (user) => {
    setSelectedUser(user);
    setShowViewModal(true);
  };

  const handleEdit = (user) => {
    form.setValues({ ...user, id: user.id });
    setAvatarPreview(user.avatar);
    setShowEditModal(true);
  };

  const handleAdd = () => {
    form.reset();
    setAvatarPreview(initialFormValues.avatar);
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setShowViewModal(false);
    setShowEditModal(false);
    setSelectedUser(null);
  };

  return (
    <>
      <div className="search-filter-section">
        <div className="search-box">
          <i className="fas fa-search search-icon"></i>
          <input
            type="text"
            placeholder="Search users by name or email..."
            onChange={(e) => setUsers({ searchTerm: e.target.value })}
          />
        </div>
        <div className="filter-add-container">
          <div className="filter-dropdown">
            <button className="filter-btn">
              <span>{users.filter === 'all' ? 'All Users' : users.filter === 'active' ? 'Active Users' : 'Inactive Users'}</span>
              <i className="fas fa-chevron-down"></i>
            </button>
            <div className={`filter-content ${users.filterMenuOpen ? 'active' : ''}`}>
              <a
                href="#"
                className={users.filter === 'all' ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  setUsers({ filter: 'all' });
                }}
              >
                All Users
              </a>
              <a
                href="#"
                className={users.filter === 'active' ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  setUsers({ filter: 'active' });
                }}
              >
                Active Users
              </a>
              <a
                href="#"
                className={users.filter === 'inactive' ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  setUsers({ filter: 'inactive' });
                }}
              >
                Inactive Users
              </a>
            </div>
          </div>
          <button className="add-user-btn" onClick={handleAdd}>
            <i className="fas fa-user-plus"></i> Add User
          </button>
        </div>
      </div>
      <div className="user-grid">
        {users.users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={deleteUser}
          />
        ))}
      </div>
      {showAddModal && (
        <UserForm
          form={form}
          avatarPreview={avatarPreview}
          setAvatarPreview={setAvatarPreview}
          onSubmit={addUser}
          onClose={handleCloseModal}
          title="Add New User"
        />
      )}
      {showEditModal && (
        <UserForm
          form={form}
          avatarPreview={avatarPreview}
          setAvatarPreview={setAvatarPreview}
          onSubmit={() => editUser(form.values)}
          onClose={handleCloseModal}
          title="Edit User"
        />
      )}
      {showViewModal && (
        <UserProfile user={selectedUser} onClose={handleCloseModal} onEdit={() => handleEdit(selectedUser)} />
      )}
    </>
  );
}

UserList.propTypes = {
  users: PropTypes.shape({
    users: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired,
        isActive: PropTypes.bool.isRequired,
        avatar: PropTypes.string.isRequired,
      })
    ).isRequired,
    filter: PropTypes.string.isRequired,
    filterMenuOpen: PropTypes.bool.isRequired,
  }).isRequired,
  setUsers: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  avatarPreview: PropTypes.string.isRequired,
  setAvatarPreview: PropTypes.func.isRequired,
  addUser: PropTypes.func.isRequired,
  editUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  initialFormValues: PropTypes.object.isRequired,
};

export default UserList;