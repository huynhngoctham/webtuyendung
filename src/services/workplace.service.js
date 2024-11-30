import apiClient from './apiClient'; // Import cấu hình axios từ file của bạn

const WorkplaceService = {
  // Lấy tất cả workplace
  getAllWorkplace() {
    return apiClient
      .get('/admin/getWorkplace')
      .then((response) => response.data)
      .catch((error) => {
        console.error('Lỗi khi lấy tất cả workplace:', error);
        throw error;
      });
  },

  // Thêm workplace mới
  addWorkplace(data) {
    return apiClient
      .post('/admin/addWorkplace', data)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Lỗi khi thêm workplace:', error.response?.data || error);
        throw error;
      });
  },

  // Cập nhật workplace
  updateWorkplace(id, data) {
    return apiClient
      .put(`/admin/updateWorkplace/${id}`, data)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Lỗi khi cập nhật workplace:', error.response?.data || error);
        throw error;
      });
  },

  // Xóa workplace
  deleteWorkplace(id) {
    return apiClient
      .delete(`/admin/deleteWorkplace/${id}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Lỗi khi xóa workplace:', error.response?.data || error);
        throw error;
      });
  },

  // Tìm kiếm workplace
  searchWorkplace(city) {
    return apiClient
      .post('/admin/searchWorkplace', { city })
      .then((response) => response.data)
      .catch((error) => {
        console.error('Lỗi khi tìm kiếm workplace:', error.response?.data || error);
        throw error;
      });
  },
};

export default WorkplaceService;
