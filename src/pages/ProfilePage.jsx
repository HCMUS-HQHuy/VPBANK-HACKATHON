import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faEnvelope, 
  faSave, 
  faSpinner, 
  faKey, 
  faLock,
  faCamera 
} from '@fortawesome/free-solid-svg-icons';

const ProfilePage = () => {
  const { user, updateUserProfile } = useAuth();
  const [avatarPreview, setAvatarPreview] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setAvatarPreview(`https://i.pravatar.cc/150?u=${user.username}`);
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      if (formData.username !== user.username || formData.email !== user.email) {
        await updateUserProfile({
          username: formData.username,
          email: formData.email,
        });
        setSuccess('Profile information updated successfully!');
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to update profile info.');
      setIsLoading(false);
      return; 
    }

    if (formData.newPassword) {
      if (formData.newPassword.length < 8) {
        setError('New password must be at least 8 characters long.');
        setIsLoading(false);
        return;
      }
      if (formData.newPassword !== formData.confirmPassword) {
        setError('New passwords do not match.');
        setIsLoading(false);
        return;
      }
      if (!formData.currentPassword) {
        setError('Please enter your current password to set a new one.');
        setIsLoading(false);
        return;
      }

      try {
        await changePassword({
          current_password: formData.currentPassword,
          new_password: formData.newPassword,
        });
        setSuccess(prev => (prev ? prev + ' Password changed successfully!' : 'Password changed successfully!'));
        
        setFormData(prev => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }));
      } catch (err) {
        setError(err.response?.data?.detail || 'Failed to change password.');
      }
    }

    setIsLoading(false);
  };

  if (!user) {
    return <div>Loading user profile...</div>;
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="glass-card p-8 rounded-xl border border-border shadow-sm">
          
          <div className="flex flex-col items-center gap-4 mb-8">
            {/* Change Avatar Function */}
            <div className="relative group cursor-pointer" onClick={handleAvatarClick}>
              <img 
                className="h-28 w-28 rounded-full border-4 border-primary object-cover" 
                src={avatarPreview}
                alt="User avatar" 
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <FontAwesomeIcon icon={faCamera} className="text-white text-3xl" />
              </div>
            </div>
            {/* Input file ẩn */}
            <input 
              type="file"
              ref={fileInputRef}
              onChange={handleAvatarChange}
              className="hidden"
              accept="image/png, image/jpeg, image/gif"
            />
            <div>
              <h2 className="text-2xl font-bold text-text-primary text-center">{user.username}</h2>
              <p className="text-text-secondary text-center">{user.email}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="text-xl font-semibold text-text-primary border-b border-border pb-2">Edit Information</h3>
            
            {/* Username và Email không đổi */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-text-secondary mb-1">Username</label>
              <div className="relative">
                <FontAwesomeIcon icon={faUser} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                <input id="username" name="username" type="text" value={formData.username} onChange={handleChange} className="pl-10 w-full p-3 bg-card-secondary border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-1">Email Address</label>
              <div className="relative">
                <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className="pl-10 w-full p-3 bg-card-secondary border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
            </div>

            {/* PHẦN THAY ĐỔI MẬT KHẨU MỚI */}
            <div className="pt-6">
              <h3 className="text-xl font-semibold text-text-primary border-b border-border pb-2">Change Password</h3>
              <div className="space-y-6 mt-6">
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-text-secondary mb-1">Current Password</label>
                  <div className="relative">
                    <FontAwesomeIcon icon={faKey} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                    <input id="currentPassword" name="currentPassword" type="password" value={formData.currentPassword} onChange={handleChange} placeholder="Enter your current password" className="pl-10 w-full p-3 bg-card-secondary border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring" />
                  </div>
                </div>
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-text-secondary mb-1">New Password</label>
                  <div className="relative">
                    <FontAwesomeIcon icon={faLock} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                    <input id="newPassword" name="newPassword" type="password" value={formData.newPassword} onChange={handleChange} placeholder="Enter new password" className="pl-10 w-full p-3 bg-card-secondary border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring" />
                  </div>
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-secondary mb-1">Confirm New Password</label>
                  <div className="relative">
                    <FontAwesomeIcon icon={faLock} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                    <input id="confirmPassword" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm new password" className="pl-10 w-full p-3 bg-card-secondary border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring" />
                  </div>
                </div>
              </div>
            </div>

            {error && <p className="text-sm text-center text-danger pt-4">{error}</p>}
            {success && <p className="text-sm text-center text-green pt-4">{success}</p>}

            <div className="pt-2">
              <button type="submit" disabled={isLoading} className="w-full py-3 bg-brand text-card font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50">
                {isLoading ? <FontAwesomeIcon icon={faSpinner} className="animate-spin" /> : <FontAwesomeIcon icon={faSave} />}
                <span>{isLoading ? 'Saving...' : 'Save Changes'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;