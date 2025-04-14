import { useContext } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../contexts/AuthContext';
import { useForm } from '../hooks/useForm';
import styles from '../styles/Login.module.css';
import { FaSignInAlt } from 'react-icons/fa';

export default function Login() {
  const { login } = useContext(AuthContext);
  const router = useRouter();
  const { values, handleChange, handleSubmit } = useForm(
    { username: '', password: '' },
    async (data) => {
      if (data.username === 'admin' && data.password === '12345') {
        login();
        router.push('/dashboard');
      } else {
        alert('Username or password do not match our records');
      }
    }
  );

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <h2>User Management System</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="admin"
              value={values.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="12345"
              value={values.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className={styles.loginBtn}>
            <FaSignInAlt /> Login
          </button>
        </form>
      </div>
    </div>
  );
}