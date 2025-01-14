import apiClient from './apiClient';

// Lấy danh sách hồ sơ theo điểm khớp cao
export const getSortedProfiles = async (newsId) => {
  try {
    const response = await apiClient.get(`/employer/listProfile/${newsId}`);
    return response.data; // Trả về danh sách hồ sơ đã sắp xếp
  } catch (error) {
    console.error('Lỗi khi lấy danh sách hồ sơ:', error);
    throw new Error(
      error.response?.data?.message || 'Không thể tải danh sách hồ sơ'
    );
  }
};

export default {
  getSortedProfiles,
};
