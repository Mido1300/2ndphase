import styles from '../styles/UserProfile.module.css';
import { FaTimes, FaPen } from 'react-icons/fa';

export default function UserProfile({ user, onClose, onEdit }) {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>User Details</h2>
          <span className={styles.close} onClick={onClose}>
            <FaTimes />
          </span>
        </div>
        <div className={styles.userHeader}>
          <img src={user.avatar} alt={user.name} className={styles.userAvatarLarge} />
          <div className={styles.userTitle}>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
        </div>
        <div className={styles.userDetailsGrid}>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Phone</div>
            <div className={styles.detailValue}>{user.phone || 'N/A'}</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Location</div>
            <div className={styles.detailValue}>{user.country || 'N/A'}</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Department</div>
            <div className={styles.detailValue}>{user.department || 'N/A'}</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Position</div>
            <div className={styles.detailValue}>{user.position || 'N/A'}</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Role</div>
            <div className={styles.detailValue}>
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Status</div>
            <div className={styles.detailValue}>{user.isActive ? 'Active' : 'Inactive'}</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Birth Date</div>
            <div className={styles.detailValue}>{user.birthdate}</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Join Date</div>
            <div className={styles.detailValue}>{user.joinDate}</div>
          </div>
        </div>
        <div className={styles.modalFooter}>
          <button className={styles.btnSecondary} onClick={() => onEdit(user.id)}>
            <FaPen /> Edit
          </button>
          <button className={styles.btnSecondary} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}