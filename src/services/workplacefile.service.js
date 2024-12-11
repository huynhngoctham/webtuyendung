// WorkplaceServicefile.js

import apiClient from './apiClient'; // Import axios client từ cấu hình của bạn

// Hàm xử lý lỗi chung
const handleError = (error) => {
  const errorMessage = error.response?.data?.message || 'An error occurred while connecting to the server.';
  const status = error.response?.status || 500;

  // Log lỗi với thông tin chi tiết
  console.error(`API Error [${status}]:`, error.response?.data || error.message);

  // Ném lỗi với thông báo cụ thể
  throw new Error(errorMessage);
};

// Workplace Service
const WorkplaceServicefile = {
  // ------------------- GET -------------------

  getAllWorkplace() {
    return apiClient
      .get('/candidate/getWorkplaceDetails')
      .then((response) => response.data)
      .catch(handleError);
  },

  // ------------------- POST -------------------

  addWorkplaceDetails(data) {
    return apiClient
      .post('/candidate/addWorkplaceDetails', data)
      .then((response) => response.data)
      .catch(handleError);
  },

  // ------------------- PUT -------------------

  updateWorkplaceDetails(id, data) {
    return apiClient
      .put(`/candidate/updateWorkplaceDetails/${id}`, data)
      .then((response) => response.data)
      .catch(handleError);
  },

  // ------------------- DELETE -------------------

  deleteWorkplaceDetails(id) {
    return apiClient
      .delete(`/candidate/deleteWorkplaceDetails/${id}`)
      .then((response) => response.data)
      .catch(handleError);
  }
};

export default WorkplaceServicefile;
