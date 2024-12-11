import apiClient from './apiClient'; // Import axios client from your config

const handleError = (error) => {
  const errorMessage = error.response?.data?.message || 'An error occurred while connecting to the server.';
  const status = error.response?.status || 500;

  // Log lỗi với thông tin chi tiết
  console.error(`API Error [${status}]:`, error.response?.data || error.message);

  // Ném lỗi với thông báo cụ thể
  throw new Error(errorMessage);
};

const WorkExperienceService = {
  // Lấy tất cả kinh nghiệm làm việc
  getWorkExperience() {
    return apiClient
      .get('/candidate/getWorkExperience')
      .then((response) => response.data)
      .catch(handleError); // Sử dụng handleError để xử lý lỗi
  },

  // Thêm kinh nghiệm làm việc
  addWorkExperience(data) {
    return apiClient
      .post('/candidate/addWorkExperience', data)
      .then((response) => response.data)
      .catch(handleError); // Sử dụng handleError để xử lý lỗi
  },

  // Cập nhật kinh nghiệm làm việc
  updateWorkExperience(id, data) {
    return apiClient
      .put(`/candidate/updateWorkExperience/${id}`, data)
      .then((response) => response.data)
      .catch(handleError); // Sử dụng handleError để xử lý lỗi
  },

  // Xóa kinh nghiệm làm việc
  deleteWorkExperience(id) {
    return apiClient
      .delete(`/candidate/deleteWorkExperience/${id}`)
      .then((response) => response.data)
      .catch(handleError); // Sử dụng handleError để xử lý lỗi
  },
};

export default WorkExperienceService;
