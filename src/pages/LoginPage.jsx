import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Footer from '../auth/Footer';
import Header from '../auth/Header';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(username, password);
      navigate('/dashboard'); 

    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header msg1={'Welcome Back'} msg2={'Log in to continue to FinCoach.'}/>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username" className="text-sm font-medium text-text-secondary">Username</label>
          <input 
            id="username" 
            name="username" 
            type="text" 
            required 
            placeholder="john_doe" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 w-full p-3 bg-card-secondary border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring" 
          />
        </div>
        <div>
          <label htmlFor="password" className="text-sm font-medium text-text-secondary">Password</label>
          <input 
            id="password" 
            name="password" 
            type="password" 
            required 
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full p-3 bg-card-secondary border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring" 
          />
        </div>

        {error && <p className="text-sm text-center text-danger">{error}</p>}

        <div>
          <button 
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-brand text-card font-semibold rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-brand-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Logging In...' : 'Log In'}
          </button>
        </div>
      </form>

      <Footer url={'/register'} page={'Register'} msg={'Don\'t have an account? '} />
    </>
  );
};

export default LoginPage;