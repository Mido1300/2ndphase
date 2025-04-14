import PropTypes from 'prop-types';

function UserForm({ form, avatarPreview, setAvatarPreview, onSubmit, onClose, title }) {
  const { values, errors, handleChange, handleFileChange, validate } = form;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit();
      onClose();
    }
  };

  return (
    <div className="modal active" onClick={(e) => e.target.classList.contains('modal') && onClose()}>
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <span className="close" onClick={onClose}>
            ×
          </span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="avatar-upload">
            <img src={avatarPreview} alt="Avatar Preview" />
            <label htmlFor="avatar-upload">Upload Profile Picture</label>
            <input
              type="file"
              id="avatar-upload"
              accept="image/*"
              onChange={(e) => handleFileChange(e, setAvatarPreview)}
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name" className="required">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                value={values.name}
                onChange={handleChange}
                required
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="email" className="required">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={values.email}
                onChange={handleChange}
                required
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="role" className="required">
                Role
              </label>
              <select
                id="role"
                name="role"
                className="form-control"
                value={values.role}
                onChange={handleChange}
                required
              >
                <option value="">Select a role</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="editor">Editor</option>
                <option value="customer">Customer</option>
                <option value="viewer">Viewer</option>
              </select>
              {errors.role && <span className="error-message">{errors.role}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <select
                id="country"
                name="country"
                className="form-control"
                value={values.country}
                onChange={handleChange}
              >
                <option value="">Select a country</option>
                <option value="USA">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
                <option value="Japan">Japan</option>
                <option value="China">China</option>
                <option value="India">India</option>
                <option value="Brazil">Brazil</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="form-control"
                value={values.phone}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="birthdate" className="required">
                Birth Date
              </label>
              <input
                type="date"
                id="birthdate"
                name="birthdate"
                className="form-control"
                value={values.birthdate}
                onChange={handleChange}
                required
              />
              {errors.birthdate && <span className="error-message">{errors.birthdate}</span>}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="department">Department</label>
              <input
                type="text"
                id="department"
                name="department"
                className="form-control"
                value={values.department}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="position">Position</label>
              <input
                type="text"
                id="position"
                name="position"
                className="form-control"
                value={values.position}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              id="is-active"
              name="isActive"
              checked={values.isActive}
              onChange={handleChange}
            />
            <label htmlFor="is-active">Active User</label>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-lg btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-lg btn-success">
              {title === 'Add New User' ? 'Create User' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

UserForm.propTypes = {
  form: PropTypes.object.isRequired,
  avatarPreview: PropTypes.string.isRequired,
  setAvatarPreview: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default UserForm;