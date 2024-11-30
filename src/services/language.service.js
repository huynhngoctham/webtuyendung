import apiClient from './apiClient'; // Import cấu hình Axios từ file riêng

const LanguageService = {
  // Lấy tất cả ngôn ngữ
  getAllLanguages() {
    return apiClient
      .get('/admin/getLanguage')
      .then((response) => response.data)
      .catch((error) => {
        console.error('Lỗi khi lấy danh sách ngôn ngữ:', error);
        throw error;
      });
  },

  // Thêm một ngôn ngữ mới
  addLanguage(languageData) {
    return apiClient
      .post('/admin/addLanguage', languageData)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Lỗi khi thêm ngôn ngữ:', error.response?.data || error);
        throw error;
      });
  },

  // Cập nhật thông tin ngôn ngữ
  updateLanguage(id, languageData) {
    return apiClient
      .put(`/admin/updateLanguage/${id}`, languageData)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Lỗi khi cập nhật ngôn ngữ:', error.response?.data || error);
        throw error;
      });
  },

  // Xóa ngôn ngữ
  deleteLanguage(id) {
    return apiClient
      .delete(`/admin/deleteLanguage/${id}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Lỗi khi xóa ngôn ngữ:', error.response?.data || error);
        throw error;
      });
  },

  // Tìm kiếm ngôn ngữ
  searchLanguage(query) {
    return apiClient
      .post('/admin/searchLanguage', query)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Lỗi khi tìm kiếm ngôn ngữ:', error.response?.data || error);
        throw error;
      });
  },
};

export default LanguageService;
