import PropTypes from 'prop-types';

function UserCard({ user, onView, onEdit, onDelete }) {
  return (
    <div className={`user-card ${user.isActive ? 'user-active' : 'user-inactive'}`}>
      <div className="user-info">
        <img src={user.avatar} alt={user.name} className="user-avatar" />
        <div className="user-details">
          <div className="user-name">{user.name}</div>
          <div className="user-email">{user.email}</div>
          <div className="user-badges">
            <span className="badge badge-role">
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </span>
            <span className={`badge ${user.isActive ? 'badge-active' : 'badge-inactive'}`}>
              {user.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>
      </div>
      <div className="user-actions">
        <button className="btn btn-view" onClick={() => onView(user)}>
          <i className="fas fa-eye"></i> View
        </button>
        <button className="btn btn-edit" onClick={() => onEdit(user)}>
          <i className="fas fa-pen"></i> Edit
        </button>
        <button className="btn btn-delete" onClick={() => onDelete(user.id)}>
          <i className="fas fa-trash"></i> Delete
        </button>
      </div>
    </div>
  );
}

UserCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  onView: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default UserCard;