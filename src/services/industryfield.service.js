import apiClient from './apiClient'; // Import axios client from your config

// Hàm xử lý lỗi chung
const handleError = (error) => {
  const errorMessage = error.response?.data?.message || 'An error occurred while connecting to the server.';
  const status = error.response?.status || 500;

  // Log lỗi với thông tin chi tiết
  console.error(`API Error [${status}]:`, error.response?.data || error.message);

  // Ném lỗi với thông báo cụ thể
  throw new Error(errorMessage);
};

// Industry Service
const IndustryService = {
  
  // ------------------- GET -------------------

  /**
   * Lấy danh sách ngành nghề
   * @returns {Promise} Promise trả về dữ liệu ngành nghề
   */
  getAllIndustries() {
    return apiClient
      .get('/candidate/getIndustryProfile')
      .then((response) => response.data)
      .catch(handleError);
  },

  // ------------------- POST -------------------

  /**
   * Thêm một ngành nghề vào hồ sơ ứng viên
   * @param {Object} data - Dữ liệu ngành nghề cần thêm
   * @returns {Promise} Promise trả về kết quả thêm thành công hoặc lỗi
   */
  addIndustryProfile(data) {
    return apiClient
      .post('/candidate/addIndustryProfile', data)
      .then((response) => response.data)
      .catch(handleError);
  },

  // ------------------- PUT -------------------

  /**
   * Cập nhật thông tin ngành nghề của ứng viên
   * @param {number} id - ID của ngành nghề cần cập nhật
   * @param {Object} data - Dữ liệu ngành nghề cần cập nhật
   * @returns {Promise} Promise trả về kết quả cập nhật thành công hoặc lỗi
   */
  updateIndustryProfile(id, data) {
    return apiClient
      .put(`/candidate/updateIndustryProfile/${id}`, data)
      .then((response) => response.data)
      .catch(handleError);
  },

  // ------------------- DELETE -------------------

  /**
   * Xóa ngành nghề của ứng viên
   * @param {number} id - ID của ngành nghề cần xóa
   * @returns {Promise} Promise trả về kết quả xóa thành công hoặc lỗi
   */
  deleteIndustryProfile(id) {
    return apiClient
      .delete(`/candidate/deleteIndustryProfile/${id}`)
      .then((response) => response.data)
      .catch(handleError);
  }
};

export default IndustryService;
