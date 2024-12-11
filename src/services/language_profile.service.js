import apiClient from './apiClient'; // Import axios client from config

const handleError = (error) => {
  const errorMessage = error.response?.data?.message || 'An error occurred while connecting to the server.';
  const status = error.response?.status || 500;

  // Log lỗi với thông tin chi tiết
  console.error(`API Error [${status}]:`, error.response?.data || error.message);

  // Ném lỗi với thông báo cụ thể
  throw new Error(errorMessage);
};

const LanguageProfileService = {
  // Lấy tất cả thông tin ngôn ngữ của người dùng
  getLanguageDetails() {
    return apiClient
      .get('/candidate/getLanguageDetails')
      .then((response) => response.data)
      .catch(handleError); // Xử lý lỗi
  },

  // Thêm thông tin ngôn ngữ mới
  addLanguageDetails(data) {
    return apiClient
      .post('/candidate/addLanguageDetails', data)
      .then((response) => response.data)
      .catch(handleError); // Xử lý lỗi
  },

  // Cập nhật thông tin ngôn ngữ
  updateLanguageDetails(id, data) {
    return apiClient
      .put(`/candidate/updateLanguageDetails/${id}`, data)
      .then((response) => response.data)
      .catch(handleError); // Xử lý lỗi
  },

  // Xóa thông tin ngôn ngữ
  deleteLanguageDetails(id) {
    return apiClient
      .delete(`/candidate/deleteLanguageDetails/${id}`)
      .then((response) => response.data)
      .catch(handleError); // Xử lý lỗi
  },
};

export default LanguageProfileService;
