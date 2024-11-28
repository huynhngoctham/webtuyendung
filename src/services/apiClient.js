import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // Đảm bảo đúng URL
  headers: {
    'Content-Type': 'application/json', // Đảm bảo loại dữ liệu đúng
  },
});

// Interceptor trước khi gửi request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Lấy token từ localStorage
    console.log('Token gửi đi: ', token); // Thêm log để kiểm tra token

    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Đảm bảo token được gửi đúng trong header
    }

    return config;
  },
  (error) => {
    console.error('Lỗi request: ', error); // Log lỗi request
    return Promise.reject(error);
  }
);

// Interceptor xử lý response
apiClient.interceptors.response.use(
  (response) => response, // Trả về response nếu thành công
  async (error) => {
    console.error('Lỗi response: ', error.response); // Log lỗi response để kiểm tra

    if (error.response?.status === 401) {
      console.warn('Token hết hạn hoặc không hợp lệ.');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/jobseeker/login'; // Đảm bảo chuyển hướng đúng
    }

    return Promise.reject(error); // Trả về lỗi để xử lý tiếp
  }
);

export default apiClient;
