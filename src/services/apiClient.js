import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor trước khi gửi request
apiClient.interceptors.request.use(
  (config) => {
    let token;

    // Lấy token từ localStorage nếu có
    const currentPath = window.location.pathname;
    if (currentPath.includes('/employer')) {
      token = localStorage.getItem('employer_token');
    } else {
      token = localStorage.getItem('token');
    }

    // Thêm token vào header Authorization nếu tồn tại
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log('Config URL:', config.url);
    console.log('Token gửi đi:', token || 'Không có token (không cần thiết)');

    return config;
  },
  (error) => {
    console.error('Lỗi request: ', error);
    return Promise.reject(error);
  }
);

// Interceptor xử lý response
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.error('Lỗi response: ', error.response);

    // Xử lý lỗi 401 - Token không hợp lệ hoặc hết hạn
    if (error.response?.status === 401) {
      console.warn('Token hết hạn hoặc không hợp lệ.');

      const currentPath = window.location.pathname;
      if (currentPath.includes('/employer')) {
        localStorage.removeItem('employer_token');
        window.location.href = '/employer/login';
      } else {
        localStorage.removeItem('token');
        window.location.href = '/jobseeker/login';
      }

      // Xóa thông tin người dùng
      localStorage.removeItem('user');
    }

    return Promise.reject(error);
  }
);

export default apiClient;
