import apiClient from './apiClient';

// Gửi báo cáo
export const addReport = async (newsId, content) => {
  try {
    const response = await apiClient.post(`/candidate/reportnews/${newsId}`, {
      content, // Nội dung báo cáo
    });
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    console.error('Lỗi khi gửi báo cáo:', error);
    throw new Error(
      error.response?.data?.message || 'Không thể gửi báo cáo. Vui lòng thử lại sau.'
    );
  }
};

// Lấy danh sách báo cáo
export const getAllReports = async () => {
    try {
      const response = await apiClient.get('/get/report');
      return response.data; // Trả về danh sách báo cáo
    } catch (error) {
      console.error('Lỗi khi lấy danh sách báo cáo:', error);
      throw new Error(
        error.response?.data?.message || 'Không thể tải danh sách báo cáo. Vui lòng thử lại sau.'
      );
    }
  };
export default {
  addReport,
  getAllReports,
};
