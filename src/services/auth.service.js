import apiClient from './apiClient';

// Đăng ký ứng viên
export const registerCandidate = async (data) => {
  try {
    const response = await apiClient.post('/registerCandidate', data);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Lỗi đăng ký tài khoản';
  }
};

// Đăng nhập ứng viên
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

// Đăng xuất ứng viên
export const logoutCandidate = async () => {
  const token = localStorage.getItem('token');
  
  localStorage.removeItem('token');
  localStorage.removeItem('user');

  if (token) {
    try {
      await apiClient.post('/logout');
    } catch (error) {
      console.log('Logout API error:', error);
    }
  }
  
  return { success: true };
};

// Đăng nhập admin
export const loginAdmin = async (data) => {
  try {
    const response = await apiClient.post('/loginAdmin', data);

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
  
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  
  if (token) {
    try {
      await apiClient.post('/admin/logout');
    } catch (error) {
      console.error('Logout admin API error:', error);
    }
  }
  return { success: true };
};

// Đăng ký nhà tuyển dụng
export const registerEmployer = async (data) => {
  try {
    const response = await apiClient.post('/registerEmployer', data);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Lỗi đăng ký nhà tuyển dụng';
  }
};

// Đăng nhập nhà tuyển dụng
export const loginEmployer = async (data) => {
  try {
    const response = await apiClient.post('/loginEmployer', data);

    if (response.data.token) {
      localStorage.setItem('employer_token', response.data.token);
      localStorage.setItem('employer_user', JSON.stringify(response.data.user));
    }

    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Lỗi đăng nhập nhà tuyển dụng';
  }
};

// Thay đổi trạng thái khóa tài khoản nhà tuyển dụng
export const changeLockStatus = async (id) => {
  try {
    const response = await apiClient.put(`/admin/${id}/changeLock`);
    return response.data;  // Đảm bảo trả về dữ liệu đúng định dạng
  } catch (error) {
    // Xử lý lỗi chi tiết từ API
    throw new Error(error.response?.data?.message || 'Lỗi thay đổi trạng thái khóa tài khoản');
  }
};

// Lấy tất cả nhà tuyển dụng
export const getAllEmployers = async () => {
  try {
    const response = await apiClient.get('/admin/employer');
    return response.data; // Trả về dữ liệu danh sách nhà tuyển dụng
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Lỗi lấy danh sách nhà tuyển dụng');
  }
};

// Tìm kiếm nhà tuyển dụng theo tên công ty
export const searchEmployers = async (companyName) => {
  try {
    const response = await apiClient.post('/admin/employerSearch', { company_name: companyName });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Lỗi tìm kiếm nhà tuyển dụng';
  }
};
