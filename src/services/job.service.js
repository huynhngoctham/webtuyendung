import apiClient from './apiClient'; // Import cấu hình axios từ file của bạn

const JobService = {
  // Lấy tất cả các tin tuyển dụng còn hạn và employer không bị khóa
  getActiveRecruitments() {
    return apiClient
      .get('/active-recruitments') // Gọi API showActiveRecruitments
      .then((response) => response.data) // Trả về dữ liệu
      .catch((error) => {
        console.error('Lỗi khi lấy danh sách tin tuyển dụng:', error);
        throw error; // Quăng lỗi để hàm gọi xử lý
      });
  },

  // Lấy chi tiết tin tuyển dụng theo ID
  getJobDetailsById(id) {
    return apiClient
      .get(`/get/news/${id}`) // Gọi API getNews với ID
      .then((response) => response.data) // Trả về dữ liệu chi tiết tin tuyển dụng
      .catch((error) => {
        console.error(`Lỗi khi lấy thông tin tin tuyển dụng với ID ${id}:`, error);
        throw error; // Quăng lỗi để hàm gọi xử lý
      });
  },
};

export default JobService;
