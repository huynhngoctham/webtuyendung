import apiClient from './apiClient'; // Import axios client from your config

const handleError = (error) => {
  const errorMessage = error.response?.data?.message || 'An error occurred while connecting to the server.';
  const status = error.response?.status || 500;

  // Log lỗi với thông tin chi tiết
  console.error(`API Error [${status}]:`, error.response?.data || error.message);

  // Ném lỗi với thông báo cụ thể
  throw new Error(errorMessage);
};

const AcademyProfileService = {
  // Lấy tất cả thông tin học vấn
  getAcademy() {
    return apiClient
      .get('/candidate/getAcademy')
      .then((response) => response.data)
      .catch(handleError); // Sử dụng handleError để xử lý lỗi
  },

  // Thêm thông tin học vấn
  addAcademy(data) {
    return apiClient
      .post('/candidate/addAcademy', data)
      .then((response) => response.data)
      .catch(handleError); // Sử dụng handleError để xử lý lỗi
  },

  // Cập nhật thông tin học vấn
  updateAcademy(id, data) {
    return apiClient
      .put(`/candidate/updateAcademy/${id}`, data)
      .then((response) => response.data)
      .catch(handleError); // Sử dụng handleError để xử lý lỗi
  },

  // Xóa thông tin học vấn
  deleteAcademy(id) {
    return apiClient
      .delete(`/candidate/deleteAcademy/${id}`)
      .then((response) => response.data)
      .catch(handleError); // Sử dụng handleError để xử lý lỗi
  },
};

export default AcademyProfileService;
