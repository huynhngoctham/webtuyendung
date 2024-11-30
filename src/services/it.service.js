import apiClient from './apiClient'; // Import cấu hình axios từ file của bạn

const ITService = {
  // Lấy tất cả IT
  getAllIT() {
    return apiClient
      .get('/admin/getIT')
      .then((response) => response.data)
      .catch((error) => {
        console.error('Lỗi khi lấy danh sách IT:', error);
        throw error;
      });
  },

  // Thêm IT mới
  addIT(data) {
    return apiClient
      .post('/admin/addIT', data)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Lỗi khi thêm IT:', error.response?.data || error);
        throw error;
      });
  },

  // Cập nhật IT
  updateIT(id, data) {
    return apiClient
      .put(`/admin/updateIT/${id}`, data)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Lỗi khi cập nhật IT:', error.response?.data || error);
        throw error;
      });
  },

  // Xóa IT
  deleteIT(id) {
    return apiClient
      .delete(`/admin/deleteIT/${id}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Lỗi khi xóa IT:', error.response?.data || error);
        throw error;
      });
  },

  // Tìm kiếm IT
  searchIT(name) {
    return apiClient
      .post('/admin/searchIT', { name })
      .then((response) => response.data)
      .catch((error) => {
        console.error('Lỗi khi tìm kiếm IT:', error.response?.data || error);
        throw error;
      });
  },
};

export default ITService;
