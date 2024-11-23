import apiClient from './apiClient';

// Gọi API đăng ký ứng viên
export const registerCandidate = async (data) => {
  try {
    const response = await apiClient.post('/registerCandidate', data); // URL tương ứng với API backend
    return response.data;
  } catch (error) {
    throw error.response.data || 'Lỗi không xác định';
  }
};

export const loginCandidate = async (data) => {
    try {
      const response = await apiClient.post('/loginCandidate', data);
      return response.data; // Trả về dữ liệu sau khi đăng nhập thành công
    } catch (error) {
      throw error.response ? error.response.data : error; // Trả về lỗi nếu có
    }
  };