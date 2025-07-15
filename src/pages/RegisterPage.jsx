// src/pages/RegisterPage.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Footer from '../auth/Footer';
import Header from '../auth/Header';

const RegisterPage = () => {
  // --- State cho các trường input ---
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  // --- State cho việc xử lý lỗi và tải ---
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // --- Xóa các thông báo cũ và bắt đầu tải ---
    setError('');
    setSuccessMessage('');

    // --- Kiểm tra mật khẩu phía client ---
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);

    try {
      // --- Gọi hàm register từ AuthContext ---
      await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      setSuccessMessage('Registration successful! Redirecting to login...');
      
      // --- Chờ vài giây để người dùng đọc thông báo rồi chuyển trang ---
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err) {
      // --- Hiển thị lỗi từ API ---
      // API trả về lỗi trong err.response.data.detail
      setError(err.response?.data?.detail || 'Registration failed. Please try again.');
    } finally {
      // --- Dừng trạng thái tải ---
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header msg1={'Create Your Account'} msg2={'Start your journey to financial freedom.'}/>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <FormField id="username" label="Username" type="text" value={formData.username} onChange={handleChange} required />
        <FormField id="email" label="Email Address" type="email" value={formData.email} onChange={handleChange} required />
        <FormField id="password" label="Password" type="password" value={formData.password} onChange={handleChange} required />
        <FormField id="confirmPassword" label="Confirm Password" type="password" value={formData.confirmPassword} onChange={handleChange} required />
        
        {/* --- Hiển thị thông báo lỗi hoặc thành công --- */}
        {error && <p className="text-sm text-center text-danger">{error}</p>}
        {successMessage && <p className="text-sm text-center text-green">{successMessage}</p>}

        <button
          type="submit"
          disabled={isLoading} // --- Vô hiệu hóa nút khi đang tải ---
          className="w-full py-3 bg-brand text-card font-semibold rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-brand-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>
      <Footer url={'/login'} page={'Log In'} msg={'Already have an account? '} />
    </>
  );
};

// Component FormField được chỉnh sửa một chút để nhận value và onChange
const FormField = ({ id, label, type, value, onChange, required = false }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-text-secondary">
      {label}
    </label>
    <input
      id={id}
      name={id}
      type={type}
      required={required}
      value={value}
      onChange={onChange}
      className="mt-1 w-full p-3 bg-card-secondary border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
    />
  </div>
);


export default RegisterPage;