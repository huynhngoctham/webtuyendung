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
// Đăng nhập admin
export const loginAdmin = async (data) => {
  try {
    const response = await apiClient.post('/loginAdmin', data);

    // Lưu token và thông tin admin vào localStorage
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Lỗi đăng nhập admin';
  }
};

// Đăng xuất admin
export const logoutAdmin = async () => {
  const token = localStorage.getItem('token');
  
  // Xóa token và thông tin admin khỏi localStorage
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  
  // Gọi API logout nếu cần
  if (token) {
    try {
      await apiClient.post('/admin/logout'); // API logout cho admin
    } catch (error) {
      console.error('Logout admin API error:', error);
    }
  }
  return { success: true };
};
