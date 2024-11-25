// auth.service.js
import apiClient from './apiClient';

export const registerCandidate = async (data) => {
  try {
    const response = await apiClient.post('/registerCandidate', data);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Lỗi đăng ký tài khoản';
  }
};

export const loginCandidate = async (data) => {
  try {
    const response = await apiClient.post('/loginCandidate', data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Lỗi đăng nhập';
  }
};

export const logoutCandidate = async () => {
  const token = localStorage.getItem('token');
  
  // Xóa token và user data từ localStorage trước
  localStorage.removeItem('token');
  localStorage.removeItem('user');

  // Chỉ gọi API logout nếu có token
  if (token) {
    try {
      await apiClient.post('/logout');
    } catch (error) {
      console.log('Logout API error:', error);
      // Bỏ qua lỗi API vì đã xóa data locally
    }
  }
  
  return { success: true };
};
