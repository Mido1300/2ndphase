import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import UserDashboard from './components/UserDashboard';

function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(username, password)) {
      setError('');
    } else {
      setError('Username or password do not match our records');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>User Management System</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="12345"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
          {error && <p className="error-message" style={{ display: 'block' }}>{error}</p>}
        </form>
      </div>
    </div>
  );
}

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <ThemeProvider>
      <AuthProvider>
        {isLoggedIn ? <UserDashboard /> : <Login />}
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;