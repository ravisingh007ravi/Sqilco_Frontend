import React, { useState } from 'react';
import { useAuth } from './Contexts/AuthContext';
import { FaTrash, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Setting() {
  const { currentUser, updateEmail, updatePassword, deleteAccount } = useAuth();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Email Update State
  const [emailForm, setEmailForm] = useState({
    newEmail: '',
    currentPassword: ''
  });
  
  // Password Update State
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  
  // Delete Account State
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');

  const handleEmailChange = (e) => {
    setEmailForm({...emailForm, [e.target.name]: e.target.value});
  };

  const handlePasswordChange = (e) => {
    setPasswordForm({...passwordForm, [e.target.name]: e.target.value});
  };

  const handleUpdateEmail = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!emailForm.newEmail || !emailForm.currentPassword) {
      return setError('All fields are required');
    }
    
    if (emailForm.newEmail === currentUser.email) {
      return setError('New email must be different from current email');
    }

    try {
      setLoading(true);
      // Reauthenticate then update email
      await updateEmail(emailForm.newEmail, emailForm.currentPassword);
      setSuccess('Email updated successfully!');
      setEmailForm({newEmail: '', currentPassword: ''});
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      return setError('All fields are required');
    }
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      return setError('Passwords do not match');
    }
    
    if (passwordForm.newPassword.length < 6) {
      return setError('Password should be at least 6 characters');
    }

    try {
      setLoading(true);
      // Reauthenticate then update password
      await updatePassword(passwordForm.currentPassword, passwordForm.newPassword);
      setSuccess('Password updated successfully!');
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!deleteConfirm) {
      setDeleteConfirm(true);
      return;
    }
    
    if (!deletePassword) {
      setError('Please enter your password to confirm account deletion');
      return;
    }

    try {
      setLoading(true);
      await deleteAccount(deletePassword);
      // Account deletion will trigger redirect in AuthContext
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 overflow-auto py-12 pt-25 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 space-y-8">
        <h1 className="text-2xl font-bold text-gray-900 text-center">Account Settings</h1>
        
        {/* Error/Success Messages */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
            {success}
          </div>
        )}

        {/* Update Email Section */}
        <div className="border-b pb-6">
          <div className="flex items-center mb-4">
            <FaEnvelope className="text-blue-500 mr-2" />
            <h2 className="text-lg font-medium text-gray-900">Change Email Address</h2>
          </div>
          
          <form onSubmit={handleUpdateEmail} className="space-y-4">
            <div>
              <label htmlFor="current-email" className="block text-sm font-medium text-gray-700">
                Current Email
              </label>
              <input
                type="email"
                id="current-email"
                value={currentUser?.email || ''}
                disabled
                className="mt-1 block w-full bg-gray-100 border-gray-300 rounded-md shadow-sm"
              />
            </div>
            
            <div>
              <label htmlFor="new-email" className="block text-sm font-medium text-gray-700">
                New Email
              </label>
              <input
                type="email"
                id="new-email"
                name="newEmail"
                value={emailForm.newEmail}
                onChange={handleEmailChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email-password" className="block text-sm font-medium text-gray-700">
                Current Password
              </label>
              <input
                type="password"
                id="email-password"
                name="currentPassword"
                value={emailForm.currentPassword}
                onChange={handleEmailChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Update Email'}
            </button>
          </form>
        </div>

        {/* Update Password Section */}
        <div className="border-b pb-6">
          <div className="flex items-center mb-4">
            <FaLock className="text-blue-500 mr-2" />
            <h2 className="text-lg font-medium text-gray-900">Change Password</h2>
          </div>
          
          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <div>
              <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">
                Current Password
              </label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  id="current-password"
                  name="currentPassword"
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordChange}
                  className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 pr-10"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            
            <div>
              <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="new-password"
                name="newPassword"
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="confirm-password"
                name="confirmPassword"
                value={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </div>

        {/* Delete Account Section */}
        <div className="pb-2">
          <div className="flex items-center mb-4">
            <FaTrash className="text-red-500 mr-2" />
            <h2 className="text-lg font-medium text-gray-900">Delete Account</h2>
          </div>
          
          <p className="text-sm text-gray-600 mb-4">
            {deleteConfirm 
              ? "This action is permanent and cannot be undone. All your data will be deleted immediately."
              : "Once you delete your account, there is no going back. Please be certain."}
          </p>
          
          {deleteConfirm && (
            <div className="mb-4">
              <label htmlFor="delete-password" className="block text-sm font-medium text-gray-700">
                Enter your password to confirm
              </label>
              <input
                type="password"
                id="delete-password"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>
          )}
          
          <button
            onClick={handleDeleteAccount}
            disabled={loading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              deleteConfirm 
                ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500' 
                : 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-500'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50`}
          >
            {loading ? 'Processing...' : deleteConfirm ? 'Permanently Delete My Account' : 'Delete Account'}
          </button>
          
          {deleteConfirm && (
            <button
              onClick={() => {
                setDeleteConfirm(false);
                setDeletePassword('');
                setError('');
              }}
              className="mt-2 w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
}