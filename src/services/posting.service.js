import apiClient from './apiClient'; // Import cấu hình axios từ file cấu hình của bạn

const PostingService = {
  // Lấy tất cả gói dịch vụ
  getAllPostings() {
    return apiClient
      .get('/admin/getPosting')
      .then((response) => response.data)
      .catch((error) => {
        console.error('Lỗi khi lấy danh sách gói dịch vụ:', error);
        throw error;
      });
  },

  // Thêm gói dịch vụ mới
  addPosting(data) {
    return apiClient
      .post('/admin/addPosting', data)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Lỗi khi thêm gói dịch vụ:', error.response?.data || error);
        throw error;
      });
  },

  // Cập nhật gói dịch vụ
  updatePosting(id, data) {
    return apiClient
      .put(`/admin/updatePosting/${id}`, data)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Lỗi khi cập nhật gói dịch vụ:', error.response?.data || error);
        throw error;
      });
  },

  // Xóa gói dịch vụ
  deletePosting(id) {
    return apiClient
      .delete(`/admin/deletePosting/${id}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error('Lỗi khi xóa gói dịch vụ:', error.response?.data || error);
        throw error;
      });
  },

  // Tìm kiếm gói dịch vụ theo tên
  searchPosting(name) {
    return apiClient
      .post('/admin/searchPosting', { name })
      .then((response) => response.data)
      .catch((error) => {
        console.error('Lỗi khi tìm kiếm gói dịch vụ:', error.response?.data || error);
        throw error;
      });
  },
};

export default PostingService;
