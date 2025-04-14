import { useState, useEffect } from 'react';
import styles from '../styles/UserForm.module.css';
import { FaTimes, FaUpload } from 'react-icons/fa';

export default function UserForm({ user, onSubmit, onClose, title, formProps }) {
  const { values, handleChange, handleSubmit, setValues } = formProps;
  const [preview, setPreview] = useState(values.avatar || 'https://via.placeholder.com/100');

  useEffect(() => {
    if (values.avatarFile) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(values.avatarFile);
    }
  }, [values.avatarFile]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValues({ ...values, avatarFile: file });
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{title}</h2>
          <span className={styles.close} onClick={onClose}>
            <FaTimes />
          </span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.avatarUpload}>
            <img src={preview} alt="Avatar Preview" />
            <label htmlFor="avatar-upload">
              <FaUpload /> {user ? 'Change Profile Picture' : 'Upload Profile Picture'}
            </label>
            <input
              type="file"
              id="avatar-upload"
              accept="image/*"
              onChange={handleAvatarChange}
            />
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.required}>
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={values.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.required}>
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="role" className={styles.required}>
                Role
              </label>
              <select id="role" name="role" value={values.role} onChange={handleChange} required>
                <option value="">Select a role</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="editor">Editor</option>
                <option value="customer">Customer</option>
                <option value="viewer">Viewer</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="country">Country</label>
              <select id="country" name="country" value={values.country} onChange={handleChange}>
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
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={values.phone}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="birthdate" className={styles.required}>
                Birth Date
              </label>
              <input
                type="date"
                id="birthdate"
                name="birthdate"
                value={values.birthdate}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="department">Department</label>
              <input
                type="text"
                id="department"
                name="department"
                value={values.department}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="position">Position</label>
              <input
                type="text"
                id="position"
                name="position"
                value={values.position}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={styles.formCheck}>
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              checked={values.isActive}
              onChange={handleChange}
            />
            <label htmlFor="isActive">Active User</label>
          </div>
          <div className={styles.modalFooter}>
            <button type="button" className={styles.btnSecondary} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={styles.btnSuccess}>
              {user ? 'Save Changes' : 'Create User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}