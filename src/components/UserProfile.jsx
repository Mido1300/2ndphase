import PropTypes from 'prop-types';

function UserProfile({ user, onClose, onEdit }) {
  return (
    <div className="modal user-view-modal active" onClick={(e) => e.target.classList.contains('modal') && onClose()}>
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">User Details</h2>
          <span className="close" onClick={onClose}>
            ×
          </span>
        </div>
        <div className="user-header">
          <img src={user.avatar} alt={user.name} className="user-avatar-large" />
          <div className="user-title">
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
        </div>
        <div className="user-details-grid">
          <div className="detail-item">
            <div className="detail-label">Phone</div>
            <div className="detail-value">{user.phone || 'N/A'}</div>
          </div>
          <div className="detail-item">
            <div className="detail-label">Location</div>
            <div className="detail-value">{user.country || 'N/A'}</div>
          </div>
          <div className="detail-item">
            <div className="detail-label">Department</div>
            <div className="detail-value">{user.department || 'N/A'}</div>
          </div>
          <div className="detail-item">
            <div className="detail-label">Position</div>
            <div className="detail-value">{user.position || 'N/A'}</div>
          </div>
          <div className="detail-item">
            <div className="detail-label">Role</div>
            <div className="detail-value">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</div>
          </div>
          <div className="detail-item">
            <div className="detail-label">Status</div>
            <div className="detail-value">{user.isActive ? 'Active' : 'Inactive'}</div>
          </div>
          <div className="detail-item">
            <div className="detail-label">Birth Date</div>
            <div className="detail-value">{user.birthdate}</div>
          </div>
          <div className="detail-item">
            <div className="detail-label">Join Date</div>
            <div className="detail-value">{user.joinDate}</div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-lg btn-secondary" onClick={onEdit}>
            <i className="fas fa-pen"></i> Edit
          </button>
          <button className="btn btn-lg btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

UserProfile.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    avatar: PropTypes.string.isRequired,
    phone: PropTypes.string,
    country: PropTypes.string,
    department: PropTypes.string,
    position: PropTypes.string,
    birthdate: PropTypes.string.isRequired,
    joinDate: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default UserProfile;