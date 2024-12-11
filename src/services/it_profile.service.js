import apiClient from './apiClient'; // Import axios client từ cấu hình

const handleError = (error) => {
  const errorMessage =
    error.response?.data?.message || 'Đã xảy ra lỗi khi kết nối với máy chủ.';
  const status = error.response?.status || 500;

  // Log lỗi chi tiết
  console.error(`API Error [${status}]:`, error.response?.data || error.message);

  // Ném lỗi với thông báo cụ thể
  throw new Error(errorMessage);
};

const ITProfileService = {
  // Lấy tất cả thông tin công nghệ của người dùng
  getITDetails() {
    return apiClient
      .get('/candidate/getITDetails')
      .then((response) => response.data)
      .catch(handleError); // Xử lý lỗi
  },

  // Thêm thông tin công nghệ mới
  addITDetails(data) {
    return apiClient
      .post('/candidate/addITDetails', data)
      .then((response) => response.data)
      .catch(handleError); // Xử lý lỗi
  },

  // Cập nhật thông tin công nghệ
  updateITDetails(id, data) {
    return apiClient
      .put(`/candidate/updateITDetails/${id}`, data)
      .then((response) => response.data)
      .catch(handleError); // Xử lý lỗi
  },

  // Xóa thông tin công nghệ
  deleteITDetails(id) {
    return apiClient
      .delete(`/candidate/deleteITDetails/${id}`)
      .then((response) => response.data)
      .catch(handleError); // Xử lý lỗi
  },
};

export default ITProfileService;
